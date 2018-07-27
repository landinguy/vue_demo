<template>
  <div class="bg">
    <Row>
      <Col span="12">
        <Input v-model="fastSearchContent" placeholder="快速查询">
        <Select v-model="fastSearchContentStatus" slot="prepend" style="width: 100px">
          <Option value="INVALID">已失效</Option>
          <Option value="WAITING">等待开始</Option>
          <Option value="SENT">发送完成</Option>
          <Option value="ABORT">发送终止</Option>
          <Option value="SENDING">正在发送</Option>
        </Select>
        <Button slot="append" icon="ios-search" @click="searchByStatus"></Button>
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
        <Page :total="total" :page-size="pageSize" :current="currentPage" @on-change="changePage" show-elevator></Page>
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
  import {mapMutations,mapGetters} from 'vuex';
  import {post} from "@/api/ax"

  export default {
    name: "record",
    data() {
      return {
        total:0,
        pageSize:2,
        currentPage:1,
        status:'',
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
       searchByStatus() {
          if (this.fastSearchContentStatus === '') {
            this.$Message.error("请选择需要查询的状态");
            return;
          }
         console.log("fastSearchContentStatus: " + this.fastSearchContentStatus);
         this.status = this.fastSearchContentStatus;
         this.getRecordInfo();
       },
      ...mapMutations([
        'setTaskId',
        'setTaskOperation'
      ]),
      reload () {
        window.location.reload(true);
      },
      toTaskPage() {
        this.$router.push({name:'new_task'})
      },
      formatStatus(str) {
        let statusStr = '';
        if (str === 'SENDING')
          statusStr =  '正在发送';
        else if (str === 'INVALID')
          statusStr = '已失效';
        else if (str === 'ABORT')
          statusStr = '发送终止';
        else if (str === 'WAITING')
          statusStr = '等待开始';
        else if (str === 'SENT')
          statusStr = '发送完成';
        else if (str === 'FAILED')
          statusStr = '发送失败';
        else
          statusStr = '';
        return statusStr;
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
      getRecordInfo() {
        this.currentPage = 1;
        this.getTaskCount();
        this.getSendRecordData(1);
      },
      getTaskCount() {
        let taskCount = {};
        if (this.status !== '') {
          taskCount = {status: this.status};
        }
        let vue = this;
        post("/task/count/" + this.accountId, taskCount).then(function (response) {
          console.log(response.data);
          vue.total = response.data.amount;
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      changePage (index) {
        // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
        console.log("change page: " + index);
        this.getSendRecordData(index);
      },
      getSendRecordData(pageNo) {
        let temp = this;
        let pagingData = {
          // "status": this.status === '' ? ,
          "pageNo": pageNo,
          "pageSize": this.pageSize
        };
        if (this.status !== '') {
          pagingData.status = this.status;
        }
        console.log("paging data: " + JSON.stringify(pagingData));
        post("/task/list/" + this.accountId, pagingData).then(function (response) {
          console.log(response.data);
          temp.recordData = response.data;
        })
          .catch(function (error) {
            console.log(error);
          });
      },
      showModify(index) {
        console.log("showModify: "+index);
        this.setTaskOperation(this.recordData[index].id);
        this.$router.push({name:'new_task'})
      },
      showCopy(index) {
        console.log("showCopy: "+index);
        this.setTaskOperation(this.recordData[index].id);
        this.$router.push({name:'new_task'})
      },
      showSendStatistics(index) {
        this.$router.push({name:'data_statistics'})
      },
      showDetail(index) {
        let message = this.recordData[index].id;

        console.log(index + " : " + message);
        console.log(message);
        this.setTaskId(this.recordData[index].id);
        this.$router.push({name:'new_task'})
      },
      showDeleteModal(index) {
        this.deleteModal = true;
        this.modalIndex = index;
        this.modalTaskName = this.recordData[index].name;
        let status = this.recordData[index].status;
        this.showDeleteHint = status === 'SENT' || status === '发送失败';
      },
      decideDeleteTask() {
        let vue = this;
        post("/task/delete/" + vue.recordData[vue.modalIndex].id,{accountId:this.accountId})
          .then(function (response) {
            console.log(response.data);
            if (response.code === 0) {
              // vue.getRecordInfo(1);
              vue.$Message.success('任务删除成功!');
              // vue.current = 1;
              vue.getRecordInfo();
            } else {
              vue.$Message.success('任务删除失败!')
            }
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
        post("/task/stop/" + vue.recordData[vue.modalIndex].id,{accountId:this.accountId})
          .then(value => {
            let result = value.code;
            if (result >= 0) {
              vue.recordData[vue.modalIndex].status = 'ABORT';
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
    computed:{
      ...mapGetters(['accountId'])
    },
    mounted() {
      this.recordColumns = [
        {title: '发送编号', key: 'id',},
        {title: '发送任务名称', key: 'name'},
        {title: '模板名称', key: 'templateName'},
        {title: '提交数量', key: 'receiverAmount'},
        {title: '预定发送时间', key: 'startTs', render: (h, params) => {return h('div', this.formatDate(this.recordData[params.index].startTs));}},
        {title: '状态', key: 'status',render: (h, params) => {return h('div', this.formatStatus(this.recordData[params.index].status))}},
        {title: '操作', key: 'action', width: 350, align: 'center',
          render: (h, params) => {
            let status = params.row.status;
            // console.log("aaaaaa: "+status);
            let hint = '';
            let btnArray = [];
            if (status === '暂停中' || status === '审核中' || status === '审核失败' || status === 'INVALID') {
              if (status === '暂停中') {hint = '此刻不在发送时段内，发送自动暂停或今日发送已达上限，发送自动暂停';}
              if(status === '审核中') {hint = '该任务所用模板正在审核中，审核通过后该任务将自动生效执行';}
              if(status === '审核失败') {hint = '该任务所用模板未能通过审核，请修改模板重新审核';}
              if(status === 'INVALID') {hint = '该任务所用模板已失效，请换用其他模板或发送时间已过期';}
              btnArray.push(h('Poptip',{props: {trigger:'hover',content:hint}, style: {marginRight: '10px'}},[
                h('Icon',{props: {type: 'information-circled'}, style: {color:'green',cursor:'pointer'}}),
              ]))
            }
            btnArray.push(h('Button', {props: {type: 'success', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showDetail(params.index)}}}, '查看'));
            if (status === '审核中' || status === '审核失败' || status === 'INVALID' || status === 'WAITING') {
              btnArray.push(h('Button', {props: {type: 'warning', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showModify(params.index)}}}, '修改'))
            }
            btnArray.push(h('Button', {props: {type: 'primary', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showCopy(params.index)}}}, '复制'));
            if (status === 'SENDING' || status === '暂停中' || status === 'SENT' || status === 'ABORT') {
              btnArray.push(h('Button', {props: {type: 'info', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showSendStatistics(params.index)}}}, '数据'))
            }
            if (status === '审核中' || status === '审核失败' || status === 'INVALID' || status === 'WAITING' || status === 'SENT' || status === 'ABORT') {
              btnArray.push(h('Button', {props: {type: 'error', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showDeleteModal(params.index)}}}, '删除'))
            }
            if (status === 'SENDING' || status === '暂停中') {
              btnArray.push(h('Button', {props: {type: 'ghost', size: 'small'}, style: {marginRight: '5px'}, on: {click: () => {this.showTerminateModal(params.index)}}}, '终止'))
            }
            return h('div', btnArray);
          }
        }
      ];
      this.getRecordInfo();
    }
  }
</script>

<style scoped>
  .bg{
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 16px;
  }
</style>
