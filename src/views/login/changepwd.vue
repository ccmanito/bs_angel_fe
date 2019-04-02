<template>
  <el-dialog
    v-dialogDrag
    ref="dialog__wrapper"
    :visible="dialogvisible1"
    :close-on-click-modal="false"
    title="找回密码"
    append-to-body
    width="40%"
    @close="onClose()">
    <div class="regeditform">
      <el-form ref="findForm" :model="findForm" :rules="rules">
        <el-form-item prop="name">
          <span class="tip">你的用户名</span>
          <el-input v-model="findForm.name" clearable="true" placeholder="用户账号UserName" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="email">
          <span class="tip">绑定的Email</span>
          <el-input v-model="findForm.email" clearable="true" placeholder="账户绑定的 Email" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="number">
          <span class="tip">获取验证码</span>
          <el-input v-model="findForm.number" placeholder="请输入验证码">
            <el-button slot="append" style="width:80px;color:#436e6e;background:#c4bfbf;" size="medium" type="text">发送</el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <span class="tip">输入新密码</span>
          <el-input v-model="findForm.password" clearable="true" placeholder="不少于 6 位的密码" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="password2">
          <span class="tip">再次输入密码</span>
          <el-input v-model="findForm.password2" clearable="true" placeholder="输入验证密码" prefix-icon=""/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;" @click.native.prevent="summit">
            提交
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogvisible1: {
      type: Boolean,
      required: true
    }
  },
  data() {
    const validatepassword = (rule, value, callback) => {
      if (this.findForm.password !== value) {
        callback(new Error('俩次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      findForm: {
        email: '',
        username: '',
        number: '',
        password: '',
        password2: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入Email', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 6, max: 6, message: '长度为6', trigger: 'blur' }
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
      this.$emit('update:dialogvisible1', false)
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
</style>
