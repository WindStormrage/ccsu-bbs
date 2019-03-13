const Base = require('./base.js');

module.exports = class extends Base {
  constructor(...args) {
    super(...args);
    this.labelModel = this.model('label');
    this.postModel = this.model('post');
    this.commentModel = this.model('comment');
  }
  async getAction() {
    const labels = await this.labelModel.select();
    for (const label of labels) {
      const pormise1 = this.labelModel
        .alias('l')
        .join({
          table: 'post',
          as: 'p',
          join: 'right',
          on: ['l.id', 'p.label_id']
        })
        .where({
          'l.id': label.id
        })
        .field('p.id, p.name')
        .order('p.create_at DESC')
        .limit(4)
        .select();
      const pormise2 = this.postModel
        .where({label_id: label.id})
        .count();
      const pormise3 = this.commentModel
        .alias('c')
        .join({
          table: 'post',
          as: 'p',
          join: 'left',
          on: ['c.post_id', 'p.id']
        })
        .where({'p.label_id': label.id})
        .count();
      [label.posts, label.postCount, label.participationCount] = await Promise.all([pormise1, pormise2, pormise3]);
    }
    return this.success(labels);
  }
};
