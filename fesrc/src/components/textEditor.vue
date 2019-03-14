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
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
    ></quill-editor>
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
            ["link", "image"]
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
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    // onEditorBlur(quill) {
    //   console.log("editor blur!", quill);
    // },
    // onEditorFocus(quill) {
    //   console.log("editor focus!", quill);
    // },
    // onEditorReady(quill) {
    //   console.log("editor ready!", quill);
    // },
    // onEditorChange({ quill, html, text }) {
    //   console.log("editor change!", quill, html, text);
    //   this.content = html;
    // },
    clearTag() {
      this.tag = '';
    },
    setTag(data) {
      this.tag = `回复${data}楼`;
    }
  },
  mounted() {
    if (localStorage.getItem("userInfo")) {
      this.isLogin = true;
    }
  },
  methods: {
    submit() {
      console.log(this.content);
    }
  },
};
</script>