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
            <div v-for="item in menuData" :key="`1-${item.url}`">
                <el-menu-item v-if="item.children.length === 0" :index="item.url" :route="{path: `/admin/${item.url}`}">
                    <span slot="title">{{item.name}}</span>
                </el-menu-item>
            </div>
            <div v-for="item in menuData" :key="`2-${item.url}`">
                <el-submenu v-if="item.children.length !== 0" :index="item.url">
                    <template slot="title">
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item v-for="children in item.children" :key="`${item.url}/${children.url}`" :index="`${item.url}/${children.url}`" :route="{path: `/admin/${item.url}/${children.url}`}">{{children.name}}</el-menu-item>
                </el-submenu>
            </div>
        </el-menu>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Sycn from "./../js/util/sync.js";
import Header from './../components/header.vue'
export default {
    components: {
        Header,
    },
    data() {
        return {
            defaultAction: 'user',
            menuData: []
        }
    },
    mounted() {
        this.defaultAction = this.$route.path.split('/admin/')[1];
        this.getMenu();
    },
    methods: {
        getMenu() {
            const sync = new Sycn();
            sync.GET("/api/admin/getMenu")
                .then(data => {
                    this.formatMenu(data.data);
                });
        },
        formatMenu(data) {
            data.forEach(item => {
                const urlSplit = item.url.split('/');
                // 如果长度为1的话就是主menu,直接推进去
                if (urlSplit.length === 1) {
                    item.children = [];
                    this.menuData.push(item);
                } else if (urlSplit.length === 2) {
                    // 找找之前有没有推过,没推过就创一个新的,推过了就推到他的儿子里面
                    const have = this.menuData.find(item => urlSplit[0] === item.url);
                    if (have === undefined) {
                        this.menuData.push({
                            url: urlSplit[0],
                            name: item.name.split('—')[0],
                            children: [{
                                url: urlSplit[1],
                                name: item.name.split('—')[1],
                            }]
                        });
                    } else {
                        have.children.push({
                            url: urlSplit[1],
                            name: item.name.split('—')[1],
                        })
                    }
                }
            })
        }
    },
}
</script>
