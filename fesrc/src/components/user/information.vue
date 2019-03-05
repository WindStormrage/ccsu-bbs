<style scoped lang="scss">
</style>
<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="commentType"
      label="消息类型"
      width="140">
    </el-table-column>
    <el-table-column
      prop="type"
      label="分类"
      width="140">
    </el-table-column>
    <el-table-column
      prop="title"
      label="帖子标题">
    </el-table-column>
    <el-table-column
      prop="create_at"
      label="时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="read"
      label="阅读状态"
      width="150">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
            {
                commentType: '有人@你',
                type: '学术交流',
                title: '这是一个帖子的标题,很长的',
                read: '已读',
                create_at: '2019-2-5 8:30:54'
            },
            {
                commentType: '有人跟帖了',
                type: '学术交流',
                title: '这是一个帖子的标题,很长的',
                read: '已读',
                create_at: '2019-2-5 8:30:54'
            },
        ]
      }
    }
  }
</script>