import { readFile, mkdir, copyFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createCanvas, DOMMatrix, ImageData, Path2D } from "@napi-rs/canvas";
import sharp from "sharp";

// Keep the source brochure intact. Coordinates refer to the supplied page views.
// Generated photographs are local WebP assets; logos retain their original form.
globalThis.DOMMatrix = DOMMatrix;
globalThis.ImageData = ImageData;
globalThis.Path2D = Path2D;

const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
const input = process.argv[2];
if (!input) throw new Error("Usage: node scripts/extract-brochure.mjs <brochure.pdf>");
const root = process.cwd();
const imageRoot = path.join(root, "public", "images");
const documentRoot = path.join(root, "public", "documents");
await mkdir(imageRoot, { recursive: true });
await mkdir(documentRoot, { recursive: true });

const crops = new Map();
function add(page, name, x, y, width, height, kind = "photo") {
  const items = crops.get(page) ?? [];
  items.push({ name, x, y, width, height, kind });
  crops.set(page, items);
}
function grid(page, prefix, xs, ys, widths, heights) {
  let index = 1;
  for (let row = 0; row < ys.length; row++) {
    for (let col = 0; col < xs.length; col++) {
      add(page, `${prefix}-${index++}`, xs[col], ys[row], widths[col], heights[row]);
    }
  }
}

// Photographic evidence, retaining the content of each individual photograph.
grid(6, "claims", [0.048, 0.512], [0.034, 0.352, 0.668], [0.441, 0.44], [0.303, 0.302, 0.299]);
add(7, "equipment-overview", 0.047, 0.035, 0.433, 0.3);
add(7, "assembly-overview", 0.048, 0.351, 0.431, 0.301);
add(7, "building-overview", 0.048, 0.668, 0.429, 0.299);
add(9, "transformer-inspection", 0.055, 0.036, 0.419, 0.469);
add(9, "electrical-testing", 0.055, 0.514, 0.419, 0.451);
add(10, "tg5-generator", 0.048, 0.066, 0.525, 0.211);
add(10, "tg5-turbine", 0.582, 0.066, 0.369, 0.211);
add(10, "trinitaria-plant", 0.05, 0.317, 0.275, 0.263);
add(10, "trinitaria-turbine", 0.335, 0.317, 0.615, 0.263);
add(11, "artefacta-damage", 0.048, 0.702, 0.474, 0.263);
add(11, "artefacta-store", 0.536, 0.702, 0.415, 0.263);
grid(12, "excavator-field", [0.049, 0.548], [0.035, 0.324, 0.617], [0.479, 0.403], [0.276, 0.274, 0.349]);
grid(13, "equipment-inspection", [0.047, 0.474], [0.371, 0.581], [0.4, 0.472], [0.197, 0.208]);
add(13, "equipment-inspection-5", 0.046, 0.796, 0.397, 0.166);
add(13, "equipment-inspection-6", 0.474, 0.804, 0.472, 0.156);
for (let i = 0; i < 4; i++) add(14, `crane-incident-${i + 1}`, 0.225, [0.025, 0.262, 0.5, 0.735][i], 0.696, 0.224);
add(15, "marine-transformer-1", 0.042, 0.306, 0.438, 0.207);
add(15, "marine-transformer-2", 0.498, 0.306, 0.441, 0.207);
add(15, "marine-transformer-3", 0.112, 0.534, 0.24, 0.251);
add(15, "marine-transformer-4", 0.493, 0.53, 0.427, 0.194);
add(15, "marine-transformer-5", 0.06, 0.797, 0.36, 0.172);
add(15, "marine-transformer-6", 0.498, 0.771, 0.426, 0.198);
add(16, "power-modules-1", 0.123, 0.062, 0.761, 0.394);
add(16, "power-modules-2", 0.123, 0.49, 0.758, 0.183);
add(16, "power-modules-3", 0.115, 0.713, 0.762, 0.252);
grid(18, "cargo-unloading", [0.049, 0.54], [0.036, 0.357, 0.663], [0.479, 0.41], [0.3, 0.295, 0.302]);
for (let i = 0; i < 3; i++) add(20, `land-transport-${i + 1}`, 0.171, [0.037, 0.351, 0.662][i], 0.678, 0.303);
add(21, "cargo-shore-1", 0.088, 0.098, 0.428, 0.383);
add(21, "cargo-shore-2", 0.53, 0.107, 0.38, 0.181);
add(21, "cargo-shore-3", 0.53, 0.3, 0.38, 0.181);
add(21, "cargo-shore-4", 0.198, 0.491, 0.595, 0.22);
add(21, "cargo-shore-5", 0.198, 0.719, 0.595, 0.222);
grid(22, "cargo-assembly", [0.055, 0.491], [0.289, 0.515, 0.739], [0.421, 0.431], [0.215, 0.213, 0.213]);
for (let i = 0; i < 4; i++) {
  add(23, `power-barge-${i + 1}`, 0.051, [0.035, 0.267, 0.511, 0.747][i], 0.46, [0.222, 0.232, 0.223, 0.22][i]);
  add(23, `barge-engine-${i + 1}`, 0.528, [0.035, 0.265, 0.508, 0.75][i], 0.423, [0.22, 0.233, 0.239, 0.217][i]);
}
add(24, "power-barge-overview", 0.05, 0.37, 0.901, 0.247);
add(24, "power-barge-detail", 0.055, 0.657, 0.499, 0.309);
add(24, "barge-systems", 0.574, 0.658, 0.377, 0.308);
grid(25, "guayaquil-building", [0.049, 0.502], [0.091, 0.347, 0.622], [0.441, 0.45], [0.248, 0.268, 0.347]);
grid(26, "manta-building", [0.05, 0.505], [0.346, 0.662], [0.444, 0.444], [0.303, 0.307]);
grid(27, "esmeraldas-roads", [0.049, 0.495], [0.094, 0.44], [0.433, 0.454], [0.335, 0.529]);
grid(28, "road-repairs", [0.049, 0.495], [0.237], [0.434, 0.454], [0.276]);
add(28, "road-repairs-3", 0.294, 0.524, 0.444, 0.229);
add(28, "road-repairs-4", 0.049, 0.763, 0.434, 0.203);
add(28, "road-repairs-5", 0.495, 0.763, 0.454, 0.203);
grid(29, "urban-reconstruction", [0.053, 0.497], [0.034, 0.264, 0.527, 0.751], [0.428, 0.459], [0.21, 0.252, 0.209, 0.215]);
add(30, "urban-measurements-1", 0.092, 0.344, 0.423, 0.167);
add(30, "urban-measurements-2", 0.092, 0.517, 0.423, 0.172);
add(30, "urban-measurements-3", 0.549, 0.405, 0.379, 0.28);
add(30, "urban-measurements-4", 0.082, 0.707, 0.846, 0.254);
for (let i = 0; i < 4; i++) add(31, `highway-reconstruction-${i + 1}`, 0.475, [0.035, 0.277, 0.522, 0.75][i], 0.475, [0.234, 0.229, 0.215, 0.219][i]);
add(31, "highway-evidence-1", 0.048, 0.035, 0.405, 0.338);
add(31, "highway-evidence-2", 0.048, 0.393, 0.405, 0.354);
add(31, "highway-evidence-3", 0.048, 0.763, 0.405, 0.204);
add(32, "highway-analysis-1", 0.109, 0.305, 0.79, 0.207);
add(32, "highway-analysis-2", 0.109, 0.521, 0.79, 0.215);
add(32, "highway-analysis-3", 0.109, 0.744, 0.79, 0.224);

// Actual portraits and historical client logos from the brochure.
add(35, "josue-gavilanez", 0.396, 0.058, 0.12, 0.12, "team");
add(35, "ana-zambrano", 0.568, 0.058, 0.12, 0.12, "team");
add(35, "cristian-chauca", 0.033, 0.321, 0.125, 0.108, "team");
add(35, "andres-coronel", 0.73, 0.312, 0.142, 0.122, "team");
add(35, "gustavo-gonzaga", 0.081, 0.571, 0.134, 0.119, "team");
add(35, "manuel-patino", 0.815, 0.57, 0.111, 0.121, "team");
add(35, "emily-quevedo", 0.227, 0.823, 0.13, 0.123, "team");
add(35, "pablo-ramirez", 0.419, 0.823, 0.145, 0.123, "team");
add(36, "carlos-quevedo", 0.099, 0.093, 0.131, 0.117, "team");
add(36, "miguel-chavez", 0.124, 0.323, 0.102, 0.105, "team");
add(36, "miguel-yapur", 0.465, 0.325, 0.094, 0.103, "team");
add(36, "ricardo-gallegos", 0.125, 0.587, 0.114, 0.099, "team");
add(36, "marco-leiva", 0.817, 0.583, 0.102, 0.113, "team");
add(36, "jorge-loor", 0.505, 0.829, 0.107, 0.112, "team");
add(36, "carla-garcia", 0.685, 0.829, 0.132, 0.113, "team");

add(39, "seajuste-logo", 0.036, 0.036, 0.58, 0.081, "brand");
add(3, "mutual-trust", 0.841, 0.019, 0.127, 0.087, "brand");
add(33, "aseguradora-del-sur", 0.071, 0.125, 0.385, 0.157, "clients");
add(33, "colonial", 0.247, 0.32, 0.518, 0.077, "clients");
add(33, "atlas", 0.573, 0.437, 0.384, 0.143, "clients");
add(33, "sul-america", 0.334, 0.609, 0.375, 0.134, "clients");
add(33, "el-fenix", 0.072, 0.782, 0.279, 0.18, "clients");
add(33, "generali", 0.659, 0.782, 0.29, 0.169, "clients");
add(34, "artefacta", 0.097, 0.091, 0.328, 0.139, "clients");
add(34, "espol", 0.554, 0.081, 0.234, 0.177, "clients");
add(34, "ciat", 0.13, 0.304, 0.254, 0.08, "clients");
add(34, "puerto-esmeraldas", 0.57, 0.284, 0.312, 0.105, "clients");
add(34, "transelectric", 0.069, 0.409, 0.398, 0.13, "clients");
add(34, "cnel", 0.531, 0.445, 0.385, 0.097, "clients");
add(34, "electroguayas", 0.07, 0.558, 0.396, 0.141, "clients");
add(34, "termoesmeraldas", 0.529, 0.563, 0.395, 0.138, "clients");
add(34, "hidroagoyan", 0.071, 0.711, 0.395, 0.115, "clients");
add(34, "hidronacion", 0.53, 0.708, 0.395, 0.118, "clients");
add(34, "hidroabanico", 0.317, 0.841, 0.393, 0.117, "clients");

const loadingTask = getDocument({
  data: new Uint8Array(await readFile(path.resolve(input))),
  useSystemFonts: true,
  standardFontDataUrl: path.join(root, "node_modules/pdfjs-dist/standard_fonts").replaceAll("\\", "/") + "/",
  wasmUrl: path.join(root, "node_modules/pdfjs-dist/wasm").replaceAll("\\", "/") + "/",
});
const pdf = await loadingTask.promise;
console.log(`Brochure: ${pdf.numPages} pages`);
const manifest = [];

for (let number = 1; number <= pdf.numPages; number++) {
  const page = await pdf.getPage(number);
  const base = page.getViewport({ scale: 1 });
  const viewport = page.getViewport({ scale: 2200 / base.height });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  await page.render({ canvasContext: canvas.getContext("2d"), viewport }).promise;
  const buffer = canvas.toBuffer("image/png");
  const width = canvas.width;
  const height = canvas.height;
  if ([8, 17, 19, 37, 38, 39, 40, 41, 42].includes(number)) {
    await sharp(buffer).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 85 })
      .toFile(path.join(documentRoot, `brochure-page-${number}.webp`));
  }
  for (const crop of crops.get(number) ?? []) {
    const folder = crop.kind === "photo" ? "projects" : crop.kind;
    await mkdir(path.join(imageRoot, folder), { recursive: true });
    const left = Math.round(crop.x * width);
    const top = Math.round(crop.y * height);
    const cropWidth = Math.min(Math.round(crop.width * width), width - left);
    const cropHeight = Math.min(Math.round(crop.height * height), height - top);
    const image = sharp(buffer).extract({ left, top, width: cropWidth, height: cropHeight });
    let file;
    if (crop.kind === "brand") {
      file = `${crop.name}.png`;
      const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      for (let pixel = 0; pixel < data.length; pixel += 4) {
        const min = Math.min(data[pixel], data[pixel + 1], data[pixel + 2]);
        if (min > 242) data[pixel + 3] = 0;
      }
      await sharp(data, { raw: info }).png().toFile(path.join(imageRoot, folder, file));
    } else {
      file = `${crop.name}.webp`;
      await image.resize({ width: crop.kind === "team" ? 400 : 1400, withoutEnlargement: true })
        .webp({ quality: crop.kind === "clients" ? 90 : 86 })
        .toFile(path.join(imageRoot, folder, file));
    }
    manifest.push({ file: `/images/${folder}/${file}`, page: number, crop: [crop.x, crop.y, crop.width, crop.height] });
  }
  page.cleanup();
  console.log(`Processed page ${number}/${pdf.numPages}`);
}
await copyFile(path.resolve(input), path.join(documentRoot, "seajuste-brochure.pdf"));
await writeFile(path.join(imageRoot, "brochure-assets.json"), JSON.stringify(manifest, null, 2) + "\n");
const favicon = await sharp(Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#0073b5"/><path d="M13 14h38v8H21v6h30v22H13v-8h30v-6H13z" fill="white"/></svg>')).png().toBuffer();
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(1, 2);
icoHeader.writeUInt16LE(1, 4);
icoHeader[6] = 64;
icoHeader[7] = 64;
icoHeader.writeUInt16LE(1, 10);
icoHeader.writeUInt16LE(32, 12);
icoHeader.writeUInt32LE(favicon.length, 14);
icoHeader.writeUInt32LE(22, 18);
await writeFile(path.join(root, "src/app/favicon.ico"), Buffer.concat([icoHeader, favicon]));
await loadingTask.destroy();
console.log(`Extracted ${manifest.length} assets. Original brochure available for download.`);
