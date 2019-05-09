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
        <el-button class="filter-item" style="margin-left: 10px;" type="text" icon="el-icon-edit" size="mini" @click="addTask()">新增分配</el-button>
        <el-button class="filter-item" style="margin-left: 10px;" type="text" size="mini" @click="addTask()">详情</el-button>

        <el-table
          :data="ticketList"
          size="mini"
          style="width: 95%">
          <el-table-column
            prop="id"
            label="Id"
            width="60"/>
          <el-table-column
            prop="school"
            label="分配单位"
            width="180"/>
          <el-table-column
            prop="remark"
            label="简要概述"
            width="180"/>
          <el-table-column
            prop="step_id"
            label="当前步骤"
            width="180">
            <template slot-scope="scope">
              <el-tag :type="ticketstepMap[scope.row.step_id ].tagType" size="mini">{{ ticketstepMap[scope.row.step_id ].title }}</el-tag>
            <!-- <el-tag :type="scope.row.step_id == 1?'primary':(scope.row.step_id == 3?'warning':'info')" size="mini">{{ scope.row.step_id | ticketStepIdFilter }}</el-tag> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="status_id"
            label="当前状态"
            width="180">
            <template slot-scope="scope">
              <el-tag :type="ticketStatusMap[scope.row.status_id ].tagType" size="mini">{{ ticketStatusMap[scope.row.status_id ].title }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_date"
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
import { getWorkerList } from '@/api/worker'

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
      ticketList: [],
      ticketStatusMap: {
        1: { title: '申请中', tagType: '' },
        2: { title: '操作完成', tagType: 'success' }
      },
      ticketstepMap: {
        0: { title: '数据收集', tagType: 'info' },
        1: { title: '聚类划分', tagType: '' },
        2: { title: '宿舍分配', tagType: 'warning' },
        3: { title: '已完成', tagType: 'success' }
      }
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
  created() {
    this.fetchData()
  },
  methods: {
    addTask() {
      this.$router.push({ path: '/worker/info' })
    },
    fetchData(params) {
      this.ticketList = []
      params = { token: this.userInfo.token, ...params }
      getWorkerList(params).then(res => {
        this.ticketList = res.data
      }).catch(() => {
      })
    }
  }
}
</script>

<style scoped>
.test {
    float: left;
    width: 10;
}
</style>
