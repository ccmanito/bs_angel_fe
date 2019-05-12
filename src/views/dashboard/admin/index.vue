<template>
  <div class="dashboard-container">
    <panel-group
      :total-user-count="statistics.totalUserCount"
      :total-dorm-count="statistics.totalDormCount"
      :total-visits-count="statistics.totalVisitsCount"
      :total-school-count="statistics.totalSchoolCount"
      style="panel-group"
      @handleSetLineChartData="handleSetLineChartData"/>
    <el-row :gutter="25">
      <el-col :span="12">
        <div class="chart" >
          <pie-chart v-if="showchart" :total-woman="statistics.total_woman" :total-man="statistics.total_man"/>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="chart">
          <pie-dorm-chart v-if="showchart" :total-used-dorm="statistics.total_used_dorm" :total-free-dorm="statistics.total_free_dorm"/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanelGroup from './PanelGroup'
import { getstatistics } from '@/api/system'
import PieChart from './pieChart'
import PieDormChart from './PicDormChart'

export default {
  name: 'Admin',
  components: {
    PanelGroup,
    PieChart,
    PieDormChart
  },
  data() {
    return {
      showchart: false,
      statistics: ''
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
    this.GetStatistics()
  },
  methods: {
    handleSetLineChartData(type) {
    },
    GetStatistics() {
      getstatistics().then(res => {
        this.statistics = res.data
        console.log(this.statistics)
      }).then(() => {
        this.showchart = true
      })
    }
  }
}
</script>

<style scoped>
/* .dashboard-container {
  background-color: #F2F6FC;
} */
.panel-group{
  border-radius: 3%;
  margin-top: 20px;
}
.chart {
  border-radius: 2%;
  background-color: #FFFFFF;
}
.table {
  border-radius: 2%;
  width: 100%;
  height: 300px;
  background-color: #FFFFFF;
}
</style>
