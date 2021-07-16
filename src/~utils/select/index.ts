export function selectObj(
  originalObj: Record<string, unknown>,
  keyStack: Array<string>
): Record<string, unknown> {
  const newObj = {}
  for (const key of keyStack) {
    newObj[key] = originalObj[key]
  }
  return newObj
}
