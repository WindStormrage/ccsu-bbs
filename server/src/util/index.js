var crypto = require('crypto');

function random(sum) {
  let random = '';
  for (let index = 0; index < sum; index++) {
    random += parseInt(Math.random() * 10).toString();
  }
  return random;
}

function formatDateTime(inputTime) {
  const date = new Date(inputTime);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  let d = date.getDate();
  d = d < 10 ? '0' + d : d;
  let h = date.getHours();
  h = h < 10 ? '0' + h : h;
  let minute = date.getMinutes();
  let second = date.getSeconds();
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

function encryption(content) {
  var md5 = crypto.createHash('md5'); // 定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  md5.update(content);
  var d = md5.digest('hex'); // 加密后的值d
  return d;
}

module.exports = {
  random,
  formatDateTime,
  encryption
};
