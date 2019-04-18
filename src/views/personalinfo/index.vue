<template>
  <div class="personalinfo">
    <el-row :gutter="20" class="personalinfo-row">
      <el-col :span="14" class="personalinfo-col">
        <div class="baseinfo">
          <h3 class="title" style="margin-left: 10px">个人档案</h3>
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15)" width="90%" color="#987cb9" SIZE="3">

          <div class="baseinfo-1" style="float:left">
            <el-form :model="postfrom.baseinfo" label-width="80px" size="mini">
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
                  <el-form-item label="手机号">
                    <el-input v-model="postfrom.baseinfo.mobile" placeholder="请绑定手机号"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱" class="from-col">
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
                  <el-form-item label="所读学校" class="from-col">
                    <el-select v-model="postfrom.baseinfo.school" placeholder="请选择所在学校" clearable size="mini">
                      <el-option v-for="item in schoolOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="学院">
                    <el-select v-model="postfrom.baseinfo.college" placeholder="请选择所在学院" clearable size="mini">
                      <el-option v-for="item in collegeOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="年级" class="from-col">
                    <el-select v-model="postfrom.baseinfo.grade" placeholder="请选择所在年级" clearable size="mini">
                      <el-option v-for="item in gradeOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="专业">
                    <el-select v-model="postfrom.baseinfo.major" placeholder="请选择所在专业" clearable size="mini">
                      <el-option v-for="item in majorOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="班级" class="from-col">
                    <el-select v-model="postfrom.baseinfo.classname" placeholder="请选择你所在的班级" clearable size="mini">
                      <el-option v-for="item in classnameOptions" :key="item" :label="item" :value="item"/>
                    </el-select>
                  </el-form-item>
                </el-col>
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
    <el-row :gutter="10" class="personalinfo-row2">
      <el-col :span="14" class="personalinfo-col">
        <div class="Interests">
          <h4 class="title" style="margin-left: 10px;width: 100px">兴趣爱好</h4>
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);" width="90%" color="#987cb9" SIZE="2">
          <interestlist ref="interestData" :list1="list1" :list2="list2" list1-title="Inteest List" list2-title="Inteest pool"/>
        </div>
      </el-col>

      <el-col :span="9" class="personalinfo-col">
        <div class="livinghabits">
          <h4 class="title" style="margin-left: 10px;width: 150px">生活习惯(其他)</h4>
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);" width="90%" color="#987cb9" SIZE="2">
          <el-row class="from-row" style="margin-left: 15px;margin-top: 20px;">
            <el-col :span="23">
              <el-form :model="postfrom.baseinfo" label-width="80px" size="mini">
                <el-form-item label="作息时间">
                  <el-select v-model="postfrom.habits.time" placeholder="请选择你的作息时间" clearable size="mini">
                    <el-option v-for="item in habitstimeOptions" :key="item" :label="item" :value="item"/>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="23">
              <el-form :model="postfrom.baseinfo" label-width="80px" size="mini">
                <el-form-item label="学习意向">
                  <el-radio v-model="postfrom.habits.learnintent" label="考研深造">考研深造</el-radio>
                  <el-radio v-model="postfrom.habits.learnintent" label="求职就业">求职就业</el-radio>
                  <el-radio v-model="postfrom.habits.learnintent" label="无要求"/>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-button type="primary" size="mini" class="button-change" @click="subbit">提交修改</el-button>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import AvatarUpload from './avatarUpload.vue'
import { SCHOOL_MAP, COLLEGE_MAP, MAJOR_MAP, GRADE_MAP, CLASS_NAME_MAP, INTEREST_POOL_MAP, HABITS_TIME_MAP } from '@/utils/constants'
import { mapGetters } from 'vuex'
import Interestlist from './stucomponents/interestlist.vue'
import { subPersonalInfo } from '@/api/personalinfo'
export default {
  name: 'Personal',
  components: {
    AvatarUpload,
    Interestlist
  },
  data() {
    return {
      postfrom: {
        interests: [],
        habits: {
          time: '',
          learnintent: ''
        },
        baseinfo: {}
      },
      schoolOptions: [],
      collegeOptions: [],
      majorOptions: [],
      gradeOptions: [],
      habitstimeOptions: [],
      classnameOptions: [],
      list1: [],
      list2: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.schoolOptions = SCHOOL_MAP
    this.collegeOptions = COLLEGE_MAP
    this.majorOptions = MAJOR_MAP
    this.gradeOptions = GRADE_MAP
    this.classnameOptions = CLASS_NAME_MAP
    this.habitstimeOptions = HABITS_TIME_MAP
    this.list2 = INTEREST_POOL_MAP
    this.list1 = this.list2.splice(0, 3)
    this.postfrom.baseinfo = this.userInfo
  },
  methods: {
    subbit() { // 提交修改
      this.postfrom.interests = this.$refs.interestData.list1
      console.log(this.postfrom)
      subPersonalInfo(this.postfrom).then(res => {
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
</style>
