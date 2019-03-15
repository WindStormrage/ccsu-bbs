<style scoped lang="scss">
/deep/ .el-dialog__body {
    padding: 5px 20px 20px 20px;
}
</style>
<template>
  <div>
    <el-table
        :data="permissions"
        stripe
        style="width: 100%">
        <el-table-column
        prop="name"
        label="权限名"
        width="220">
        </el-table-column>
        <el-table-column
        prop="url"
        label="权限url"
        width="220">
        </el-table-column>
        <el-table-column
        prop="users"
        label="拥有人">
        <template slot-scope="scope">
            <span>{{scope.row.users.join(',')}}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="operation"
        label="修改拥有人"
        width="250">
        <template slot-scope="scope">
            <el-button @click="change(scope.row.users, scope.row.id)" type="text" size="small">修改</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-dialog title="修改拥有人" :visible.sync="dialogVisible">
        <h3>添加用户</h3>
        <el-input v-model="userName" placeholder="请输入用户名" style="width: 200px;margin: 10px;"></el-input>
        <el-button type="primary" plain @click="addUser()">添加</el-button>
        <h3>当前拥有</h3>
        <el-tag
        v-for="name in peoples"
        :key="name"
        closable
        @close='delUser(name)'
        style="margin: 10px;">
        {{name}}
        </el-tag>
    </el-dialog>
  </div>
</template>

<script>
  import Sycn from "./../../js/util/sync.js";
  export default {
    data() {
      return {
        permissions: [],
        dialogVisible: false,
        peoples: [],
        userName: '',
        changePermissionId: 0,
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
        change(users, id) {
            this.peoples = users;
            this.changePermissionId = id;
            this.dialogVisible = true;
        },
        delUser(name) {
          const sync = new Sycn();
          sync.POST("/api/admin/permission/put", {
            operation: 'del',
            permission_id: this.changePermissionId,
            name})
            .then(data => {
              if (data.errno === 0) {
                this.$message({
                  showClose: true,
                  message: '删除成功',
                  type: 'success'
                });
                this.peoples.splice(this.peoples.indexOf(name), 1);
                this.getData();
              } else {
                this.$message({
                  showClose: true,
                  message: data.errmsg,
                  type: 'error'
                });
              }
            });
        },
        addUser() {
          if (this.userName !== '') {
            const sync = new Sycn();
            sync.POST("/api/admin/permission/put", {
              operation: 'add',
              permission_id: this.changePermissionId,
              name: this.userName})
              .then(data => {
                if (data.errno === 0) {
                  this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                  });
                  this.peoples.push(this.userName);
                  this.userName = '';
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
        getData() {
          const sync = new Sycn();
          sync.GET("/api/admin/permission/get")
              .then(data => {
                this.permissions = data.data;
              });
        }
    },
  }
</script>