<template>
  <div class="app-container">
    <div class="filter-container">
    <!-- <el-select v-model="searchForm.ApplicationType" size="mini" placeholder="应用类型" clearable class="filter-item" style="width: 110px">
        <el-option label="redis" value="redis"/>
        <el-option label="kafka" value="kafka"/>
      </el-select>
      <el-input v-model="searchForm.proposer" size="mini" placeholder="申请人" style="width: 100px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-input v-model="searchForm.department" size="mini" placeholder="部门" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter"/> -->

    <!-- <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button> -->
    <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleApply()">新建分配</el-button>    </div>

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
          width="80"/>
        <el-table-column
          prop="school"
          label="申请单位"
          align="center"
          width="80"/>
        <el-table-column
          prop="description"
          label="简要概述"
          align="center"/>
        <el-table-column
          prop="proposerName"
          label="申请人"
          align="center"/>
        <el-table-column
          prop="statusId"
          label="申请状态"
          align="center">
          <template slot-scope="scope">
            <el-tag :type="ticketStatusMap[scope.row.statusId].tagType">{{ ticketStatusMap[scope.row.statusId].title }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="stepId"
          label="当前步骤"
          align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.stepId == 1?'primary':(scope.row.stepId == 3?'warning':'info')">{{ scope.row.stepId | ticketStepIdFilter }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="申请时间"
          align="center"/>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <router-link :to="''+scope.row.id">
              <el-button type="text" size="small">详情</el-button>
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="totalNum >= 10" class="pagination-container">
        <el-pagination
          :current-page="page"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pageSize"
          :total="totalNum"
          background
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="paginationSizeChange"
          @current-change="paginationChange"/>
      </div>
    </div>
    <apply-dialog :visible.sync="createFormVisible" @submit="ApplySubmit"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getWorkerList } from '@/api/worker'
import ApplyDialog from './components/dormApply'

export default {
  components: {
    ApplyDialog
  },
  filters: {
    ticketStepIdFilter: (value) => {
      const ticketStepMap = {
        1: '申请确认',
        2: '自动节点',
        3: '运维配置',
        4: '结单'
      }
      return ticketStepMap[value]
    }
  },
  data() {
    return {
      loading: false,
      track: false,
      page: 1,
      pageSize: 10,
      totalNum: 0,
      ticketList: [],
      searchForm: {},
      createFormVisible: false,
      ticketStatusMap: {
        1: { title: '申请中', tagType: '' },
        2: { title: '操作完成', tagType: 'success' },
        3: { title: '驳回', tagType: 'danger' },
        4: { title: '撤回', tagType: 'info' }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    // $route() {
    //   if (this.$route.name === 'ApplyTrack') {
    //     this.track = true
    //   } else {
    //     this.track = false
    //   }
    //   this.page = 1
    //   this.fetchData()
    // }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    handleFilter() {
      const filters = { ...this.searchForm }
      this.fetchData({ page: 1, page_size: this.pageSize, filters: JSON.stringify(filters) })
    },
    handleApply(msg) {
      this.createFormVisible = true
    },
    fetchData(params) {
      this.loading = true
      this.ticketList = []
      params = { page: this.page, page_size: this.pageSize, ...params }
      getWorkerList(params).then(res => {
        this.ticketList = res.data.resultList
        this.totalNum = res.data.totalNum
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    // 分页器点击
    paginationChange(val) {
      this.page = val
      this.fetchData()
    },
    // 分页size大小改变
    paginationSizeChange(val) {
      this.pageSize = val
      this.page = 1
      this.fetchData()
    },
    ApplySubmit() {
      this.fetchData()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.pagination-container{
  text-align: left;
}
</style>
