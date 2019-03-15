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
  // 用户管理的put操作
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
  // 获得权限列表
  async permissionGetAction() {
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
        'p.url': 'permission'
      })
      .count();
    if (hadPermission === 0) {
      return this.fail(1002, '用户异常操作,没有权限');
    }
    // 先获得所有的权限
    const permissions = await this.permissionModel.select();
    // 然后循环找出每个权限拥有的人
    for (const permission of permissions) {
      const users = await this.userPermissionModel
        .alias('up')
        .join({
          table: 'user',
          as: 'u',
          join: 'left',
          on: ['up.user_id', 'u.id']
        })
        .where({'up.permission_id': permission.id})
        .field('u.name')
        .select();
      permission.users = users.map(item => item.name);
    }
    return this.success(permissions);
  }
  // 修改用户的权限接口
  async permissionPutAction() {
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
        'p.url': 'permission'
      })
      .count();
    if (hadPermission === 0) {
      return this.fail(1002, '用户异常操作,没有权限');
    }
    const operation = this.post('operation');
    const name = this.post('name');
    const permissionId = this.post('permission_id');
    const promise1 = this.userModel.where({name}).find();
    const promise2 = this.permissionModel.where({id: permissionId}).find();
    const [user, permission] = await Promise.all([promise1, promise2]);
    if (think.isEmpty(user)) {
      return this.fail(1001, '不存在此用户,请重新输入用户名');
    }
    if (think.isEmpty(permission)) {
      return this.fail(1002, '不存在此权限');
    }
    if (operation === 'add') {
      const countPermission = await this.userPermissionModel
        .where({
          user_id: user.id,
          permission_id: permissionId
        })
        .count();
      if (countPermission > 0) {
        return this.fail(1003, '用户已经拥有此权限,无需重复添加');
      }
      await this.userPermissionModel.add({
        permission_id: permissionId,
        user_id: user.id
      });
      return this.success('添加成功');
    } else if (operation === 'del') {
      await this.userPermissionModel
        .where({
          permission_id: permissionId,
          user_id: user.id
        })
        .delete();
      return this.success('删除成功');
    }
  }
};
