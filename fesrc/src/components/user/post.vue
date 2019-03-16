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
        <template slot-scope="scope">
            <span @click="$router.push(`/list/${scope.row.label_url}/${scope.row.id}`)" style="cursor: pointer;">{{scope.row.title}}</span>
        </template>
    </el-table-column>
    <el-table-column
      prop="commentCount"
      label="回复数"
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
  import Sycn from "./../../js/util/sync.js";
  export default {
    data() {
      return {
        tableData: []
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        const sync = new Sycn();
        sync.GET(`/api/user/getPost`)
          .then(data => {
            this.tableData = data.data;
          });
      }
    },
  }
</script>