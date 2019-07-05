export function splitTime (value) {
  if (value) {
    let time = value.match(/\[.*\]/)[0].replace(/\[|]/g,'')
    let min = Number(time.split(':')[0] * 60)
    let sec = Number(time.split(':')[1])
    return min + sec
  } else {
    return value
  }
}

export function splitText (value) {
  if (value) {
    let reg = value.match(/\[.*\]/)[0]
    return value.replace(reg, '')
  } else {
    return value
  }
}
