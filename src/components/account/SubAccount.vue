<template>
    <div class="bg">
      <div v-if="addAccount" class="sub">
        <p>新建子账户</p>
        <Add :index="index"></Add>
      </div>
      <div v-if="!addAccount" class="sub">
        <div  class="query">
          <label>子账号名称</label>
          <Input v-model="accountNumber" placeholder="账号名称" style="width: 200px;margin-right: 32px;"></Input>
          <label>账号状态</label>
          <Select v-model="accountState" style="width:200px;margin-right: 32px;">
            <Option v-for="item in selectedState" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button type="primary" @click="querySubAccount()" >查询</Button>
        </div>
        <Button type="primary" style="margin-top: 16px;margin-bottom: 16px;" @click="addSubAccount()">+添加新账号</Button>
        <Table border :columns="columns" :data="subAccountList"></Table>
      </div>
    </div>
</template>
<script>
  import Add from "./Add"
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
    export default {
      components:{
        Add
      },
      methods:{
        ...mapActions([
          'handleQuerySubAccountList',
          'handleDisableOrDeleteSubAccount'
        ]),
        addSubAccount(){
          this.addAccount = true;
          this.index = -1;
        },
        modifySubAccount(index){

          this.index = index;
          this.modifyInfo = this.subAccountList[index];
          this.addAccount = true;

        },
        querySubAccount(){
          this.handleQuerySubAccountList("", this.accountNumber, this.accountState);
        },
        disableOrDeleteSubAccount(index, status){
          this.handleDisableOrDeleteSubAccount("", this.subAccountList[index], status);
        }
      },
      computed: {
        ...mapState({
          subAccountList:state => state.subAccount.subAccountList,
        })
      },
      data(){
        return{
          index:-1,
          modifyInfo:null,
          accountNumber:"",
          accountState:"",
          addAccount:false,
          selectedState: [
            {
              value: 'all',
              label: '全部'
            },
            {
              value: 'modify',
              label: '修改'
            },
            {
              value: 'disable',
              label: '禁用'
            },
            {
              value: 'delete',
              label: '删除'
            }
          ],
          columns:[
            {title:"子账户用户名",key:"subaccountNumber"},
            {title:"子账户账号",key:"subaccountNickname"},
            {title:"子账户使用人",key:"owner"},
            {title:"子账户状态",key:"status"},
            {title:"操作",key:"action",
              width: 200,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.modifySubAccount(params.index)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.disableOrDeleteSubAccount(params.index, "delete");
                      }
                    }
                  }, '禁用'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.disableOrDeleteSubAccount(params.index, "delete");
                      }
                    }
                  }, '删除'),
                ]);
              }
            },
            ],
        }
      }
    }
</script>

<style scoped>
  .bg{
    background-color: white;
    width: 100%;
  }
  .sub{
    width: 90%;
    padding: 32px;

  }
  .query{
    padding: 16px;
    border-bottom: 1px solid darkgray;
  }

  label{
    margin-right: 8px;
  }

  p{
    font-weight: bold;
    font-size: 16px;
    padding-bottom:32px;
  }
</style>
