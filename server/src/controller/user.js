const Base = require('./base.js');
const { formatDateTime } = require('./../util/index.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.userModel = this.model('user');
    this.postModel = this.model('post');
    this.commentModel = this.model('comment');
    this.labelModel = this.model('label');
  }
  // 登录
  async loginAction() {
    const data = this.post();
    let userInfo = await this.userModel
      .where({
        name: data.name,
        password: data.pass
      })
      .find();
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '账号或密码错误!');
    }
    // 登录后修改用户最后登录时间
    const date = formatDateTime(new Date());
    await this.userModel
      .where({
        id: userInfo.id
      })
      .update({
        last_login_at: date
      });
    // 设置session
    await this.session('userInfo', userInfo);
    // 获得数据
    const userData = await this.userModel.countUserData(userInfo.id);
    delete userInfo.password;
    userInfo.last_login_at = date;
    userInfo = Object.assign({}, userInfo, userData);
    return this.success(userInfo);
  }
  // 注册
  async registerAction() {
    const data = this.post();
    // 先看邮件验证码对不对
    const promise1 = this.cache(data.email);
    // 然后看学号密码对应的上吗(暂时不做验证)
    const promise2 = Promise.resolve(true);
    // 然后看学号是否注册过了
    const promise3 = this.userModel
      .where({
        sid: data.sid
      })
      .count();
    // 然后看用户名是否存在
    const promise4 = this.userModel
      .where({
        name: data.name
      })
      .count();
    // 然后看用户名是否存在
    const promise5 = this.userModel
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
    let userInfo = await this.userModel.where({id}).find();
    await this.session('userInfo', userInfo);
    const userData = await this.userModel.countUserData(userInfo.id);
    delete userInfo.password;
    userInfo = Object.assign({}, userInfo, userData);
    return this.success(userInfo);
  }
  // 退出登录
  async signOutAction() {
    await this.session(null);
    return this.success('ok');
  }
  // 获得用户信息
  async getPostAction() {
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    const post = await this.postModel
      .alias('p')
      .join({
        table: 'label',
        join: 'left',
        as: 'l',
        on: ['p.label_id', 'l.id']
      })
      .field('p.id,l.url as label_url,l.name as type,p.name as title,p.create_at')
      .select();
    for (const item of post) {
      item.commentCount = await this.commentModel.where({'post_id': item.id}).count();
    }
    return this.success(post);
  }
};
