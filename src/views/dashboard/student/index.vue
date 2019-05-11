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
            <el-row :gutter="10" class="row">
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="学院:" class="from-col">
                    {{ userInfo.college | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="专业:" class="from-col">
                    {{ userInfo.major | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
            <el-row :gutter="10" class="row">
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="年级:" class="from-col">
                    {{ userInfo.grade | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="12" class="col">
                <el-form>
                  <el-form-item label="班级:" class="from-col">
                    {{ userInfo.classname | filtervalues() }}
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
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
        <el-form>
          <el-form-item label="宿舍分配状态:" class="">
            <el-tag :type="ticketStatusMap[userInfo.status].tagType" size="mini">{{ ticketStatusMap[userInfo.status ].title }}</el-tag>
          </el-form-item>
        </el-form>
        <el-table
          :data="tableData"
          size="mini"
          style="width: 95%">
          <el-table-column
            prop="id"
            align="center"
            label="宿舍Id"
            width="120"/>
          <el-table-column
            prop="address"
            align="center"
            label="宿舍地点"
            width="160"/>
          <el-table-column
            prop="floor"
            align="center"
            label="公寓名称"
            width="160"/>
          <el-table-column
            prop="residents"
            align="center"
            label="室友信息"
          >
            <template slot-scope="scope">
              <DormInfo :dorm-data="scope.row.residents"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="in_date"
            label="分配时间"
            align="center"
            width="220"
          />
        </el-table>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxCard from '../components/BoxCard'
import { getdorminfo } from '@/api/system'
import DormInfo from './dorminfo'

export default {
  name: 'Teacher',
  components: {
    BoxCard,
    DormInfo
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
      tableData: [],
      ticketStatusMap: {
        0: { title: '待分配', tagType: '' },
        1: { title: '已分配', tagType: 'success' }
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
    this.getDormInfo()
    console.log(this.userInfo.dorm_id)
  },
  methods: {
    getDormInfo() {
      const params = {}
      params.dorm_id = this.userInfo.dorm_id
      getdorminfo(params).then(res => {
        console.log(res.data)
        this.tableData = res.data
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
