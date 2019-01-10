/*
 * ---------------- 类型判断 -----------------------
 */
// 判断是否是对象
export function isObject(obj) {
  // incase of arrow function and array
  return Object(obj) === obj && typeof obj !== 'function' && !Array.isArray(obj)
}

// 判断是否为空
// '', {}, [], 0, null, undefined, false
export function isEmpty(obj) {
  if (Array.isArray(obj)) {
    return obj.length === 0
  } else if (isObject(obj)) {
    return Object.keys(obj).length === 0
  } else {
    return !obj
  }
}
// 通过提供方法，支持检查除了navigator.userAgent以外的ua
export function isMobile() {
  return (navigator.userAgent.indexOf('iPhone') !== -1 ||
  navigator.userAgent.indexOf('Android') !== -1)
}


/*
 * ---------------- 格式转换 -----------------------
 */

export function  underline2camel(underlineCaseString) {
  return underlineCaseString
    .split('_')
    .map((letter, index) => {
      if(index === 0) return letter
      const firstLetter = letter.slice(0, 1).toUpperCase()
      return letter.replace(/^\w{1}/, firstLetter)
    })
    .join('')
}


