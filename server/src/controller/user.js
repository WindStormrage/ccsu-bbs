const Base = require('./base.js');
const { formatDateTime } = require('./../util/index.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.userModel = this.model('user');
  }
  async loginAction() {
    const data = this.post();
    const userInfo = await this.userModel
      .where({
        name: data.name,
        password: data.pass
      })
      .find();
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '账号或密码错误!');
    }
    await this.session('userInfo', userInfo);
    return this.success(userInfo);
  }
  async registerAction() {
    const data = this.post();
    // 先看邮件验证码对不对
    const promise1 = await this.cache(data.email);
    // 然后看学号密码对应的上吗(暂时不做验证)
    const promise2 = await Promise.resolve(true);
    // 然后看学号是否注册过了
    const promise3 = await this.userModel
      .where({
        sid: data.sid
      })
      .count();
    // 然后看用户名是否存在
    const promise4 = await this.userModel
      .where({
        name: data.name
      })
      .count();
    // 然后看用户名是否存在
    const promise5 = await this.userModel
      .where({
        email: data.email
      })
      .count();
    const [code, isStudent, countSid, countName, countEmail] = await Promise.all([promise1, promise2, promise3, promise4, promise5]);
    if (code !== data.verification) {
      return this.fail(1001, '邮箱验证码错误，请输入正确的验证码');
    }
    if (!isStudent) {
      return this.fail(1002, '教务系统验证错误，请输入正确的学号或密码');
    }
    if (countSid !== 0) {
      return this.fail(1003, '学号有重复，此学号已经注册过用户');
    }
    if (countName !== 0) {
      return this.fail(1004, '用户名有重复，请重新输入用户名');
    }
    if (countEmail !== 0) {
      return this.fail(1005, '邮箱有重复，请重新输入邮箱');
    }
    const date = formatDateTime(new Date());
    // 入库
    const id = await this.userModel.add({
      avatar: 'http://123.207.39.128:8080/upload/file/ca37bac437e20a6d71d3fdc51e5c00fa',
      uid: new Date().getTime(),
      name: data.name,
      password: data.pass,
      sid: data.sid,
      // data.sPass,
      email: data.email,
      create_at: date,
      last_login_at: date
    });
    // 注册成功就设置session
    const userInfo = await this.userModel.where({id}).find();
    await this.session('userInfo', userInfo);
    return this.success(userInfo);
  }
};
