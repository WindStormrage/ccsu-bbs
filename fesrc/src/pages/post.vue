<style scoped lang="scss">
.content {
    display: inline-block;
    width: calc(100% - 350px);
    padding: 50px 100px 0 100px;
    .container {
        width: 100%;
        box-shadow: 0 0 5px #ccc;
        .title {
            margin: 15px 30px;
            display:inline-block;
        }
        .card {
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            margin: 10px 0;
            .user {
                width: 200px;
                display: inline-block;
                text-align: center;
                padding: 20px;
                .header {
                    height: 100px;
                    width: 100px;
                    border-radius: 50%;
                }
                span {
                    display: block;
                    font-size: 16px;
                }
                .name {
                    font-size: 20px;
                    font-weight: bold;
                    margin: 20px 0 10px 0;
                }
            }
            .post {
                border-left: 1px solid #ddd;
                width: calc(100% - 200px);
                display: inline-block;
                vertical-align: top;
                min-height: 253px;
                .text {
                    height: 100%;
                    width: 100%;
                    font-size: 16px;
                    color: #555;
                    padding: 15px;
                    min-height: 227px;
                    .quote {
                        width: calc(100% - 20px);
                        float: left;
                        border-left: 5px solid #a1c4fd;
                        padding-left: 10px;
                        margin: 10px;
                        color: #777;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                    }
                }
                .footer {
                    height: 25px;
                    line-height: 25px;
                    font-size: 15px;
                    text-align: right;
                    overflow: hidden;
                    border-top: 1px solid #ddd;
                    vertical-align: bottom;
                    .el-button {
                        padding: 0;
                    }
                    .msg {
                        margin-right: 20px;
                    }
                    .comment {
                        margin: 0 10px 0 0;
                        color: #666;
                        img {
                            height: 18px;
                            vertical-align: middle;
                            margin-left: 3px;
                        }
                    }
                }
            }
        }
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
            <div class="container">
                <h1 class="title">{{postName}}</h1>
                <div class="card" v-for="item in data" :key="item.id">
                    <div class="user">
                        <img class="header" :src="item.anonymous ? 'http://123.207.39.128:8080/upload/file/ca37bac437e20a6d71d3fdc51e5c00fa' : item.actorAvatar">
                        <span class="name">{{item.anonymous ? '匿名' : item.actor}}</span>
                        <span class="postCount">帖子数：{{item.postCount}}</span>
                        <span class="commentCount">回帖数：{{item.commentCount}}</span>
                    </div>
                    <div class="post">
                        <div class="text">
                            <div class="quote" v-if="item.quote_id !== 0 && item.quoteStatus !== 2">
                                在 {{item.quoteFloor}} {{item.quoteAnonymous ? '匿名' : item.quoteName}} 提到：
                                <span v-html="item.quoteContent"></span>
                            </div>
                            <p v-html="item.content"></p>
                        </div>
                        <div class="footer">
                            <span class="msg">{{item.floor}}&nbsp;&nbsp;&nbsp;{{item.create_at}}</span>
                            <a v-if="item.id !== 0" class="comment" type="text" href="#editor" @click="comment(item)">回帖<img src="./../assets/comment.png"></a>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination class="pagination" background layout="prev, pager, next" :total="total" :page-size="5" :current-page.sync="currentPage" @current-change="getData()"></el-pagination>
            <text-editor ref="editor" id="editor" :type="2"></text-editor>
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
            postId: '23',
            postName: '帖子名',
            breadMsg: [],
            data: [],
            currentPage: 1,
            total: 0
        }
    },
    mounted() {
        this.listUrl = this.$route.params.label_url;
        this.getData()
            .then(() => {
                this.breadMsg = [
                        {name: '首页', route: '/home'},
                        {name: `${this.listName}`, route: `/list/${this.listUrl}`},
                        {name: `${this.postName}`, route: `/list/${this.listUrl}/${this.postId}`},
                    ]
            });
    },
    methods: {
        comment(item) {
            this.$refs.editor.setTag(item);
        },
        getData() {
            return new Promise((resolve, reject) => {
                const id = this.$route.params.post_id;
                const sync = new Sycn();
                sync.GET("/api/post", {
                        page: this.currentPage,
                        pagesize: 5,
                        id,
                    })
                    .then(data => {
                        this.listName = data.data.label.name;
                        this.postName = data.data.label.title;
                        this.total = data.data.comments.count;
                        this.data = data.data.comments.data;                        
                        resolve();
                    })
                    .catch(err => {
                        this.$message({
                            showClose: true,
                            message: `服务器错误,请稍后重试! ${err}`,
                            type: 'error'
                        });
                        reject();
                    });
            })
        }
    },
}
</script>
