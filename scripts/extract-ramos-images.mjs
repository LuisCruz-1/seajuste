import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import sharp from "sharp";

// Extract the eight original photographs embedded in the one-page RAMOS reference.
// Usage: node scripts/extract-ramos-images.mjs "imagenes para slide 3.pdf"
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D });
const { getDocument, OPS, ImageKind } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/extract-ramos-images.mjs <reference.pdf>");

const photographs = [
  { index: 2, name: "ramos-boiler-inspection", width: 482, height: 432 },
  { index: 3, name: "ramos-power-turbine", width: 496, height: 409 },
  { index: 4, name: "ramos-siemens-assembly", width: 420, height: 308 },
  { index: 5, name: "ramos-earthmoving-equipment", width: 473, height: 405 },
  { index: 6, name: "ramos-power-barge", width: 486, height: 430 },
  { index: 7, name: "ramos-marine-engines", width: 400, height: 337 },
  { index: 8, name: "ramos-transformer-damage", width: 433, height: 488 },
  { index: 9, name: "ramos-cargo-unloading", width: 408, height: 433 },
];

const task = getDocument({
  data: new Uint8Array(await readFile(path.resolve(input))),
  useSystemFonts: true,
  standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/",
  wasmUrl: path.join(root, "node_modules/pdfjs-dist/wasm").replaceAll("\\", "/") + "/",
});

try {
  const pdf = await task.promise;
  if (pdf.numPages !== 1) throw new Error("Expected the one-page RAMOS reference PDF.");
  const page = await pdf.getPage(1);
  const operators = await page.getOperatorList();
  const ids = [...new Set(operators.fnArray.flatMap((fn, index) => fn === OPS.paintImageXObject ? [operators.argsArray[index][0]] : []))];

  // Rendering resolves the image objects. Extraction below uses their native pixels.
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
    const output = path.join(root, "public/images/projects", `${name}.webp`);
    await sharp(Buffer.from(image.data), { raw: { width: image.width, height: image.height, channels } }).webp({ quality: 92, effort: 6 }).toFile(output);
    console.log(`${name}.webp · ${image.width} × ${image.height}`);
  }
  page.cleanup();
} finally {
  await task.destroy();
}
