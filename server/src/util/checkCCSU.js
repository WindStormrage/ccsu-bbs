const http = require('http');
const querystring = require('querystring');
const cheerio = require('cheerio');

module.exports = function({USERNAME = '', PASSWORD = ''}) {
  const pathLogin = '/jwxt/Logon.do?method=logon';
  const pathIndex = '/jwxt/framework/main.jsp';
  const hostname = 'jwcxxcx.ccsu.cn';
  const headers = {
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
    'Accept-Encoding': 'gzip, deflate',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
    'Content-Length': 59,
    'Content-Type': 'application/x-www-form-urlencoded',
    Host: 'jwcxxcx.ccsu.cn',
    Origin: 'http://jwcxxcx.ccsu.cn',
    Referer: 'http://jwcxxcx.ccsu.cn/jwxt/Logon.do?method=logon',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'
  };
  const options = {
    hostname: hostname,
    port: 80,
    path: pathLogin,
    method: 'POST',
    headers: headers
  };
  function handle(data) {
    const $ = cheerio.load(data);
    const name = $.root().find('title').text().split('[')[0];
    return name;
  }
  const postData = querystring.stringify({
    USERNAME,
    useDogCode: '',
    PASSWORD,
    x: '31',
    y: '20'
  });
  return new Promise((resolve, reject) => {
    const req = http.request(options, function(res) {
      res.setEncoding('utf8');
      // 获得cookie
      const cookie = res.headers['set-cookie'];
      let SSIONID = '';
      if (cookie) {
        SSIONID = cookie
          .join(',')
          .match(/(JSESSIONID=.+?);/)[1];
        // 修改cookie和path
        options.path = pathIndex;
        options.headers.Cookie = SSIONID;
        // 获得页面信息
        http
          .get(options, function(res) {
            let html = '';
            res.on('data', function(data) {
              html += data;
            });
            res.on('end', function() {
              const name = handle(html);
              resolve(name);
            });
          })
          .on('error', function(e) {
            reject(e);
          });
      } else {
        reject(SSIONID);
      }
      res.on('error', function(e) {
        reject(e);
      });
    });
    req.write(postData);
    req.end();
  });
};
