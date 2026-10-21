import { copyFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import sharp from "sharp";

// Preserve the native document scans from the supplied v2 history reference.
// Usage: node scripts/extract-about-history.mjs [history-reference.pdf]
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D });
const { getDocument, OPS, ImageKind } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const input = process.argv[2] ? path.resolve(process.argv[2]) : path.join(root, "seajuste nosotros v2/PROYECTO HIDROELECTRICO paute INGLES - copia.pdf");
const output = path.join(root, "public/documents");
const sheets = [
  { page: 1, name: "history-paute-1990-v2", images: [[5, 685, 904]] },
  { page: 2, name: "history-transelectric-2000-v2", images: [[3, 1090, 768], [4, 1078, 716]] },
  { page: 3, name: "history-settlement-2000-v2", images: [[3, 1396, 906], [4, 1193, 776]] },
  { page: 4, name: "history-origins-credentials", images: [[0, 1103, 478], [1, 955, 599]] },
];
const task = getDocument({
  data: new Uint8Array(await readFile(input)),
  useSystemFonts: true,
  standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/",
  wasmUrl: path.join(root, "node_modules/pdfjs-dist/wasm").replaceAll("\\", "/") + "/",
});

try {
  const pdf = await task.promise;
  if (pdf.numPages !== 4) throw new Error("Expected the four-page v2 history reference.");
  for (const sheet of sheets) {
    const page = await pdf.getPage(sheet.page);
    const operators = await page.getOperatorList();
    const ids = [...new Set(operators.fnArray.flatMap((fn, index) => fn === OPS.paintImageXObject ? [operators.argsArray[index][0]] : []))];
    const viewport = page.getViewport({ scale: 1 });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;

    const layers = [];
    const width = Math.max(...sheet.images.map(([, imageWidth]) => imageWidth));
    let top = 0;
    for (const [index, imageWidth, imageHeight] of sheet.images) {
      const id = ids[index];
      if (!id) throw new Error(`Missing document scan for ${sheet.name}.`);
      const objects = id.startsWith("g_") ? page.commonObjs : page.objs;
      const image = await new Promise((resolve) => objects.get(id, resolve));
      if (image.width !== imageWidth || image.height !== imageHeight) throw new Error(`Document scan dimensions changed for ${sheet.name}.`);
      if (!image.data || ![ImageKind.RGB_24BPP, ImageKind.RGBA_32BPP].includes(image.kind)) throw new Error(`Unsupported image format for ${sheet.name}.`);
      const input = await sharp(Buffer.from(image.data), { raw: { width: imageWidth, height: imageHeight, channels: image.kind === ImageKind.RGB_24BPP ? 3 : 4 } }).png().toBuffer();
      layers.push({ input, left: Math.floor((width - imageWidth) / 2), top });
      top += imageHeight + 24;
    }
    const height = top - 24;
    const result = await sharp({ create: { width, height, channels: 3, background: "#ffffff" } }).composite(layers).webp({ lossless: true, effort: 6 }).toFile(path.join(output, `${sheet.name}.webp`));
    console.log(`${sheet.name}.webp · ${width} × ${height} · ${Math.round(result.size / 1024)} KB`);
    page.cleanup();
  }
  await copyFile(input, path.join(output, "seajuste-historia-documental.pdf"));
  console.log("Original four-page reference copied to public/documents/seajuste-historia-documental.pdf");
} finally {
  await task.destroy();
}
