const Base = require('./base.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.labelModel = this.model('label');
    this.postModel = this.model('post');
    this.commentModel = this.model('comment');
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
      .field('p.id,p.name as title,p.create_at,u.name as actor,u.avatar as actorAvatar')
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
        .field('u.name,c.create_at')
        .order('c.create_at DESC')
        .limit(1)
        .find();
      const [comment, lastComment] = await Promise.all([promise1, promise2]);
      item.comment = comment;
      item.commentName = lastComment.name;
      item.update_at = lastComment.create_at;
    }
    return this.success({post, postCount, commentCount, listName: label.name});
  }
};