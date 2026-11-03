import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import sharp from "sharp";

// Extract the original photographs from servicios.pdf in their reading order.
// Usage: node scripts/extract-services-images.mjs [--inspect]
Object.assign(globalThis, { DOMMatrix, ImageData, Path2D });
const { getDocument, OPS, ImageKind, Util } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const root = fileURLToPath(new URL("../", import.meta.url));
const inspect = process.argv.includes("--inspect");
const output = path.join(root, "public/images/services");
const photographs = [
  ["thermal-power-plant", "power-transmission", "damage-survey"],
  ["damaged-transformer", "technical-inspection", "inspection-report"],
  ["overturned-machinery", "transformer-fire", "structural-damage"],
  ["boiler", "generator-engine", "gas-turbine", "power-transformer"],
  ["onboard-unloading", "platform-unloading", "project-transformer", "port-crane", "onboard-turbines", "power-barge"],
  ["damaged-equipment", "damage-and-shutdown", "return-to-operation"],
];
const task = getDocument({
  data: new Uint8Array(await readFile(path.join(root, "servicios.pdf"))),
  useSystemFonts: true,
  standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/",
  wasmUrl: path.join(root, "node_modules/pdfjs-dist/wasm").replaceAll("\\", "/") + "/",
});

try {
  const pdf = await task.promise;
  if (pdf.numPages !== 8) throw new Error("Expected the eight-page servicios.pdf reference.");
  if (!inspect) await mkdir(output, { recursive: true });
  for (let number = 1; number <= photographs.length; number++) {
    const page = await pdf.getPage(number);
    const operators = await page.getOperatorList();
    let matrix = [1, 0, 0, 1, 0, 0];
    const stack = [];
    const images = [];
    for (let index = 0; index < operators.fnArray.length; index++) {
      const fn = operators.fnArray[index];
      const args = operators.argsArray[index];
      if (fn === OPS.save) stack.push([...matrix]);
      else if (fn === OPS.restore) matrix = stack.pop() ?? matrix;
      else if (fn === OPS.transform) matrix = Util.transform(matrix, args);
      else if (fn === OPS.paintImageXObject) images.push({ id: args[0], x: matrix[4], top: matrix[5] + matrix[3] });
    }
    // PDF coordinates start at the bottom. Group nearby tops before sorting left to right.
    images.sort((a, b) => Math.abs(a.top - b.top) < 100 ? a.x - b.x : b.top - a.top);
    if (images.length !== photographs[number - 1].length) throw new Error(`Page ${number}: expected ${photographs[number - 1].length} photographs, found ${images.length}.`);
    const viewport = page.getViewport({ scale: 1 });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
    for (const [index, placement] of images.entries()) {
      const image = await new Promise((resolve) => page.objs.get(placement.id, resolve));
      const name = photographs[number - 1][index];
      if (!image.data || ![ImageKind.RGB_24BPP, ImageKind.RGBA_32BPP].includes(image.kind)) throw new Error(`Unsupported image format: ${name}`);
      if (!inspect) {
        const channels = image.kind === ImageKind.RGB_24BPP ? 3 : 4;
        await sharp(Buffer.from(image.data), { raw: { width: image.width, height: image.height, channels } }).webp({ quality: 92, effort: 6 }).toFile(path.join(output, `${name}.webp`));
      }
      console.log(`Page ${number}: ${name}.webp · ${image.width} × ${image.height} · x=${Math.round(placement.x)}, top=${Math.round(placement.top)}`);
    }
    page.cleanup();
  }
} finally {
  await task.destroy();
}
