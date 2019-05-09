<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="searchForm.name" clearable size="mini" placeholder="姓名模糊查询" style="width: 150px;" class="filter-item" @keyup.enter.native="handleFilter"/>
      <el-select v-model="searchForm.status" size="mini" placeholder="分配状态" clearable class="filter-item" style="width: 160px">
        <el-option label="待分配" value="0"/>
        <el-option label="已分配" value="1"/>
      </el-select>
      <el-button size="mini" class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">搜索</el-button>
      <div class="list-container">
        <el-table
          v-loading="loading"
          :data="ticketList"
          stripe
          size="mini"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-form-expand">
                <el-form-item label="学院">
                  <span>{{ props.row.college }}</span>
                </el-form-item>
                <el-form-item label="专业">
                  <span>{{ props.row.major }}</span>
                </el-form-item>
                <el-form-item label="年级">
                  <span>{{ props.row.grade }}</span>
                </el-form-item>
                <el-form-item label="班级">
                  <span>{{ props.row.classname }}</span>
                </el-form-item>
                <el-form-item label="职业">
                  <span>{{ props.row.professional }}</span>
                </el-form-item>
                <el-form-item label="宿舍Id">
                  <span>{{ props.row.dorm_id }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            width="100"/>
          <el-table-column
            prop="sex"
            label="性别"
            align="center"
            width="80"/>
          <el-table-column
            prop="email"
            label="邮箱"
            align="center"
            width="160"/>
          <el-table-column
            prop="mobile"
            label="手机号"
            align="center"
            width="160"/>
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
            prop="school"
            label="学校"
            align="center"
            width="200"
          />
          <el-table-column
            prop="roles"
            label="权限级别"
            align="center">
            <template slot-scope="scope">
              <el-tag :type="ticketrolesMap[scope.row.roles].tagType" size="mini">{{ ticketrolesMap[scope.row.roles].title }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="120">
            <template slot-scope="scope">
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
    </div>
</div></template>

<script>
import { mapGetters } from 'vuex'
import { getUserList, DeleteUser } from '@/api/system'

export default {
  components: {
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
        name: '',
        status: ''
      },
      ticketStatusMap: {
        0: { title: '未分配', tagType: '' },
        1: { title: '已分配', tagType: 'success' },
        2: { title: '不参与', tagType: 'warning' }
      },
      ticketrolesMap: {
        1: { title: '普通用户', tagType: '' },
        2: { title: '管理员', tagType: 'success' },
        3: { title: '超级管理员', tagType: 'warning' }
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
    handleDelete(index, row) {
      const params = {}
      params.u_id = row.u_id
      DeleteUser(params).then(res => {
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
      getUserList(params).then(res => {
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
