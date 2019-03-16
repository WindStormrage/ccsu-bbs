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
        <template slot-scope="scope">
            <span v-if="scope.row.info_type === 1">有人@你</span>
            <span v-if="scope.row.info_type === 2">有人回复你了</span>
            <span v-if="scope.row.info_type === 3">有人跟帖了</span>
        </template>
    </el-table-column>
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
      prop="create_at"
      label="时间"
      width="200">
    </el-table-column>
    <el-table-column
      prop="read"
      label="阅读状态"
      width="150">
        <template slot-scope="scope">
            <span v-if="scope.row.read === 0">未读</span>
            <span v-else>已读</span>
        </template>
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
        sync.GET(`/api/user/getInformation`)
          .then(data => {
            this.tableData = data.data;
          });
      }
    },
  }
</script>
