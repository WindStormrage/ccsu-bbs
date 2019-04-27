<style scoped lang="scss">
.content {
    display: inline-block;
    width: calc(100% - 350px);
    padding: 30px;
    .flex {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .card {
            height: 285px;
            width: 400px;
            border: 1px solid #666;
            margin: 20px;
            .title {
                cursor: pointer;
                padding: 15px;
                .msg {
                    display: inline-block;
                }
                p {
                    font-size: 16px;
                }
                img {
                    height: 50px;
                    float: right;
                    margin: 5px 10px 0 0;
                }
            }
            .list {
                padding: 15px;
                li {
                    list-style: none;
                    font-size: 18px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin-top: 10px;
                    cursor: pointer;
                }
            }
        }
        .card-null {
            height: 285px;
            width: 400px;
            border: 1px solid transparent;
            margin: 20px;
        }
    }
}
</style>
<template>
    <div class="home">
        <Header :bread-msg="breadMsg"></Header>
        <div class="content">
            <div class="flex">
                <div class="card" v-for="label in data" :key="label.id">
                    <div class="title" @click="$router.push(`/list/${label.url}`)">
                        <div class="msg">
                            <h1>{{label.name}}</h1>
                            <p>帖子数：{{label.postCount}}帖  跟帖数：{{label.participationCount}}帖</p>
                        </div>
                        <img src="./../assets/right.png">
                    </div>
                    <hr>
                    <ul class="list">
                        <li v-for="post in label.posts" :key="post.id" @click="$router.push(`/list/${label.url}/${post.id}`)">{{post.name}}</li>
                    </ul>
                </div>
                <div class="card-null" v-for="(item, index) in nullCount" :key="index"></div>
            </div>
        </div>
        <right-msg></right-msg>
    </div>
</template>
<script>
import Header from './../components/header.vue'
import RightMsg from './../components/rightMsg.vue'
import Sycn from "./../js/util/sync.js";
export default {
    components: {
        Header,
        RightMsg
    },
    data() {
        return {
            breadMsg: [
                {name: '首页', route: '/home'}
            ],
            data: [],
            nullCount: 0,
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
          const sync = new Sycn();
          sync.GET("/api/home")
            .then(data => {
                // 一行的数量
                const lineCount = parseInt((document.body.clientWidth - 410) / 440);
                const showData = data.data.filter(item => item.status === 1);
                this.nullCount = showData.length % lineCount;

                this.data = showData;
            })
            .catch(err => {
                this.$message({
                  showClose: true,
                  message: `服务器错误,请稍后重试!${err}`,
                  type: 'error'
                });
            });
        }
    },
}
</script>
