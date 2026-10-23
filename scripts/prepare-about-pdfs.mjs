import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

// Publish the documentary PDFs and prepare matching web previews.
// Usage: node scripts/prepare-about-pdfs.mjs [source-directory] [--history-only]
// --history-diplomas is retained as an alias for rebuilding the history document.
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D });
const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const historyOnly = process.argv.includes("--history-only") || process.argv.includes("--history-diplomas");
const sourceArgument = process.argv.slice(2).find((argument) => !argument.startsWith("--"));
const source = sourceArgument ? path.resolve(sourceArgument) : path.join(root, "Documentos para nosotros");
const output = path.join(root, "public/documents/nosotros");
const files = await readdir(source);
const documents = [
  ["history", "Nuestra historia.pdf", "nuestra-historia.pdf"],
  ["paute", "Proyecto hidroeléctrico Paute.pdf", "proyecto-hidroelectrico-paute.pdf"],
  ["london", "Gestión de reclamos en el mercado reasegurador de Londres.pdf", "gestion-reclamos-londres.pdf"],
  ["settlement", "Gestiones en el mercado reasegurador · Reclamos y siniestros del ex INECEL.pdf", "acta-finiquito-renuncia-inecel.pdf"],
];
const manifest = historyOnly ? JSON.parse(await readFile(path.join(output, "manifest.json"), "utf8")) : {};

async function renderPdfPages(bytes, destination) {
  const task = getDocument({
    data: new Uint8Array(bytes),
    useSystemFonts: true,
    standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/",
    wasmUrl: path.join(root, "node_modules/pdfjs-dist/wasm").replaceAll("\\", "/") + "/",
  });
  try {
    const pdf = await task.promise;
    const pages = [];
    for (let number = 1; number <= pdf.numPages; number++) {
      const page = await pdf.getPage(number);
      const base = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale: 1400 / base.width });
      const canvas = createCanvas(Math.round(viewport.width), Math.ceil(viewport.height));
      await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
      const filename = `${destination.replace(/\.pdf$/, "")}-page-${number}.webp`;
      await sharp(canvas.toBuffer("image/png")).webp({ quality: 92, effort: 6 }).toFile(path.join(output, filename));
      pages.push({ src: `/documents/nosotros/${filename}`, width: canvas.width, height: canvas.height });
      page.cleanup();
    }
    return pages;
  } finally {
    await task.destroy();
  }
}

await mkdir(output, { recursive: true });
for (const [key, name, destination] of historyOnly ? [] : documents.filter(([key]) => key !== "history")) {
  // Supplied filenames can contain decomposed Unicode accents.
  const filename = files.find((file) => file.normalize("NFC") === name.normalize("NFC"));
  if (!filename) throw new Error(`Missing source document: ${name}`);
  const input = path.join(source, filename);
  const bytes = await readFile(input);
  await copyFile(input, path.join(output, destination));
  const pages = await renderPdfPages(bytes, destination);
  manifest[key] = { src: `/documents/nosotros/${destination}`, pages };
  console.log(`${destination} · ${pages.length} pages · ${Math.round(bytes.length / 1024)} KB`);
}

// The native documentary sheet contains both the first- and second-level diplomas.
// Place them together on page one, followed by the credentials and incorporation deed.
const diplomaSheet = path.join(root, "public/documents/history-origins-credentials.webp");
const diplomaWidth = 1104;
const diplomaCrops = [
  { left: 0, top: 0, width: 551, height: 478 },
  { left: 551, top: 0, width: 552, height: 478 },
];
const layers = [];
let diplomaHeight = 0;
for (const crop of diplomaCrops) {
  const { data, info } = await sharp(diplomaSheet).extract(crop).resize({ width: diplomaWidth }).png().toBuffer({ resolveWithObject: true });
  layers.push({ input: data, left: 0, top: diplomaHeight });
  diplomaHeight += info.height + 24;
}
diplomaHeight -= 24;
const diplomaFilename = "nuestra-historia-diplomas.webp";
await sharp({ create: { width: diplomaWidth, height: diplomaHeight, channels: 3, background: "#ffffff" } }).composite(layers).webp({ quality: 94, effort: 6 }).toFile(path.join(output, diplomaFilename));

// Always rebuild from the supplied originals so repeat runs never duplicate the deed.
const originalHistory = await PDFDocument.load(await readFile(path.join(source, "Nuestra historia.pdf")));
const incorporation = await PDFDocument.load(await readFile(path.join(root, "Escritura de constitucion.pdf")));
const history = await PDFDocument.create();
const diplomaImage = await history.embedPng(await sharp(path.join(output, diplomaFilename)).png().toBuffer());
const pageWidth = originalHistory.getPage(0).getWidth();
const pageHeight = diplomaHeight * pageWidth / diplomaWidth;
const diplomaPage = history.addPage([pageWidth, pageHeight]);
diplomaPage.drawImage(diplomaImage, { x: 0, y: 0, width: pageWidth, height: pageHeight });
for (const page of await history.copyPages(originalHistory, originalHistory.getPageIndices().slice(2))) history.addPage(page);
for (const page of await history.copyPages(incorporation, incorporation.getPageIndices())) history.addPage(page);
history.setTitle("Nuestra historia · SEAJUSTE");
history.setSubject("Diplomas, credenciales y escritura de constitución");
const historyBytes = await history.save();
const historyFilename = "nuestra-historia.pdf";
await writeFile(path.join(output, historyFilename), historyBytes);
manifest.history = { src: `/documents/nosotros/${historyFilename}`, pages: await renderPdfPages(historyBytes, historyFilename) };
console.log(`${historyFilename} · ${history.getPageCount()} pages · ${incorporation.getPageCount()} incorporation page(s) appended`);
await writeFile(path.join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
