<style scoped lang="scss">
.content {
    display: inline-block;
    width: calc(100% - 350px);
    padding: 50px 100px 0 100px;
    .listTitle {
        font-size: 30px;
    }
    .listMsg {
        font-size: 20px;
        margin: 5px 0 25px 0;
        display: inline-block;
    }
    /deep/ .el-tabs__item {
        font-size: 18px;
    }
    .pagination {
        margin: 30px 0 0 50px;
    }
}
</style>
<template>
    <div>
        <Header :bread-msg="breadMsg"></Header>
        <div class="content">
            <h1 class="listTitle">{{listName}}</h1>
            <span class="listMsg">主题数：{{postCount}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;跟帖数：{{commentCount}}</span>
            <el-tabs v-model="tabActive" type="card" @tab-click="clickTab()">
                <el-tab-pane label="帖子" name="post">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="id" label="序号" width="80"></el-table-column>
                        <el-table-column prop="title" label="标题" width="360">
                            <template slot-scope="scope">
                                    <span @click="$router.push(`/list/${listUrl}/${scope.row.id}`)" style="display: block;cursor: pointer;">{{ scope.row.title }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="actor" label="作者" width="190">
                            <template slot-scope="scope">
                                <img height="35" width="35" style="float: left;border-radius: 50%;margin-top:5px;" :src="scope.row.anonymous ? 'http://123.207.39.128:8080/upload/file/ca37bac437e20a6d71d3fdc51e5c00fa' : scope.row.actorAvatar">
                                <p style="float: right;">
                                    <span style="display: block;">{{ scope.row.anonymous ? '匿名' : scope.row.actor }}</span>
                                    <span style="display: block;">{{ scope.row.create_at }}</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="comment" label="回复" width="80"></el-table-column>
                        <el-table-column prop="update_at" label="最后发表" width="180">
                            <template slot-scope="scope">
                                    <span style="display: block;">{{ scope.row.commentName }}</span>
                                    <span style="display: block;">{{ scope.row.update_at }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination" background layout="prev, pager, next" :total="total" :page-size="1" :current-page.sync="currentPage" @current-change="getData(0)"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="精华" name="essence">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="id" label="序号" width="80"></el-table-column>
                        <el-table-column prop="title" label="标题" width="360"></el-table-column>
                        <el-table-column prop="actor" label="作者" width="190">
                            <template slot-scope="scope">
                                <img height="35" width="35" style="float: left;border-radius: 50%;margin-top:5px;" :src="scope.row.actorAvatar">
                                <p style="float: right;">
                                    <span style="display: block;">{{ scope.row.actor }}</span>
                                    <span style="display: block;">{{ scope.row.create_at }}</span>
                                </p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="comment" label="回复" width="80"></el-table-column>
                        <el-table-column prop="update_at" label="最后发表" width="180">
                            <template slot-scope="scope">
                                    <span style="display: block;">{{ scope.row.commentName }}</span>
                                    <span style="display: block;">{{ scope.row.update_at }}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination class="pagination" background layout="prev, pager, next" :total="total3" :page-size="1" :current-page.sync="currentPage3" @current-change="getData(3)"></el-pagination>
                </el-tab-pane>
            </el-tabs>
            <text-editor :type="1"></text-editor>
        </div>
        <right-msg></right-msg>
    </div>
</template>
<script>
import Header from './../components/header.vue'
import RightMsg from './../components/rightMsg.vue'
import TextEditor from './../components/textEditor.vue'
import Sycn from "./../js/util/sync.js";
export default {
    components: {
        Header,
        RightMsg,
        TextEditor
    },
    data() {
        return {
            listUrl: 'type',
            listName: '分类名',
            breadMsg: [],
            tabActive: 'post',
            postCount: 0,
            commentCount: 0,
            tableData: [],
            currentPage: 0,
            total: 0,
            currentPage3: 0,
            total3: 0,
        }
    },
    mounted() {
        this.breadMsg = [
                {name: '首页', route: '/home'},
                {name: `${this.listName}`, route: `/list/${this.listUrl}`}
            ];
        this.listUrl = this.$route.params.label_url;
        this.getData(0);
    },
    methods: {
        getData(status) {
            let page = this.currentPage;
            // 如果为3的话就是只要找精华的
            if (status === 3) {
                page = this.currentPage3;
            }
            const url = this.$route.params.label_url;
            const sync = new Sycn();
            sync.GET("/api/list", {
                    url,
                    page,
                    pagesize: 1,
                    status: status
                })
                .then(data => {
                    this.tableData = data.data.post.data;
                    // 不同的tab的分页设置不同的数据
                    if (status === 0) {
                        this.total = data.data.post.count;
                        this.currentPage = data.data.post.currentPage;
                    }else if (status === 3) {
                        this.total3 = data.data.post.count;
                        this.currentPage3 = data.data.post.currentPage;
                    }
                    this.listName = data.data.listName
                    this.postCount = data.data.postCount
                    this.commentCount = data.data.commentCount
                })
                .catch(err => {
                    this.$message({
                    showClose: true,
                    message: '服务器错误,请稍后重试!',
                    type: 'error'
                    });
                });
        },
        // 切换tab的时候
        clickTab() {
            switch (this.tabActive) {
                case 'post':
                    this.getData(0)
                    break;
                case 'essence':
                    this.getData(3)
                    break;
            }
        }
    },
}
</script>
