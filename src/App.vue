<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
  .size{
    width: 100%;
    height: 100%;
  }
  html,body{
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  #app {
    .size;
  }

  .ivu-spin-fix {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 8;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,.1);
  }
</style>
