<template>
  <div class="login" @keyup.enter="handleEnter">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <LoginForm ref="loginForm" @on-success-valid="handleSubmit"></LoginForm>
          <p class="login-tip">输入用户名和密码登录</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from './components/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleEnter(){
      console.log("enter login")
      this.$refs.loginForm.handleSubmit()
    },
    handleSubmit ({ userName, password }) {
      this.handleLogin({ username:userName, passwd:password}).then(
        res=>{
          console.log(res.data)
          if(res.code == 0){
            this.$router.push({
              name: 'home'
            })
          }
        },
        err=>{
          console.log(err)
        }
      );
    }
  }
}
</script>

<style lang="less">
  @import './login.less';
</style>
