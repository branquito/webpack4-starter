export function normalize(value) {
  return isNaN(value) ? value : value.trim() !== '' ? Number.parseFloat(value) : value
}
