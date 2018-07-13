<template>
    <div class="bg">
      <Overview></Overview>
      <Detail></Detail>
    </div>
</template>
<script>
    import Overview from "./Overview"
    import Detail from "./Detail"
    export default {
      name: 'Home',

      components:{
        Overview,
        Detail
      }

    }
</script>
<style scoped>
  .bg{
    background-color: white;
    width: 100%;
    height: 100%;
  }
</style>
