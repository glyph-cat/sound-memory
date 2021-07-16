export function clamp(
  lowerLimit: number,
  upperLimit: number,
  value: number
): number {
  return Math.max(lowerLimit, Math.min(value, upperLimit))
}
