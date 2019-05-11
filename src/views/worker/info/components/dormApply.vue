<template>
  <el-dialog :title="textMap[dialogStatus]" :visible="show" width="600px" top="2%" @close="$emit('update:visible', false)">
    <ApplyDetail ref="ApplyDetail" :form="form" :posit="true" :schoolinfo="schoolinfo" style="margin:0px 90px 0px 40px;"/>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="$emit('update:visible', false)">取消</el-button>
      <el-button size="mini" type="primary" @click="dialogStatus==='create'?createApply():updateData()">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createWorkApply } from '@/api/worker'
import { getSchoolInfo } from '@/api/system'
import { mapGetters } from 'vuex'
import ApplyDetail from './dormDetail'

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
          keyword: '',
          endtime: '',
          school: '',
          college: [],
          major: '',
          grade: [],
          classname: '',
          remark: '' // 申请原因
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
      schoolinfo: {},
      textMap: {
        update: '修改申请',
        create: '新建申请'
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
    this.form.school = this.userInfo.school
  },
  methods: {
    resetForm() {
      this.form.keyword = ''
      this.form.school = ''
      this.form.endtime = new Date()
      this.form.college = ''
      this.form.major = ''
      this.form.classname = ''
      this.form.remark = ''
    },
    getschoolinfo() {
      const params = {}
      params.key = 'comm'
      params.school = this.userInfo.school
      getSchoolInfo(params).then(res => {
        this.schoolinfo = res.data
      })
    },
    createApply() {
      this.$refs['ApplyDetail'].validate((valid) => {
        if (valid) {
          const data = {
            description: '新建宿舍分配申请',
            form_data: JSON.stringify(this.form),
            userinfo: this.userInfo,
            endtime: this.form.endtime.getTime(),
            remark: this.form.remark
          }
          createWorkApply(data).then(res => {
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
