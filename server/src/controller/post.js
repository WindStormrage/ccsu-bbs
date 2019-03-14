const Base = require('./base.js');
const { formatDateTime } = require('./../util/index.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.labelModel = this.model('label');
    this.postModel = this.model('post');
    this.commentModel = this.model('comment');
  }
  // 分页,精华的筛选
  async getAction() {
    const id = this.get('id');
    const page = this.get('page');
    const pagesize = this.get('pagesize');

    // 先通过post的id找到所属label的名字
    const promise0 = await this.labelModel
      .alias('l')
      .join({
        table: 'post',
        as: 'p',
        join: 'left',
        on: ['l.id', 'p.label_id']
      })
      .where({
        'p.id': id
      })
      .field('l.name,p.name as title')
      .find();
    // 分页找出所有的当前帖子的评论
    const promise1 = this.commentModel
      .alias('c')
      .join({
        table: 'user', // 获得评论人的用户名
        join: 'left',
        as: 'u',
        on: ['c.user_id', 'u.id']
      })
      .join({
        table: 'comment', // 获得评论的引用评论的数据
        join: 'left',
        as: 'c2',
        on: ['c.quote_id', 'c2.id']
      })
      .join({
        table: 'user', // 获得评论的引用评论的用户信息
        join: 'left',
        as: 'u2',
        on: ['c2.user_id', 'u2.id']
      })
      .where({
        'c.post_id': id,
        'c.status': 1
      })
      .field([
        'c.id',
        'c.content',
        'c.user_id',
        'c.anonymous',
        'c.floor',
        'c.create_at',
        'c.quote_id',
        'u.name as actor',
        'u.avatar as actorAvatar',
        'c2.content as quoteContent',
        'c2.floor as quoteFloor',
        'c2.anonymous as quoteAnonymous',
        'c2.status as quoteStatus',
        'u2.name as quoteName'
      ].join(','))
      .page(page, pagesize)
      .countSelect();
    const [
      label,
      comments
    ] = await Promise.all([promise0, promise1]);
    // 循环来找到每个回帖人的帖子数和回帖数
    for (const comment of comments.data) {
      const promise1 = this.postModel
        .where({ user_id: comment.user_id })
        .count();
      const promise2 = this.commentModel
        .where({ user_id: comment.user_id })
        .count();
      const [postCount, commentCount] = await Promise.all([promise1, promise2]);
      comment.postCount = postCount;
      comment.commentCount = commentCount;
    }
    // 如果当前页是第一页的话,就给最前面加上一个楼主的内容
    if (comments.currentPage === 1) {
      const landlord = await this.postModel
        .alias('p')
        .join({
          table: 'user', // 获得评论人的用户名
          join: 'left',
          as: 'u',
          on: ['p.user_id', 'u.id']
        })
        .field([
          // 'c.id', 楼主没有回帖所有不需要有id,或者是id为0
          'p.content',
          'p.user_id',
          'p.anonymous',
          // 'p.floor', 楼主的楼层号是1楼
          'p.create_at',
          // 'p.quote_id', 楼主没有跟帖
          'u.name as actor',
          'u.avatar as actorAvatar'
        ].join(','))
        .where({
          'p.id': id
        })
        .find();
      const promise1 = this.postModel
        .where({ user_id: landlord.user_id })
        .count();
      const promise2 = this.commentModel
        .where({ user_id: landlord.user_id })
        .count();
      const [postCount, commentCount] = await Promise.all([promise1, promise2]);
      landlord.postCount = postCount;
      landlord.commentCount = commentCount;
      landlord.id = 0;
      landlord.floor = '主楼';
      landlord.quote_id = 0;
      comments.data.unshift(landlord);
    }
    return this.success({label, comments});
  }
  // 发表评论
  async newCommentAction() {
    const postId = this.post('post_id');
    const content = this.post('content');
    const quote = this.post('quote');
    const anonymous = this.post('anonymous');
    // 查一下现在总共有几楼了,用来看现在是几楼
    const promise1 = this.commentModel
      .where({ post_id: postId })
      .count();
    const promise2 = this.session('userInfo');
    const [commentCount, userInfo] = await Promise.all([promise1, promise2]);
    if (think.isEmpty(userInfo)) {
      return this.fail(1001, '用户未登录,请登录后重试');
    }
    const date = formatDateTime(new Date());
    const id = await this.commentModel
      .add({
        content,
        post_id: postId,
        user_id: userInfo.id,
        quote_id: quote,
        status: 1,
        anonymous: anonymous ? 1 : 0,
        floor: `${commentCount + 2}楼`,
        create_at: date
      });
    return this.success({id});
  }
};
