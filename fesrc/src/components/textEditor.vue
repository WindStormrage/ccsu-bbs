<style scoped lang="scss">
.editor {
  margin: 30px 0;
  position: relative;
  .mask {
    height: calc(100% + 80px);
    width: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
    z-index: 2;
    margin-bottom: 50px;
    a {
      font-size: 50px;  
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  /deep/ .ql-editor {
    height: 300px;
    overflow-y: auto;
  }
  .title {
    margin: 10px;
  }
  .titleInput {
    width: 300px;
    margin: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .label {
      font-size: 18px;
    }
    .input {
      width: calc(100% - 50px);
    }
  }
  .submit {
    float: right;
    margin: 30px;
    .tag {
      margin-right: 20px;
    }
  }
  .customBar {
    position: absolute;
    left: 360px;
    bottom: 307px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
<template>
  <div class="editor">
    <div v-if="!isLogin" class="mask">
      <a href="/login">请 登 录</a>
    </div>
    <h1 class="title" v-if="type === 1">发帖</h1>
    <div class="titleInput" v-if="type === 1">
      <label class="label">标题</label>
      <el-input class="input" v-model="title" placeholder="请输入标题"></el-input>
    </div>
    <div class="customBar">
      <p id="custom-button" @click="remind">＠</p>
    </div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption">
    </quill-editor>
    <div class="submit">
      <el-tag
        class="tag"
        v-if="tag !== ''"
        closable
        @close="clearTag">
        {{tag}}
      </el-tag>
      <el-checkbox v-model="anonymous">匿名发表</el-checkbox>
      <el-button type="primary" @click="submit()">发表</el-button>
    </div>
  </div>
</template>

<script>
import VueQuillEditor, { Quill } from "vue-quill-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import Sycn from "./../js/util/sync.js";
export default {
  props: {
    type: {
      type: Number, // 1为发帖 2为跟帖
      default: 1
    }
  },
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large"] }],
            ["bold", "italic"],
            [{ list: "ordered" }, { list: "bullet" }],
            ['link', 'image', 'video'],
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white"
            },
            modules: ["Resize", "DisplaySize", "Toolbar"]
          }
        }
      },
      anonymous: false,
      title: '',
      tag: '',
      isLogin: false,
      tagId: 0,
    };
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      this.isLogin = true;
    }
  },
  methods: {
    clearTag() {
      this.tag = '';
    },
    setTag(data) {
      this.tag = `回复${data.floor}`;
      this.tagId = data.id
    },
    submit() {
      if (this.type === 1 && this.title === '') {
        this.$message({
          message: '请填写标题!',
          type: 'warning'
        });
        return;
      }
      if (this.content === '') {
        this.$message({
          message: '请填写帖子正文!',
          type: 'warning'
        });
        return;
      }
      // 如果是发表帖子的话
      const sync = new Sycn();
      if (this.type === 1) {
        const url = this.$route.params.label_url;
        sync.POST("/api/list/newPost", {
                url,
                content: this.content,
                title: this.title,
                anonymous: this.anonymous
            })
            .then(data => {
              if (data.errno === 0) {
                this.$message({
                  showClose: true,
                  message: '发表成功',
                  type: 'success'
                });
                this.$router.push(`/list/${url}/${data.data.id}`)
              } else {
                this.$message({
                  showClose: true,
                  message: data.errmsg,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: '服务器错误,请稍后重试!',
                type: 'error'
              });
            });
      } else {
        const postId = this.$route.params.post_id;
        sync.POST("/api/post/newComment", {
                post_id: postId,
                content: this.content,
                anonymous: this.anonymous,
                quote: this.tagId
            })
            .then(data => {
              if (data.errno === 0) {
                this.$message({
                  showClose: true,
                  message: '发表成功',
                  type: 'success'
                });
                this.$router.go(0)
              } else {
                this.$message({
                  showClose: true,
                  message: data.errmsg,
                  type: 'error'
                });
              }
            })
            .catch(err => {
              this.$message({
                showClose: true,
                message: '服务器错误,请稍后重试!',
                type: 'error'
              });
            });
      }
    },
    remind() {
      this.content += '<@用户名>'
    }
  },
};
</script>
