<style scoped lang="scss">
</style>
<template>
  <el-table
    :data="list"
    stripe
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="landlord"
      label="楼主">
    </el-table-column>
    <el-table-column
      prop="anonymous"
      label="匿名"
      width="80">
      <template slot-scope="scope">
        <span v-if="scope.row.anonymous === 0" >正常</span>
        <span v-if="scope.row.anonymous === 1" >匿名</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="100">
      <template slot-scope="scope">
        <span v-if="scope.row.status === 1" >正常</span>
        <span v-if="scope.row.status === 2" >顶置</span>
        <span v-if="scope.row.status === 3" >加精</span>
        <span v-if="scope.row.status === 4" >删除</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="count"
      label="跟帖数"
      width="80">
    </el-table-column>
    <el-table-column
      prop="create_at"
      label="创建时间"
      width="160">
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status !== 4" @click="operation(scope.row.id, 4)" type="text" size="small">删除</el-button>
        <el-button v-if="scope.row.status === 2 || scope.row.status === 3 ||scope.row.status === 4" @click="operation(scope.row.id, 1)" type="text" size="small">恢复正常</el-button>
        <el-button v-if="scope.row.status === 1" @click="operation(scope.row.id, 2)" type="text" size="small">顶置</el-button>
        <el-button v-if="scope.row.status === 1" @click="operation(scope.row.id, 3)" type="text" size="small">加精</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Sycn from "./../../js/util/sync.js";
  export default {
    data() {
      return {
        list: []
      }
    },
    mounted() {
      this.getData();
    },
    watch:{
      $route(to,from){
        this.getData();
      }
    },
    methods: {
      getData() {
        const url = this.$route.params.label_url;
        const sync = new Sycn();
        sync.GET(`/api/admin/list/${url}/get`)
          .then(data => {
            this.list = data.data;
          });
      },
      operation(id, status) {
        const url = this.$route.params.label_url;
        const sync = new Sycn();
        sync.POST(`/api/admin/list/${url}/put`, {id, status})
          .then(data => {
            if (data.errno === 0) {
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              });
              this.getData();
            } else {
              this.$message({
                showClose: true,
                message: data.errmsg,
                type: 'error'
              });
            }
          });
      }
    },
  }
</script>