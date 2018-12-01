<template>
    <div>
      <div class="left">
        <p class="ptitle">今日发送</p>
        <br>
        <div class="inner">
          <p class="pNum">{{send}}</p>
          <p>发送量</p>
        </div>
        <div class="inner">
          <p class="pNum">{{sendSuc}}</p>
          <p>发送成功</p>
        </div>
      </div>
      <div class="right">
        <p class="ptitle">发送余量</p>
        <br>
        <div class="inner">
          <div class="pNum" style="color: darkgrey">{{remain}}</div>
          <div>剩余</div>
        </div>
      </div>
    </div>
</template>

<script>
    import { mapActions,mapState,mapGetters } from 'vuex'
    import {timeAgo, formatDate} from "../../libs/timeUitls";
    export default {
        name: "Overview",
        methods:{
          ...mapActions([
            'handleTotal'
          ]),
        },
        computed:{
          ...mapState({
            send:state=>state.home.send,
            sendSuc:state=>state.home.sendSuc,
            remain:state=>state.home.remain,
            // accountId:state=>state.user.accountId,
          }),
          ...mapGetters(['accountId']),

        },
        mounted(){
          var st = st = formatDate(new Date().getTime());
          var et = formatDate(new Date().getTime());
          st = st.split(" ")[0]+" 00:00:00";
          console.log("------"+this.accountId)
//          this.handleTotal( {accountId:this.accountId, st:st, et:et});
        }
    }
</script>

<style scoped>
  .left{
    width: 45%;
    float: left;
    margin: 5% 0% 5% 0%;
  }
  .right{
    width: 40%;
    float: left;
    margin: 5% 0% 5% 0%;
    padding-left: 5%;
    border-left: 1px solid #c3c3c3;
  }
  .ptitle{
    margin-left: 3%;
  }
  .pNum{
    font-size: 25px;
    align: center;
  }

  .inner{
    width: 50%;
    float: left;
    text-align:center
  }


</style>
