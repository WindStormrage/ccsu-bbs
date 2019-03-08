const Base = require('./base');
const fs = require('fs');
const path = require('path');
const rename = think.promisify(fs.rename, fs); // 通过 promisify 方法把 rename 方法包装成 Promise 接口

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.emailConfModel = this.model('email_conf');
  }
  /**
   * 上传图片
   */
  async uploadImageAction() {
    const file = await this.file('file');
    const user = await this.post('user');
    const time = new Date().getTime();
    // 所有格式都可以上传，则移动到其他目录
    if (file && file.type.split('/')[0] === 'image') {
      const filepath = path.join(think.ROOT_PATH, `runtime/upload/image/${time}${file.name}`);
      think.mkdir(path.dirname(filepath));
      await rename(file.path, filepath);
      return this.success({
        filepath: `${this.ctx.origin}/upload/image/${time}${file.name}`,
        user
      });
    }
    return this.fail(1000, '上传失败!');
  }
  /**
   * 发送邮件
   */
  async sendMailAction() {
    const emailTo = this.post('emailTo');
    const title = this.post('title');
    let html = this.post('html');
    const type = this.post('type'); // type为1的时候就是发送验证码
    if (Number(type) === 1) {
      const code = new Date().getTime() % 1000000;
      await this.cache(emailTo, code, {
        timeout: 5 * 60 * 1000
      });
      html = html.replace('<VerificationCode>', code);
    }
    const data = await this.emailConfModel.sendMail({emailTo, title, html});
    return this.success(data);
  }
};
