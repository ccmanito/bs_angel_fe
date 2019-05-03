<template>
  <div class="dashboard-container">
    <el-row :gutter="20" class="row">
      <el-col :span="14" class="col">
        <div class="baseinfo">
          <h3 class="title" style="margin-left: 10px">个人档案</h3>
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15)" width="90%" color="#987cb9" SIZE="3">
          <div class=" form-data" style="margin-left: 30px;">
            <el-row :gutter="10" class="row">
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="姓名" class="from-col">
                    {{ userInfo.name | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="性别" class="from-col">
                    {{ userInfo.sex | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="row">
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="邮箱:" class="from-col">
                    {{ userInfo.email | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="手机号:" class="from-col">
                    {{ userInfo.mobile | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="row">
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="所在学校:" class="from-col">
                    {{ userInfo.school | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="职业:" class="from-col">
                    {{ userInfo.professional | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <!-- <el-row :gutter="10" class="row">
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="邮箱:" class="from-col">
                    {{ userInfo.email | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="手机号:" class="from-col">
                    {{ userInfo.mobile | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row> -->
          </div>
        </div>
      </el-col>
      <el-col :span="9" class="col">
        <div class="box-card" style="margin-top:20px">
          <box-card/>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);margin-top: 20px" width="90%" color="#987cb9" SIZE="3">
      <div class="table-data" style="margin-left: 60px;">
        <el-button class="filter-item" style="margin-left: 10px;" type="text" icon="el-icon-edit" size="mini">新增分配</el-button>
        <el-table
          :data="tableData"
          border
          size="mini"
          style="width: 95%">
          <el-table-column
            prop="id"
            label="Id"
            width="60"/>
          <el-table-column
            prop="date"
            label="日期"
            width="180"/>
          <el-table-column
            prop="name"
            label="当前步骤"
            width="180"/>
          <el-table-column
            prop="name"
            label="申请人"
            width="180"/>
          <el-table-column
            prop="status"
            label="当前状态"
            width="180"/>
          <el-table-column
            prop="data"
            label="创建时间"
          />
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxCard from '../components/BoxCard'

export default {
  name: 'Teacher',
  components: {
    BoxCard
  },
  filters: {
    filtervalues(status) {
      if (status === null) {
        return '未填写'
      } else {
        return status
      }
    }
  },
  data() {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'userInfo',
      'usertype'
    ])
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
.test {
    float: left;
    width: 10;
}
</style>
