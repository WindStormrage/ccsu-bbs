<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input type="file" name="" id="">
    <br>
    <img :src="url">
    <br>
    <button @click="loadFile()">loadFile</button>
    <br>
    <button @click="sendMail()">sendMail</button>
    <br> -->
    app.vue
    <router-link to="/home">Home</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import Sycn from './js/util/sync.js'

export default {
  name: 'app',
  components: {
    // HelloWorld,
  },
  data() {
    return {
      url: ''
    }
  },
  mounted() {
    // const sync = new Sycn();
    // sync.GET('/test.json')
    //   .then(data => {
    //     console.log(data);
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //   })
  },
  methods: {
    // loadFile() {
    //   const sync = new Sycn();
    //   var input = document.querySelector('input[type="file"]')
    //   console.log(input.files[0]);
    //   if(input.files[0]) {
    //     sync.UPLOAD('/api/uploadImage', input.files[0], 'file', {
    //       user: 'xhy'
    //     })
    //       .then(data => {
    //         this.url = data.data.filepath;
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   }
    // },
    // sendMail() {
    //   const sync = new Sycn();
    //   if (this.url != '') {
    //     sync.POST('/api/sendMail', {
    //       html: `<h1>这里是一张图片</h1><br><img src="http://www.xiedashuaige.cn:8080/static/img/ex_logo.png">`,
    //       title: '请接收图片',
    //       emailTo: '695729033@qq.com'
    //     })
    //       .then(data => {
    //         console.log(data);
    //       })
    //       .catch(err => {
    //         console.log(err);
    //       });
    //   } else {
    //     console.log('no img');
    //   }
    // }
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
