<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="searchForm.status_id" size="mini" placeholder="流程状态" clearable class="filter-item" style="width: 160px">
        <el-option label="新申请" value="0"/>
        <el-option label="已通过" value="1"/>
        <el-option label="已驳回" value="2"/>
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
        />
        <el-table-column
          prop="professional"
          label="职业"
          align="center"
        />
        <el-table-column
          prop="status_id "
          label="申请状态"
          align="center"
        >
          <template slot-scope="scope">
            <el-tag :type="ticketStatusMap[scope.row.status_id ].tagType" size="mini">{{ ticketStatusMap[scope.row.status_id ].title }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="申请时间"
          align="center"/>
        <el-table-column
          label="操作"
          align="center"
          width="180">
          <template slot-scope="scope">
            <el-button
              :disabled="isbutton"
              size="mini"
              type="text"
              style="color: #409EFF"
              @click="handlePass(scope.$index, scope.row)">通过</el-button>
            <el-button
              :disabled="isbutton"
              size="mini"
              type="text"
              style="color: #F56C6C"
              @click="handleReject(scope.$index, scope.row)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { get_auth_apply, editauth } from '@/api/worker'

export default {
  components: {
  },
  data() {
    return {
      loading: false,
      track: false,
      ticketList: [],
      searchForm: {
        status_id: ''
      },
      createFormVisible: false,
      ticketStatusMap: {
        0: { title: '新申请', tagType: '' },
        1: { title: '已通过', tagType: 'success' },
        2: { title: '已驳回', tagType: 'danger' }
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
    handlePass(index, row) {
      const params = {}
      params.key = 'pass'
      params.id = row.id
      params.u_id = row.u_id
      editauth(params).then(res => {
        this.$router.push({ path: '/worker/auth/empty' })
      })
    },
    handleReject(index, row) {
      const params = {}
      params.key = 'reject'
      params.id = row.id
      params.u_id = row.u_id
      editauth(params).then(res => {
        this.$router.push({ path: '/worker/auth/empty' })
      })
    },
    handleFilter() {
      const filters = { ...this.searchForm }
      this.fetchData({ roles: 3, filters: JSON.stringify(filters) })
    },
    fetchData(params) {
      this.loading = true
      this.ticketList = []
      params = { roles: 3, ...params }
      get_auth_apply(params).then(res => {
        this.ticketList = res.data
        // if (Number(this.ticketList.status_id) === 0) {
        //   this.isbutton = false
        // } else {
        //   this.isbutton = true
        // }
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
