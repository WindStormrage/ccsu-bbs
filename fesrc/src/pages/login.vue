<style scoped lang="scss">
    .banner {
        width: calc(100% - 500px);
        height: 100vh;
        // background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
        float: left;
    }
    .content {
        width: 500px;
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
                left: 320px;
                top: 410px;
            }
        }
        .signUp {
            width: 300px;
            display: block;
            margin: -15px auto;
            .el-form-item {
                margin-top: 20px;
            }
            .vInput {
                width: 80px;
                float: left;
            }
            .sendEmailBtn {
                width: 120px;
                float: right;
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
                <el-radio-button label="signIn"></el-radio-button>
                <el-radio-button label="signUp"></el-radio-button>
            </el-radio-group>
            <el-form v-show="menu === 'signIn'" class="signIn" ref="signIn" :model="signIn" label-width="60px" label-position="left">
                <el-form-item label="用户名">
                    <el-input v-model="signIn.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="signIn.pass"></el-input>
                </el-form-item>
                <el-button class="visitorBtn" type="text" @click="visitor()">访客模式</el-button>
                <el-form-item>
                    <el-button class="submitBtn" type="primary" @click="onSubmitIn()">登录</el-button>
                </el-form-item>
            </el-form>
            <el-form v-show="menu === 'signUp'" class="signUp" ref="signUp" :model="signUp" label-width="80px" label-position="left" :rules="signUpRules">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="signUp.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="pass">
                    <el-input type="password" v-model="signUp.pass"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="checkPass">
                    <el-input type="password" v-model="signUp.checkPass"></el-input>
                </el-form-item>
                <el-form-item label="学号" prop="sid">
                    <el-input v-model="signUp.sid"></el-input>
                </el-form-item>
                <el-form-item label="学号密码" prop="sPass">
                    <el-input type="password" v-model="signUp.sPass"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="signUp.email"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="verification">
                    <el-input v-model="signUp.verification" class="vInput"></el-input>
                    <el-button class="sendEmailBtn" @click="sendEmail()" :disabled='sendEmailBtnDisabled'>{{sendEmailBtnText}}</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="submitBtn" type="primary" @click="onSubmitUp('signUp')">注册</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        // 密码的验证
        const validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (value.length < 6 || value.length > 15) {
                callback(new Error('密码长度在 6 到 15 个字符'))
            } else {
                if (this.signUp.checkPass !== '') {
                    this.$refs.signUp.validateField('checkPass');
                }
                callback();
            }
        };
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.signUp.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        }; 
        return {
            menu: 'signIn',
            signIn: {},
            signUp: {
                name: '',
                pass: '',
                checkPass: '',
                sid: '',
                sPass: '',
                email: '',
                verification: ''
            },
            signUpRules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'change' },
                    { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'change' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'change' },
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, message: '请再次输入密码', trigger: 'change' },
                    { validator: validatePass2, trigger: 'blur' }
                ],
                sid: [
                    { required: true, message: '请输入学号', trigger: 'change' },
                    { min: 10, max: 15, message: '请输入正确的学号', trigger: 'change' }
                ],
                sPass: [
                    { required: true, message: '请输入信息门户密码', trigger: 'change' },
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'change' },
                ],
                verification: [
                    { required: true, message: '请输入邮箱验证码', trigger: 'change' },
                ]
            },
            sendEmailStatus: 0,
            sendEmailBtnText: '点击获取',
            sendEmailBtnDisabled: true,
            sendEmailInterval: null,
            sendEmailTime: 0,
        }
    },
    mounted() {
        this.sendEmailBtnText = '点击获取';
        this.sendEmailStatus = 0;
        this.sendEmailBtnDisabled = true;
    },
    watch: {
        'signUp.email'(val, oldVal) {
            // 当邮箱不为空的时候而且获取没有倒计时的时候才变成可以点
            if (val != '' && (new Date().getTime() - this.sendEmailTime) > 60000) {
                this.sendEmailBtnDisabled = false;
            } else {                
                this.sendEmailBtnDisabled = true;
            }
        } 
    },
    methods: {
        // 改变tab的时候调用
        changeMenu() {
        },
        // 点击登录
        onSubmitIn() {
        },
        // 点击注册
        onSubmitUp(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        // 点击访客模式
        visitor() {
            this.$router.push('home');
        },
        // 点击发送邮件
        sendEmail() {
            // 如果是第一次点击的话
            if (this.sendEmailStatus === 0 || this.sendEmailStatus === 2) {
                this.sendEmailStatus = 1;
                this.sendEmailBtnDisabled = true;
                this.sendEmailTime = new Date().getTime();
                // 设置倒计时,倒计时结束变成2
                this.sendEmailInterval = setInterval(() => {
                    const hadTime = 60 - (new Date().getTime() - this.sendEmailTime) / 1000;
                    this.sendEmailBtnText = `重新获取(${parseInt(hadTime)})`;
                    if (hadTime < 0) {
                        clearInterval(this.sendEmailInterval);
                        this.sendEmailStatus = 2;
                        this.sendEmailBtnText = `重新获取`;
                        // 这里还要看一下是不是空
                        if (this.signUp.email != '') {
                            this.sendEmailBtnDisabled = false;
                        }
                    }
                }, 100);
                // 调用发送邮件的接口
            }
        }
    },
}
</script>
