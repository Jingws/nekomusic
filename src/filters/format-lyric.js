export function splitTime (value) {
  if (value) {
    return value.match(/\[.*\]/)[0].replace(/\[|]/g,'')
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
