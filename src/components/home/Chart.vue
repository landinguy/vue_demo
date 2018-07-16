<template>
  <div class="chart">
    <div id="myChart"></div>
  </div>
</template>
<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts');
  // 引入饼图组件
  require('echarts/lib/chart/line');
  // 引入提示框和图例组件
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/legend');

  import { mapState } from 'vuex'

  export default {
    name: 'chart',
    data:function () {
      return {
        chart:null,
        options:{
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            type: 'category',
            data: ['00:00','01:00','02:00','03:00', '04:00', '05:00','06:00']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [2000, 5000, 2000, 4000, 2000, 5000],
            type: 'line'
          }]
        }
      };
    },
    methods:{
      reloadChart(){
        this.options.series[0].data = this.yData;
        this.options.xAxis.data = this.xData;
        this.chart.setOption(this.options);
      }
    },
    computed:{
      ...mapState({
        sortedData: state => state.home.sortedData,

      }),
      xData(){
        var data = []
        for(var i = 0; i < this.sortedData.length;i++){
          if(this.timeFormat==0 || this.timeFormat==1){
            data.push(this.sortedData[i].timePoint.split(" ")[1])
          }
          else
          {
            data.push(this.sortedData[i].timePoint.split(" ")[0])
          }
        }
        return data;
      },
      yData(){
        var data = []
        for(var i = 0; i < this.sortedData.length;i++){
          data.push(this.sortedData[i].sendSuc)
        }
        return data;
      },

      timeFormat(){
        return this.$parent.value;
      }
    },
    mounted(){
      var myChart = echarts.init(document.getElementById("myChart"),"light");
      myChart.setOption(this.options);
      this.chart = myChart;
    }
  }
</script>
<style>
  #myChart {
    width: 90%;
    height: 400px;
  }
</style>
