<style scoped lang="scss">
.userInfo {
  width: 380px;
  margin-top: 50px;
  /deep/ .el-form-item__label {
    padding-right: 40px;
    font-size: 18px;
  }
  .avatar-uploader {
    margin-left: 25px;
    .el-upload {
      border: 1px dashed #666;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 130px;
      height: 130px;
      line-height: 130px;
      text-align: center;
      border: 1px dashed #666;
      border-radius: 50%;
    }
    .avatar {
      width: 130px;
      height: 130px;
      display: block;
      border: 1px dashed #666;
      border-radius: 50%;
    }
  }
}
</style>
<template>
  <div>
    <el-form
      :model="userInfo"
      :rules="userInfoRules"
      ref="userInfo"
      label-width="160px"
      class="userInfo"
    >
      <el-form-item label="头像" prop="avatar">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:8666/api/uploadImage"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="name">
        <el-input v-model="userInfo.name"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="userInfo.gender" label="1">男</el-radio>
        <el-radio v-model="userInfo.gender" label="2">女</el-radio>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker v-model="userInfo.birthday" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="学号" prop="sId">
        <el-input v-model="userInfo.sId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userInfo')">提交修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userInfo: {
        avatar: "",
        name: "",
        gender: "",
        birthday: "",
        sId: "",
        email: "",
        phone: ""
      },
      userInfoRules: {
        avatar: [{ required: true, message: "请选择图片", trigger: "change" }],
        name: [
          { required: true, message: "请输入用户名", trigger: "change" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符",
            trigger: "change"
          }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        birthday: [
          { required: true, message: "点击选择日期", trigger: "change" }
        ],
        // sId: [
        //   { required: true, message: "请输入学号", trigger: "change" },
        //   { min: 10, max: 15, message: "请输入正确的学号", trigger: "change" }
        // ],
        // email: [
        //     { required: true, message: '请输入邮箱', trigger: 'change' },
        // ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "change" },
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.userInfo.avatar = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 和 PNG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传头像图片大小不能超过 1MB!");
      }
      return isJPG && isLt1M;
    }
  }
};
</script>