<template>
  <div class="bg">
    <Row type="flex" justify="space-between">
      <Col span="4">
      <Input v-model="params.key" placeholder="快速查找">
      <span slot="append">
        <Button icon="ios-search" @click="search"></Button>
      </span>
      </Input>
      </Col>
      <Col span="4" offset="16" style="text-align: right">
      <Button type="primary" @click="showModal">
        <Icon type="plus"></Icon>
        运营添加签名
      </Button>
      </Col>
    </Row>
    <div style="margin-top: 40px">
      <Table stripe border :columns="columns" :data="tableData"></Table>
      <div style="margin-top: 20px;text-align: right">
        <Page :total="total" show-elevator @on-change="changePage"></Page>
      </div>
    </div>
    <Modal v-model="addModal">
      <p slot="header" style="text-align:center">
        <span>运营添加签名</span>
      </p>
      <div>
        <Form ref="signForm" :model="signData" :rules="signValidate" :label-width="80">
          <FormItem label="广告主" prop="cp">
            <Select v-model="signData.cp" class="input_len">
              <Option v-for="a in accountData" :value="a.subaccountNumber" :key="a.subaccountNumber">
                {{a.subaccountNumber}}
              </Option>
            </Select>
          </FormItem>

          <FormItem label="签名" prop="content">
            <Input v-model="signData.content" placeholder="3~8个字，无论汉字、英文、数字皆记为1个字" :maxlength="8"
                   class="input_len"/>
          </FormItem>

          <!--<FormItem label="" prop="uploadValid">-->
          <!--<Upload :action="uploadUrl"-->
          <!--:format="['jpg','png']"-->
          <!--:show-upload-list="false"-->
          <!--:before-upload="handleBeforeUpload"-->
          <!--:on-success="handleSuccess" style="display: inline-block">-->
          <!--<Button-Group>-->
          <!--<i-button type="primary" class="input_len" icon="ios-cloud-upload-outline">-->
          <!--上传签名授权书-->
          <!--</i-button>-->
          <!--</Button-Group>-->
          <!--</Upload>-->
          <!--<p class="sign_tip">PNG、JPG格式，不超过500K</p>-->
          <!--</FormItem>-->
        </Form>
      </div>
      <div slot="footer" style="text-align: center">
        <Button type="primary" @click="confirm">确认</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import {showTip, timestampToTime} from '@/libs/util'
  import {mapGetters} from 'vuex'
  import url from '@/api/url'

  export default {
    name: 'SignList',
    data() {
      return {
        accountData: [],
        params: {
          pageNo: 1,
          pageSize: 10,
          key: ''
        },
        uploadUrl: '',
        columns: [
          {
            title: '创建时间',
            key: 'createTs',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, timestampToTime(params.row.createTs));
            }
          }, {
            title: '签名',
            key: 'content',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.content);
            }
          }, {
            title: '广告主',
            key: 'cp',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.cp);
            }
          }, {
            title: '类型',
            key: 'source',
            align: 'center',
            render: (h, params) => {
              const text = params.row.source == 'ADD_BY_OPERATOR' ? '运营添加' : '广告主添加';
              return h('span', text)
            }
          }, {
            title: '签名状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = row.status == 'AUDIT_PASSED' ? 'green' : row.status == 'DELETED' ? 'red' : 'gray';
              const text = row.status == 'AUDIT_PASSED' ? '审核通过' : row.status == 'DELETED' ? '已删除' : '未知';
              return h('span', {
                style: {
                  color: color
                }
              }, text)
            }
          }, {
            title: '最后操作人',
            key: 'updater',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.updater);
            }
          }, {
            title: '最后更新时间',
            key: 'updateTs',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, timestampToTime(params.row.updateTs));
            }
          }, {
            title: '操作',
            key: 'op',
            align: 'center',
            width: 200,
            render: (h, params) => {
              const $vue = this;
              const id = params.row.id;
              const op = [];
              const del = h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: function () {
                    $vue.$Modal.confirm({
                      title: '删除',
                      content: '确认删除该签名？',
                      onOk() {
                        axios.delete(this.baseUrl + url.delSign + id, {}).then(res => {
                          if (res.data.code == 0) {
                            $vue.$Message.success({
                              content: '已删除',
                              duration: 1,
                              onClose() {
                                location.reload(true);
                              }
                            });
                          } else {
                            $vue.$Message.error('删除失败');
                          }
                        });
                      }
                    });
                  }
                }
              }, '删除');
              if (params.row.status != 'DELETED') {
                op.push(del)
              }
              return h('div', op);
            }
          }
        ],
        tableData: [],
        addModal: false,
        signData: {
          cp: '',
          content: '',
//          uploadValid: '',
          source: '',
          status: ''
        },
        signValidate: {
          cp: [{required: true, message: '请选择广告主', trigger: 'change'}],
          content: [{required: true, message: '请填写签名', trigger: 'blur'},
            {validator: this.validateText, trigger: 'blur'}]
        },
        total: 0
      }
    },
    methods: {
      validateText(rule, value, callback) {
        if (value.trim() == "") {
          callback(new Error("签名内容不能为空"));
        } else {
          callback()
        }
      },
      confirm() {
        this.$refs.signForm.validate((valid) => {
          if (valid) {
            const params = this.getParams();
            axios.post(this.baseUrl + url.createSign, params).then(res => {
              if (res.data.code == 0) {
                this.$Message.success({
                  content: '添加成功',
                  duration: 1,
                  onClose() {
                    location.reload(true);
                  }
                });
              } else {
                this.$Message.error('添加失败');
              }
            })
          }
        })
      },
      getParams() {
        const params = {};
        params.content = this.signData.content;
        params.cp = this.signData.cp;
        params.source = this.signData.source;
        params.status = this.signData.status;
        params.updater = "admin";
        return params;
      },
      showModal() {
        this.$refs.signForm.resetFields();
        this.signData.source = "ADD_BY_OPERATOR";
        this.signData.status = "AUDIT_PASSED";
        this.addModal = true;
      },
      changePage(n) {
        this.params.pageNo = n;
        this.getSignList();
      },
      getSignList() {
        let params = this.params;
//        params.accountId = this.accountId;
        console.log("params:" + JSON.stringify(params));
        axios.post(this.baseUrl + url.getSigns, params).then(res => {
          if (res.data) {
            this.tableData = res.data.data
          }
        })
      },
      getTotal() {
        axios.post(this.baseUrl + url.getSignsCount, {
          status: this.params.status,
//          accountId: this.accountId
        }).then(res => {
          if (res.data) {
            this.total = res.data.data;
          }
        })
      },
      search() {
        this.params.pageNo = 1;
        this.getSignList();
      },
      getAccount() {
        axios.post(this.baseUrl + url.subAccountList, {status: 'USE'}).then(res => {
          this.accountData = res.data.data
        })
      }
    },
    mounted() {
      this.getTotal();
      this.getSignList();
      this.getAccount();
    },
    computed: {
      ...mapGetters(['accountId'])
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

  .sign_tip {
    .input_len;
    margin-top: 10px;
    line-height: 20px;
    color: gray;
    text-align: center;
  }
</style>
