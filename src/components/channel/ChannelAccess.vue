<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="4" style="text-align: right">
      <span class="bold">通道提供商</span>
      </Col>
      <Col span="4">
      <Input v-model="name" placeholder="输入通道供应商" clearable/>
      </Col>
      <Col span="4" style="text-align: right">
      <span class="bold">通道号</span>
      </Col>
      <Col span="4">
      <Input v-model="channelNo" placeholder="输入数字，支持模糊匹配" clearable/>
      </Col>
      <Col span="8" style="text-align: center">
      <Button type="primary" @click="search">
        查询
      </Button>
      <Button type="ghost" @click="clear" style="margin-left: 20px">
        清空
      </Button>
      </Col>
    </Row>
    <div style="margin-top: 40px">
      <Table stripe border :columns="columns" :data="tableData"></Table>
      <div style="margin-top: 20px;text-align: right">
        <Page :total="100" show-elevator @on-change="changePage"></Page>
      </div>
    </div>
    <Modal v-model="accessInfoModal">
      <p slot="header" style="text-align:center">
        <span>接入信息</span>
      </p>
      <div>
        <Form ref="infoForm" :model="accessData" :label-width="100">
          <FormItem label="cpid" prop="v0">
            <Input v-model="accessData.v0" class="input_len" disabled/>
          </FormItem>
          <FormItem label="计费类型" prop="v1">
            <Input v-model="accessData.v1" class="input_len" disabled/>
          </FormItem>
          <FormItem label="账户余量 / 条" prop="v2">
            <Input v-model="accessData.v2" class="input_len" disabled/>
          </FormItem>
          <FormItem label="密钥" prop="v3">
            <Input v-model="accessData.v3" class="input_len" disabled/>
          </FormItem>
          <FormItem label="Token" prop="v4">
            <Input v-model="accessData.v4" class="input_len" disabled/>
          </FormItem>
          <FormItem label="API登录名" prop="v5">
            <Input v-model="accessData.v5" class="input_len" disabled/>
          </FormItem>
          <FormItem label="API密钥" prop="v6">
            <Input v-model="accessData.v6" class="input_len" disabled/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" @click="close">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import {showTip} from '@/libs/util'

  export default {
    name: 'ChannelAccess',
    data() {
      return {
        name: '',
        channelNo: '',
        columns: [
          {
            title: '通道供应商',
            key: 'col1',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.col1);
            }
          }, {
            title: '运营商支持',
            key: 'col2',
            align: 'center',
            ellipsis: true
          }, {
            title: '接入通道号',
            key: 'col3',
            align: 'center',
            ellipsis: true
          }, {
            title: '可用余量（条）',
            key: 'col4',
            align: 'center',
            ellipsis: true
          }, {
            title: '并发能力（条/秒）',
            key: 'col5',
            align: 'center'
          }, {
            title: '免流能力',
            key: 'col6',
            align: 'center'
          }, {
            title: '成本价（元）',
            key: 'col7',
            align: 'center'
          }, {
            title: '业务类型',
            key: 'col8',
            align: 'center'
          }, {
            title: '通道类型',
            key: 'col9',
            align: 'center'
          }, {
            title: '操作',
            key: 'op',
            align: 'center',
            width: 200,
            render: (h, params) => {
              const $vue = this;
              return h('div', [
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  on: {
                    click: function () {
                      $vue.accessInfoModal = true;
                    }
                  }
                }, '接入信息'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    "margin-left": '10px'
                  },
                  on: {
                    click: function () {
                      $vue.$router.push({
                        name: 'channel_manage'
                      })
                    }
                  }
                }, '分配')
              ]);
            }
          }
        ],
        tableData: [],
        accessInfoModal: false,
        accessData: {
          v0: '',
          v1: '',
          v2: '',
          v3: '',
          v4: '',
          v5: '',
          v6: ''
        }
      }
    },
    methods: {
      close() {
        this.accessInfoModal = false;
      },
      clear() {
        this.name = '';
        this.channelNo = '';
      },
      search() {

      },
      changePage(n) {
        alert(n)
      }
    },
    mounted() {
      for (var i = 0; i < 10; i++) {
        var row = {
//        id: 1,
          col1: 'col1',
          col2: 'col2',
          col3: 'col3',
          col4: 'col4',
          col5: 'col5',
          col6: 'col6',
          col7: 'col7',
          col8: 'col8',
          col9: 'col9',
          op: ''
        };
        row.id = i;
        this.tableData.push(row);
      }
    }
  }
</script>
<style lang="less">
  .input_len {
    width: 360px;
  }

  .bold {
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin-right: 15px;
  }
</style>
