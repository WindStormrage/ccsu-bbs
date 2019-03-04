<style scoped lang="scss">
.right {
    height: 100%;
    width: 270px;
    float: right;
    margin-top: 20px;
    position: sticky;
    right: 60px;
    top: 0px;
    .box {
        height: 310px;
        width: 270px;
        border: 1px solid #666;
        margin-top: 30px;
        h1 {
            margin: 15px;
        }
        hr {
            width: 120px;
            margin: -15px 0 -15px 15px;
        }
        p {
            margin: 20px;
            font-size: 16px;
            span {
                display: block;
                font-weight: bold;
                font-size: 17px;
            }
        }
    }
    .backTop {
        right: 280px !important;
    }
}
</style>
<template>
    <div class="right">
        <div class="box">
            <h1>消息公告</h1>
            <hr>
            <p>热烈庆祝ccsuBBS正式上线</p>
        </div>
        <div class="box">
            <h1>消息公告</h1>
            <hr>
            <p>
                <span>本站简介</span>
                长沙学院论坛系统
                <span>作者介绍</span>
                15级数媒一班谢晗阳,现工作于北京360.
                <span>联系邮箱</span>
                windstormrage@xiedashuaige.cn
                <span>加入我们</span>
                发送自我介绍到本站邮箱ccsu_bbs@xiedashuaige.cn
            </p>
        </div>
        <BackTop class="backTop"></BackTop>
    </div>
</template>
<script>
export default {
}
</script>
