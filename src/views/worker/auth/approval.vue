<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="searchForm.school" size="mini" placeholder="单位类型" clearable class="filter-item" style="width: 160px">
        <el-option label="西安邮电大学" value="西安邮电大学"/>
        <el-option label="西北政法大学" value="西北政法大学"/>
        <el-option label="陕西师范大学" value="陕西师范大学"/>
        <el-option label="西北大学" value="西北大学"/>
        <el-option label="长安大学" value="长安大学"/>
      </el-select>
      <el-select v-model="searchForm.step_id" size="mini" placeholder="流程状态" clearable class="filter-item" style="width: 160px">
        <el-option label="流程中" value="1"/>
        <el-option label="已完成" value="2"/>

      </el-select>
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    </div>

    <div class="list-container">
      <el-table
        v-loading="loading"
        :data="ticketList"
        stripe
        size="mini"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="id"
          align="center"
          width="70"/>
        <el-table-column
          prop="school"
          label="所属单位"
          align="center"
          width="120"/>
        <el-table-column
          prop="remark"
          label="简要概述"
          align="center"/>
        <el-table-column
          prop="proposer_name"
          label="申请人"
          align="center"
          width="80"/>
        <el-table-column
          prop="status_id "
          label="申请状态"
          align="center"
          width="80">
          <template slot-scope="scope">
            <el-tag :type="ticketStatusMap[scope.row.status_id ].tagType" size="mini">{{ ticketStatusMap[scope.row.status_id ].title }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="step_id"
          label="当前步骤"
          align="center"
          width="90">
          <template slot-scope="scope">
            <el-tag :type="scope.row.step_id == 1?'primary':(scope.row.step_id == 3?'warning':'info')" size="mini">{{ scope.row.step_id | ticketStepIdFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="申请时间"
          align="center"/>
        <el-table-column
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              style="color: #409EFF"
              @click="handleDelete(scope.$index, scope.row)">通过</el-button>
            &nbsp; &nbsp;
            <el-button
              size="mini"
              type="text"
              style="color: #F56C6C"
              @click="handleDelete(scope.$index, scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWorkerList } from '@/api/worker'

export default {
  components: {
  },
  filters: {
    colorFilter: (value) => {
      if (value === '已关闭') {
        return '#F56C6C'
      } else {
        return '#67C23A'
      }
    },
    ticketStepIdFilter: (value) => {
      const ticketStepMap = {
        0: '新申请',
        1: '已完成'
      }
      return ticketStepMap[value]
    }
  },
  data() {
    return {
      loading: false,
      track: false,
      ticketList: [],
      searchForm: {
        school: '',
        step_id: ''
      },
      createFormVisible: false,
      ticketStatusMap: {
        1: { title: '申请中', tagType: '' },
        2: { title: '操作完成', tagType: 'success' }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  //   created() {
  //     this.fetchData()
  //   },
  methods: {
    handleDelete(index, row) {
      // console.log(index, row)
    },
    handleFilter() {
      const filters = { ...this.searchForm }
      this.fetchData({ token: this.userInfo.token, filters: JSON.stringify(filters) })
    },
    fetchData(params) {
      this.loading = true
      this.ticketList = []
      params = { token: this.userInfo.token, ...params }
      getWorkerList(params).then(res => {
        this.ticketList = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pagination-container{
  text-align: left;
}
</style>
