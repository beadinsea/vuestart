const errorTag = '[object Error]'
const domExcTag = '[object DOMException]'

function isObjectLike(value) {
  return value != null && typeof value == 'object'
}

function isError(param) {
  if (!isObjectLike(param)) {
    return false
  }
  const tag = Object.prototype.toString.call(param)
  return tag == errorTag || tag == domExcTag || (typeof param.message == 'string' && typeof param.name == 'string')
}

function toggleFullScreen() {
  let fsFunc, el
  if (isFullscreen) {
    el = document
    fsFunc = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen
  } else {
    el = document.documentElement
    fsFunc = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen
  }
  if (fsFunc) {
    fsFunc.call(el)
  } else if (window.ActiveXObject) {
    const wscript = new window.ActiveXObject('WScript.Shell')
    if (wscript) wscript.SendKeys('{F11}')
  }
}

function isFullscreen() {
  return document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
}

export { isError, toggleFullScreen }
