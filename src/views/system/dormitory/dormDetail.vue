<template>
  <el-form ref="dataForm" :rules="applyRules" :model="form" :disabled="disabled" size="mini" label-position="right" label-width="100px">
    <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);margin-top: 2px;margin-bottom: 20px;" width="100%" color="#987cb9" SIZE="3">
    <el-form-item label="地址" prop="address">
      <el-input v-model="form.address" style="width: 95%;" placeholder="请填写宿舍地址： 邮电东区"/>
    </el-form-item>
    <el-form-item label="楼/层" prop="floor">
      <el-input v-model="form.floor" style="width: 95%;" placeholder="请填写楼/层 ： 安美公寓/4楼"/>
    </el-form-item>
    <el-form-item label="房间号" prop="dorm_id">
      <el-input v-model="form.dorm_id" style="width: 95%;" placeholder="请输入宿舍房间号： 2405"/>
    </el-form-item>
    <el-form-item label="房间容量" prop="dorm_size">
      <el-input v-model="form.dorm_size" style="width: 95%;" placeholder="请输入宿舍可住人数"/>
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
        address: [
          { required: true, message: '宿舍地址必须填写', trigger: 'blur' }
        ],
        floor: [
          { required: true, message: '宿舍楼层信息必须填写', trigger: 'blur' }
        ],
        dorm_id: [
          { required: true, message: '宿舍房间号必须填写', trigger: 'blur' }
        ],
        dorm_size: [
          { required: true, message: '宿舍房间可住人数必须填写：4、6、8或10', trigger: 'blur' }
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
