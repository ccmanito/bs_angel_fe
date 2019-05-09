<template>
  <div class="main-auth">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-row :gutter="20">
        <el-col :span="14">
          <el-form label-position="left" inline label-width="100px" class="table-form-expand">
            <el-form-item label="当前权限：">
              <span v-if="roles.includes('student')" style="color:#409EFF">普通用户</span>
              <span v-if="roles.includes('admin')" style="color:#409EFF">超级管理员</span>
              <span v-if="roles.includes('teacher')" style="color:#409EFF">管理员</span>
              <el-tag v-if="roles.includes('admin')" size= "mini" type="success" style="margin-left: 30px">提示：您已是最高权限用户</el-tag>
            </el-form-item>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <el-form-item v-if="!roles.includes('admin')" label="申请状态：">
              <el-tag :type="ticketStatusMap[status_id].tagType" size="mini">{{ ticketStatusMap[status_id].title }}</el-tag>
            </el-form-item>
          </el-form>
          <div v-show="!roles.includes('admin')" class="apply-from">
            <h4 class="title" style="margin-left: 10px;width: 150px">申请表单</h4>
            <div class="hr-class" style="margin-left: -30px" >
              <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);" width="80%" color="#909399" SIZE="2">
            </div>
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="mini" style="margin-top: 20px">
              <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名" style="width: 300px;"/>
              </el-form-item>
              <el-form-item label="职业" prop="professional">
                <el-input v-model="form.professional" placeholder="请输入你的职业" style="width: 300px;"/>
              </el-form-item>
              <el-form-item label="所在单位" prop="school">
                <el-input v-model="form.school" placeholder="请输入所在单位" style="width: 300px;"/>
              </el-form-item>
              <el-form-item label="申请备注" prop="remark">
                <el-input :autosize="{ minRows: 3, maxRows: 4}" v-model="form.remark" type="textarea" placeholder="请填写详细的申请原因及用途" style="width: 300px;"/>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" icon="el-icon-edit" style="margin-left: 220px" type="primary" @click="Subbit('form')">申请</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="6">
          <div v-show="!roles.includes('admin')" style="height: 300px;margin-top:50px">
            <el-steps :active="step" direction="vertical">
              <el-step title="提交申请"/>
              <el-step title="管理员审核"/>
              <el-step title="完成" description="恭喜您获取到管理员权限"/>
            </el-steps>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { create_apply_auth, get_auth_apply } from '@/api/worker'

export default {
  components: {
  },
  data() {
    return {
      step: 0,
      status_id: 3,
      form: {
        name: '',
        school: '',
        remark: '',
        professional: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        school: [
          { required: true, message: '请输入你所在单位', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入申请缘由', trigger: 'blur' }
        ],
        professional: [
          { required: true, message: '请输入你的职业', trigger: 'blur' }
        ]
      },
      ticketList: [],
      ticketStatusMap: {
        0: { title: '申请中', tagType: 'success' },
        1: { title: '已完成', tagType: 'warning' },
        2: { title: '驳回', tagType: 'danger' },
        3: { title: '无', tagType: 'info' }

      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'name',
      'roles'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {}
      params.proposer = this.userInfo.token
      params.roles = 1
      get_auth_apply(params).then(res => {
        this.step = res.data.step
        this.status_id = res.data.status_id
      })
    },
    Subbit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = {}
          params.proposer_name = this.form.name
          params.professional = this.form.professional
          params.school = this.form.school
          params.remark = this.form.remark
          params.step = 1
          params.status_id = 0
          params.proposer = this.userInfo.token
          create_apply_auth(params).then(res => {
            this.step = 1
            this.$router.push({ path: '/worker/auth/empty' })
            this.$notify({
              title: '成功',
              message: '申请成功，等待管理员审核',
              type: 'success',
              duration: 2000
            })
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

<style scoped>
.box-card {
    background-color: #FFFFFF;
    width: 97%;
    height: 600px;
    margin-top: 20px;
    margin-left: 20px;
}
</style>
