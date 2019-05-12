<template>
  <div class="main-conter">
    <el-card class="box-card" style="margin-top: 20px;margin-bottom: 50px;">
      <div slot="header" class="clearfix">
        <span>分配信息</span>
      </div>
      <el-row :gutter="50" class="dorminfo" style="margin-top: 5px">
        <el-col>
          <el-tag size="mini" style="margin-left:10px;margin-bottom: 10px" type="success">提示：每个table数据都可以导出Excel</el-tag>
          <el-button :loading="downloadLoading" size="mini" class="filter-item" type="success" icon="el-icon-download" @click="handleDownload('male')">导出</el-button>

        </el-col>
        <el-col :span="24">
          <el-table
            :data="man_result"
            size="mini"
            max-height="1250"
            style="width: 100%">
            <el-table-column
              prop="dorm_id"
              label="房间ID"
              align="center"
              width="90"/>
            <el-table-column
              prop="address"
              label="地址"
              align="center"
              width="120"/>
            <el-table-column
              prop="dorm_type"
              label="宿舍类型"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.dorm_type | namefiter() }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="floor"
              label="公寓名称"
              align="center"
              width="140"/>
            <el-table-column
              prop="dorm_size"
              label="房间容量"
              align="center"
              width="70"/>
            <el-table-column
              prop="userlist"
              align="center"
              label="宿舍人员">
              <template slot-scope="scope">
                <DormInfo :dorm-data="scope.row.userlist"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <el-col style="margin-top: 15px;">
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);" width="100%" color="#67C23A" SIZE="2">
        </el-col>
      </el-row>
      <el-row :gutter="50" style="margin-top: 20px;">
        <el-col style="margin-left:10px;margin-bottom: 20px;">
          <el-button :loading="downloadLoading" size="mini" class="filter-item" type="success" icon="el-icon-download" @click="handleDownload()">导出</el-button>
        </el-col>
        <el-col :span="24">
          <el-table
            :data="woman_result"
            size="mini"
            max-height="1250"
            style="width: 100%">
            <el-table-column
              prop="dorm_id"
              label="房间ID"
              align="center"
              width="90"/>
            <el-table-column
              prop="address"
              label="地址"
              align="center"
              width="120"/>
            <el-table-column
              prop="dorm_type"
              label="宿舍类型"
              align="center"
              width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.dorm_type | namefiter() }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="floor"
              label="公寓名称"
              align="center"
              width="140"/>
            <el-table-column
              prop="dorm_size"
              label="房间容量"
              align="center"
              width="70"/>
            <el-table-column
              prop="userlist"
              align="center"
              label="宿舍人员">
              <template slot-scope="scope">
                <DormInfo :dorm-data="scope.row.userlist"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getWorkerDetail } from '@/api/worker'
import ApplyDetail from './dormDetail'
import { mapGetters } from 'vuex'
import DormInfo from './dormIDInfo'

export default {
  components: {
    ApplyDetail,
    DormInfo
  },
  filters: {
    namefiter: (value) => {
      return value + '生公寓'
    }
  },
  data() {
    return {
      data: [],
      filename: '',
      downloadLoading: false,
      step_id: 0,
      id: 0,
      woman_result: [],
      man_result: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.step_id = this.$route.params.step_id
    this.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {}
      params.id = this.id
      params.u_id = this.userInfo.token
      params.step_id = this.step_id
      getWorkerDetail(params).then(res => {
        this.woman_result = res.data.woman_result
        this.man_result = res.data.man_result
      })
    },
    handleDownload(msg) {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['id', 'dorm_id', 'address', 'dorm_type', 'floor', 'dorm_size', 'userlist']
        const filterVal = ['id', 'dorm_id', 'address', 'dorm_type', 'floor', 'dorm_size', 'userlist']
        if (msg === 'male') {
          this.data = this.formatJson(filterVal, this.man_result)
          this.filename = '男生宿舍分配详情表'
        } else {
          this.data = this.formatJson(filterVal, this.woman_result)
          this.filename = '女生宿舍分配详情表'
        }
        excel.export_json_to_excel({
          header: tHeader,
          data: this.data,
          filename: this.filename
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'userlist') {
          return JSON.stringify(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
</script>

<style scoped>
.main-conter {
    background-color: #FFFFFF;
    width: 100%;
    height: auto;
    margin-bottom: 50px;
    padding: 0;
}
</style>
