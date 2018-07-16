<template>
  <Form ref="subAccountInfo" :model="subAccountInfo" :rules="ruleValidate" :label-width="120">
    <FormItem label="用户名：" prop="subaccountNumber">
      <Input v-model="subAccountInfo.subaccountNumber" placeholder="4-20个字符，字母或者数组成"></Input>
    </FormItem>
    <FormItem label="子账户名称：" prop="subaccountNickname">
      <Input v-model="subAccountInfo.subaccountNickname" placeholder="账户名称"></Input>
    </FormItem>
    <FormItem label="使用人：" prop="owner">
      <Input v-model="subAccountInfo.owner" placeholder="请填写子账户的使用人，比如xx部门xx人员"></Input>
    </FormItem>

    <FormItem label="账号密码：" prop="pwd">
      <Input v-model="subAccountInfo.pwd" type="password" placeholder="请输入8-20位密码"></Input>
    </FormItem>
    <FormItem label="重复密码："  prop="rePwd">
      <Input v-model="subAccountInfo.rePwd" type="password" placeholder="请重复输入账号密码"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('subAccountInfo')">保存并提交</Button>
      <Button type="ghost" @click="handleReset('subAccountInfo')" style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>
</template>
<script>
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        subAccountList:state => state.subAccount.subAccountList,
      })
    },
    data () {
      return {
        subAccountInfo:{
          accountNumber:"",
          subaccountNumber:"",
          subaccountNickname:"",
          owner:"",
          pwd:"",
          rePwd:""
        },
        ruleValidate: {
          subaccountNumber: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          subaccountNickname: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          owner: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          rePwd: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$parent.addAccount = false;
      }
    },
    created(){
      console.log("index:"+this.$parent.index)
      if(this.$parent.index != -1){
        this.subAccountInfo.subaccountNumber = this.$parent.modifyInfo.subaccountNumber;
        this.subAccountInfo.subaccountNickname = this.$parent.modifyInfo.subaccountNickname;
        this.subAccountInfo.owner = this.$parent.modifyInfo.owner
      }

    }
  }
</script>

<style scoped>

</style>
