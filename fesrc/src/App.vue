<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <input type="file" name="" id="">
    <button @click="loadFile()">file</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Sycn from './js/util/sync.js'

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  mounted() {
    const sync = new Sycn();
    sync.GET('/test.json')
      .then(data => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  },
  methods: {
    loadFile() {
      const sync = new Sycn();
      var input = document.querySelector('input[type="file"]')
      console.log(input.files[0]);
      if(input.files[0]) {
        sync.UPLOAD('', input.files[0], 'img', {
          user: 'xhy'
        })
          .then(data => {
            console.log(data);
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
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
