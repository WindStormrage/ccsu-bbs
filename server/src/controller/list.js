const Base = require('./base.js');
const { formatDateTime } = require('./../util/index.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.labelModel = this.model('label');
    this.postModel = this.model('post');
    this.commentModel = this.model('comment');
    this.userModel = this.model('user');
  }
  // 分页,精华的筛选
  async getAction() {
    const url = this.get('url');
    const page = this.get('page');
    const pagesize = this.get('pagesize');
    let status = this.get('status');
    // 如果要找状态为1的话就相当于找不是被删除的
    if (Number(status) === 0) {
      status = ['!=', 4];
    }
    const label = await this.labelModel
      .where({
        url
      })
      .find();
    // 分页找出所有的帖子
    const promise1 = this.postModel
      .alias('p')
      .join({
        table: 'user',
        join: 'left',
        as: 'u',
        on: ['p.user_id', 'u.id']
      })
      .where({
        'p.label_id': label.id,
        'p.status': status
      })
      .field('p.id,p.name as title,p.create_at,u.name as actor,u.avatar as actorAvatar,p.anonymous')
      .order('p.create_at DESC')
      .page(page, pagesize)
      .countSelect();
    const promise2 = this.postModel.where({ label_id: label.id }).count();
    const promise3 = this.commentModel
      .alias('c')
      .join({
        table: 'post',
        as: 'p',
        join: 'left',
        on: ['c.post_id', 'p.id']
      })
      .where({ 'p.label_id': label.id })
      .count();
    const [
      post,
      postCount,
      commentCount
    ] = await Promise.all([promise1, promise2, promise3]);
    // 循环来找到每个帖子的回复人数和最后发辫人
    for (const item of post.data) {
      const promise1 = this.commentModel
        .where({ post_id: item.id })
        .count();
      const promise2 = this.commentModel
        .alias('c')
        .join({
          table: 'user',
          join: 'left',
          as: 'u',
          on: ['c.user_id', 'u.id']
        })
        .where({ 'c.post_id': item.id })
        .field('u.name,c.create_at,c.anonymous')
        .order('c.create_at DESC')
        .limit(1)
        .find();
      const [comment, lastComment] = await Promise.all([promise1, promise2]);
      item.comment = comment;
      item.commentName = lastComment.anonymous ? '匿名' : lastComment.name;
      item.update_at = lastComment.create_at;
    }
    return this.success({post, postCount, commentCount, listName: label.name});
  }
  // 发表帖子
  async newPostAction() {
    const url = this.post('url');
    const content = this.post('content');
    const title = this.post('title');
    const anonymous = this.post('anonymous');
    // 通过url获得label_id
    const promise1 = this.labelModel.where({url}).find();
    const promise2 = this.session('userInfo');
    const [label, userInfo] = await Promise.all([promise1, promise2]);
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    if (userInfo.status === 2) {
      return this.fail(1002, '用户被关小黑屋,禁止发言,如需释放请联系管理员');
    }
    const date = formatDateTime(new Date());
    const id = await this.postModel
      .add({
        name: title,
        content,
        label_id: label.id,
        user_id: userInfo.id,
        status: 1,
        anonymous: anonymous ? 1 : 0,
        create_at: date,
        update_at: date
      });
    // 在这里添加@提醒
    const match = content.match(/&lt;@.*?&gt;/g);
    let userList = [];
    if (match !== null) {
      userList = match.map(item => item.substring(5, item.length - 4));
    }
    for (const user of userList) {
      const userId = await this.userModel.where({name: user}).field('id').find();
      if (!think.isEmpty(userId)) {
        this.userModel.sendUserMessage(userId.id, 1, id);
      }
    }
    return this.success({id});
  }
};
