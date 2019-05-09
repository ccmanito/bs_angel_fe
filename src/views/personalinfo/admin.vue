<template>
  <div class="personalinfo">
    <el-row :gutter="20" class="personalinfo-row">
      <el-col :span="14" class="personalinfo-col">
        <div class="baseinfo">
          <h3 class="title" style="margin-left: 10px">个人档案</h3>
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15)" width="90%" color="#987cb9" SIZE="3">

          <div class="baseinfo-1" style="float:left">
            <el-form ref="postfrom.baseinfo" :model="postfrom.baseinfo" :rules="rules" label-width="80px" size="mini">
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="昵称">
                    <el-input v-model="postfrom.baseinfo.name" placeholder="请输入昵称"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别" class="from-col">
                    <el-radio v-model="postfrom.baseinfo.sex" label="男">男</el-radio>
                    <el-radio v-model="postfrom.baseinfo.sex" label="女">女</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="postfrom.baseinfo.mobile" placeholder="请绑定手机号"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱" prop="email" class="from-col">
                    <el-input v-model="postfrom.baseinfo.email" placeholder="请绑定邮箱"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="github">
                    <el-input v-model="postfrom.baseinfo.github" placeholder="请绑定github账号"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="所在学校" class="from-col">
                    <el-select v-model="postfrom.baseinfo.school" placeholder="请选择所在学校" clearable size="mini">
                      <el-option v-for="item in schoolOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="权限级别">
                    <span>&nbsp;&nbsp;管理员</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="职业" class="from-col">
                    <el-select v-model="postfrom.baseinfo.professional" placeholder="请选择你的职业" clearable size="mini">
                      <el-option v-for="item in professionalOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-button :disabled="issubbit" type="primary" size="mini" style="float: right;" @click="beforeSubbit">提交修改</el-button>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="9" class="personalinfo-col">
        <div class="avater">
          <!-- 头像上传组件 -->
          <AvatarUpload :userinfo ="userInfo"/>
        </div>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="dialogVisible" title="提示" width="40%">
      <div v-if="postfrom.baseinfo.mobile !== mobile && postfrom.baseinfo.email !== email" class="dialogfrom">
        <p>系统检测到你更新或绑定了手机号：<span>{{ postfrom.baseinfo.mobile }}</span> 和邮箱： <span>{{ postfrom.baseinfo.email }}</span></p>
        <p>系统将为手机号和邮箱创建站内账号请在下方输入密码</p>
        <el-input v-model="passwordlist.twopasswd" placeholder="请输入密码" type="password"/>
      </div>
      <div v-if="postfrom.baseinfo.mobile !== mobile && postfrom.baseinfo.email === email" class="dialogfrom">
        <p>系统检测到你更新或绑定了手机号为<span>{{ postfrom.baseinfo.mobile }}</span></p>
        <p>系统将为手机号创建站内账号请在下方输入密码</p>
        <el-input v-model="passwordlist.mobilepasswd" placeholder="请输入密码" type="password"/>
      </div>
      <div v-if="postfrom.baseinfo.email !== email && postfrom.baseinfo.mobile === mobile" class="dialogfrom">
        <p>系统检测到你更新或绑定了邮箱为<span>{{ postfrom.baseinfo.email }}</span></p>
        <p>系统将为邮箱创建站内账号请在下方输入密码</p>
        <el-input v-model="passwordlist.emailpasswd" placeholder="请输入密码" type="password"/>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AvatarUpload from './avatarUpload.vue'
import { PRO_MAP } from '@/utils/constants'
import { mapGetters } from 'vuex'
import { isvalidEmail, isvalidMobile } from '@/utils/validate'
import { subPersonalInfo } from '@/api/personalinfo'
import { getSchoolInfo } from '@/api/system'

export default {
  name: 'Personal',
  components: {
    AvatarUpload
  },
  data() {
    return {
      dialogVisible: false,
      issubbit: false,
      passwordlist: {
        emailpasswd: '',
        mobilepasswd: '',
        twopasswd: ''
      },
      postfrom: {
        baseinfo: {}
      },
      professionalOptions: [],
      schoolOptions: [],
      mobile: '',
      email: '',
      rules: {
        mobile: [
          { required: true, trigger: 'blur', validator: isvalidMobile },
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, trigger: 'blur', validator: isvalidEmail },
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    $route: {
      handler: function(route) {
        this.postfrom.baseinfo = this.userInfo
      },
      immediate: true // 立即执行
    }
  },
  created() {
    this.openHint()
    this.getschoollist()
    this.professionalOptions = PRO_MAP
    this.postfrom.baseinfo = this.userInfo
    this.mobile = this.userInfo.mobile
    this.email = this.userInfo.email
  },
  methods: {
    getschoollist() {
      const params = {}
      params.key = 'schoollist'
      getSchoolInfo(params).then(res => {
        this.schoolOptions = res.data
      })
    },
    openHint() {
      this.$notify.info({
        title: '温馨提示',
        message: '<p>1.个人档案手机号和邮箱可以做为登录账号使用</p>',
        dangerouslyUseHTMLString: true,
        position: 'bottom-right',
        duration: 60000
      })
    },
    handleClose() {
      // 确认绑定账号
      this.dialogVisible = false
      this.subbit(this.passwordlist)
    },
    beforeSubbit() {
      if (this.postfrom.baseinfo.mobile !== this.mobile || this.postfrom.baseinfo.email !== this.email) {
        // 绑定了或更新手机号 || 绑定了绑定了或更新手机号邮箱
        // 清空this.passwordlist
        this.passwordlist.emailpasswd = ''
        this.passwordlist.mobilepasswd = ''
        this.passwordlist.twopasswd = ''
        this.dialogVisible = true
      } else {
        this.subbit(false)
      }
    },
    subbit(msg) { // 提交修改
      // json 格式处理
      console.log(msg)
      const data = {}
      data.passwordlist = msg
      data.interests = JSON.stringify(this.postfrom.interests)
      data.baseinfo = this.postfrom.baseinfo
      data.habits = JSON.stringify(this.postfrom.habits)

      subPersonalInfo(data).then(res => {
        // 更新vuex,更新data
        this.mobile = data.baseinfo.mobile
        this.email = data.baseinfo.email
        const tempuser = data.baseinfo
        tempuser.interests = data.interests
        tempuser.livinghabits = data.habits
        this.$store.commit('SET_USER', tempuser)
        this.$message({
          message: '恭喜你，修改个人信息成功',
          type: 'success'
        })
      }).catch(() => {
        this.$message({
          message: '提示，修改信息失败',
          type: 'warning'
        })
      })
    }
  }
}
</script>
<style>
 .fromrow {
   margin: 0;
 }
  .personalinfo-row {
    background: #ffffff;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .personalinfo-row2 {
    background: #ffffff;
    margin-bottom: 20px;
    height: 500px;
    margin-top: 10px;
  }
  .personalinfo-col {
    margin: 10px;
    border-radius: 4px;
  }
  .baseinfo {
    background: #ffffff;
    height: 300px;
    width: 90%;
    margin-left: 20px;
    margin-top: 20px;
    border-radius: 3%;

      }
  .avater {
    background: #ffffff;
    box-shadow:5px 5px 5px rgba(0,0,0,.4);
    border-radius: 3%;
    height: 250px;
  }
  .Interests {
    background: #ffffff;
    height: 300px;
    border-radius: 3%;
  }
  .livinghabits {
    background:  #ffffff;
    height: 300px;
    border-radius: 3%;
  }
  .from-row {
    margin-top: 5px;
  }
  .from-col{
    margin-left: 20px;
  }
  .button-change {
    margin-left: 20px;
    margin-top: 50px;
  }
  .dialogfrom {
    font-size: 15px;
  }
  .dialogfrom span {
    color: brown;
    font-weight: 600;
  }
</style>
