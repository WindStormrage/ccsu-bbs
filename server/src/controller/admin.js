const Base = require('./base.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.permissionModel = this.model('permission');
    this.userPermissionModel = this.model('user_permission');
  }
  async isAdminAction() {
    // 通过url获得label_id
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
};
