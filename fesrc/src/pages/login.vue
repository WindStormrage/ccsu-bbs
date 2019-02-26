<style scoped lang="scss">
    .banner {
        width: calc(100% - 400px);
        height: 100vh;
        // background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        float: left;
    }
    .content {
        width: 400px;
        height: 100vh;
        background-color: #fff;
        float: left;
        text-align: center;
        position: relative;
        .menu {
            margin-top: 100px;
            margin-bottom: 50px;
        }
        .signIn {
            width: 300px;
            display: block;
            margin: 0 auto;
            .el-form-item {
                margin-top: 60px;
            }
            .visitorBtn {
                position: absolute;
                left: 270px;
                top: 410px;
            }
        }
        .submitBtn {
            width: 200px;
            margin: 0;
        }
    }
</style>

<template>
    <div>
        <div class="banner">
            
        </div>
        <div class="content">
            <el-radio-group class="menu" v-model="menu" :change="changeMenu()">
                <el-radio-button label="Sign in"></el-radio-button>
                <el-radio-button label="Sign up"></el-radio-button>
            </el-radio-group>
            <el-form class="signIn" ref="signIn" :model="signIn" label-width="60px" label-position="left">
                <el-form-item label="用户名">
                    <el-input v-model="signIn.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="signIn.pass"></el-input>
                </el-form-item>
                <el-button class="visitorBtn" type="text" @click="visitor">访客模式</el-button>
                <el-form-item>
                    <el-button class="submitBtn" type="primary" @click="onSubmitIn">登录</el-button>
                </el-form-item>
            </el-form>
            <div class="signUp">
                
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menu: 'Sign in',
            signIn: {}
        }
    },
    methods: {
        changeMenu(data) {
        },
        onSubmitIn() {

        },
        visitor() {
            
        }
    },
}
</script>
