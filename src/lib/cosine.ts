export function cosineSimilarity(
  ax: number,
  ay: number,
  bx: number,
  by: number,
) {
  const dot = ax * bx + ay * by;
  const magA = Math.hypot(ax, ay);
  const magB = Math.hypot(bx, by);
  if (magA === 0 || magB === 0) return 0;
  return dot / (magA * magB);
}

export function angleDegrees(similarity: number) {
  const clamped = Math.min(1, Math.max(-1, similarity));
  return (Math.acos(clamped) * 180) / Math.PI;
}
