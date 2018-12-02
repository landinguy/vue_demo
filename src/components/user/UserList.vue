<template>
  <div class="bg">
    <div class="sub">
      <div class="sel">
        <label>用户名称</label>
        <Input v-model="params.username" placeholder="输入用户名称" clearable class="width"/>
      </div>
      <div class="sel">
        <Button type="primary" @click="search">查询</Button>
        <Button type="ghost" @click="clear" style="margin-left: 16px">清空</Button>
      </div>
      <div style="clear: left"></div>
    </div>
    <div style="margin-top: 16px">
      <Table stripe border :columns="columns" :data="tableData" size="small"></Table>
      <Page :total="total" show-total show-elevator @on-change="changePage"
            style="margin-top: 16px;text-align: right"></Page>
    </div>
  </div>
</template>
<script>
  import {showTip, timestampToTime} from '@/libs/util'
  import url from '@/api/url'
  import {post, $del} from "@/api/ax"

  export default {
    name: 'UserList',
    data(){
      return {
        columns: [
          {
            title: '用户名',
            key: 'username',
            align: 'center',
            ellipsis: true,
            minWidth: 150,
            render: (h, params) => showTip(h, params.row.username)
          },
          {
            title: '创建时间',
            key: 'createTs',
            align: 'center',
            ellipsis: true,
            minWidth: 150,
            render: (h, params) => showTip(h, timestampToTime(params.row.createTs))
          },
          {
            title: '修改时间',
            key: 'updateTs',
            align: 'center',
            ellipsis: true,
            minWidth: 150,
            render: (h, params) => showTip(h, timestampToTime(params.row.updateTs))
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h, params) => {
            }
          }
        ],
        tableData: [],
        total: 0,
        params: {
          username: '',
          pageNo: 1,
          pageSize: 10
        },
      }
    },
    methods: {
      clear() {
        this.params.username = '';
      },
      changePage(n) {
        this.params.pageNo = n;
        this.getData();
      },
      getData() {
        post(url.getUser, this.params).then(res => this.tableData = res.data).catch(err => console.log(err));
      },
      getTotal(){
        const {pageNo, pageSize, ...rest} = this.params;
        post(url.countUser, rest).then(res => this.total = res.data).catch(err => console.log(err));
      },
      search() {
        this.params.pageNo = 1;
        this.getTotal();
        this.getData();
      },
    },
    mounted(){
      this.search();
    }
  }
</script>

<style scoped>
  .bg {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 16px;
  }

  .sub {
    width: 100%;
    background-color: white;
  }

  .sel {
    margin-top: 4px;
    padding-bottom: 4px;
    float: left;
  }

  label {
    margin-right: 8px;
    font-weight: bold;
    display: inline-block;
  }

  .width {
    width: 160px;
    margin-right: 32px;
  }
</style>
