<template>
  <div class="bg">
    <Row type="flex" justify="center">
      <Col span="4" style="text-align: right">
      <span class="bold">通道提供商</span>
      </Col>
      <Col span="4">
      <Input v-model="params.supplierName" placeholder="输入通道供应商" clearable/>
      </Col>
      <Col span="4" style="text-align: right">
      <span class="bold">通道号</span>
      </Col>
      <Col span="4">
      <Input v-model="params.channelNo" placeholder="输入数字，支持模糊匹配" clearable/>
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
        <Page :total="total" show-elevator @on-change="changePage"></Page>
      </div>
    </div>
    <Modal v-model="accessInfoModal">
      <p slot="header" style="text-align:center">
        <span>接入信息</span>
      </p>
      <div>
        <Form ref="infoForm" :model="accessData" :label-width="100">
          <FormItem label="cpid" prop="cpid">
            <Input v-model="accessData.cpid" class="input_len" disabled/>
          </FormItem>
          <FormItem label="计费类型" prop="billingType">
            <Input v-model="accessData.billingType" class="input_len" disabled/>
          </FormItem>
          <FormItem label="账户余量 / 条" prop="remainder">
            <Input v-model="accessData.remainder" class="input_len" disabled/>
          </FormItem>
          <FormItem label="密钥" prop="accountSecret">
            <Input v-model="accessData.accountSecret" class="input_len" disabled/>
          </FormItem>
          <FormItem label="Token" prop="token">
            <Input v-model="accessData.token" class="input_len" disabled/>
          </FormItem>
          <FormItem label="API登录名" prop="apiId">
            <Input v-model="accessData.apiId" class="input_len" disabled/>
          </FormItem>
          <FormItem label="API密钥" prop="apiSecret">
            <Input v-model="accessData.apiSecret" class="input_len" disabled/>
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
  //  import axios from 'axios'
  import {showTip} from '@/libs/util'
  import url from '@/api/url'
  import {post} from "@/api/ax"

  export default {
    name: 'ChannelAccess',
    data() {
      return {
        total: 0,
        params: {
          supplierName: "",
          channelNo: "",
          pageNo: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '通道供应商',
            key: 'name',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return h('span', {
                style: {
                  color: 'blue'
                },
                attrs: {
                  title: params.row.name
                }
              }, params.row.name)
            }
          }, {
            title: '运营商支持',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              const arr = [];
              params.row.chans.forEach(item => {
                let text = [];
                if (item.unicomSupport) text.push('联通');
                if (item.mobileSupport) text.push('移动');
                if (item.telcomSupport) text.push('电信');
                arr.push(h('p', {
                  attrs: {
                    title: text.join("、")
                  }
                }, text.join('、')))
              });
              return h('div', arr)
            }
          }, {
            title: '接入通道号',
            key: 'channelNo',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return this.chansForeach(h, params, 'channelNo');
            }
          }, {
            title: '可用余量（条）',
            key: 'remainder',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return this.chansForeach(h, params, 'remainder');
            }
          }, {
            title: '并发能力（条/秒）',
            key: 'maxRate',
            align: 'center',
            render: (h, params) => {
              return this.chansForeach(h, params, 'maxRate');
            }
          }, {
            title: '免流能力',
            key: 'freeFlowSupport',
            align: 'center',
            render: (h, params) => {
              const arr = [];
              params.row.chans.forEach(function (item) {
                const ffs = item.freeFlowSupport;
                const text = ffs == 'ALL' ? '全部' : ffs == 'YES' ? '免流' : '不免流';
                arr.push(h('p', text))
              });
              return h('div', arr);
            }
          }, {
            title: '成本价（元）',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              const arr = [];
              params.row.chans.forEach(function (item) {
                const costPrice1 = item.costPrice1;
                const costPrice2 = item.costPrice2;
                const text = [];
                if (costPrice1) {
                  text.push(costPrice1 + " / 免流");
                }
                if (costPrice2) {
                  text.push(costPrice2 + " / 不免流");
                }
                arr.push(h('p', {
                  attrs: {
                    title: text.join(' ； ')
                  }
                }, text.join(' ； ')))
              });
              return h('div', arr);
            }
          }, {
            title: '业务类型',
            key: 'bizType',
            align: 'center',
            render: (h, params) => {
              const arr = [];
              params.row.chans.forEach(function (item) {
                const text = item.bizType == 'SERVICE' ? '服务类' : '营销类';
                arr.push(h('p', text))
              });
              return h('div', arr);
            }
          }, {
            title: '通道类型',
            key: 'shareable',
            align: 'center',
            render: (h, params) => {
              const arr = [];
              params.row.chans.forEach(function (item) {
                const text = item.shareable ? '公用' : '专享';
                arr.push(h('p', text))
              });
              return h('div', arr);
            }
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
                      $vue.setAccessInfo(params.row);
                    }
                  }
                }, '接入信息'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    "margin-left": '5px'
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
          cpid: '',
          billingType: '',
          remainder: '',
          accountSecret: '',
          token: '',
          apiId: '',
          apiSecret: ''
        }
      }
    },
    methods: {
      setAccessInfo(obj) {
        this.accessData.cpid = obj.cpid;
        this.accessData.billingType = obj.billingType == 'PRE' ? '预付费' : '后付费';
        this.accessData.remainder = obj.remainder;
        this.accessData.accountSecret = obj.accountSecret;
        this.accessData.token = obj.token;
        this.accessData.apiId = obj.apiId;
        this.accessData.apiSecret = obj.apiSecret;
      },
      chansForeach(h, params, i) {
        const arr = [];
        params.row.chans.forEach(function (item) {
          arr.push(h('p', {
            attrs: {
              title: item[i]
            }
          }, item[i]))
        });
        return h('div', arr);
      },
      close() {
        this.accessInfoModal = false;
      },
      clear() {
        this.params.supplierName = '';
        this.params.channelNo = '';
      },
      search() {
        this.params.pageNo = 1;
        this.sendPost();
      },
      sendPost() {
        console.log("params:" + JSON.stringify(this.params));
        post(url.getSuppliers, this.params).then(res => {
          this.tableData = res.data;
        })
      },
      changePage(n) {
        this.params.pageNo = n;
        this.sendPost();
      },
      getTotal() {
        post(url.getSupp1iersCount,
          {
            supplierName: this.params.supplierName
          }).then(res => {
          if (res) {
            this.total = res.data;
          }
        })
      }
    },
    mounted() {
      this.getTotal();
      this.sendPost();
    }
  }
</script>
<style lang="less">
  .bg {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 16px;
  }

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
