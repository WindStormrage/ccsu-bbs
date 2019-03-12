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
};
