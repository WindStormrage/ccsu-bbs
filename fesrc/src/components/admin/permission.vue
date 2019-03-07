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
        prop="have"
        label="拥有人">
        <template slot-scope="scope">
            <span>{{scope.row.have.join(',')}}</span>
        </template>
        </el-table-column>
        <el-table-column
        prop="operation"
        label="修改拥有人"
        width="250">
        <template slot-scope="scope">
            <el-button @click="change(scope.row.have)" type="text" size="small">修改</el-button>
        </template>
        </el-table-column>
    </el-table>
    <el-dialog title="修改拥有人" :visible.sync="dialogVisible">
        <h3>添加用户</h3>
        <el-input @click="addUser()" v-model="userName" placeholder="请输入用户名" style="width: 200px;margin: 10px;"></el-input>
        <el-button type="primary" plain>添加</el-button>
        <h3>当前拥有</h3>
        <el-tag
        v-for="name in peoples"
        :key="name"
        closable
        @close='delUser()'
        style="margin: 10px;">
        {{name}}
        </el-tag>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        permissions: [
            {
                name: '帖子管理-学术交流',
                url: '/admin/post/stydy',
                have: ['xiehanyng','xhufhaidfa']
            }
        ],
        dialogVisible: false,
        peoples: [],
        userName: ''
      }
    },
    methods: {
        change(have) {
            this.peoples = have;
            this.dialogVisible = true;
        },
        delUser() {

        },
        addUser() {
            
        }
    },
  }
</script>