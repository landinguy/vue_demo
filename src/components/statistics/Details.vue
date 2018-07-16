<template>
  <div class="bg" >
    <div class="query">
      <label>起始时间：</label><DatePicker v-model="startTime" type="date" placeholder="请选择开始时日期" style="width: 200px"></DatePicker>
      <label>截止时间：</label><DatePicker v-model="endTime" type="date" placeholder="请选择截止日期" style="width: 200px"></DatePicker>
      <label>任务ID：</label><Input placeholder="账号名称" v-model="taskId" style="width: 200px;margin-right: 32px;"></Input>
      <Button type="primary" @click="queryTask()" >查询</Button>
    </div>
    <div>
      <Table stripe :columns="columns" :data="statsDetailList" ellipsis="true" style="margin-bottom: 16px"></Table>
      <Page :total="statsDetailCount" show-elevator @on-change="queryTask"></Page>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../libs/timeUitls";
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  export default {
    created(){
      console.log(this.$route.params.et, this.$route.params.taskId)

      if(undefined!=this.$route.params.st){
        this.startTime = this.$route.params.st;
      }
      if(undefined!=this.$route.params.et){
        this.endTime = this.$route.params.et;
      }
      if(undefined!=this.$route.params.taskId){
        this.taskId = this.$route.params.taskId;
      }
      this.queryTask();
    },
    computed: {
      ...mapState({
        statsDetailCount: state => state.statistics.statsDetailCount,
        statsDetailList: state => state.statistics.statsDetailList,
      })
    },
    methods:{
      ...mapActions([
        'handleStatisticsDetailCount',
        'handleStatisticsDetailList',
      ]),
      queryTask(p){
        var st = formatDate(this.startTime).split(" ")[0];
        var et = formatDate(this.endTime).split(" ")[0];
        this.handleStatisticsDetailCount(st, et, "" )
        if(p!=undefined){
          this.page = p;
        }
        console.log(st, et, this.page, this.pageSize,)
        this.handleStatisticsDetailList( st, et, this.page, this.pageSize,"")
      }


    },
    data () {
      return {
        startTime:new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) ,
        endTime:new Date(),
        taskId:"",
        page:1,
        pageSize:10,
        columns: [
          {
            title: '手机号码',
            key: 'tel'
          },
          {
            title: '提交时间',
            key: 'commitTs'
          },
          {
            title: '发送时间',
            key: 'sendTs'
          },
          {
            title: '发送任务名称',
            key: 'taskName'
          },
          {
            title: '模板主题',
            key: 'mouldTopic'
          },
          {
            title: '发送结果',
            key: 'taskStatus'
          }
        ],

      }
    }
  }
</script>

<style scoped>

  .bg{
    background-color: white;
    padding: 16px;
  }
  .query{
    padding-bottom: 16px;
    padding-top: 16px;
  }
</style>

