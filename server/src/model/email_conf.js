const nodemailer = require('nodemailer');
module.exports = class extends think.Model {
  async sendMail({
    html = '默认',
    title = '默认',
    emailTo = '695729033@qq.com'
  } = {}) {
    const msg = await this.find();
    // exchange server connection info
    const config = {
      username: msg.email,
      name: msg.email,
      password: msg.password,
      host: msg.host,
      emailTo,
      title,
      html
    };
    const params = {
      host: config.host, // 设置服务
      secureConnection: true, // use SSL
      port: 465, // 端口
      sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
      auth: {
        user: config.name, // 可以是邮箱也可以是用户名
        pass: config.password
      }
    };
    // 邮件信息
    const mailOptions = {
      from: config.username, // 发送邮箱
      to: config.emailTo, // 接受邮箱
      subject: config.title, // 标题
      html: config.html // 内容
    };
    // 发送邮件
    const transporter = nodemailer.createTransport(params);
    await sendMsg(transporter, mailOptions);
    return {msg: 'success'};
  }
};

// 发送邮件的递归方法,一直到成功为止
function sendMsg(transporter, mailOptions) {
  return new Promise(resolve => {
    const send = new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          // console.debug('error');
          reject(error);
        } else {
          // console.debug('success');
          resolve();
        }
      });
    });
    send
      .then(() => {
        resolve();
      })
      .catch((e) => {
        // console.debug(e);
        sendMsg(transporter, mailOptions);
      });
  });
};
