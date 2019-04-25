const Base = require('./base.js');
const { formatDateTime, encryption } = require('./../util/index.js');
const checkCCSU = require('./../util/checkCCSU.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.userModel = this.model('user');
    this.postModel = this.model('post');
    this.commentModel = this.model('comment');
    this.labelModel = this.model('label');
    this.informationModel = this.model('information');
  }
  // 登录
  async loginAction() {
    const data = this.post();
    let userInfo = await this.userModel
      .where({
        name: data.name,
        password: encryption(data.pass)
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
    // 然后看学号密码对应的上吗
    // const promise2 = checkCCSU({USERNAME: data.sid, PASSWORD: data.sPass});
    const promise2 = Promise.resolve();
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
    // 然后看邮箱是否存在
    const promise5 = this.userModel
      .where({
        email: data.email
      })
      .count();
    const [code, student, countSid, countName, countEmail] = await Promise.all([promise1, promise2, promise3, promise4, promise5]);
    if (code !== data.verification) {
      return this.fail(1001, '邮箱验证码错误，请输入正确的验证码');
    }
    // if (student.length !== 2 && student.length !== 3) {
    //   return this.fail(1002, '教务系统验证错误，请输入正确的学号或密码');
    // }
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
      password: encryption(data.pass),
      sid: data.sid,
      // data.sPass,
      real_name: student,
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
  // 获得用户的帖子
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
      .where({'p.user_id': userInfo.id})
      .field('p.id,l.url as label_url,l.name as type,p.name as title,p.create_at')
      .select();
    for (const item of post) {
      item.commentCount = await this.commentModel.where({'post_id': item.id}).count();
    }
    return this.success(post);
  }
  // 获得用户的回帖
  async getCommentAction() {
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    const comment = await this.commentModel
      .alias('c')
      .join({
        table: 'post',
        join: 'left',
        as: 'p',
        on: ['c.post_id', 'p.id']
      })
      .join({
        table: 'label',
        join: 'left',
        as: 'l',
        on: ['p.label_id', 'l.id']
      })
      .where({'c.user_id': userInfo.id})
      .field('c.id,l.name as type,l.url as label_url,p.name as title,c.floor,c.create_at')
      .select();
    return this.success(comment);
  }
  // 获得用户的提醒消息
  async getInformationAction() {
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    const information = await this.informationModel
      .alias('i')
      .join({
        table: 'post',
        join: 'left',
        as: 'p',
        on: ['i.post_id', 'p.id']
      })
      .join({
        table: 'label',
        join: 'left',
        as: 'l',
        on: ['p.label_id', 'l.id']
      })
      .where({'i.user_id': userInfo.id})
      .field('i.id,l.name as type,l.url as label_url,p.name as title,i.read,i.create_at,i.type as info_type,i.post_id')
      .select();
    // 获取完后把所有的消息全部变成已读
    await this.informationModel
      .where({user_id: userInfo.id})
      .update({read: 1});
    return this.success(information);
  }
  // 用户资料设置
  async settingAction() {
    let userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    const data = this.post();
    // 然后看用户名是否存在
    const countName = await this.userModel
      .where({
        name: data.name,
        id: ['!=', userInfo.id]
      })
      .count();
    if (countName !== 0) {
      return this.fail(1002, '用户名有重复，请重新输入用户名');
    }
    await this.userModel
      .where({
        id: userInfo.id
      })
      .update({
        avatar: data.avatar,
        name: data.name,
        sex: data.gender,
        birthday: data.birthday,
        reminder: data.reminder,
        phone: data.phone
      });
    // 改成新的userInfo
    userInfo = await this.userModel.where({id: userInfo.id}).find();
    // 设置session
    await this.session('userInfo', userInfo);
    // 获得数据
    const userData = await this.userModel.countUserData(userInfo.id);
    delete userInfo.password;
    userInfo = Object.assign({}, userInfo, userData);
    return this.success(userInfo);
  }
  async testAction() {
    const data = await checkCCSU({USERNAME: 'B20150304523', PASSWORD: '184011'});
    return this.success({name: data});
  }
};
