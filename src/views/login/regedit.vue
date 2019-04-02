<template>
  <el-dialog
    v-dialogDrag
    ref="dialog__wrapper"
    :visible="dialogvisible"
    :close-on-click-modal="false"
    title="注册"
    append-to-body
    width="40%"
    @close="onClose()">
    <div class="regeditform" style="margin-top: 25px">
      <el-form ref="regeditForm" :model="regeditForm" :rules="rules">
        <el-form-item prop="name">
          <span class="tip">你的昵称</span>
          <el-input v-model="regeditForm.nickname" clearable="true" placeholder="常用昵称" prefix-icon="">
            <!-- <span slot="prepend" class="svg-container">
              <svg-icon icon-class="user" />
            </span> -->
          </el-input>
        </el-form-item>
        <el-form-item prop="identifier">
          <span class="tip">通行证ID</span>
          <el-input v-model="regeditForm.identifier" clearable="true" placeholder="通行证Id账号" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="credential">
          <span class="tip">输入密码</span>
          <el-input v-model="regeditForm.credential" clearable="true" placeholder="不少于 6 位的密码" prefix-icon=""/>
        </el-form-item>
        <el-form-item prop="twocredential">
          <span class="tip">再次输入密码</span>
          <el-input v-model="regeditForm.twocredential" clearable="true" placeholder="输入验证密码" prefix-icon=""/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%;margin-top: 15px" @click.native.prevent="handleRegedit">
            注册
          </el-button>
        </el-form-item>
        <div class="text-muted">
          <i class="text-i"/>
          <span class="more-login-words">更多登录方式</span>
        </div>
        <div class="widget-login">
          <div class="sign-btn" style="display: inline-block;" @click=" thirdHandleClick('wechat')">
            <span class="wx-svg-container"><svg-icon icon-class="wechat" class-name="svg-images"/></span>
          </div>
          <div class="sign-btn" style="display: inline-block;" @click=" thirdHandleClick('qq')">
            <span class="qq-svg-container"><svg-icon icon-class="qq" class-name="svg-images"/></span>
          </div>
          <div class="sign-btn" style="display: inline-block;" @click=" thirdHandleClick('githubs')">
            <span class="gub-svg-container"><svg-icon icon-class="github" class-name="svg-images"/></span>
          </div>
        </div>
        <el-form-item>
          <el-button type="info" plain style="width:100%;" @click.native.prevent="onClose">
            已有账号登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import openWindow from '@/utils/openWindow'
import { isvalidUsername } from '@/utils/validate'
export default {
  name: 'Regedit',
  props: {
    dialogvisible: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    const validatepassword = (rule, value, callback) => {
      if (this.regeditForm.credential !== value) {
        callback(new Error('俩次输入密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      regeditForm: {
        nickname: '',
        identifier: '',
        credential: '',
        twocredential: ''
      },
      rules: {
        identifier: [
          { required: true, trigger: 'blur', validator: isvalidUsername },
          { required: true, message: '请输入手机号或Email', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        credential: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' }
        ],
        twocredential: [
          { required: true, message: '请输入再次密码', trigger: 'blur' },
          { min: 6, max: 30, message: '长度在 6 到 30 个字符', trigger: 'blur' },
          { required: true, trigger: 'blur', validator: validatepassword }
        ]
      }
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
  methods: {
    onClose() {
      this.$emit('update:dialogvisible', false)
    },
    handleRegedit() { // 注册事件
      this.$refs.regeditForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('RegeditSub', this.regeditForm).then(() => {
            console.log(this.redirect)
            this.$router.push({ path: this.redirect || '/' }) // 实现路由跳转
          }).catch(() => {
          })
        } else {
          console.log(' 注册失败!!')
          return false
        }
      })
    },
    thirdHandleClick(arg) { // 第三方注册
      if (arg === 'githubs') {
        const client_id = '35ba11253702082d5081'
        // const scope = 'user'
        const state = 'Github'
        const url = 'https://github.com/login/oauth/authorize?&client_id=' + client_id + '&state=' + state
        openWindow(url, arg, 540, 540)
        window.addEventListener('message', e => {
          // 父窗口监听子窗口的message， 拿到token
          this.$store.dispatch('RegeditGithub', e.data).then(() => {
            this.$router.push({ path: this.redirect || '/' }) // 实现路由跳转
          }).catch(() => {
            alert('github for Login failed')
          })
        }, false)
      } else {
        alert(arg + 'Waiting for development')
      }
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
