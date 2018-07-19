<template>
  <div class="bg">
    <Row type="flex" justify="space-between">
      <Col span="4">
      <Select v-model="params.status" clearable>
        <Option value="审核中">审核中</Option>
        <Option value="审核通过">审核通过</Option>
        <Option value="审核失败">审核失败</Option>
        <Option value="已失效">已失效</Option>
      </Select>
      </Col>
      <Col span="4" offset="2">
      <Input v-model="params.key" placeholder="快速查找">
      <span slot="append">
        <Button icon="ios-search" @click="search"></Button>
      </span>
      </Input>
      </Col>
      <Col span="4" offset="10" style="text-align: right">
      <Button type="primary" @click="toCreatePage">
        <Icon type="plus"></Icon>
        创建模板
      </Button>
      </Col>
    </Row>
    <div style="margin-top: 40px">
      <Table stripe border :columns="columns" :data="tableData"></Table>
      <div style="margin-top: 20px;text-align: right">
        <Page :total="total" show-elevator @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapMutations} from 'vuex'
  import axios from 'axios'
  import {showTip} from '@/libs/util'

  export default {
    name: 'TemplateList',
    data() {
      return {
        params: {
          status: '',
          key: '',
          pageNo: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '模板编号',
            key: 'id',
            align: 'center'
          },
          {
            title: '模板名称',
            key: 'name',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.name)
            }
          },
          {
            title: '模板主题',
            key: 'subject',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.subject)
            }
          },
          {
            title: '创建时间',
            key: 'createTs',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.createTs)
            }
          },
          {
            title: '状态',
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
          },
          {
            title: '操作',
            align: 'center',
            width: 200,
            render: (h, params) => {
              const id = params.row.id;
              const $vue = this;
              const status = params.row.status;
              const view = h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: function () {
                    $vue.setOperation('view');
                    $vue.setId(id);
                    $vue.$router.push({
                      name: 'create_template'
                    })
                  }
                },
              }, '查看');
              const edit = h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  "margin-left": '5px'
                },
                on: {
                  click: function () {
                    $vue.setOperation('modify');
                    $vue.setId(id);
                    $vue.$router.push({
                      name: 'create_template'
                    })
                  }
                }
              }, '修改');
              const del = h('Button', {
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
                      content: '确认删除该模板？',
                      onOk() {
                        axios.delete($vue.baseUrl + "/tmpl/1", {accountId: ""}).then(res => {
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
              const op = [];
              op.push(view);
              if (status == '审核中' || status == '审核失败') {
                op.push(edit)
              }
              op.push(del);
              return h('div', op);
            }
          }
        ],
        tableData: [],
        total: 0
      }
    },
    methods: {
      ...mapMutations([
        'setOperation',
        'setId'
      ]),
      changePage(n) {
        this.params.pageNo = n;
        this.getTmplList();
      },
      search() {
        this.params.pageNo = 1;
        this.getTmplList();
      },
      getTmplList() {
        console.log("params:" + JSON.stringify(this.params));
        axios.post(this.baseUrl + "/tmpls", this.params).then(res => {
          if (res.data.res) {
            this.tableData = res.data.res
          }
        })
      },
      toCreatePage() {
        this.$router.push({
          name: 'create_template'
        })
      },
      getTotal() {
        axios.post(this.baseUrl + "/tmpls/count", {status: this.params.status, accountId: ""}).then(res => {
          if (res.data.data) {
            this.total = res.data.data
          }
        })
      }
    },
    mounted() {
      this.getTotal();
      this.getTmplList();
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
</style>
