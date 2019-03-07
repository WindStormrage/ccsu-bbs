<style scoped lang="scss">
.el-menu-vertical {
    width: 260px;
    display: inline-block;
    height: calc(100vh - 80px);
    /deep/ .el-submenu__title, .el-menu-item {
        font-size: 18px;
    }
}
.content {
    width: calc(100% - 260px);
    height: calc(100vh - 80px);
    display: inline-block;
    vertical-align: top;
    overflow-y: auto;
}
</style>
<template>
    <div>
        <Header></Header>
        <el-menu
        default-active="1"
        class="el-menu-vertical"
        :router="true"
        :default-active="defaultAction">
            <el-menu-item index="user" :route="{path: '/admin/user'}">
                <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="permission" :route="{path: '/admin/permission'}">
                <span slot="title">权限管理</span>
            </el-menu-item>
            <el-submenu index="list">
                <template slot="title">
                    <span>帖子管理</span>
                </template>
                <el-menu-item index="list/url" :route="{path: '/admin/list/url'}">学术交流</el-menu-item>
            </el-submenu>
        </el-menu>
        <div class="content">
            <router-view></router-view>
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
                defaultAction: 'user'
            }
        },
        mounted() {
            this.defaultAction = this.$route.path.split('/admin/')[1];
        },
        methods: {
        },
    }
</script>
