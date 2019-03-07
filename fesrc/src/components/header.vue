<style scoped lang="scss">
    .header {
        display: flex;
        align-items: center;
        height: 80px;
        width: 100%;
        border-bottom: 1px solid #eee;
        box-shadow: 0 1px 10px #ccc;
        .logo {
            height: 60px;
            width: 100px;
            background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
            margin-left: 60px;
            text-align: center;
            line-height: 60px;
        }
        .bread {
            margin-left: 80px;
            flex: 1;
            font-size: 16px;
            .el-breadcrumb {
                font-size: 16px;
            }
        }
        .msg {
            margin-right: 60px;
            cursor: pointer;
            .userHead {
                height: 60px;
                width: 60px;
                border-radius: 50%;
                background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
                vertical-align: middle;
            }
            .userName {
                margin-left: 20px;
                font-size: 18px;
            }
        }
    }
    .drawer {
        text-align: center;
        /deep/ .ivu-drawer-body {
            padding: 0;
        }
        .userHead {
            height: 130px;
            width: 130px;
            background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
            border-radius: 50%;
            margin: 40px;
        }
        .userInfo {
            span {
                display: block;
                margin-bottom: 10px;
            }
            .name {
                font-size: 20px;
                font-weight: bolder;
            }
            .post {
                font-size: 14px;
                
            }
            .comment {
                font-size: 14px;
                margin-top: -12px;
            }
        }
        .list {
            margin-top: 50px;
            .link {
                display: block;
                height: 50px;
                width: 100%;
                font-size: 16px;
                line-height: 50px;
                list-style: none;
                border-top: 1px solid #aaa;
                border-bottom: 1px solid #aaa;
                margin-top: -1px;
                cursor: pointer;
                transition: .5s;
                color: #000;
                &:hover {
                    background-color: #a1c4fd;
                    color: #fff;
                }
            }

        }
    }
</style>
<template>
    <div>
        <div class="header">
            <router-link class="link" to="/home"><div class="logo">logo</div></router-link>
            <div class="bread">
                <el-breadcrumb v-if="breadMsg.length !== 0" separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item v-for="(item, index) in breadMsg" :key="index" :to="{ path: item.route }">{{item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="msg" @click="drawer = true">
                <img class="userHead" src="./../assets/logo.png">
                <span class="userName">WindStormrage</span>
            </div>
        </div>
        <Drawer class="drawer" :closable="false" v-model="drawer">
            <img class="userHead" src="./../assets/logo.png">
            <div class="userInfo">
                <span class="name">WindStormrage</span>
                <span class="post">帖子数：123</span>
                <span class="comment">回帖数：456</span>
            </div>
            <ul class="list" @click="drawer = false">
                <router-link class="link" to="/home">首页</router-link>
                <router-link class="link" to="/admin">管理系统</router-link>
                <router-link class="link" to="/user/post">我的帖子</router-link>
                <router-link class="link" to="/user/comment">我的回帖</router-link>
                <router-link class="link" to="/user/information">我的消息</router-link>
                <router-link class="link" to="/user/setting">修改资料</router-link>
                <router-link class="link" to="/loginout">退出登录</router-link>
            </ul>
        </Drawer>
    </div>
</template>
<script>
export default {
    props: {
        breadMsg: {
            type: Array,
            default: () => []
        },
        userMsg: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            drawer: false
        }
    }
}
</script>
