<template>
  <el-form ref="dataForm" :rules="applyRules" :model="form" :disabled="disabled" size="mini" label-position="right" label-width="100px">
    <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);margin-top: 2px;margin-bottom: 20px;" width="100%" color="#987cb9" SIZE="3">
    <el-form-item label="关键字" prop="keyword">
      <el-input v-model="form.keyword" style="width: 95%;" placeholder="该申请唯一识别、例： xiyou-1"/>
    </el-form-item>
    <el-form-item label="结束时间" prop="endtime">
      <el-date-picker
        v-model="form.endtime"
        :picker-options="pickerOptions"
        type="datetime"
        style="width: 95%"
        placeholder="选择该分配任务结束的时间"
        default-time="12:00:00"/>
    </el-form-item>
    <el-form-item label="学校" prop="school">
      <el-select v-model="form.school" placeholder="请选择所在学校" clearable style="width: 95%;">
        <el-option v-for="item in schoolinfo.school" :key="item" :label="item" :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="年级" prop="grade">
      <el-select v-model="form.grade" placeholder="可选项（支持多选）、为空代表不以年级为单位" multiple clearable style="width: 95%;">
        <el-option v-for="item in schoolinfo.grade" :key="item" :label="item" :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="学院" prop="college">
      <el-select v-model="form.college" placeholder="可选项（支持多选）、为空代表不以学院为单位" multiple clearable style="width: 95%;">
        <el-option v-for="item in schoolinfo.college" :key="item" :label="item" :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="专业" prop="major">
      <el-select v-model="form.major" placeholder="可选项（支持多选）、为空代表不以年级为单位" multiple clearable style="width: 95%;">
        <el-option v-for="item in schoolinfo.major" :key="item" :label="item" :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="班级" prop="classname">
      <el-select v-model="form.classname" placeholder="可选项（支持多选）、为空代表不以年级为单位" multiple clearable style="width: 95%;">
        <el-option v-for="item in schoolinfo.classname" :key="item" :label="item" :value="item"/>
      </el-select>
    </el-form-item>
    <el-form-item label="分配备注" prop="remark">
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
    },
    schoolinfo: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data() {
    return {
      show: this.visible,
      id: undefined,
      temp: '',
      textMap: {
        update: '修改申请',
        create: '新建申请'
      },
      schoolOptions: [],
      collegeOptions: [],
      majorOptions: [],
      gradeOptions: [],
      classnameOptions: [],
      applyRules: {
        keyword: [
          { required: true, message: '必选项，为该分配添加唯一识别的key', trigger: 'blur' }
        ],
        endtime: [
          { required: true, message: '必选项，该新增宿舍分配数据收集结束时间', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '一天后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '俩天后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 2)
              picker.$emit('pick', date)
            }
          }, {
            text: '三天后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 3)
              picker.$emit('pick', date)
            }
          }
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
