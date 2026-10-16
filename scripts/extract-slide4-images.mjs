import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import sharp from "sharp";

// Extract the original photographs embedded in the one-page INTERVENCIÓN reference.
// Usage: node scripts/extract-slide4-images.mjs "slide4.pdf"
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D });
const { getDocument, OPS, ImageKind } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/extract-slide4-images.mjs <reference.pdf>");

const photographs = [
  { index: 3, name: "intervention-tg5", width: 525, height: 300 },
  { index: 4, name: "intervention-tv1", width: 466, height: 350 },
  { index: 5, name: "intervention-tg4", width: 318, height: 452 },
  { index: 0, name: "intervention-artefacta-damage", width: 472, height: 368 },
  { index: 1, name: "intervention-artefacta-store", width: 417, height: 366 },
];

const task = getDocument({
  data: new Uint8Array(await readFile(path.resolve(input))),
  useSystemFonts: true,
  standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/",
  wasmUrl: path.join(root, "node_modules/pdfjs-dist/wasm").replaceAll("\\", "/") + "/",
});

try {
  const pdf = await task.promise;
  if (pdf.numPages !== 1) throw new Error("Expected the one-page slide4.pdf reference.");
  const page = await pdf.getPage(1);
  const operators = await page.getOperatorList();
  const ids = [...new Set(operators.fnArray.flatMap((fn, index) => fn === OPS.paintImageXObject ? [operators.argsArray[index][0]] : []))];
  const viewport = page.getViewport({ scale: 1 });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;

  const images = [];
  for (const photo of photographs) {
    if (!ids[photo.index]) throw new Error(`Missing image for ${photo.name}.`);
    const image = await new Promise((resolve) => page.objs.get(ids[photo.index], resolve));
    if (image.width !== photo.width || image.height !== photo.height) throw new Error(`Reference image dimensions changed for ${photo.name}.`);
    if (!image.data || ![ImageKind.RGB_24BPP, ImageKind.RGBA_32BPP].includes(image.kind)) throw new Error(`Unsupported image format for ${photo.name}.`);
    images.push({ ...photo, image });
  }
  for (const { name, image } of images) {
    const channels = image.kind === ImageKind.RGB_24BPP ? 3 : 4;
    await sharp(Buffer.from(image.data), { raw: { width: image.width, height: image.height, channels } }).webp({ quality: 92, effort: 6 }).toFile(path.join(root, "public/images/projects", `${name}.webp`));
    console.log(`${name}.webp · ${image.width} × ${image.height}`);
  }
  page.cleanup();
} finally {
  await task.destroy();
}
