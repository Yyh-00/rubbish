<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">
          厨余垃圾处理平台
        </h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.account"
          placeholder="请输入手机号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="请输入密码"
          name="password"
          tabindex="2"
          auto-complete="off"
          @keyup.enter.native="handleLogin"
        />
        <!-- enter修饰符是监听在再按下回车键的时候触发 -->
        <!-- native修饰符监听组件的原生事件，这里写native表示keyup是一个原生事件 -->

        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button class="loginBtn" :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登  录</el-button>

      <div class="tips">
        <img src="@/assets/common/logo.png" alt="">
      </div>

    </el-form>
  </div>
</template>

<script>
import { validMobile } from '@/utils/validate'
import { mapActions } from 'vuex'
import { setUserAccount } from '@/utils/auth.js'

export default {
  name: 'Login',
  data() {
    const validateMobile = (rule, value, callback) => {
      // if (!validMobile(value)) {
      //   // 校验失败的回调函数
      //   callback(new Error('手机号格式不正确'))
      // } else {
      //   // 校验成功的回调函数
      //   callback()
      // }

      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    // const validatePassword = (rule, value, callback) => {
    //   if (value.length < 6) {
    //     callback(new Error('密码不得少于6位数'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      loginForm: {
        account: '123',
        password: '123'
      },
      // trigger 校验的触发方式 blur（失去焦点）/change
      // validator 校验规则的自定义函数
      loginRules: {
        mobile: [{ required: true, trigger: 'blur', message: '请输入手机号' }, {
          validator: validateMobile, trigger: 'blur' }],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }, {
          trigger: 'blur', min: 6, max: 16, message: '密码长度位6-16位之间' }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions(['user/login']),
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      setUserAccount(this.loginForm.account)
      this.$refs.loginForm.validate(async valid => {
        // 先要进行表单验证
        if (valid) {
          try {
            this.loading = true
            // 只有校验通过了 我们才去调用action
            await this['user/login'](this.loginForm)
            // 登录成功之后在进行跳转
            // async标记的函数实际上一个promise对象
            // await下面的代码 都是成功之后执行的
            this.$router.push('/')
            window.location.reload()
          } catch (error) {
            // console.log(error)
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#68b0fe;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  background-image: url('~@/assets/common/bg.png');
  background-size: cover;
  background-position: center;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: #c1dbd8;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      // input框内光标颜色
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px #c1dbd8 inset !important;
        -webkit-text-fill-color: #000 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(252, 252, 252, 0.7);
    border-radius: 5px;
    color: #454545;
  }
  .el-form-item__content{
    background: #c1dbd8;
  }
  .el-form-item__error{
    color: #fff;
  }
  .loginBtn{
    background: #3b8686;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    width: 250px;
    margin-top: 150px;
    margin-left: 100px;
    img{
      width: 100%;
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 40px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      letter-spacing: 10px;
      // font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
