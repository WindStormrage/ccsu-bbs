const { formatDateTime } = require('./../util/index.js');
module.exports = class extends think.Model {
  async countUserData(id) {
    return {
      countPost: await this.model('post')
        .where({
          user_id: id,
          status: ['!=', 4]
        })
        .count(),
      countComment: await this.model('comment')
        .where({
          user_id: id,
          status: 1
        })
        .count()
    };
  }
  /**
   * 用户的事件提醒的接口
   */
  async sendUserMessage(id, type, postId) {
    // 先判断用户是否存在
    const user = await this.where({id}).find();
    if (think.isEmpty(user)) {
      return null;
    }
    // 然后给对方的消息提醒里面记录提醒
    await this.model('information')
      .add({
        user_id: id,
        type,
        read: 0,
        post_id: postId,
        create_at: formatDateTime(new Date())
      });
    // 然后判断用户是否勾选邮箱提醒,不提醒只要在消息记录里面记录下就好了
    if (user.reminder === 0) {
      return null;
    }
    // 然后给对方发送邮件
    const emailTo = user.email;
    let text = '';
    switch (type) {
      case 1:
        text = '有人@你了';
        break;
      case 2:
        text = '有人回复你了';
        break;
      case 3:
        text = '你的帖子有人跟帖了';
        break;
    }
    const title = `[来自长沙学院论坛的提醒]${text}`;
    const html = '[来自长沙学院论坛的提醒]您有一条新消息,请去[论坛]的[个人中心]的[我的消息]中查看';
    await this.model('email_conf').sendMail({emailTo, title, html});
  }
};
