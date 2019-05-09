<template>
  <el-form ref="dataForm" :rules="applyRules" :model="form" :disabled="disabled" size="mini" label-position="right" label-width="100px">
    <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);margin-top: 2px;margin-bottom: 20px;" width="100%" color="#987cb9" SIZE="3">
    <el-form-item label="学校名称" prop="school">
      <el-input v-model="form.school" style="width: 95%;" placeholder="请填写学校名称"/>
    </el-form-item>
    <el-form-item label="学院" prop="college">
      <el-input
        v-model="form.college"
        style="width: 95%;"
        type="textarea"
        autosize
        placeholder="多个信息使用“ ，” 进行分隔"/>
    </el-form-item>
    <el-form-item label="年级" prop="grade">
      <el-input
        v-model="form.grade"
        style="width: 95%;"
        type="textarea"
        autosize
        placeholder="多个信息使用“ ，” 进行分隔"/>
    </el-form-item>
    <el-form-item label="专业" prop="major">
      <el-input
        v-model="form.major"
        style="width: 95%;"
        type="textarea"
        autosize
        placeholder="多个信息使用“ ，” 进行分隔"/>
    </el-form-item>
    <el-form-item label="班级" prop="classname">
      <el-input
        v-model="form.classname"
        style="width: 95%;"
        type="textarea"
        autosize
        placeholder="多个信息使用“ ，” 进行分隔"/>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input :autosize="{ minRows: 3, maxRows: 4}" v-model="form.remark" type="textarea" placeholder="请填写详细的备注信息" style="width: 95%;"/>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ApplyDetail',
  props: {
    form: {
      type: Object,
      required: true,
      default: () => {}
    },
    size: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.visible,
      id: undefined,
      temp: '',
      textMap: {
        update: '修改信息',
        create: '宿舍录入'
      },
      applyRules: {
        school: [
          { required: true, message: '学校名称必须填写', trigger: 'blur' }
        ],
        college: [
          { required: true, message: '至少录入一个学院信息', trigger: 'blur' }
        ],
        major: [
          { required: true, message: '至少录入一个专业信息', trigger: 'blur' }
        ],
        classname: [
          { required: true, message: '至少录入一个班级信息', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
  },
  methods: {
    // region单选框改变时间
    resetFields() {
      this.$refs.dataForm.resetFields()
    },
    validate(func) {
      this.$refs['dataForm'].validate(func)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tags>* {
    margin: 2px;
  }
  .line {
    text-align: center;
  }
</style>
