export function addUnit(val) {
  if (val.length <= 3) {
    return val
  } else {
    return parseInt(val / 10000) + '万'
  }
}