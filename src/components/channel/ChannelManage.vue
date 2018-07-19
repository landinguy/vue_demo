<template>
  <div class="bg">
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
        <Option value="正常">正常</Option>
        <Option value="停用">停用</Option>
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
    <Modal v-model="addModal" width="560">
      <p slot="header" style="text-align:center">
        <span>{{operation}}发送通道</span>
      </p>
      <div>
        <Form ref="channelForm" :model="formData" :label-width="140" :rules="ruleValidate">
          <FormItem label="通道提供商" prop="supplierName">
            <Select v-model="formData.supplierName" class="input_len">
              <Option value="1">小沃</Option>
              <Option value="2">三体</Option>
            </Select>
          </FormItem>

          <FormItem label="发送通道号" prop="channelId">
            <Select v-model="formData.channelId" class="input_len">
              <Option value="1">1065100</Option>
              <Option value="2">1065101</Option>
              <Option value="3">1065102</Option>
            </Select>
          </FormItem>

          <FormItem label="支持运营商" prop="yys">
            <Input v-model="formData.yys" readonly class="input_len"/>
          </FormItem>

          <FormItem label="分配账号" prop="accountId">
            <Select v-model="formData.accountId" class="input_len">
              <Option value="1">模拟账号1</Option>
              <Option value="2">模拟账号2</Option>
              <Option value="3">模拟账号3</Option>
            </Select>
          </FormItem>

          <FormItem label="分配发送量（条）" prop="remainder">
            <Input v-model="formData.remainder" placeholder="请给子账户分配发送额度，正整数，不能大于总额度" class="input_len"/>
          </FormItem>

          <FormItem label="免流能力" prop="freeFlowSupport">
            <Select v-model="formData.freeFlowSupport" class="input_len">
              <Option value="ALL">全部</Option>
              <Option value="YES">免流</Option>
              <Option value="NO">不免流</Option>
            </Select>
          </FormItem>

          <template v-if="formData.flowType==1 || formData.flowType==2">
            <FormItem label="合同价（免流）" prop="costPrice1">
              <Input v-model="formData.costPrice1" placeholder="请输入免流价" class="input_len"/>
            </FormItem>
          </template>

          <template v-if="formData.flowType==1 || formData.flowType==3">
            <FormItem label="合同价（不免流）" prop="costPrice2">
              <Input v-model="formData.costPrice2" placeholder="请输入不免流价" class="input_len"/>
            </FormItem>
          </template>

          <FormItem label="备注" prop="desc">
            <Input v-model="formData.desc" placeholder="可填写备注事项，如归属使用者，可发送时段等，50字以内"
                   class="input_len" type="textarea" :rows="4"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" @click="save">保存</Button>
        <Button type="ghost" @click="cancel" style="margin-left: 20px">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import {showTip} from '@/libs/util'

  export default {
    name: 'ChannelManage',
    data() {
      return {
        addModal: false,
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
                },
                attrs: {
                  title: params.row.supplierName
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

              return h('span', {
                attrs: {
                  title: text.join("、")
                }
              }, text.join('、'))
            }
          },
          {
            title: '通道号',
            key: 'channelNo',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.channelNo);
            }
          },
          {
            title: '分配账号',
            key: 'accountId',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.accountId);
            }
          },
          {
            title: '分配发送量（条）',
            key: 'remainder',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.remainder);
            }
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
                arr.push(h('span', costPrice1 + " / 免流"))
              }
              if (params.row.freeFlow == '全部') {
                arr.push(h('br'));
              }
              if (costPrice2) {
                var text = costPrice2 + " / 不免流";
                arr.push(h('span', text))
              }
              return h('div', arr);
            }
          },
          {
            title: '备注',
            key: 'desc',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.desc);
            }
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
            width: 200,
            render: (h, params) => {
              const $vue = this;
              const channelId = params.row.channelId;
              const op3 = params.row.status == '正常' ? '停用' : '启用';
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: function () {
                      $vue.operation = '修改';
                      $vue.addModal = true;
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  style: {
                    "margin-left": '5px'
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
                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small'
                  },
                  style: {
                    "margin-left": '5px'
                  },
                  on: {
                    click: function () {
                      if (op3 == '停用') {
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
                      } else {
                        $vue.$Message.success('启用成功')
                      }
                    }
                  }
                }, op3)
              ]);
            }
          }
        ],
        tableData: [],
        total: 0,
        operation: '添加',
        formData: {
          supplierName: '',
          channelId: '',
          yys: '',
          accountId: '',
          remainder: '',
          freeFlowSupport: '',
          costPrice1: '',
          costPrice2: '',
          desc: ''
        },
        ruleValidate: {
          supplierName: [{required: true, message: '请选择通道供应商', trigger: 'change'}],
          channelId: [{required: true, message: '请选择通道号', trigger: 'change'}],
          accountId: [{required: true, message: '请选择分配账号', trigger: 'change'}],
          remainder: [{required: true, message: '请输入分配发送量', trigger: 'blur'}],
          yys: [{required: true, message: '运营商不能为空', trigger: 'blur'}],
          costPrice1: [{required: true, message: '请输入免流价', trigger: 'blur'}],
          costPrice2: [{required: true, message: '请输入不免流价', trigger: 'blur'}],
          freeFlowSupport: [{required: true, message: '请选择免流能力', trigger: 'change'}],
        },
      }
    },
    methods: {
      save() {
        this.$refs.channelForm.validate((valid) => {
          if (!valid) {
            axios.post(this.baseUrl + "/chan/item/bind", {}).then(res => {
              if (res.data.msg == '' && res.data.code == 0) {
                this.addModal = false;
                this.$Message.success({
                  content: '保存成功',
                  duration: 1,
                  onClose() {
                    location.reload(true)
                  }
                });
              } else {
                this.$Message.error('保存失败');
              }
            })
          }
        })
      },
      cancel() {
        this.addModal = false;
        this.$refs.channelForm.resetFields();
      },
      add() {
        this.operation = '添加';
        this.$refs.channelForm.resetFields();
        this.addModal = true;
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
  .bg{
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
