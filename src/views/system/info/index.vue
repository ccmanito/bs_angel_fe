<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchForm.school" clearable size="mini" placeholder="学校模糊查询" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
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
          prop="school"
          label="学校"
          align="center"
          width="120"/>
        <el-table-column
          prop="college"
          label="学院"
          align="center"
        />
        <el-table-column
          prop="major"
          label="专业"
          align="center"/>
        <el-table-column
          prop="grade"
          label="年级"
          align="center"
        />
        <el-table-column
          prop="classname"
          label="班级"
          align="center"
        />
        <el-table-column
          label="操作"
          align="center"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            &nbsp;
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
    <DormApply :form="schoolInfo" :ticket-id="ticketId" :visible.sync="updateFormVisible" dialog-status="update" @submit="ApplySubmit"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSchoolList, DeleteSchool, getSchoolInfo } from '@/api/system'
import DormApply from './schoolApply'

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
      pageSize: 8,
      pageSizes: [10, 15, 20, 25, 30, 50, 100],
      loading: false,
      tempdata: [],
      ticketList: [],
      ticketId: 0,
      schoolInfo: {},
      searchForm: {
        school: ''
      },
      createFormVisible: false,
      updateFormVisible: false
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
      params.key = 'single'
      getSchoolInfo(params).then(res => {
        this.schoolInfo = res.data
        this.ticketId = row.id
        this.updateFormVisible = true
      })
    },
    handleDelete(index, row) {
      const params = {}
      params.id = row.id
      DeleteSchool(params).then(res => {
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
      params = { key: 'list', token: this.userInfo.token, ...params }
      getSchoolList(params).then(res => {
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
