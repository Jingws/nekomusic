export function formatDate(val) {
  const date = new Date(val)
  const year = date.getFullYear()
  const mounth = date.getMonth() + 1
  const day = date.getDate()
  if (new Date().getFullYear() - year > 0) {
    return year + '年' + mounth + '月' + day + '日'
  }
  return mounth + '月' + day + '日'
}