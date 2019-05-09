<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchForm.floor" clearable size="mini" placeholder="楼层模糊查询" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="searchForm.status" size="mini" placeholder="分配状态" clearable class="filter-item" style="width: 160px">
        <el-option label="待分配" value="0"/>
        <el-option label="已分配" value="1"/>
      </el-select>
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
    <el-button size="mini" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleApply()">录入</el-button>    </div>

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
          width="50"/>
        <el-table-column
          prop="status"
          label="分配状态"
          align="center"
          width="70">
          <template slot-scope="scope">
            <el-tag :type="ticketStatusMap[scope.row.status].tagType" size="mini">{{ ticketStatusMap[scope.row.status].title }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          align="center"
          width="80"
        />
        <el-table-column
          prop="floor"
          label="楼层"
          align="center"/>
        <el-table-column
          prop="dorm_id"
          label="房间号"
          align="center"
          width="70"
        />
        <el-table-column
          prop="dorm_size"
          label="房间容量"
          align="center"
          width="70"
        />
        <el-table-column
          prop="residents"
          label="住户信息"
          align="center"
        />
        <el-table-column
          prop="in_date"
          label="入住时间"
          align="center"/>
        <el-table-column
          label="操作"
          align="center"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">清空</el-button>
            &nbsp; &nbsp;
            <el-button
              size="mini"
              type="text"
              style="color: red"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div v-show="total_num >= 10" class="pagination-container text-center">
        <el-pagination
          :current-page.sync="page"
          :page-size.sync="pageSize"
          :page-sizes="pageSizes"
          :total="total_num"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="pagesizeChange"
          @current-change="paginationChange"/>
      </div>
    </div>
    <DormApply :visible.sync="createFormVisible" @submit="ApplySubmit"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getDormList, EmptyDorm, DeleteDorm } from '@/api/system'
import DormApply from './dormApply'

export default {
  components: {
    DormApply
  },
  filters: {
  },
  data() {
    return {
      total_num: 0,
      page: 1,
      pageSize: 10,
      pageSizes: [10, 15, 20, 25, 30, 50, 100],
      loading: false,
      tempdata: [],
      ticketList: [],
      searchForm: {
        status: '',
        floor: ''
      },
      createFormVisible: false,
      ticketStatusMap: {
        0: { title: '未分配', tagType: '' },
        1: { title: '已分配', tagType: 'success' }
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleEdit(index, row) {
      const params = {}
      params.id = row.id
      EmptyDorm(params).then(res => {
        this.fetchData()
      })
    },
    handleDelete(index, row) {
      const params = {}
      params.id = row.id
      DeleteDorm(params).then(res => {
        this.fetchData()
      })
    },
    paginationChange(val) {
      this.page = val
      const filters = { ...this.searchForm }
      this.fetchData({ token: this.userInfo.token, page: this.page, page_size: this.pageSize, filters: JSON.stringify(filters) })
    },
    pagesizeChange(val) {
      this.pageSize = val
      const filters = { ...this.searchForm }
      this.fetchData({ token: this.userInfo.token, page: this.page, page_size: this.pageSize, filters: JSON.stringify(filters) })
    },
    handleFilter() {
      const filters = { ...this.searchForm }
      this.fetchData({ token: this.userInfo.token, page: this.page, page_size: this.pageSize, filters: JSON.stringify(filters) })
    },
    handleApply(msg) {
      this.createFormVisible = true
    },
    fetchData(params) {
      this.loading = true
      this.ticketList = []
      params = { token: this.userInfo.token, ...params }
      getDormList(params).then(res => {
        this.total_num = res.data.totalNum
        this.ticketList = res.data.data
        this.loading = false
      }).then(() => {
      }).catch(() => {
        this.loading = false
      })
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
