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
            <h1 class="listTitle">学术交流</h1>
            <span class="listMsg">主题数：100&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;回帖数：500</span>
            <el-tabs v-model="tabActive" type="card">
                <el-tab-pane label="帖子" name="post">
                    <el-table :data="tableData" stripe style="width: 100%">
                        <el-table-column prop="id" label="序号" width="80"></el-table-column>
                        <el-table-column prop="title" label="标题" width="360"></el-table-column>
                        <el-table-column prop="actor" label="作者" width="190">
                            <template slot-scope="scope">
                                <img height="35" width="35" style="float: left;border-radius: 50%;margin-top:5px;background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)" src="./../assets/logo.png">
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
                    <el-pagination class="pagination" background layout="prev, pager, next" :total="1000"></el-pagination>
                </el-tab-pane>
                <el-tab-pane label="精华" name="second">
                    
                </el-tab-pane>
            </el-tabs>
            <text-editor></text-editor>
        </div>
        <right-msg></right-msg>
    </div>
</template>
<script>
import Header from './../components/header.vue'
import RightMsg from './../components/rightMsg.vue'
import TextEditor from './../components/textEditor.vue'
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
            tableData: [
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
                {
                    id: '12345',
                    title: '一二三四五六七八九十一二三四五六七八九十',
                    actor: 'windstormrage',
                    create_at: '2019-3-2 19:56:14',
                    comment: '12345',
                    update_at: '2019-3-2 19:56:14',
                    commentName: 'windstormrage'
                },
            ]
        }
    },
    mounted() {
        this.breadMsg = [
                {name: '首页', route: '/home'},
                {name: `${this.listName}`, route: `/list/${this.listUrl}`}
            ]
    },
}
</script>
