<style scoped lang="scss">
  .addOne {
    position: absolute;
    left: 850px;
    top:90px;
    z-index: 10;
  }
</style>
<template>
  <div>
    <el-button class="addOne" size="mini" round @click="addOne()">+ 添加分类</el-button>
    <el-dialog title="添加分类" :visible.sync="dialogVisible">
      <el-form ref="labelForm" :model="labelForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="labelForm.name"></el-input>
        </el-form-item>
        <el-form-item label="分类url">
          <el-input v-model="labelForm.url"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addLabel">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="labelInfos" stripe style="width: 100%">
      <el-table-column prop="name" label="名称" width="200"></el-table-column>
      <el-table-column prop="url" label="对应url" width="200"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">关闭</span>
          <span v-if="scope.row.status === 1">正常</span>
        </template>
      </el-table-column>
      <el-table-column prop="operation" label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === 1"
            @click="operation(scope.row.id, 0)"
            type="text"
            size="small"
          >关闭</el-button>
          <el-button v-else @click="operation(scope.row.id, 1)" type="text" size="small">开启</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Sycn from "./../../js/util/sync.js";
export default {
  data() {
    return {
      labelInfos: [],
      dialogVisible: false,
      labelForm: {
        name: '',
        url: ''
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    operation(id, status) {
      const sync = new Sycn();
      sync.GET("/api/admin/label/put", { id, status }).then(() => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success"
        });
        this.getData();
      });
    },
    getData() {
      const sync = new Sycn();
      sync.GET("/api/admin/label/get").then(data => {
        this.labelInfos = data.data;
      });
    },
    addOne() {
      this.dialogVisible = true;
    },
    addLabel() {
      if (this.labelForm.name === '' || this.labelForm.url === '') {
        return ;
      }
      const sync = new Sycn();
      sync.POST("/api/admin/label/add", {name: this.labelForm.name, url: this.labelForm.url}).then(() => {
        this.$message({
          showClose: true,
          message: "操作成功",
          type: "success"
        });
        this.getData();
        this.dialogVisible = false;
        this.labelForm.name = '';
        this.labelForm.url = '';
      });
    }
  }
};
</script>