<template>
  <div class="personalinfo">
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="baseinfo">
          <h3 class="title" style="margin-left: 10px">个人档案</h3>
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15)" width="90%" color="#987cb9" SIZE="3">

          <div class="baseinfo-1" style="float:left">
            <el-form :label-position="right" :model="personalinfo" label-width="80px" size="mini">
              <el-form-item label="昵称">
                <el-input v-model="personalinfo.name"/>
              </el-form-item>
              <el-form-item label="性别">
                <el-input v-model="personalinfo.region"/>
              </el-form-item>
            </el-form>
          </div>
          <div class="baseinfo-2" style="float:right;margin-right: 60px">
            <el-form :label-position="right" :model="formLabelAlign" label-width="80px" size="mini">
              <el-form-item label="学校">
                <el-input v-model="personalinfo.name"/>
              </el-form-item>
              <el-form-item label="学院">
                <el-input v-model="personalinfo.region"/>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
      <el-col :span="9">
        <div class="avater">
          <AvatarUpload/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="23"><div class="baseinfo1"/></el-col>
    </el-row>

  </div>
</template>

<script>
import AvatarUpload from './avatarUpload.vue'
export default {
  name: 'Personal',
  components: {
    AvatarUpload
  },
  data() {
    return {
      personalinfo: {
        name: '',
        region: '',
        type: ''
      }

    }
  }

}
</script>
<style>
  .el-row {
    background: #ffffff;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .el-col {
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
