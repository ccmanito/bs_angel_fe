<template>
  <div class="main-conter">
    <el-card class="box-card" style="margin-top: 20px;margin-bottom: 50px;">
      <div slot="header" class="clearfix">
        <span>控制台</span>
      </div>
      <div style="width: 400px;">
        <span>待分配信息</span>
        <el-form label-position="left" inline style="margin-top: 15px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="男生:">
                <span style="color: #409EFF">{{ resultdata.man_num }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="女生:">
                <span style="color: #409EFF">{{ resultdata.woman_num }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <el-row :gutter="50" class="dorminfo" style="margin-top: 5px">
        <el-col :span="12">
          <span>男生空闲宿舍信息</span>
          <el-form label-position="left" inline style="margin-top: 5px">
            <el-form-item label="六人间:">
              <span style="color: #409EFF">{{ resultdata.six_dorm_man_num }}</span>
            </el-form-item>
            <el-form-item label="四人间:">
              <span style="color: #409EFF">{{ resultdata.four_dorm_man_num }}</span>
            </el-form-item>
            <el-form-item label="八人间:">
              <span style="color: #409EFF">{{ resultdata.eight_dorm_man_num }}</span>
            </el-form-item>
            <el-form-item label="十人间:">
              <span style="color: #409EFF">{{ resultdata.ten_dorm_man_num }}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <span>女生空闲宿舍信息</span>
          <el-form label-position="left" inline style="margin-top: 5px">
            <el-form-item label="六人间:">
              <span style="color: #409EFF">{{ resultdata.six_dorm_num }}</span>
            </el-form-item>
            <el-form-item label="四人间:">
              <span style="color: #409EFF">{{ resultdata.four_dorm_num }}</span>
            </el-form-item>
            <el-form-item label="八人间:">
              <span style="color: #409EFF">{{ resultdata.eight_dorm_num }}</span>
            </el-form-item>
            <el-form-item label="十人间:">
              <span style="color: #409EFF">{{ resultdata.ten_dorm_num }}</span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col>
          <el-tag size="mini" style="margin-left:10px;margin-bottom: 10px" type="success">提示：选择下面table的宿舍参与分配，选取数量取决于待分配人员数量, 选取好宿舍信息之后点击table下面执行宿舍分配</el-tag>
        </el-col>
        <el-col :span="12">
          <el-table
            ref="multipleTable"
            :data="resultdata.manlist"
            size="mini"
            max-height="250"
            style="width: 100%"
            @selection-change="manSelectionChange">
            <el-table-column
              type="selection"
              width="50"/>
            <el-table-column
              prop="dorm_id"
              label="房间ID"
              width="90"/>
            <el-table-column
              prop="address"
              label="地址"
            />
            <el-table-column
              prop="floor"
              label="公寓名称"
            />
            <el-table-column
              prop="dorm_size"
              label="房间容量"
              width="70"/>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            ref="multipleTable"
            :data="resultdata.womanlist"
            max-height="250"
            size="mini"
            style="width: 100%"
            @selection-change="womanSelectionChange">
            <el-table-column
              type="selection"
              width="50"/>
            <el-table-column
              prop="dorm_id"
              label="房间ID"
              width="90"/>
            <el-table-column
              prop="address"
              label="地址"
            />
            <el-table-column
              prop="floor"
              label="公寓名称"
            />
            <el-table-column
              prop="dorm_size"
              label="房间容量"
              width="70"/>
          </el-table>
        </el-col>
        <el-col style="margin-top: 15px;">
          <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);" width="100%" color="#67C23A" SIZE="2">
          <el-button :disabled="is_button" size="mini" type="success" @click="Perform">执行分配</el-button>
          <el-button v-show="show_next_button" size="mini" type="primary" @click="Subbit">下一步</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="50" style="margin-top: 20px;">
        <el-col :span="12">
          <el-table
            v-loading="loading"
            :data="resulttabledata.man_result"
            max-height="550"
            size="mini"
            style="width: 100%"
          >
            <!-- <el-table-column
              type="selection"
              width="50"/> -->
            <el-table-column
              prop="dorm_id"
              label="房间ID"
              align="center"
              width="90"/>
            <el-table-column
              prop="userlist"
              align="center"
              label="宿舍人员"
            >
              <template slot-scope="scope">
                <DormInfo :dorm-data="scope.row.userlist"/>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <el-table
            v-loading="loading"
            :data="resulttabledata.woman_result"
            max-height="550"
            size="mini"
            style="width: 100%"
          >
            <!-- <el-table-column
              type="selection"
              width="50"/> -->
            <el-table-column
              prop="dorm_id"
              align="center"
              label="房间ID"
              width="90"/>
            <el-table-column
              prop="userlist"
              label="宿舍人员"
              align="center"
            >
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
import { getWorkerDetail, perform, changeSetp } from '@/api/worker'
import ApplyDetail from './dormDetail'
import { mapGetters } from 'vuex'
import DormInfo from './dormIDInfo'

export default {
  components: {
    ApplyDetail,
    DormInfo
  },
  data() {
    return {
      show_next_button: false,
      loading: false,
      is_button: true,
      step_id: 0,
      id: 0,
      resultdata: {},
      resulttabledata: {},
      manmultipleSelection: [],
      womanmultipleSelection: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    'manmultipleSelection': {
      handler: function(newvalues, oidvalues) {
        // 执行切换操作
        this.is_button = false
      }
    },
    'womanmultipleSelection': {
      handler: function(newvalues, oidvalues) {
        // 执行切换操作
        this.is_button = false
      }
    }
  },
  created() {
    this.step_id = this.$route.params.step_id
    this.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    manSelectionChange(val) {
      this.manmultipleSelection = val
    },
    womanSelectionChange(val) {
      this.womanmultipleSelection = val
    },
    fetchData() {
      const params = {}
      params.id = this.id
      params.u_id = this.userInfo.token
      params.step_id = this.step_id
      getWorkerDetail(params).then(res => {
        this.resultdata = res.data
      })
    },
    Perform() {
      this.loading = true
      const params = {}
      params.id = this.id
      params.woman_dorm_list = this.womanmultipleSelection
      params.man_dorm_list = this.manmultipleSelection
      perform(params).then(res => {
        this.loading = false
        this.show_next_button = true
        this.resulttabledata = res.data
      }).catch(() => {
        this.loading = false
      })
    },
    Subbit() { // 下一步
      const params = {}
      params.id = this.id
      params.step_id = 3
      params.resultdata = JSON.stringify(this.resulttabledata)
      changeSetp(params).then(res => {
        this.$router.push({ path: '/worker/detail/' + this.id + '/3' })
        this.$notify({
          title: '成功',
          message: '分配成功，已同步到系统',
          type: 'success',
          duration: 2000
        })
      })
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
