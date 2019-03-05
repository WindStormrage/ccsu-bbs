<style scoped lang="scss">
</style>
<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
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
      prop="floor"
      label="楼层数"
      width="120">
    </el-table-column>
    <el-table-column
      prop="create_at"
      label="时间"
      width="200">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [
            {
                type: '学术交流',
                title: '这是一个帖子的标题,很长的',
                floor: '5楼',
                create_at: '2019-2-5 8:30:54'
            },
            {
                type: '学术交流',
                title: '这是一个帖子的标题,很长的',
                floor: '10楼',
                create_at: '2019-2-5 8:30:54'
            },
        ]
      }
    }
  }
</script>