<template>
  <el-dialog :title="textMap[dialogStatus]" :visible="show" width="500px" top="2%" @close="$emit('update:visible', false)">
    <ApplyDetail ref="ApplyDetail" :form="form" :posit="true" style="margin:0px 90px 0px 40px;"/>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="$emit('update:visible', false)">取消</el-button>
      <el-button size="mini" type="primary" @click="dialogStatus==='create'?createApply():updateData()">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createSchoolApply, updateSchoolApply } from '@/api/system'
import { mapGetters } from 'vuex'
import ApplyDetail from './schoolDetail'

export default {
  name: 'ApplyDialog',
  components: {
    ApplyDetail
  },
  props: {
    form: {
      type: Object,
      default() {
        return {
          school: '',
          college: '',
          major: '',
          classname: '',
          grade: '',
          remark: ''
        }
      }
    },
    ticketId: {
      type: Number,
      default: 0
    },
    dialogStatus: {
      type: String,
      default() {
        return 'create'
      }
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: this.visible,
      textMap: {
        update: '修改信息',
        create: '学校信息录入'
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    visible(newValue) {
      this.show = newValue
      // 在关闭的时候重置表单
      if (newValue === false) {
        if (this.dialogStatus === 'create') {
          this.form.module = ''
          this.$refs.ApplyDetail.resetFields()
        }
      }
    }
  },
  created() {
  },
  methods: {
    resetForm() {
      this.form.school = ''
      this.form.college = ''
      this.form.grade = ''
      this.form.major = ''
      this.form.classname = ''
      this.form.remark = ''
    },
    updateData() {
      this.$refs['ApplyDetail'].validate((valid) => {
        if (valid) {
          const data = {
            school: this.form.school,
            college: this.form.college,
            grade: this.form.grade,
            major: this.form.major,
            classname: this.form.classname,
            remark: this.form.remark,
            ticketId: this.ticketId
          }
          updateSchoolApply(data).then(res => {
            this.$notify({
              title: '成功',
              message: '修改工单成功',
              type: 'success',
              duration: 2000
            })
            this.show = false
            this.$emit('submit')
          })
        } else {
          console.log('apply Form validation failed.')
          return false
        }
      })
    },
    createApply() {
      this.$refs['ApplyDetail'].validate((valid) => {
        if (valid) {
          const data = {
            school: this.form.school,
            college: this.form.college,
            grade: this.form.grade,
            major: this.form.major,
            userInfo: this.userInfo,
            classname: this.form.classname,
            remark: this.form.remark
          }
          console.log(data, 'eeeeeeeeeee')
          createSchoolApply(data).then(res => {
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
            this.show = false
            this.$emit('submit')
          })
        } else {
          console.log('apply Form validation failed.')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
