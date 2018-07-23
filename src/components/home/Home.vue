<template>
    <div class="bg">
      <Overview></Overview>
      <Detail></Detail>
    </div>
</template>
<script>
    import Overview from "./Overview"
    import Detail from "./Detail"
    import axios from "axios"
    export default {
      name: 'Home',

      components:{
        Overview,
        Detail
      },
      // created(){
      //   axios.post("http://192.168.2.58:8090/login", {username: 'admin', passwd: '1234567'}).then(res => {
      //     if (res) {
      //       console.log("login:",JSON.stringify(res))
      //       axios.get("http://192.168.2.58:8090/test", {}).then(r => {
      //         console.log("test:",JSON.stringify(r))
      //       }).catch(err => {
      //         console.log("test err:",JSON.stringify(err))
      //       });
      //
      //       axios.post("http://192.168.2.58:8090/index/total/admin", {st:"2018-07-19 19:15:20",et:"2018-07-19 19:15:20"}).then(r => {
      //         console.log("total:",JSON.stringify(r))
      //       }).catch(err => {
      //         console.log("total err:",JSON.stringify(err))
      //       })
      //     }
      //   })
      // }

    }
</script>
<style scoped>
  .bg{
    background-color: white;
    width: 100%;
    height: 100%;
  }
</style>
