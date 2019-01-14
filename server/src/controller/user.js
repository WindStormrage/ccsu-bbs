const Base = require('./base.js');

module.exports = class extends Base {
  loginAction() {
    return this.success({name: 'ok'});
  }
};
