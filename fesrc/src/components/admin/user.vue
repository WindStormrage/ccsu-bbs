<style scoped lang="scss">

</style>
<template>
  <el-table
    :data="userInfos"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="用户名">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="50">
      <template slot-scope="scope">
        <span v-if="scope.row.sex === 1" >男</span>
        <span v-if="scope.row.sex === 2" >女</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="sid"
      label="学号"
      width="120">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="手机"
      width="110">
    </el-table-column>
    <el-table-column
      prop="birthday"
      label="生日"
      width="100">
    </el-table-column>
    <el-table-column
      prop="last_login_at"
      label="最后登录时间"
      width="160">
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
        <el-button v-if="scope.row.status === 1" @click="blackHoust(scope.row.id, 2)" type="text" size="small">关小黑屋</el-button>
        <el-button v-else @click="blackHoust(scope.row.id, 1)" type="text" size="small">释放出来</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Sycn from "./../../js/util/sync.js";
  export default {
    data() {
      return {
        userInfos: []
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
         blackHoust(id, status) {
          const sync = new Sycn();
          sync.GET("/api/admin/user/put", {id, status})
              .then(data => {
                this.$message({
                  showClose: true,
                  message: '操作成功',
                  type: 'success'
                });
                this.getData();
              });
         },
         getData() {
          const sync = new Sycn();
          sync.GET("/api/admin/user/get")
              .then(data => {
                this.userInfos = data.data;
              });
         }
    },
  }
</script>