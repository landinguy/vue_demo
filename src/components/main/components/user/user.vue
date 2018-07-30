<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Button type="ghost">
        <icon :size="18" type="person"></icon>
        &nbsp;{{accountNickname}}&nbsp;
        <Icon :size="12" type="arrow-down-b"></Icon>
      </Button>
      <DropdownMenu slot="list">
        <DropdownItem name="password">修改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Modal
      v-model="show"
      title="修改密码"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form  ref="pwd" :model="pwd" :label-width="120">
        <FormItem label="当前登录密码：" prop="currentPwd">
          <Input v-model="pwd.current" type="password" placeholder="请填写当前登录密码"></Input>
        </FormItem>
        <FormItem label="新的登录密码：" prop="newPwd">
          <Input v-model="pwd.newPwd" type="password" placeholder="请填写新的登录密码"></Input>
        </FormItem>
        <FormItem label="确认登录密码：" prop="confirm">
          <Input v-model="pwd.confirm" type="password" placeholder="请确认登录密码"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import './user.less'
import { mapActions,mapGetters } from 'vuex'
export default {
  name: 'User',
  data(){
    return {
      show:false,
      pwd:{
        current:"",
        newPwd:"",
        confirm:"",
      },
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut',
      'handleUpdatePassword'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
            this.handleLogOut().then(res=>{
              this.$router.push({
                name: 'login'
              })
            }, err=>{})
          break;
        case 'password':
          this.show = true;
          break;
      }
    },
    ok () {
      console.log("-------", this.pwd.current, this.pwd.newPwd, this.pwd.confirm)
      if(this.pwd.current == ""){
        this.$Message.error("当前密码不能为空");
        return;
      }
      if(this.pwd.confirm == "" || this.pwd.newPwd == ""){
        this.$Message.error("新密码密码不能为空");
        return;
      }
      if(this.pwd.newPwd != this.pwd.confirm){
        this.$Message.error("两次输入密码不一致");
        return;
      }
      if(this.pwd.newPwd.length < 8){
        this.$Message.error("密码长度不能低于8位");
        return;
      }
      this.handleUpdatePassword({accountId:this.accountId,oriPwd:this.pwd.current, pwd:this.pwd.confirm}).then(
        res =>{
          if(res.code == 0){
            this.$Message.info("密码修改成功，请重新登录");
            this.changePwd = true;
            this.$router.push({
              name: 'login'
            })
          }

        },
        err =>{
          this.$Message.info("修改失败");
        }
      );
    },
    cancel () {

    }
  },
  computed:{
    ...mapGetters(['accountNumber','accountId','accountNickname'])
  }
}
</script>
