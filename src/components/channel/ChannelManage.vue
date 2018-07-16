<template>
  <div>
    <Row type="flex" justify="center">
      <Col span="2" style="text-align: right">
      <span class="bold">通道提供商</span>
      </Col>
      <Col span="3">
      <Input v-model="params.supplierName" placeholder="输入通道提供商名称" clearable/>
      </Col>
      <Col span="2" style="text-align: right">
      <span class="bold">使用账号</span>
      </Col>
      <Col span="3">
      <Input v-model="params.accountId" placeholder="输入通道分配的账户名称" clearable/>
      </Col>
      <Col span="2" style="text-align: right">
      <span class="bold">状态</span>
      </Col>
      <Col span="3">
      <Select v-model="params.status" clearable>
        <Option value="1">正常</Option>
        <Option value="2">停用</Option>
      </Select>
      </Col>
      <Col span="2" style="text-align: right">
      <span class="bold">通道号</span>
      </Col>
      <Col span="3">
      <Input v-model="params.channelNo" placeholder="输入数字，支持模糊匹配" clearable/>
      </Col>
      <Col span="4" style="text-align: center">
      <Button type="primary" @click="search">
        查询
      </Button>
      <Button type="ghost" @click="clear" style="margin-left: 20px">
        清空
      </Button>
      </Col>
    </Row>
    <div style="margin-top: 40px">
      <Button type="primary" @click="add" style="margin-bottom: 20px">添加</Button>
      <Table stripe border :columns="columns" :data="tableData"></Table>
      <div style="margin-top: 20px;text-align: right">
        <Page :total="total" show-elevator @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    name: 'ChannelManage',
    data() {
      return {
        params: {
          supplierName: '',
          accountId: '',
          status: '',
          channelNo: '',
          pageNo: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '通道供应商',
            key: 'supplierName',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return h('span', {
                style: {
                  color: 'blue'
                }
              }, params.row.supplierName)
            }
          },
          {
            title: '运营商支持',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              const text = [];
              if (params.row.unicomSupport) {
                text.push('联通')
              }
              if (params.row.mobileSupport) {
                text.push('移动')
              }
              if (params.row.telcomSupport) {
                text.push('电信')
              }

              return h('span', text.join('、'))
            }
          },
          {
            title: '通道号',
            key: 'channelNo',
            align: 'center',
            ellipsis: true
          },
          {
            title: '分配账号',
            key: 'accountId',
            align: 'center',
            ellipsis: true
          },
          {
            title: '分配发送量（条）',
            key: 'remainder',
            align: 'center',
            ellipsis: true
          },
          {
            title: '免流能力',
            key: 'freeFlow',
            align: 'center'
          },
          {
            title: '合同价（元）',
            align: 'center',
            render: (h, params) => {
              const arr = [];
              const costPrice1 = params.row.costPrice1;
              const costPrice2 = params.row.costPrice2;
              if (costPrice1) {
                arr.push(h('span', costPrice1 + "/免流"))
              }
              if (params.row.freeFlow == '全部') {
                arr.push(h('br'));
              }
              if (costPrice2) {
                var text = costPrice2 + "/不免流";
                arr.push(h('span', text))
              }
              return h('div', arr);
            }
          },
          {
            title: '备注',
            key: 'desc',
            align: 'center',
            ellipsis: true
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              const text = params.row.status;
              const color = params.row.status == '正常' ? '#00CC00' : 'red';
              return h('span', {
                style: {
                  color: color
                }
              }, text)
            }
          },
          {
            title: '操作',
            key: 'op',
            align: 'center',
            render: (h, params) => {
              const $vue = this;
              const channelId = params.row.channelId;
              return h('div', [
                h('a', {
                  on: {
                    click: function () {

                    }
                  }
                }, '修改'),
                h('a', {
                  style: {
                    "margin-left": '10px'
                  },
                  on: {
                    click: function () {
                      $vue.$Modal.confirm({
                        title: '删除',
                        content: '<p>您是否要删除该通道？<br><br>' +
                        '<span style="color: red">提示：</span>' +
                        '如果该账户中有发送余量，将全部退回您的账号中，且该账号下已有的模板、发送任务及数据等将全部失效。</p>',
                        onOk() {
                          axios.post($vue.baseUrl + "/chan/item/" + channelId).then(res => {
                            if (res.data.msg == '' && res.data.code == 0) {
                              $vue.$Message.success({
                                content: '删除成功',
                                duration: 1,
                                onClose() {
                                  location.reload(true)
                                }
                              })
                            } else {
                              $vue.$Message.error('删除失败')
                            }
                          })
                        }
                      });
                    }
                  }
                }, '删除'),
                h('a', {
                  style: {
                    "margin-left": '10px'
                  },
                  on: {
                    click: function () {
                      $vue.$Modal.confirm({
                        title: '停用',
                        content: '<p>您是否要停用该通道？<br><br>' +
                        '<span style="color: red">提示：</span>' +
                        '停用后该通道无法正常使用，确认是否停用？</p>',
                        onOk() {
                          axios.post($vue.baseUrl + "/chan/item/halt/" + channelId).then(res => {
                            if (res.data.msg == '' && res.data.code == 0) {
                              $vue.$Message.success({
                                content: '已停用',
                                duration: 1,
                                onClose() {
                                  location.reload(true)
                                }
                              })
                            } else {
                              $vue.$Message.error('停用失败')
                            }
                          })
                        }
                      });
                    }
                  }
                }, '停用')
              ]);
            }
          }
        ],
        tableData: [],
        total: 0
      }
    },
    methods: {
      add() {

      },
      clear() {
        this.params.supplierName = '';
        this.params.accountId = '';
        this.params.status = '';
        this.params.channelNo = '';
      },
      search() {
        this.params.pageNo = 1;
        this.sendPost();
      },
      sendPost() {
        console.log("params:" + JSON.stringify(this.params));
        axios.post(this.baseUrl + "/chan/items", this.params).then(res => {
          this.tableData = res.data.res;
        })
      },
      changePage(n) {
        this.params.pageNo = n;
        this.sendPost();
      },
      getTotal() {
        axios.post(this.baseUrl + "/chan/items/count",
          {
            supplierName: this.params.supplierName,
            channelNo: this.params.channelNo,
            accountId: this.params.accountId,
            status: this.params.status,

          }).then(res => {
          if (res.data.res) {
            this.total = res.data.res
          }
        })
      },
    },
    mounted() {
      this.getTotal();
      this.sendPost();
    }
  }
</script>
<style lang="less">
  .bold {
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    margin-right: 15px;
  }
</style>
