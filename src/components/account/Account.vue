<template>
  <div class="bg">
    <div class="outer">
      <p>基本信息</p>
      <div class="inner">
        <Form ref="basic" :model="basic"  :rules="ruleValidate" :label-width="120">
          <FormItem label="账户登录名：" prop="accountNumber">
            <Input v-model="basic.accountNumber" disabled></Input>
          </FormItem>
          <FormItem label="公司名称：" prop="companyName" >
            <Input v-model="basic.companyName" disabled></Input>
          </FormItem>
          <FormItem label="创建时间：" prop="createTs">
            <Input v-model="basic.createTs" disabled></Input>
          </FormItem>
          <FormItem label="账户内显示名称：" prop="nickname">
            <Input v-model="basic.nickname"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('basic')">保存</Button>
            <Button type="ghost" @click="handleReset('basic')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>

    <div class="outer">
      <p v-if="changePwd">账户安全</p>
      <p v-if="!changePwd">修改密码</p>
      <div class="inner">
        <Form v-if="changePwd" :label-width="120">
          <FormItem label="账户密码：" >
            <Input value="********"></Input> <Button type="text" @click="updatePwd()">修改</Button>
          </FormItem>
        </Form>

        <Form v-if="!changePwd" ref="pwd" :model="pwd"  :label-width="120">
          <FormItem label="当前登录密码：" prop="email">
            <Input v-model="more.current" type="password" placeholder="请填写当前登录密码"></Input>
          </FormItem>
          <FormItem label="新的登录密码：" prop="tel">
            <Input v-model="pwd.newPwd" type="password" placeholder="请填写新的登录密码"></Input>
          </FormItem>
          <FormItem label="确认登录密码：" prop="name">
            <Input v-model="pwd.confirm" type="password" placeholder="请确认登录密码"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('pwd')">保存</Button>
            <Button type="ghost" @click="handleReset('pwd')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>

      </div>
    </div>
    <div class="outer">
      <p>补充信息</p>
      <div class="inner">
        <Form ref="more" :model="more"  :label-width="120">
          <FormItem label="联系人邮箱：" prop="email">
            <Input v-model="more.email" placeholder="请填写联系人邮箱"></Input>
          </FormItem>
          <FormItem label="联系人手机：" prop="tel">
            <Input v-model="more.tel" placeholder="请填写联系人手机号码"></Input>
          </FormItem>
          <FormItem label="联系人姓名：" prop="name">
            <Input v-model="more.name" placeholder="请填写联系人姓名"></Input>
          </FormItem>
          <FormItem label="产品类型：" prop="scopes">
            <Input v-model="more.scopes" placeholder="请填写，如：金融、电商、教育..."></Input>
          </FormItem>
          <FormItem label="公司网址：" prop="companyWebsite">
            <Input v-model="more.companyWebsite" placeholder="请填写官网地址"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('more')">保存</Button>
            <Button type="ghost" @click="handleReset('more')" style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>

</template>
<script>
  import { mapActions } from 'vuex'
  import { mapState } from 'vuex'
  export default {
    data() {
      return {
        title:"账户安全",
        changePwd:true,
        basic:{
          accountNumber:"",
          companyName:"",
          createTs:"",
          nickname:""
        },
        more:{
          email:"",
          tel:"",
          name:"",
          scopes:"",
          companyWebsite:""
        },
        pwd:{
          current:"",
          newPwd:"",
          confirm:"",
        },
        ruleValidate: {
          accountNumber: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          companyName: [
            { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          createTs: [
            { required: true, message: 'Please select the city', trigger: 'change' }
          ],
        }
      }
    },
    methods:{
      ...mapActions([
        'handleMainAccountInfo',
        'handleUpdateNickName',
        'handleUpdatePassword',
        'handleUpdateAccountInfo'
      ]),

      updatePwd(){
        this.changePwd = false;
      },
      setBasicInfo(){
        this.basic.accountNumber = this.accountNumber;
        this.basic.companyName = this.companyName;
        this.basic.createTs = this.createTs;
        this.basic.nickname = this.nickname;
      },

      setMoreInfo(){
        this.more.email = this.email;
        this.more.tel = this.tel;
        this.more.name = this.name;
        this.more.scopes = this.scopes;
        this.more.companyWebsite = this.companyWebsite;
      },

      handleSubmit(name){
        if(name=='basic'){
          this.handleUpdateNickName(this.basic.accountNumber, this.basic.companyName, this.basic.createTs, this.basic.nickname).then(
            res =>{
              this.$Message.info("保存成功");
            },
            err =>{
              this.$Message.info("保存失败");
            }
          );
        }

        if(name=='more'){
          this.handleUpdateAccountInfo(this.more.email, this.more.tel, this.more.name, this.more.scopes, this.more.companyWebsite).then(
            res =>{
              this.$Message.info("保存成功");
            },
            err =>{
              this.$Message.info("保存失败");
            }
            );
        }

        if(name=='pwd'){
          if(this.pwd != this.rePwd){
            this.$Message.info("两次输入密码不一致");
            return;
          }
          this.handleUpdatePassword(this.accountNumber, this.pwd.confirm).then(
            res =>{
              this.$Message.info("修改成功");
              this.changePwd = true;
            },
            err =>{
              this.$Message.info("修改失败");
            }
          );
        }
      },

      handleReset (name) {
        if(name=='basic'){
            this.setBasicInfo()
        }

        if(name=='more'){
            this.setMoreInfo();
        }

        if(name=='pwd'){
          this.changePwd = true;
        }
      }
    },
    computed: {
      ...mapState({
        accountNumber: state => state.account.accountNumber,
        companyName: state => state.account.companyName,
        createTs: state => state.account.createTs,
        nickname: state => state.account.nickname,

        email: state => state.account.email,
        tel: state => state.account.tel,
        name: state => state.account.name,
        scopes: state => state.account.scopes,
        companyWebsite: state => state.account.companyWebsite
      })
    },
    created(){
      this.handleMainAccountInfo("").then(
        res=>{

        },
        err=>{
        this.setBasicInfo();
        this.setMoreInfo();
      })
    }
  }
</script>
<style scoped>
  .bg {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 16px;
  }
  p{
    font-size: 14px;
    font-weight: bold;
    color:dimgray;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  .outer{
    border-top: 1px solid darkgray;
    width: 100%;
  }
  .inner{
    width: 80%;
  }

</style>

