<template>
  <div>
    <Tabs value= 0 :animated="false" @on-click="refreshData" class="bg">
      <TabPane label="今天" name=0 ></TabPane>
      <TabPane label="昨天" name=1 ></TabPane>
      <TabPane label="近7天" name=2 ></TabPane>
      <TabPane label="近30天" name=3 ></TabPane>
    </Tabs>
    <Chart ref="chart" :timeFormat="value"></Chart>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  import {timeAgo, formatDate} from "../../libs/timeUitls";
  import Chart from "./Chart"
    export default {

        name: "Detail",
        data(){
          return{
            value:0
          }
        },
        components:{
          Chart
        },
        methods:{
          ...mapActions([
            'handleTrend'
          ]),

          refreshData(value){
            this.value = value;
            const self = this;
            var st = "";
            var et = formatDate(new Date().getTime());
            if(value==0){
              st = formatDate(new Date().getTime())
            }
            else if(value==1){
              st = formatDate(timeAgo(1));
            }
            else if(value==2){
              st = formatDate(timeAgo(7));
            }
            else if(value==3){
              st = formatDate(timeAgo(30));
            }
            st = st.split(" ")[0]+" 00:00:00";

            console.log(st, et);

            this.handleTrend("",st,et).then(function () {
              self.$refs.chart.reloadChart();
            }, function () {
              self.$refs.chart.reloadChart();
            });


          },
      },
      created(){
          this.refreshData(0)
      }
    }

</script>

<style scoped>
  .bg{
    clear: both;
  }
</style>
