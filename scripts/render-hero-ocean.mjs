import sharp from "sharp";
import { fileURLToPath } from "node:url";

// Original, deterministic seascape: perspective waves, Fresnel reflections and a clouded sky.
// Run with: node scripts/render-hero-ocean.mjs
const width = 1600;
const height = 1280;
const horizon = height * 0.52;
const pixels = Buffer.alloc(width * height * 3);
const clamp = (value) => Math.max(0, Math.min(1, value));
const lerp = (a, b, amount) => a + (b - a) * amount;
const smoothstep = (a, b, value) => {
  const t = clamp((value - a) / (b - a));
  return t * t * (3 - 2 * t);
};

function hash(x, y) {
  let n = Math.imul(x, 374761393) + Math.imul(y, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function noise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  return lerp(lerp(hash(ix, iy), hash(ix + 1, iy), sx), lerp(hash(ix, iy + 1), hash(ix + 1, iy + 1), sx), sy);
}

function fbm(x, y, octaves = 5) {
  let value = 0;
  let amplitude = 0.5;
  for (let octave = 0; octave < octaves; octave++) {
    value += noise(x, y) * amplitude;
    x = x * 2.07 + 17.2;
    y = y * 2.01 + 6.4;
    amplitude *= 0.5;
  }
  return value;
}

const sun = [-0.45, 0.32, 0.8337];
const sky = [0, 0, 0];

function sampleSky(rx, ry, rz) {
  const elevation = clamp(ry * 1.65);
  const clouds = smoothstep(0.48, 0.78, fbm(rx * 3.5 + 8.7, ry * 7 + 2.9)) * smoothstep(0.01, 0.22, ry);
  const cloudDetail = fbm(rx * 10 + 13.5, ry * 19 + 9.4, 3);
  const glow = Math.pow(Math.max(0, rx * sun[0] + ry * sun[1] + rz * sun[2]), 48) * 24;
  const haze = Math.exp(-Math.max(ry, 0) * 14);
  const upper = [37, 89, 123];
  const lower = [151, 184, 198];
  for (let channel = 0; channel < 3; channel++) {
    const clear = lerp(lower[channel], upper[channel], Math.pow(elevation, 0.65));
    const cloud = 184 + cloudDetail * 51 + (channel === 2 ? 7 : 0);
    sky[channel] = lerp(clear, cloud, clouds * 0.78) + glow + haze * 7;
  }
}

const waves = [
  [0.23, 11.2, 0.21, 1.2],
  [0.12, 6.8, -0.6, 3.1],
  [0.068, 3.7, 1.25, 0.4],
  [0.039, 2.05, -0.36, 4.7],
  [0.021, 1.13, 0.7, 2.6],
  [0.011, 0.64, -0.9, 1.9],
  [0.006, 0.36, 1.51, 0.8],
  [0.0035, 0.19, -0.12, 3.8],
  [0.0018, 0.095, 0.91, 2.3],
].map(([amplitude, wavelength, angle, phase]) => ({
  amplitude,
  kx: Math.sin(angle) * Math.PI * 2 / wavelength,
  kz: Math.cos(angle) * Math.PI * 2 / wavelength,
  frequency: Math.PI * 2 / wavelength,
  phase,
}));

function surfaceHeight(x, z) {
  let value = 0;
  for (const wave of waves) value += wave.amplitude * Math.sin(x * wave.kx + z * wave.kz + wave.phase);
  return value;
}

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let rx = (x / width - 0.5) * 1.32;
    let ry = (horizon - y) / height;
    let rz = 1;
    const rayLength = Math.hypot(rx, ry, rz);
    rx /= rayLength;
    ry /= rayLength;
    rz /= rayLength;
    let red, green, blue;

    if (y < horizon) {
      sampleSky(rx, ry, rz);
      [red, green, blue] = sky;
    } else {
      let distance = Math.min(9000, 3.8 / Math.max(-ry, 0.0001));
      for (let iteration = 0; iteration < 2 && distance < 350; iteration++) {
        const level = surfaceHeight(rx * distance, rz * distance);
        distance = Math.min(9000, (3.8 - level) / Math.max(-ry, 0.0001));
      }
      const wx = rx * distance;
      const wz = rz * distance;
      let nx = 0;
      let nz = 0;
      let crest = 0;
      for (const wave of waves) {
        const phase = wx * wave.kx + wz * wave.kz + wave.phase;
        // Suppress sub-pixel waves near the horizon rather than aliasing them.
        const attenuation = Math.exp(-Math.pow(distance * wave.frequency / width, 2) * 0.45);
        const slope = wave.amplitude * Math.cos(phase) * attenuation;
        nx -= slope * wave.kx;
        nz -= slope * wave.kz;
        crest += wave.amplitude * Math.sin(phase) * attenuation;
      }
      const normalLength = Math.hypot(nx, 1, nz);
      nx /= normalLength;
      const ny = 1 / normalLength;
      nz /= normalLength;
      const incident = rx * nx + ry * ny + rz * nz;
      const reflectedX = rx - 2 * incident * nx;
      const reflectedY = Math.max(0.002, ry - 2 * incident * ny);
      const reflectedZ = rz - 2 * incident * nz;
      sampleSky(reflectedX, reflectedY, reflectedZ);
      const fresnel = 0.025 + 0.975 * Math.pow(1 - clamp(-incident), 5);
      const illumination = 0.65 + Math.max(0, nx * sun[0] + ny * sun[1] + nz * sun[2]) * 0.35;
      const specular = Math.pow(Math.max(0, reflectedX * sun[0] + reflectedY * sun[1] + reflectedZ * sun[2]), 180) * 68;
      const fog = 1 - Math.exp(-distance / 1200);
      const depth = smoothstep(-0.26, 0.32, crest);
      red = lerp((8 + depth * 6) * illumination, sky[0] * 0.79, fresnel) + specular;
      green = lerp((66 + depth * 18) * illumination, sky[1] * 0.86, fresnel) + specular;
      blue = lerp((91 + depth * 20) * illumination, sky[2] * 0.91, fresnel) + specular;
      red = lerp(red, 139, fog);
      green = lerp(green, 172, fog);
      blue = lerp(blue, 186, fog);
    }

    const grain = (hash(x + 413, y + 171) - 0.5) * 1.3;
    const offset = (y * width + x) * 3;
    pixels[offset] = Math.max(0, Math.min(255, red + grain));
    pixels[offset + 1] = Math.max(0, Math.min(255, green + grain));
    pixels[offset + 2] = Math.max(0, Math.min(255, blue + grain));
  }
}

const output = fileURLToPath(new URL("../public/images/brand/turbine-ocean.webp", import.meta.url));
const result = await sharp(pixels, { raw: { width, height, channels: 3 } }).blur(0.4).webp({ quality: 88, effort: 6 }).toFile(output);
console.log(`Original ocean rendered: ${width} × ${height} · ${Math.round(result.size / 1024)} KB · ${output}`);
