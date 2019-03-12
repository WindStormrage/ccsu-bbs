module.exports = class extends think.Controller {
  __before() {
    // 如果是需要登录才可以看见的请求,如果没有userInfo的话就请求失败,返回重新登录
    // 暂时在每个需要登录才可以看见的请求的时候加上这个判断
  }
};
