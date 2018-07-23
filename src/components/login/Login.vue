<template>
  <div class="login" @keydown.enter="handleLogin">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <LoginForm @on-success-valid="handleSubmit"></LoginForm>
          <p class="login-tip">输入任意用户名和密码即可</p>
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
    // ...mapActions([
    //   'handleLogin'
    // ]),
    handleSubmit ({ userName, password }) {
      this.$router.push({
        name: 'home'
      })
    }
  }
}
</script>

<style lang="less">
  @import './login.less';
</style>
