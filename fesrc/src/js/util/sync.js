// import jQuery from 'jquery'
// window.jQuery = window.jQuery || jQuery
// window.$ = window.$ || jQuery

import {fetch} from 'whatwg-fetch'

export default class Sycn {
  constructor() {
    this.protocol = location.protocol
    this.host = location.host
    this.prefix = `${this.protocol}//${this.host}`
  }
  GET(path, param = {}) {
    //拼接参数
    if (param) {
      let paramsArray = [];
      Object.keys(param).forEach(key => paramsArray.push(key + '=' + param[key]))
      if (path.search(/\?/) === -1) {
        path += '?' + paramsArray.join('&')
      } else {
        path += '&' + paramsArray.join('&')
      }
    }
    // const url = 'http://www.xiedashuaige.cn:3000/article?id=1';
    const url = this.prefix + path;
    return fetch(url, {
      method: 'GET',
      credentials: 'include' // 强制加入凭据头
    })
      .then((response) => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('出现了网络问题!');
      })
  }
  POST(path, param = {}) {
    const url = this.prefix + path;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(param),
      credentials: 'include' // 强制加入凭据头
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('出现了网络问题!');
      })
  }
  UPLOAD(path, file, filename = 'file', param = {}) {
    var data = new FormData()
    data.append(filename, file)
    if (Object.keys(param).length > 0) {
      Object.keys(param).forEach(key => {
        data.append(key, param[key])
      })
    }
    return fetch(path, {
      method: 'POST',
      body: data
    })
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        throw new Error('出现了网络问题!');
      })
  }
}