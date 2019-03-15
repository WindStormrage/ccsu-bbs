const Base = require('./base.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.userModel = this.model('user');
    this.permissionModel = this.model('permission');
    this.userPermissionModel = this.model('user_permission');
  }
  // 判断是否管理员
  async isAdminAction() {
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    const count = await this.userPermissionModel.where({user_id: userInfo.id}).count();
    if (count > 0) {
      return this.success({isAdmin: true});
    }
    return this.success({isAdmin: false});
  }
  // 获得admin菜单
  async getMenuAction() {
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    const permissions = await this.userPermissionModel
      .alias('up')
      .join({
        table: 'permission',
        as: 'p',
        join: 'left',
        on: ['up.permission_id', 'p.id']
      })
      .where({
        'up.user_id': userInfo.id
      })
      .field('p.url,p.name')
      .select();
    return this.success(permissions);
  }
  // 获得用户列表
  async userGetAction() {
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    // 查看是否拥有用户的权限
    const hadPermission = await this.userPermissionModel
      .alias('up')
      .join({
        table: 'permission',
        as: 'p',
        join: 'left',
        on: ['up.permission_id', 'p.id']
      })
      .where({
        'up.user_id': userInfo.id,
        'p.url': 'user'
      })
      .count();
    if (hadPermission === 0) {
      return this.fail(1002, '用户异常操作,没有权限');
    }
    const users = await this.userModel
      .field('id,sid,name,sex,email,phone,birthday,status,create_at,last_login_at')
      .select();
    return this.success(users);
  }
  async userPutAction() {
    const userInfo = await this.session('userInfo');
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    // 查看是否拥有用户的权限
    const hadPermission = await this.userPermissionModel
      .alias('up')
      .join({
        table: 'permission',
        as: 'p',
        join: 'left',
        on: ['up.permission_id', 'p.id']
      })
      .where({
        'up.user_id': userInfo.id,
        'p.url': 'user'
      })
      .count();
    if (hadPermission === 0) {
      return this.fail(1002, '用户异常操作,没有权限');
    }
    const status = this.get('status');
    const id = this.get('id');
    await this.userModel
      .where({id})
      .update({status});
    return this.success();
  }
};
