<template>
  <Form ref="loginForm" :model="form" :rules="rules">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="locked"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
  import { mapActions } from 'vuex'
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: '',
        password: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit () {
      console.log("--------",this.form.userName, this.form.password)
      this.handleLogin({ username:this.form.userName, passwd:this.form.password}).then(
        res=>{
          console.log(res.data)
          if(res.code == 0){
            this.$emit('on-success-valid', {
                    userName: this.form.userName,
                    password: this.form.password
                  })
          }
        },
        err=>{
          console.log(err)
        }
      );

      // this.$refs.loginForm.validate((valid) => {
      //   if (valid) {
      //     this.$emit('on-success-valid', {
      //       userName: this.form.userName,
      //       password: this.form.password
      //     })
      //   }
      // })
    },

  }
}



// methods: {
//
//     handleSubmit ({ userName, password }) {
//     this.handleLogin(userName, password).then(res=>{
//       console.log(res.data.id);
//       this.$router.push({
//         name: 'home'
//       })
//     }, err=>{
//       this.$router.push({
//         name: 'login'
//       })
//     });
//
//   }
</script>
