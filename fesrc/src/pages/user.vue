<style scoped lang="scss">
    .container {
        width: calc(100% - 400px);
        float: left;
        padding: 30px 20px 30px 70px;
        .el-menu {
            margin-bottom: 20px;
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
            <el-menu :default-active="activeTab" class="el-menu" mode="horizontal" @select="tebClick">
                <el-menu-item index="userPost"><router-link to="post">我的帖子</router-link></el-menu-item>
                <el-menu-item index="userComment"><router-link to="comment">我的回帖</router-link></el-menu-item>
                <el-menu-item index="userInformation"><router-link to="information">我的消息</router-link></el-menu-item>
                <el-menu-item index="userSetting"><router-link to="setting">修改资料</router-link></el-menu-item>
            </el-menu>
            <router-view></router-view>
        </div>
        <div class="user">
            <img class="header" :src="this.userInfo.avatar">
            <span class="name">{{this.userInfo.name}}</span>
            <span class="postCount">帖子数：{{this.userInfo.countPost}}</span>
            <span class="commentCount">回帖数：{{this.userInfo.countComment}}</span>
        </div>
    </div>
</template>
<script>
import Header from './../components/header.vue';
export default {
    components: {
        Header,
    },
    watch:{
        $route(to,from){
            this.activeTab = this.$route.name;
        }
    },
    data() {
        return {
            activeTab: 'userPost',
            userInfo: {},
        }
    },
    mounted() {
        this.activeTab = this.$route.name;
        if (localStorage.getItem("userInfo")) {
        this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
        }
    },
    methods: {
        tebClick() {

        }
    },
}
</script>
