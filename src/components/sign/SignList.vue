<template>
  <div>
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
              <Option value="1">广告主1</Option>
              <Option value="2">广告主2</Option>
              <Option value="3">广告主3</Option>
            </Select>
          </FormItem>

          <FormItem label="签名" prop="content">
            <Input v-model="signData.content" placeholder="【】内3~8个字，无论汉字、英文、数字皆记为1个字" :maxlength="10"
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
  import {showTip} from '@/libs/util'

  export default {
    name: 'SignList',
    data() {
      return {
        params: {
          pageNo: 1,
          pageSize: 10,
          accountId: '',
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
              return showTip(h, params.row.createTs);
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
              return h('span', params.row.source)
            }
          }, {
            title: '签名状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = row.status == '审核中' ? 'blue' : row.status == '审核通过' ? 'green' : row.status == '审核失败' ? 'red' : 'gray';
              return h('span', {
                style: {
                  color: color
                }
              }, row.status)
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
              return showTip(h, params.row.updateTs);
            }
          }, {
            title: '操作',
            key: 'op',
            align: 'center',
            width: 200,
            render: (h, params) => {
              const $vue = this;
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
                        axios.delete(this.baseUrl + "/sign/1",).then(res => {
                          if (res.data.msg == "" && res.data.code == 0) {
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
              return h('div', [del]);
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
          content: [{required: true, message: '请填写签名', trigger: 'blur'}, {
            validator: this.validateText,
            trigger: 'blur'
          },],
//          uploadValid: [{required: true, message: '请上传签名授权书', trigger: 'blur'}]
        },
        total: 0
      }
    },
    methods: {
      validateText(rule, value, callback) {
        if (value.trim() == "") {
          callback(new Error("签名内容不能为空"));
        } else if (!value.startsWith("【") || !value.endsWith("】")) {
          callback(new Error("签名格式不正确"));
        } else {
          callback()
        }
      },
//      handleBeforeUpload(file) {
//        var index = file.name.lastIndexOf(".");
//        var type = file.name.substring(index + 1);
//
//        if (type.toUpperCase() != "JPG" && type.toUpperCase() != "PNG") {
//          this.$Message.error('请上传jpg、png图片文件');
//          return false;
//        }
//
//      },
//      handleSuccess(res, file) {
//        if (res != null) {
//          console.log("res ->" + res);
//          this.$Message.success('上传成功');
//          this.sign.uploadValid = res;
//        } else {
//          this.$Message.error('上传失败');
//          this.sign.uploadValid = '';
//        }
//      },
      confirm() {
        this.$refs.signForm.validate((valid) => {
          if (valid) {
            const params = this.getParams();
            axios.post(this.baseUrl + "/sign/create", params).then(res => {
              if (res.data.msg == "" && res.data.code == 0) {
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
        params.accountId = "";
        params.content = this.signData.content;
        params.cp = this.signData.cp;
        params.source = this.signData.source;
        params.status = this.signData.status;
        params.updater = "";
        return params;
      },
      showModal() {
        this.$refs.signForm.resetFields();
        this.signData.source = "运营添加";
        this.signData.status = "审核通过";
        this.addModal = true;
      },
      changePage(n) {
        this.params.pageNo = n;
        this.getSignList();
      },
      getSignList() {
        console.log("params:" + JSON.stringify(this.params));
        axios.post(this.baseUrl + "/signs", this.params).then(res => {
          if (res.data.res) {
            this.tableData = res.data.res
          }
        })
      },
      getTotal() {
        axios.post(this.baseUrl + "/signs/count", {status: this.params.status, accountId: ""}).then(res => {
          if (res.data.count) {
            this.total = res.data.count
          }
        })
      },
      search() {
        this.params.pageNo = 1;
        this.getSignList();
      },
    },
    mounted() {
      this.getTotal();
      this.getSignList();
    }
  }
</script>
<style lang="less">
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
