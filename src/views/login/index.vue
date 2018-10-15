<template>
  <el-form ref="loginForm" :inline="true" :rules="loginRules" :model="loginForm" class="login-form-inline" auto-complete="on" label-position="left">
  <el-form-item label="用户名">
    <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="请输入用户名"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="loginForm.password" name="password" type="password" auto-complete="on" placeholder="请输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" :loading:="loading" @click.native.prevent="onSubmit">sign in</el-button>
  </el-form-item>
</el-form>

</template>
<script>
import { isValidateUsername } from '@/utilS/validate'
export default {
  name: 'login',
  data() {
    const validatorUserName = (rule, value, callback) => {
      if (!isValidateUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatorPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'editor',
        password: 'admi'
      },
      loginRules: {
        username: [{ require: true, trigger: 'blur', validator: validatorUserName }],
        password: [{ require: true, trigger: 'blur', validator: validatorPassword }],
      },
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.$refs.loginForm.validate(valid=>{
        if(valid){
          this.loading = true
          this.$store.dispatch('signIn',this.loginForm).then(()=>{
            this.loading = false
            this.$router.push({path: '/home'})
          })
        }else{
          console.log('error submit!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
