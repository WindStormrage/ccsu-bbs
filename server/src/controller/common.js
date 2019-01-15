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
    const name = new Date().getTime();
    // 如果上传的是 png 格式的图片文件，则移动到其他目录
    if (file && file.type === 'image/png') {
      const filepath = path.join(think.ROOT_PATH, `runtime/upload/image/${name}.png`);
      think.mkdir(path.dirname(filepath));
      await rename(file.path, filepath);
      return this.success({
        filepath: `${this.ctx.origin}/upload/image/${name}.png`,
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
    const html = this.post('html');
    const data = await this.emailConfModel.sendMail({emailTo, title, html});
    return this.success(data);
  }
};
