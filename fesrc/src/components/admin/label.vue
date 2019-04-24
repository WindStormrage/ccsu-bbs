<style scoped lang="scss">

</style>
<template>
  <el-table
    :data="labelInfos"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="名称"
      width="200">
    </el-table-column>
    <el-table-column
      prop="url"
      label="对应url"
      width="200">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="100">
      <template slot-scope="scope">
        <span v-if="scope.row.status === 0" >关闭</span>
        <span v-if="scope.row.status === 1" >正常</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="operation"
      label="操作">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status === 1" @click="operation(scope.row.id, 0)" type="text" size="small">关闭</el-button>
        <el-button v-else @click="operation(scope.row.id, 1)" type="text" size="small">开启</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import Sycn from "./../../js/util/sync.js";
  export default {
    data() {
      return {
        labelInfos: []
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
         operation(id, status) {
          const sync = new Sycn();
          sync.GET("/api/admin/label/put", {id, status})
              .then(() => {
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
          sync.GET("/api/admin/label/get")
              .then(data => {
                this.labelInfos = data.data;
              });
         }
    },
  }
</script>