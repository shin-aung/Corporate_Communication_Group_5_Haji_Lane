/**
 * QRCode.tsx — Self-contained QR code generator (no external dependencies).
 *
 * Implements QR Code Model 2, version 1–10, ECC level M.
 * Encodes byte mode (UTF-8 URLs). Renders as an inline SVG.
 *
 * Based on the QR code specification (ISO/IEC 18004).
 * Adapted from the public-domain reference implementation by Project Nayuki.
 */
import React, { useMemo } from 'react';

// ─── Public API ──────────────────────────────────────────────────────────────

interface QRCodeProps {
  /** The URL or text to encode */
  value: string;
  /** Rendered size in pixels (default 160) */
  size?: number;
  /** Module (dark square) colour (default #160807) */
  fgColor?: string;
  /** Background colour (default transparent) */
  bgColor?: string;
  /** Quiet-zone modules around the symbol (default 2) */
  quietZone?: number;
}

export const QRCode: React.FC<QRCodeProps> = ({
  value,
  size = 160,
  fgColor = '#160807',
  bgColor = 'transparent',
  quietZone = 2,
}) => {
  const modules = useMemo(() => encodeQR(value), [value]);

  if (!modules) {
    return (
      <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5e8d0', borderRadius: 8, fontSize: 10, color: '#A44B2A', textAlign: 'center', padding: 8 }}>
        QR too long
      </div>
    );
  }

  const n = modules.length;
  const total = n + quietZone * 2;
  const cell = size / total;

  const rects: React.ReactNode[] = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (modules[r][c]) {
        rects.push(
          <rect
            key={`${r}-${c}`}
            x={(c + quietZone) * cell}
            y={(r + quietZone) * cell}
            width={cell}
            height={cell}
            fill={fgColor}
          />
        );
      }
    }
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="QR code"
    >
      {bgColor !== 'transparent' && (
        <rect width={size} height={size} fill={bgColor} />
      )}
      {rects}
    </svg>
  );
};

// ─── QR Encoding Engine ──────────────────────────────────────────────────────
// Returns a boolean[][] grid (true = dark module) or null if text is too long.

type Bit = 0 | 1;
type Grid = Bit[][];

function encodeQR(text: string): boolean[][] | null {
  const data = encodeUtf8(text);

  // Find the smallest version (1–10) that fits with ECC level M
  let version = -1;
  for (let v = 1; v <= 10; v++) {
    if (data.length <= dataCapacity(v)) { version = v; break; }
  }
  if (version === -1) return null;

  const bits = toBitStream(data, version);
  const codewords = toCodewords(bits, version);
  const ecCodewords = addErrorCorrection(codewords, version);
  const size = version * 4 + 17;
  const grid = buildGrid(size, version, ecCodewords);
  return grid.map(row => row.map(v => v === 1));
}

// UTF-8 encode
function encodeUtf8(s: string): number[] {
  const bytes: number[] = [];
  for (let i = 0; i < s.length; ) {
    const cp = s.codePointAt(i)!;
    if (cp < 0x80) { bytes.push(cp); i += 1; }
    else if (cp < 0x800) { bytes.push(0xC0 | cp >> 6, 0x80 | cp & 63); i += 1; }
    else if (cp < 0x10000) { bytes.push(0xE0 | cp >> 12, 0x80 | cp >> 6 & 63, 0x80 | cp & 63); i += 1; }
    else { bytes.push(0xF0 | cp >> 18, 0x80 | cp >> 12 & 63, 0x80 | cp >> 6 & 63, 0x80 | cp & 63); i += 2; }
  }
  return bytes;
}

// Data codeword capacities for ECC level M, versions 1–10
const DATA_CODEWORDS_M = [0,16,28,44,64,86,108,124,154,182,216];

function dataCapacity(v: number) { return DATA_CODEWORDS_M[v]; }

// Build the bit stream (mode=byte, char count, data, terminator, padding)
function toBitStream(data: number[], version: number): Bit[] {
  const bits: Bit[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push(((val >> i) & 1) as Bit);
  };

  pushBits(0b0100, 4); // byte mode indicator
  const ccLen = version < 10 ? 8 : 16;
  pushBits(data.length, ccLen);
  for (const byte of data) pushBits(byte, 8);

  // Terminator
  for (let i = 0; i < 4 && bits.length < dataCapacity(version) * 8; i++) bits.push(0);

  // Pad to byte boundary
  while (bits.length % 8 !== 0) bits.push(0);

  // Pad codewords
  const padBytes = [0xEC, 0x11];
  let pi = 0;
  while (bits.length < dataCapacity(version) * 8) { pushBits(padBytes[pi % 2]!, 8); pi++; }

  return bits;
}

function toCodewords(bits: Bit[], _v: number): number[] {
  const cw: number[] = [];
  for (let i = 0; i < bits.length; i += 8) {
    let b = 0;
    for (let j = 0; j < 8; j++) b = (b << 1) | (bits[i + j] ?? 0);
    cw.push(b);
  }
  return cw;
}

// ─── Reed-Solomon error correction ──────────────────────────────────────────

// Number of EC codewords per block for ECC level M, versions 1–10
const EC_CODEWORDS_PER_BLOCK_M = [0,10,16,26,18,24,16,18,22,22,26];
// Number of blocks for ECC level M, versions 1–10
const NUM_BLOCKS_M = [0,1,1,1,2,2,4,4,4,5,5];

function addErrorCorrection(data: number[], version: number): number[] {
  const ecPerBlock = EC_CODEWORDS_PER_BLOCK_M[version]!;
  const numBlocks = NUM_BLOCKS_M[version]!;
  const blockSize = Math.floor(data.length / numBlocks);
  const extraBlocks = data.length % numBlocks;

  const dataBlocks: number[][] = [];
  let idx = 0;
  for (let b = 0; b < numBlocks; b++) {
    const len = blockSize + (b < extraBlocks ? 1 : 0);
    dataBlocks.push(data.slice(idx, idx + len));
    idx += len;
  }

  const ecBlocks = dataBlocks.map(block => rsEncode(block, ecPerBlock));

  // Interleave data
  const result: number[] = [];
  const maxDataLen = Math.max(...dataBlocks.map(b => b.length));
  for (let i = 0; i < maxDataLen; i++) {
    for (const block of dataBlocks) { if (i < block.length) result.push(block[i]!); }
  }
  // Interleave EC
  for (let i = 0; i < ecPerBlock; i++) {
    for (const block of ecBlocks) { if (i < block.length) result.push(block[i]!); }
  }
  return result;
}

// GF(256) tables
const GF_EXP = new Uint8Array(512);
const GF_LOG = new Uint8Array(256);
(function initGF() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    GF_EXP[i] = x; GF_LOG[x] = i;
    x = x << 1; if (x >= 256) x ^= 0x11D;
  }
  for (let i = 255; i < 512; i++) GF_EXP[i] = GF_EXP[i - 255]!;
})();

function gfMul(a: number, b: number) {
  if (a === 0 || b === 0) return 0;
  return GF_EXP[(GF_LOG[a]! + GF_LOG[b]!)];
}

function rsEncode(data: number[], ecLen: number): number[] {
  // Build generator polynomial
  let gen = [1];
  for (let i = 0; i < ecLen; i++) {
    const root = GF_EXP[i]!;
    const next = new Array(gen.length + 1).fill(0);
    for (let j = 0; j < gen.length; j++) {
      next[j] ^= gen[j]!;
      next[j + 1] ^= gfMul(gen[j]!, root);
    }
    gen = next as number[];
  }

  const rem = new Array(ecLen).fill(0) as number[];
  for (const byte of data) {
    const factor = byte ^ rem.shift()!;
    rem.push(0);
    for (let i = 0; i < ecLen; i++) rem[i] ^= gfMul(gen[i]!, factor);
  }
  return rem;
}

// ─── Grid construction ───────────────────────────────────────────────────────

type Cell = -1 | 0 | 1; // -1 = empty

function buildGrid(size: number, version: number, codewords: number[]): Grid {
  const g: Cell[][] = Array.from({ length: size }, () => new Array(size).fill(-1));

  placeFinderPatterns(g, size);
  placeSeparators(g, size);
  placeTimingPatterns(g, size);
  placeDarkModule(g, version);
  if (version >= 2) placeAlignmentPatterns(g, version);
  reserveFormatArea(g, size);

  // Place data bits with best mask
  const dataBits = codewordsToBits(codewords);
  let bestMask = 0, bestPenalty = Infinity;
  for (let mask = 0; mask < 8; mask++) {
    const trial = g.map(r => [...r] as Cell[]);
    placeData(trial, dataBits, size);
    applyMask(trial, mask, size);
    writeFormatInfo(trial, mask, size);
    const penalty = calcPenalty(trial, size);
    if (penalty < bestPenalty) { bestPenalty = penalty; bestMask = mask; }
  }
  placeData(g, dataBits, size);
  applyMask(g, bestMask, size);
  writeFormatInfo(g, bestMask, size);
  return g as Grid;
}

function placeFinderPatterns(g: Cell[][], size: number) {
  const finder = [[1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,1,1,0,1],[1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1]];
  const pos = [[0,0],[0,size-7],[size-7,0]];
  for (const [pr,pc] of pos) {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) g[pr!+r]![pc!+c] = finder[r]![c] as Cell;
  }
}
function placeSeparators(g: Cell[][], size: number) {
  for (let i = 0; i < 8; i++) {
    g[7]![i] = 0; g[i]![7] = 0;
    g[7]![size-1-i] = 0; g[i]![size-8] = 0;
    g[size-8]![i] = 0; g[size-1-i]![7] = 0;
  }
}
function placeTimingPatterns(g: Cell[][], size: number) {
  for (let i = 8; i < size - 8; i++) {
    g[6]![i] = (i % 2 === 0 ? 1 : 0) as Cell;
    g[i]![6] = (i % 2 === 0 ? 1 : 0) as Cell;
  }
}
function placeDarkModule(g: Cell[][], version: number) { g[version * 4 + 9]![8] = 1; }

// Alignment pattern centres for versions 2–10
const ALIGNMENT_POS: Record<number, number[]> = {
  2:[6,18],3:[6,22],4:[6,26],5:[6,30],6:[6,34],
  7:[6,22,38],8:[6,24,42],9:[6,26,46],10:[6,28,50]
};
function placeAlignmentPatterns(g: Cell[][], version: number) {
  const pos = ALIGNMENT_POS[version] ?? [];
  for (const r of pos) for (const c of pos) {
    if (g[r]![c] !== -1) continue;
    for (let dr = -2; dr <= 2; dr++) for (let dc = -2; dc <= 2; dc++) {
      const v = (Math.abs(dr)===2||Math.abs(dc)===2) ? 1 : (dr===0&&dc===0) ? 1 : 0;
      g[r+dr]![c+dc] = v as Cell;
    }
  }
}
function reserveFormatArea(g: Cell[][], size: number) {
  const fmt = [0,1,2,3,4,5,7,8].concat([...Array(8)].map((_,i)=>size-1-i));
  for (const i of fmt) { if (g[8]![i] === -1) g[8]![i] = 0; if (g[i]![8] === -1) g[i]![8] = 0; }
}

function codewordsToBits(cw: number[]): Bit[] {
  const bits: Bit[] = [];
  for (const byte of cw) for (let i = 7; i >= 0; i--) bits.push(((byte >> i) & 1) as Bit);
  return bits;
}

function placeData(g: Cell[][], bits: Bit[], size: number) {
  let bi = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const r = ((right & 1) === 0) ? (size - 1 - vert) : vert;
        const c = right - j;
        if (g[r]![c] === -1) { g[r]![c] = (bi < bits.length ? bits[bi++] : 0) as Cell; }
      }
    }
  }
}

const MASK_FNS: Array<(r: number, c: number) => boolean> = [
  (r,c)=>(r+c)%2===0, (r,_c)=>r%2===0, (_r,c)=>c%3===0, (r,c)=>(r+c)%3===0,
  (r,c)=>(Math.floor(r/2)+Math.floor(c/3))%2===0, (r,c)=>r*c%2+r*c%3===0,
  (r,c)=>(r*c%2+r*c%3)%2===0, (r,c)=>(r+c)%2+r*c%3===0,
];
function applyMask(g: Cell[][], mask: number, size: number) {
  const fn = MASK_FNS[mask]!;
  for (let r = 0; r < size; r++) for (let c = 0; c < size; c++) {
    if (g[r]![c] !== -1 && fn(r,c)) g[r]![c] = (g[r]![c] === 1 ? 0 : 1) as Cell;
  }
}

// Format info strings for ECC level M (bits 14→0), XOR'd with 101010000010010
const FORMAT_INFO_M = [
  0x5412,0x5125,0x5E7C,0x5B4B,0x45F9,0x40CE,0x4F97,0x4AA0,
  0x77C4,0x72F3,0x7DAA,0x789D,0x662F,0x6318,0x6C41,0x6976,
];
function writeFormatInfo(g: Cell[][], mask: number, size: number) {
  const fmt = FORMAT_INFO_M[mask]!;
  const bits: Bit[] = [];
  for (let i = 14; i >= 0; i--) bits.push(((fmt >> i) & 1) as Bit);
  const pos = [0,1,2,3,4,5,7,8,8,8,8,8,8,7,5,4,3,2,1,0,0];
  const pos2= [8,8,8,8,8,8,8,8,7,5,4,3,2,1,0,0,0,0,0,8,8];
  for (let i = 0; i < 15; i++) {
    g[pos[i]!]![pos2[i]!] = bits[i]!;
    g[size-1-pos2[i]!]![pos[i]!] = bits[i]!;
  }
}

function calcPenalty(g: Cell[][], size: number): number {
  let p = 0;
  // Rule 1: 5+ same colour in a row/col
  for (let r = 0; r < size; r++) {
    let run = 1;
    for (let c = 1; c < size; c++) {
      if (g[r]![c] === g[r]![c-1]) { run++; if (run === 5) p += 3; else if (run > 5) p++; }
      else run = 1;
    }
  }
  for (let c = 0; c < size; c++) {
    let run = 1;
    for (let r = 1; r < size; r++) {
      if (g[r]![c] === g[r-1]![c]) { run++; if (run === 5) p += 3; else if (run > 5) p++; }
      else run = 1;
    }
  }
  // Rule 2: 2x2 blocks
  for (let r = 0; r < size-1; r++) for (let c = 0; c < size-1; c++) {
    const v = g[r]![c]; if (v===g[r]![c+1]&&v===g[r+1]![c]&&v===g[r+1]![c+1]) p += 3;
  }
  return p;
}
