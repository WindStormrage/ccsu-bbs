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
                    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
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
                    .comment {
                        margin: 0 10px 0 20px;
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
                <h1 class="title">帖子标题</h1>
                <div class="card" v-for="item in 10" :key="item">
                    <div class="user">
                        <img class="header" src="./../assets/logo.png">
                        <span class="name">windstromrage</span>
                        <span class="postCount">帖子数：123</span>
                        <span class="commentCount">回帖数：1233</span>
                    </div>
                    <div class="post">
                        <div class="text">
                            <div class="quote">
                                在 一楼 windStormrage 提到：
                                Lorem ipsum dolor sit amet, consectetupsum dolor sit amet, consectetupsum dolor sit amet, consecum dolor sit amet, consectetupsum dolor sit amet, consecum dolor sit amet, consectetupsum dolor sit amet, consectetur adipiscing elit.
                            </div>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adpsum dolor sit amet, consectetupsum dolor sit amet, consectetupsum dolor sit amet, consectetu
                            </p>
                        </div>
                        <div class="footer">
                            <span class="msg">一楼&nbsp;&nbsp;&nbsp;2018-11-22 09:51:14</span>
                            <el-button class="comment" type="text">回帖<img src="./../assets/comment.png"></el-button>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination class="pagination" background layout="prev, pager, next" :total="1000"></el-pagination>
            <text-editor :type="2"></text-editor>
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
            postId: '23',
            postName: '帖子名',
            breadMsg: [],
        }
    },
    mounted() {
        this.breadMsg = [
                {name: '首页', route: '/home'},
                {name: `${this.listName}`, route: `/list/${this.listUrl}`},
                {name: `${this.postName}`, route: `/list/${this.listUrl}/${this.postId}`},
            ]
    },
}
</script>
