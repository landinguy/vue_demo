<template>
    <div class="bg">
      <Overview></Overview>
      <Detail></Detail>
    </div>
</template>
<script>
    import Overview from "./Overview"
    import Detail from "./Detail"
    // import {post} from "../../api/ax";
    export default {
      name: 'Home',

      components:{
        Overview,
        Detail
      },
      created(){
        // post("/login", {username: 'admin', passwd: '123456'}).then(res => {
        //   console.log("$$$$$$$$$$$$$$",res)
        // })
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
