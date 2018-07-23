<template>
  <Form ref="subAccountInfo" :model="subAccountInfo" :rules="ruleValidate" :label-width="120">
    <FormItem label="用户名：" prop="subaccountNumber">
      <Input v-model="subAccountInfo.subaccountNumber" placeholder="4-20个字符，字母或者数组成"></Input>
    </FormItem>
    <FormItem label="子账户名称：" prop="subaccountNickname">
      <Input v-model="subAccountInfo.subaccountNickname" placeholder="账户名称"></Input>
    </FormItem>
    <FormItem label="角色：" prop="role">
      <Select v-model="subAccountInfo.role">
        <Option value="1">推广子账号</Option>
        <!--<Option value="shanghai">广告审核</Option>-->
        <!--<Option value="shenzhen">内部运营</Option>-->
      </Select>
    </FormItem>

    <!--<FormItem label="使用人：" prop="owner">-->
      <!--<Input v-model="subAccountInfo.owner" placeholder="请填写子账户的使用人，比如xx部门xx人员"></Input>-->
    <!--</FormItem>-->

    <FormItem label="账号密码：" prop="pwd">
      <Input v-model="subAccountInfo.pwd" type="password" placeholder="请输入8-20位密码"></Input>
    </FormItem>
    <FormItem label="重复密码："  prop="rePwd">
      <Input v-model="subAccountInfo.rePwd" type="password" placeholder="请重复输入账号密码"></Input>
    </FormItem>
    <FormItem label="备注：" prop="owner">
      <Input v-model="subAccountInfo.owner" placeholder="请填写子账户的使用人，比如xx部门xx人员"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('subAccountInfo')">保存并提交</Button>
      <Button type="ghost" @click="handleReset('subAccountInfo')" style="margin-left: 8px">取消</Button>
    </FormItem>
  </Form>
</template>
<script>
  import { mapActions,mapState,mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapState({
        subAccountList:state => state.subAccount.subAccountList,
        // accountId:state=>state.user.accountId,
        // accountNumber:state=>state.user.accountNumber,
      }),
      ...mapGetters(['accountId','accountNumber']),
    },
    data () {
      return {
        subAccountInfo:{
          accountNumber:"",
          subaccountNumber:"",
          subaccountNickname:"",
          role:"",
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
          // owner: [
          //   { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          // ],
          pwd: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          rePwd: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          role: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {
      ...mapActions([
        'handleAddSubAccount',
        'handleModifySubAccount'
      ]),
      handleSubmit (subAccountInfo) {
        if(this.$parent.index != -1){
          var password = "";
          if(this.subAccountInfo.pwd == "000000"){
            password = "";
          }
          else
          {
            password = this.subAccountInfo.pwd;
          }
          var params = {accountNumber:this.accountNumber,
            subaccountNumber:this.subAccountInfo.subaccountNumber,
            subaccountId:this.$parent.modifyInfo.subaccountId,
            subaccountNickname:this.subAccountInfo.subaccountNickname,
            owner:this.subAccountInfo.owner,
            pwd:password,
            roleId:this.subAccountInfo.role
          }
          console.log(params);
          this.handleModifySubAccount(params).then(res=>{
            console.log(res)
            if(res.data.code == 0){
              this.$Message.info("修改成功");
            }
          }, err=>{});
        }
        else
        {
          if(this.subAccountInfo.pwd != this.subAccountInfo.rePwd){
            this.$Message.info("两次输入密码不一致");
            return;
          }
          var data = {accountNumber:this.accountNumber,
            subaccountNumber:this.subAccountInfo.subaccountNumber,
            subaccountNickname:this.subAccountInfo.subaccountNickname,
            owner:this.subAccountInfo.owner,
            pwd:this.subAccountInfo.pwd,
            roleId:this.subAccountInfo.role
          };
          console.log(data)
          this.handleAddSubAccount(data).then(res=>{
              console.log(res)
              if(res.data.code == 0){
                this.$Message.info("添加账号成功");
              }
          }, err=>{

          });
        }



        // this.$refs[name].validate((valid) => {
        //   if (valid) {
        //     this.$Message.success('Success!');
        //   } else {
        //     this.$Message.error('Fail!');
        //   }
        // })
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
        this.subAccountInfo.owner = this.$parent.modifyInfo.owner;
        this.subAccountInfo.pwd = "000000";
        this.subAccountInfo.rePwd = "000000";
      }

    }
  }
</script>

<style scoped>

</style>
