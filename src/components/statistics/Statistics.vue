<template>
  <div class="bg" >
    <div class="query">
      <label>起始时间：</label><DatePicker v-model="startTime" type="date" placeholder="请选择开始时日期" style="width: 200px"></DatePicker>
      <label>截止时间：</label><DatePicker v-model="endTime" type="date" placeholder="请选择截止日期" style="width: 200px"></DatePicker>
      <label>任务ID：</label><Input placeholder="账号名称" v-model="taskId" style="width: 200px;margin-right: 32px;"></Input>
      <Button type="primary" @click="queryTask()" >查询</Button>
    </div>
    <div>
      <Table stripe :columns="columns" :data="statsList" ellipsis="true" style="margin-bottom: 16px"></Table>
      <Page :total="statsCount"  show-elevator @on-change="queryTask"></Page>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../libs/timeUitls";
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'

  export default {
    name:"stats",
    created(){
      this.queryTask();

      this.columns = this.columnsNormal.concat(this.columnsAdmin).concat(this.action);
    //  this.columns = this.columnsNormal;

    },
    computed: {
      ...mapState({
        statsCount: state => state.statistics.statsCount,
        statsList: state => state.statistics.statsList,
        accountId:state=>state.user.accountId,
      })
    },
    methods:{
      ...mapActions([
        'handleStatisticsCount',
        'handleStatisticsList',
      ]),
      queryTask(p){

        var st = formatDate(this.startTime).split(" ")[0] + " 00:00:00";
        var et = formatDate(this.endTime).split(" ")[0] +" "+ formatDate(this.endTime).split(" ")[1];


        var data = {st:st, et:et, accountId:this.accountId}
        console.log(data)
        this.handleStatisticsCount(data).then(res=>{
          console.log(res)
        }, err=>{})
        if(p!=undefined){
          this.page = p;
        }

        var params = {st:st,et:et,page:this.page,pageSize:this.pageSize,accountId:this.accountId}
        console.log(params)
        this.handleStatisticsList( params).then(res=>{
          console.log(res)
        }, err=>{})
      }


    },
    data () {
      return {
        startTime:new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) ,
        endTime:new Date(),
        taskId:"",
        page:1,
        pageSize:10,
        columns:[],
        columnsNormal: [
          {
            title: '发送编号',
            key: 'taskId'
          },
          {
            title: '开始发送时间',
            key: 'st'
          },
          {
            title: '发送任务名称',
            key: 'taskName'
          },
          {
            title: '提交数量',
            key: 'preSend'
          },
          {
            title: '发送量',
            key: 'send'
          },
          {
            title: '发送成功',
            key: 'sendSuc'
          },
          {
            title: '发送状态',
            key: 'status'
          }
        ],
        columnsAdmin: [
          {
            title: '点击量',
            key: 'click'
          },
          {
            title: '点击用户数',
            key: 'clickUV'
          },
          {
            title: '结算消耗',
            key: 'cost'
          },
        ],
        action:{title:"操作",
          key:"action",
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    // this.modifySubAccount(params.index)
                    this.$router.push({name:'data_details',
                      params:{ st:this.startTime,
                        et:this.endTime,
                        taskId:this.statsList[params.index].taskId}});
                  }
                }
              }, '详情')
            ]);
          }
        }
      }
    },
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
