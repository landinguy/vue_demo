<template>
  <div class="bg">
    <Row type="flex" justify="space-between">
      <Col span="4">
      <Select v-model="params.status" clearable>
        <Option value="AUDITING">审核中</Option>
        <Option value="AUDIT_PASS">审核通过</Option>
        <Option value="AUDIT_FAILED">审核失败</Option>
        <Option value="OBSOLETED">已失效</Option>
      </Select>
      </Col>
      <Col span="4" offset="2">
      <Input placeholder="快速查找">
      <span slot="append">
        <Button icon="ios-search" @click="search"></Button>
      </span>
      </Input>
      </Col>
      <Col span="4" offset="10" style="text-align: right">
      <Button type="primary" @click="toCreatePage" v-if="roleId!='0'">
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
  import {mapMutations, mapGetters} from 'vuex'
  //  import axios from 'axios'
  import {showTip, timestampToTime} from '@/libs/util'
  import url from '@/api/url'
  import {post, $del} from "@/api/ax";

  export default {
    name: 'TemplateList',
    data() {
      return {
        params: {
          status: '',
//          key: '',
          pageNo: 1,
          pageSize: 10
        },
        columns: [
          {
            title: '模板编号',
            key: 'id',
            align: 'center',
            ellipsis: true,
            render: (h, params) => {
              return showTip(h, params.row.id)
            }
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
              return showTip(h, timestampToTime(params.row.createTs))
            }
          },
          {
            title: '状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
              const row = params.row;
              const color = row.status == 'AUDITING' ? 'blue' : row.status == 'AUDIT_PASS' ? 'green' : row.status == 'AUDIT_FAILED' ? 'red' : 'gray';
              const text = row.status == 'AUDITING' ? '审核中' : row.status == 'AUDIT_PASS' ? '审核通过' : row.status == 'AUDIT_FAILED' ? '审核失败' : '已失效';
              return h('span', {
                style: {
                  color: color
                }
              }, text)
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
                        $del(url.delTmpl + id, {accountId: this.accountId}).then(res => {
                          if (res.code == 0) {
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

              if (this.roleId != '0') {
                if (status == 'AUDITING' || status == 'AUDIT_FAILED') {
                  op.push(edit)
                }
                op.push(del);
              }
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
        let params = this.params;
//        params.accountId = this.accountId;
        console.log("params:" + JSON.stringify(params));
        post(url.getTmpls, params).then(res => {
          if (res) {
            this.tableData = res.data
          }
        })
      },
      toCreatePage() {
        this.$router.push({
          name: 'create_template'
        })
      },
      getTotal() {
        post(url.getTmplsCount, {
          status: this.params.status,
//          accountId: this.accountId
        }).then(res => {
          if (res) {
            this.total = res.data;
          }
        })
      }
    },
    mounted() {
      this.getTotal();
      this.getTmplList();
    },
    computed: {
      ...mapGetters(['accountId', 'roleId'])
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
