<template>
  <div>
    <Row>
      <Col span="12">
        <Input v-model="fastSearchContent" placeholder="快速查询">
        <Select v-model="fastSearchContentStatus" slot="prepend" style="width: 100px">
          <Option value="audit">审核中</Option>
          <Option value="auditFail">审核失败</Option>
          <Option value="expired">已失效</Option>
          <Option value="waitingToStart">等待开始</Option>
          <Option value="month">正在发送</Option>
          <Option value="month">暂停中</Option>
          <Option value="month">发送完成</Option>
          <Option value="month">发送终止</Option>
        </Select>
        <Button slot="append" icon="ios-search"></Button>
        </Input>
      </Col>
      <Col span="4" offset="8" style="text-align: right">
      <Button type="primary" @click="toTaskPage">
        <Icon type="plus"></Icon>
        新建发送
      </Button>
      </Col>
    </Row>

    <br>
    <Table border :columns="recordColumns" :data="recordData" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="100" :current="1" @on-change="changePage" show-elevator></Page>
      </div>
    </div>

    <Modal v-model="deleteModal" ok-text="确认删除" @on-ok="decideDeleteTask">
      <p style="margin-top: 25px;text-align: center">确认要删除发送任务吗？--{{modalTaskName}}</p>
      <p style="margin-top: 25px;text-align: center" v-if="showDeleteHint">该发送将被隐藏而不再显示，但该发送已产生的数据不会丢失</p>
    </Modal>
    <Modal v-model="terminateModal" ok-text="确认终止发送" @on-ok="decideTerminateTask">
      <p style="margin-top: 25px;text-align: center">确认要终止发送任务吗？--{{modalTaskName}}</p>
      <p style="margin-top: 25px;text-align: center">请注意，被终止发送的任务，不能继续发送</p>
    </Modal>
  </div>
</template>

<script>
  import axios from "axios";
  import {mapMutations} from 'vuex'
  export default {
    name: "record",
    data() {
      return {
        fastSearchContent:'',
        fastSearchContentStatus:'',
        recordColumns: [],
        deleteModal:false,
        showDeleteHint:false,
        terminateModal: false,
        modalIndex:-1,
        modalTaskName:'',
        recordData: [],
      };
    },
    methods: {
      ...mapMutations([
        'setTaskId',
        'setTaskOperation'
      ]),
      toTaskPage() {
        this.$router.push({name:'new_task'})
      },
      formatDate (str) {
        let date = new Date(str);
        const y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      changePage () {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      },
      getSendRecordData(pageNo) {
        let temp = this;
        axios.post("/send/task/list/1", {
          "status": "",
          "pageNo": pageNo,
          "pageSize": 20
        }).then(function (response) {
          // console.log(response.data.res);
          temp.recordData = response.data.res;
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      showModify(index) {
        console.log("showModify: "+index);
        this.setTaskOperation(this.recordData[index].task_id);
        this.$router.push({name:'new_task'})
      },
      showCopy(index) {
        console.log("showCopy: "+index);
        this.setTaskOperation(this.recordData[index].task_id);
        this.$router.push({name:'new_task'})
      },
      showSendStatistics(index) {
        this.$router.push({name:'data_statistics'})
      },
      showDetail(index) {
        console.log(index);
        console.log(this.recordData[index].task_id);
        this.setTaskId(this.recordData[index].task_id);
        this.$router.push({name:'new_task'})
      },
      showDeleteModal(index) {
        this.deleteModal = true;
        this.modalIndex = index;
        this.modalTaskName = this.recordData[index].name;
        let status = this.recordData[index].status;
        this.showDeleteHint = status === '发送完成' || status === '发送失败';
      },
      decideDeleteTask() {
        let vue = this;
        axios.post("/send/task/delete/{taskId}")
          .then(function (response) {
            console.log(response);
            vue.recordData.splice(vue.modalIndex, 1);
            vue.$Message.success('任务删除成功')
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      showTerminateModal(index) {
        this.terminateModal = true;
        this.modalIndex = index;
        this.modalTaskName = this.recordData[index].name;
      },
      decideTerminateTask() {
        let vue = this;
        axios.post("/send/task/stop/{taskId}")
          .then(function (response) {
            let result = response.data.res.result;
            console.log(result);
            if (result === 'success') {
              vue.recordData[vue.modalIndex].status = '发送终止';
              vue.$Message.success('终止任务成功')
            } else {
              vue.$Message.error('终止任务失败');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mounted() {
      this.recordColumns = [
        {title: '发送编号', key: 'task_id',},
        {title: '发送任务名称', key: 'name'},
        {title: '模板名称', key: 'template_name'},
        {title: '提交数量', key: 'receiver_amount'},
        {title: '预定发送时间', key: 'start_ts', render: (h, params) => {return h('div', this.formatDate(this.recordData[params.index].start_ts));}},
        {title: '状态', key: 'status'},
        {title: '操作', key: 'action', width: 350, align: 'center',
          render: (h, params) => {
            let status = params.row.status;
            // console.log("aaaaaa: "+status);
            let hint = '';
            let btnArray = [];
            if (status === '暂停中' || status === '审核中' || status === '审核失败' || status === '已失效') {
              if (status === '暂停中') {hint = '此刻不在发送时段内，发送自动暂停或今日发送已达上限，发送自动暂停';}
              if(status === '审核中') {hint = '该任务所用模板正在审核中，审核通过后该任务将自动生效执行';}
              if(status === '审核失败') {hint = '该任务所用模板未能通过审核，请修改模板重新审核';}
              if(status === '已失效') {hint = '该任务所用模板已失效，请换用其他模板或发送时间已过期';}
              btnArray.push(h('Poptip',{props: {trigger:'hover',content:hint}, style: {marginRight: '10px'}},[
                h('Icon',{props: {type: 'information-circled'}, style: {color:'green',cursor:'pointer'}}),
              ]))
            }
            btnArray.push(h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showDetail(params.index)}}}, '查看'));
            if (status === '审核中' || status === '审核失败' || status === '已失效' || status === '等待开始') {
              btnArray.push(h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showModify(params.index)}}}, '修改'))
            }
            btnArray.push(h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showCopy(params.index)}}}, '复制'));
            if (status === '正在发送' || status === '暂停中' || status === '发送完成' || status === '发送终止') {
              btnArray.push(h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showSendStatistics(params.index)}}}, '数据'))
            }
            if (status === '审核中' || status === '审核失败' || status === '已失效' || status === '等待开始' || status === '发送完成' || status === '发送终止') {
              btnArray.push(h('Button', {props: {type: 'error', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showDeleteModal(params.index)}}}, '删除'))
            }
            if (status === '正在发送' || status === '暂停中') {
              btnArray.push(h('Button', {props: {type: 'ghost', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showTerminateModal(params.index)}}}, '终止'))
            }
            return h('div', btnArray);
          }
        }
      ];
      this.getSendRecordData();
    }
  }
</script>

<style scoped>

</style>
