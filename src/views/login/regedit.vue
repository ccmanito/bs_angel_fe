<template>
  <el-dialog
    v-dialogDrag
    ref="dialog__wrapper"
    :visible="dialogvisible"
    title="注册"
    close-on-click-modal="false"
    append-to-body
    width="40%"
    @close="onClose()">
    <div class="regeditform">
      <el-form ref="regeditForm" :model="regeditForm" :rules="rules">
        <el-form-item prop="name">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <span class="tip">你的昵称</span>
          <el-input v-model="regeditForm.name" clearable="true" placeholder="真实姓名或常用昵称" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="username">
          <span class="tip">手机号或Email</span>
          <el-input v-model="regeditForm.username" clearable="true" placeholder="11位手机号 或 Email" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="password">
          <span class="tip">输入密码</span>
          <el-input v-model="regeditForm.password" clearable="true" placeholder="不少于 6 位的密码" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="password2">
          <span class="tip">再次输入密码</span>
          <el-input v-model="regeditForm.password2" clearable="true" placeholder="输入验证密码" prefix-icon=""/>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
            注册
          </el-button>
        </el-form-item>
        <div class="text-muted">
          <i class="text-i"/>
          <span class="more-login-words">更多登录方式</span>
        </div>
        <div class="widget-login">
          <div class="sign-btn" style="display: inline-block;" @click="wechatHandleClick('wechat')">
            <span class="wx-svg-container"><svg-icon icon-class="wechat" class-name="svg-images"/></span>
          </div>
          <div class="sign-btn" style="display: inline-block;" @click="tencentHandleClick('tencent')">
            <span class="qq-svg-container"><svg-icon icon-class="qq" class-name="svg-images"/></span>
          </div>
          <div class="sign-btn" style="display: inline-block;" @click="githubHandleClick('githubs')">
            <span class="gub-svg-container"><svg-icon icon-class="github" class-name="svg-images"/></span>
          </div>
        </div>
        <el-form-item>
          <el-button :loading="loading" type="info" plain style="width:100%;" @click.native.prevent="handleLogin">
            已有账号登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div slot="footer" class="dialog-footer">
      <el-button @click="onClose()">取 消</el-button>
      <el-button type="primary" @click="onClose()">确 定</el-button>
    </div> -->
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogvisible: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const validatepassword = (rule, value, callback) => {
      if (this.regeditForm.password !== value) {
        callback(new Error('俩次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      regeditForm: {
        name: '',
        username: '',
        password: '',
        password2: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入手机号或Email', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请输入再次密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatepassword }
        ]
      }
    }
  },
  methods: {
    onClose() {
      this.$emit('update:dialogvisible', false)
    }
  }
}
</script>

<style scoped>
.regeditform {
  margin:0px auto;
  padding:0px;
  width: 58%;
  /* text-align:center; */
}
.svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
}
.tip {
  font-size: 16px;
  font-weight:bold;
  color:#436e6e;
}
.text-muted {
    position:relative;
    height:1.875rem;
    line-height: 1.875rem;
    margin:2rem auto;
    text-align: center;
}
.text-i {
    display:block;
    height:1.5px;
    background:#c4bfbf;
    position:absolute;
    top:0.9rem;
    width:100%;
}
.more-login-words {
   display:inline-block;
    font-size: 16px;
    /* color:#c1c1c1; */
    background:rgb(253, 249, 249);
    padding:0 1.8rem;
    text-align: center;
    margin:0 auto;
    position:relative;
    z-index:2;
}
.widget-login {
    margin-top: -15px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 15px;
    width: 100px;
    height: 40px;
}
.svg-images {
    width: 30px;
    height: 30px;
}
</style>
