<template>
  <div id="app">
    <elf-body
      placement="top"
      theme="light"
      :title="title"
      :content="content"
      :custom-component="renderMsg"
      custom-ref="music">
    </elf-body>
    <music id="468490579" ref="music" @trigger="trigger"></music>
    <!-- <a ref="music" href="https://google.com" target="_blank"> GOOGLE </a> -->
  </div>
</template>

<script>
import ElfBody from '../packages/componets/main'
import Music from './music'

export default {
  name: 'app',

  components: { ElfBody, Music },

  data () {
    return {
      title: '这里是标题',
      content: '这里是一些内容'
    }
  },

  methods: {
    trigger () {
      alert('trigger')
    },

    renderMsg (h) {
      return h('h1', 'MSG')
    }
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
}

body {
  position: absolute;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

a {
  padding: 16px;
  color: #666;
  display: block;
  width: 400px;
  text-align: left;
}
</style>
