<style scoped lang="scss">
.editor {
  margin: 30px 0;
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
    margin: 20px;
  }
}
</style>
<template>
  <div class="editor">
    <h1 class="title">发帖</h1>
    <div class="titleInput">
      <label class="label">标题</label>
      <el-input class="input" v-model="input" placeholder="请输入标题"></el-input>
    </div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    ></quill-editor>
    <div class="submit">
      <el-checkbox v-model="anonymous">匿名发表</el-checkbox>
      <el-button type="primary">发表</el-button>
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
  data() {
    return {
      content: "<h2>请输入...</h2>",
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
      anonymous: false
    };
  },
  // manually control the data synchronization
  // 如果需要手动控制数据同步，父组件需要显式地处理changed事件
  methods: {
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  mounted() {
    console.log("this is current quill instance object", this.editor);
  }
};
</script>