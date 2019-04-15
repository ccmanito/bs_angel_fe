<template>
  <div class="personalinfo">
    <el-row :gutter="20" class="personalinfo-row">
      <el-col :span="14" class="personalinfo-col">
        <div class="baseinfo">
          <h3 class="title" style="margin-left: 10px">个人档案</h3>
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15)" width="90%" color="#987cb9" SIZE="3">

          <div class="baseinfo-1" style="float:left">
            <el-form :model="frominfo" label-width="80px" size="mini">
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="昵称">
                    <el-input v-model="frominfo.name" placeholder="请输入昵称"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="性别">
                    <el-radio v-model="frominfo.sex" label="男">男</el-radio>
                    <el-radio v-model="frominfo.sex" label="女">女</el-radio>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="手机号">
                    <el-input v-model="frominfo.mobile" placeholder="请绑定手机号"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="邮箱">
                    <el-input v-model="frominfo.email" placeholder="请绑定邮箱"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="所读学校">
                    <el-input v-model="frominfo.school" placeholder="请输入所读学校"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="学院">
                    <el-input v-model.number="frominfo.college" placeholder="请输入所在学院"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="from-row">
                <el-col :span="12">
                  <el-form-item label="专业">
                    <el-input v-model="frominfo.major" placeholder="请输入所在专业"/>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="年级">
                    <el-input v-model.number="frominfo.grade" placeholder="请输入所在年级"/>
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
    <el-row :gutter="20" class="personalinfo-row">
      <el-col :span="23" class="personalinfo-col"><div class="baseinfo1"/></el-col>
    </el-row>

  </div>
</template>

<script>
import AvatarUpload from './avatarUpload.vue'
import { SCHOOL_MAP } from '@/utils/constants'
import { mapGetters } from 'vuex'
export default {
  name: 'Personal',
  components: {
    AvatarUpload
  },
  data() {
    return {
      frominfo: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.schoollist = SCHOOL_MAP
    this.frominfo = this.userInfo
    console.log(this.frominfo)
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
  .baseinfo1 {
    background: #ffffff;
    height: 300px;
    border-radius: 3%;
  }
</style>
