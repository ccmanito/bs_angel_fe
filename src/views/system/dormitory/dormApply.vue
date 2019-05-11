<template>
  <el-dialog :title="textMap[dialogStatus]" :visible="show" width="500px" top="6%" @close="$emit('update:visible', false)">
    <ApplyDetail ref="ApplyDetail" :form="form" :posit="true" style="margin:0px 90px 0px 40px;"/>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="$emit('update:visible', false)">取消</el-button>
      <el-button size="mini" type="primary" @click="dialogStatus==='create'?createApply():updateData()">确认</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { createWorkApply } from '@/api/system'
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
          address: '',
          floor: '',
          dorm_id: '',
          remark: '', // 申请原因
          dorm_size: '',
          dorm_type: ''
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
        update: '修改修改',
        create: '宿舍录入'
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
      this.form.address = ''
      this.form.floor = ''
      this.form.dorm_id = ''
      this.form.remark = ''
      this.form.dorm_size = ''
      this.form.dorm_type = ''
    },
    createApply() {
      this.$refs['ApplyDetail'].validate((valid) => {
        if (valid) {
          const data = {
            dorm_size: this.form.dorm_size,
            address: this.form.address,
            floor: this.form.floor,
            dorm_id: this.form.dorm_id,
            userinfo: this.userInfo,
            remark: this.form.remark,
            dorm_type: this.form.dorm_type
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
