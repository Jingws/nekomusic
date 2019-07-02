export function formatTime (value) {
  let sec = parseInt(value)
  let min = 0
  let hour = 0
  if (sec > 60) {
    min = parseInt(sec / 60)
    sec = parseInt(sec % 60)
    if (min > 60) {
      hour = parseInt(min / 60)
      min = parseInt(min % 60)
    }
  }
  if (sec <= 9) {
    sec = '0' + sec
  }
  if (min <= 9) {
    min = '0' + min
  }
  if (hour <= 9) {
    hour = '0' + hour
  }
  let res
  if (hour <= 0) {
    res = min + ':' + sec
  } else {
    res = hour + ':' + min + ':' + sec
  }
  return res
}
