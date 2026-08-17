export type TextChunk = {
  text: string;
  start: number;
  end: number;
};

export function chunkFixed(
  text: string,
  size: number,
  overlap: number,
): TextChunk[] {
  if (!text || size <= 0) return [];
  const step = Math.max(1, size - Math.max(0, overlap));
  const chunks: TextChunk[] = [];

  for (let start = 0; start < text.length; start += step) {
    const end = Math.min(text.length, start + size);
    chunks.push({ text: text.slice(start, end), start, end });
    if (end >= text.length) break;
  }

  return chunks;
}

export function chunkSemantic(text: string): TextChunk[] {
  if (!text.trim()) return [];

  const pieces = text.split(/(\n\s*\n|(?<=[.!?])\s+)/);
  const chunks: TextChunk[] = [];
  let cursor = 0;
  let buffer = "";
  let bufferStart = 0;

  const flush = () => {
    const trimmed = buffer.trim();
    if (!trimmed) {
      buffer = "";
      return;
    }
    const start = text.indexOf(trimmed, bufferStart);
    chunks.push({
      text: trimmed,
      start: start === -1 ? bufferStart : start,
      end: (start === -1 ? bufferStart : start) + trimmed.length,
    });
    buffer = "";
  };

  for (const piece of pieces) {
    if (!buffer) bufferStart = cursor;
    buffer += piece;
    cursor += piece.length;
    if (/\n\s*\n/.test(piece) || /[.!?]\s+$/.test(buffer)) {
      flush();
    }
  }
  flush();

  return chunks.length ? chunks : [{ text, start: 0, end: text.length }];
}

export const SAMPLE_POLICY = `Acme Employee Handbook

Vacation Policy
Full-time employees accrue 1.25 vacation days per month, for a total of 15 days per year. Unused days roll over, up to a maximum of 20.

Password Reset
If you cannot log in, visit https://intranet.acme.com/reset. Security will never ask for your password over email.

Error ID-993A
The login service returns Error ID-993A when the session token expired. Fix: clear cookies, then sign in again with SSO.`;
