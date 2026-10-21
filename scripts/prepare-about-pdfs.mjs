import { copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import sharp from "sharp";

// Publish each supplied document without changing its pages or image quality.
// Usage: node scripts/prepare-about-pdfs.mjs [source-directory]
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D });
const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const source = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, "Documentos para nosotros");
const output = path.join(root, "public/documents/nosotros");
const files = await readdir(source);
const documents = [
  ["history", "Nuestra historia.pdf", "nuestra-historia.pdf"],
  ["paute", "Proyecto hidroeléctrico Paute.pdf", "proyecto-hidroelectrico-paute.pdf"],
  ["london", "Gestión de reclamos en el mercado reasegurador de Londres.pdf", "gestion-reclamos-londres.pdf"],
  ["settlement", "Gestiones en el mercado reasegurador · Reclamos y siniestros del ex INECEL.pdf", "acta-finiquito-renuncia-inecel.pdf"],
];
const manifest = {};

await mkdir(output, { recursive: true });
for (const [key, name, destination] of documents) {
  // Supplied filenames can contain decomposed Unicode accents.
  const filename = files.find((file) => file.normalize("NFC") === name.normalize("NFC"));
  if (!filename) throw new Error(`Missing source document: ${name}`);
  const input = path.join(source, filename);
  const bytes = await readFile(input);
  const task = getDocument({
    data: new Uint8Array(bytes),
    useSystemFonts: true,
    standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/",
    wasmUrl: path.join(root, "node_modules/pdfjs-dist/wasm").replaceAll("\\", "/") + "/",
  });
  try {
    const pdf = await task.promise;
    await copyFile(input, path.join(output, destination));
    if (!(await readFile(path.join(output, destination))).equals(bytes)) throw new Error(`PDF copy verification failed: ${destination}`);
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
    manifest[key] = { src: `/documents/nosotros/${destination}`, pages };
    console.log(`${destination} · ${pdf.numPages} pages · ${Math.round(bytes.length / 1024)} KB`);
  } finally {
    await task.destroy();
  }
}
await writeFile(path.join(output, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
