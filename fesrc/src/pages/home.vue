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
                }
            }
        }
    }
}
</style>
<template>
    <div class="home">
        <Header :bread-msg="breadMsg"></Header>
        <div class="content">
            <div class="flex">
                <div class="card" v-for="item in 10" :key="item">
                    <div class="title">
                        <div class="msg">
                            <h1>学术交流</h1>
                            <p>帖子数：50人  留言数：500人</p>
                        </div>
                        <img src="./../assets/right.png">
                    </div>
                    <hr>
                    <ul class="list">
                        <li>一条消息一条消息一条消息一条消息一条消息一条消息一条消息一条消息</li>
                        <li>一条消息一条消息</li>
                        <li>一条消息</li>
                        <li>一条消息一条消息一条消息一条消息</li>
                    </ul>
                </div>
            </div>
        </div>
        <right-msg></right-msg>
    </div>
</template>
<script>
import Header from './../components/header.vue'
import RightMsg from './../components/rightMsg.vue'
export default {
    components: {
        Header,
        RightMsg
    },
    data() {
        return {
            breadMsg: [
                {name: '首页', route: '/home'}
            ]
        }
    }
}
</script>
