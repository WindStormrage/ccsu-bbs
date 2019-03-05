<style scoped lang="scss">
    .container {
        width: calc(100% - 400px);
        float: left;
        padding: 30px;
        .el-menu-item {
            padding: 0;
            margin: 0 30px;
            a {
                display: inline-block;
                height: 100%;
                width: 100%;
                padding: 0 20px;
                font-size: 22px;
            }
        }
    }
    .user {
        width: 400px;
        font-size: 16px;
        text-align: center;
        float: right;
        .header {
            height: 150px;
            width: 150px;
            border-radius: 50%;
            margin: 60px 0 30px 0;
            background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        }
        span {
            display: block;
            margin: 5px;
        }
        .name {
            font-size: 20px;
            margin: 15px;
        }
    }
</style>
<template>
    <div>
        <Header></Header>
        <div class="container">
            <el-menu :default-active="activeTab" class="el-menu-demo" mode="horizontal" @select="tebClick">
                <el-menu-item index="userPost"><router-link to="post">我的帖子</router-link></el-menu-item>
                <el-menu-item index="userComment"><router-link to="comment">我的回帖</router-link></el-menu-item>
                <el-menu-item index="userInformation"><router-link to="information">我的消息</router-link></el-menu-item>
                <el-menu-item index="userSetting"><router-link to="setting">修改资料</router-link></el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
        <div class="user">
            <img class="header" src="./../assets/logo.png">
            <span class="name">windstromrage</span>
            <span class="postCount">帖子数：123</span>
            <span class="commentCount">回帖数：1233</span>
        </div>
    </div>
</template>
<script>
import Header from './../components/header.vue'
export default {
    components: {
        Header,
    },
    data() {
        return {
            activeTab: 'userPost'
        }
    },
    mounted() {
        this.activeTab = this.$route.name
    },
    methods: {
        tebClick() {

        }
    },
}
</script>
