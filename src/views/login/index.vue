<template>
  <div :style="note" class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <h3 class="title">Angel Centre</h3>
      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on" placeholder="手机号或Email" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="不少于6位的密码"
          @keyup.enter.native="handleLogin" /><!--  @keyup.enter.native   键盘回车触发事件 -->
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye" />
        </span>
      </el-form-item>
      <el-form-item prop="verifycode">
        <el-input v-model="loginForm.verifycode" placeholder="请输入验证码" class="identifyinput"/>
      </el-form-item>
      <el-form-item>
        <div class="identifybox">
          <div @click="refreshCode">
            <s-identify :identifycode="identifycode"/>
          </div>
          <el-button class="textbtn" style="color: #404A4B" type="text" @click="refreshCode">看不清，换一张 ? </el-button>
        </div>
      </el-form-item>
      <div>
        <div class="buttons">
          <el-button class="textbtn" style="color: #404A4B" type="text" @click="showDialog('changeped')">忘记 密码 ? </el-button>
          <!-- <el-button class="textbtn" style="float: right;color: #eee" type="text" @click="gotoregedit">没有账户 ? 去注册>></el-button> -->
          <el-button class="textbtn" style="float: right;color: #404A4B" type="text" @click="showDialog('regedit')">没有账户？  去注册></el-button>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleLogin">
          Sign in
        </el-button>
      </el-form-item>
    </el-form>
    <div>
      <Regedit :dialogvisible.sync="showdialog" />
    </div>
    <div>
      <Changepwd :dialogvisible1.sync="showdialog1" />
    </div>
  </div>
</template>

<script>
import { isvalidUsername1 } from '@/utils/validate'
import { validateusertype } from '@/utils/validate'
import SIdentify from './identify.vue'
import Regedit from './regedit.vue'
import Changepwd from './changepwd.vue'
export default {
  name: 'Login',
  components: {
    Regedit,
    SIdentify,
    Changepwd
  },
  data() {
    const validateVerifycode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'))
      } else if (value !== this.identifycode) {
        console.log('validateVerifycode:', value)
        callback(new Error('验证码不正确!'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => { // 定义密码验证函数
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        identity_type: '',
        verifycode: ''
      },
      checked: false,
      identifycodes: '1234567890',
      identifycode: '',
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: isvalidUsername1 }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }],
        verifycode: [
          { required: true, trigger: 'blur', validator: validateVerifycode }
        ]
      },
      note: {
        backgroundImage: 'url(' + require('@/assets/images/333.jpg') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      },
      // loading: false,
      pwdType: 'password',
      redirect: undefined,
      showdialog: false,
      showdialog1: false
    }
  },
  watch: {
    // 监听路由，路由发生变化时执行handler函数
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect // 自动跳转到指点页面
      },
      immediate: true // 立即执行
    }
  },
  mounted() {
    // 验证码初始化
    this.identifycode = ''
    this.makeCode(this.identifycodes, 4)
  },
  methods: {
    showDialog(msg) {
      if (msg === 'regedit') {
        this.showdialog = true
      } else {
        this.showdialog1 = true
      }
    },
    showPwd() { // 密码显示函数
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    // 切换验证码
    refreshCode() {
      this.identifycode = ''
      this.makeCode(this.identifycodes, 4)
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifycode += this.identifycodes[
          this.randomNum(0, this.identifycodes.length)
        ]
      }
      console.log(this.identifycode)
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        this.loginForm.identity_type = validateusertype(this.loginForm.username)
        // 会验证该form所有字段的返回值，如果有不通过的valid就是false
        if (valid) {
          this.$store.dispatch('LoginByUsername', this.loginForm).then(() => { // dispatch：含有异步操作，例如向后台提交数据，写法： this.$store.dispatch('mutations方法名',值)  用来触发action中的方法
            this.$router.push({ path: this.redirect || '/' }) // 实现路由跳转
          }).catch(() => {
            //
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#CAD0D0;
  $light_gray: #1D2222;
  $cursor: #fff;

/* reset element-ui css */
.el-dialog {
  border-radius: 7px;
  opacity: 0.95;
  background: rgb(253, 249, 249);
}
.el-dialog__header {
  background: #d8d9da;
  border-radius: 7px;
}
.el-dialog__title {
  font-size: 20px;
  font-weight:bold;
  color:#436e6e;
}
.el-dialog .el-form-item__content {
    line-height: 28px;
    position: relative;
    font-size: 14px;
}

.login-container {
  input::-webkit-input-placeholder{
            color:#232A2A;
        }
  .el-input {
    display: inline-block;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 50px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #1B1C1C !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    color: #454545;
  }
}

</style>
<style scoped>
.identifybox{
  display: flex;
  justify-content: space-between;
  margin-top:4px;
  margin-bottom: -10px;
}
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #44855F;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  .login-form { // 表单css
    position: absolute;
    left: 0;
    right: 0;
    width: 35%;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    background-color: #FFFFFF; // 背景
    opacity: 0.95;
    border-radius: 7px;
    // margin: 120px auto;
    margin-top: 90px;
    margin-right: auto;
    margin-bottom: 120px;
    margin-left: auto;
  }
  .tips {
    font-size: 19px;
    color: #404A4B;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #404A4B;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
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
