<template>
  <div>
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>
      <el-form label-position="left" inline label-width="100px" class="table-form-expand">
        <el-form-item label="数据收集：">
          <span v-if="ticketDetail.countdown !== '已关闭'" style="color:#409EFF ">进行中</span>
          <span v-if="ticketDetail.countdown === '已关闭'" style="color:#67C23A ">已完成</span>
        </el-form-item>
        <el-form-item label="参加人数：">
          <span style="color:#409EFF ">{{ ticketDetail.total_num }}</span>
        </el-form-item>
        <el-form-item label="女生人数：">
          <span style="color:#409EFF ">{{ ticketDetail.woman_num }}</span>
        </el-form-item>
        <el-form-item label="男生人数：">
          <span style="color:#409EFF ">{{ ticketDetail.man_num }}</span>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row style="padding: 20px 0px;">
      <el-col :span="17" >
        <el-card class="box-card" >
          <div slot="header" class="clearfix">
            <span>聚类设置</span>
          </div>
          <el-form label-position="left" inline size="mini" label-width="110px" class="from-kemans">
            <el-form-item label="聚类中心范围:">
              <el-input
                v-model="min_cluster_center"
                style="width:80px"
                placeholder="最小个数"
              />
              <span> &nbsp;-&nbsp;</span>
              <el-input
                v-model="max_cluster_center"
                style="width:80px"
                placeholder="最多个数"
              />
              <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
              <el-button type="primary" @click="Perform">执行</el-button>
            </el-form-item>
          </el-form>
          <el-row :gutter="20" class="table">
            <el-col :span="12">
              <el-table
                :data="MantableData"
                empty-text="男生模型  NO DATA"
                size="mini"
                style="width: 100%">
                <el-table-column
                  prop="cluster_center"
                  label="中心点"
                  width="180"/>
                <el-table-column
                  prop="score"
                  label="得分"
                  width="180"/>
              </el-table>
            </el-col>
            <el-col :span="12">
              <el-table
                :data="WomantableData"
                empty-text="女生模型  NO DATA"
                size="mini"
                style="width: 100%">
                <el-table-column
                  prop="cluster_center"
                  label="中心点"
                  width="180"/>
                <el-table-column
                  prop="score"
                  label="得分"
                  width="180"/>
              </el-table>
            </el-col>
          </el-row>
        </el-card>

      </el-col>

      <el-col :span="6" :offset="1">
        <el-row>
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>操作</span>
            </div>
            <el-form label-position="left" size="mini" label-width="100px" >
              <span v-if="ticketDetail.countdown === '已关闭'">数据收集完成，可进行下一步</span>
              <span v-if="ticketDetail.countdown !== '已关闭'">数据收集进行中</span>
              <p/>
              <el-form-item label="操作">
                <el-button :disabled="is_button" type="success" @click="Subbit">下一步</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getWorkerDetail, changeSetp, run_kemans } from '@/api/worker'
import ApplyDetail from './dormDetail'

export default {
  components: {
    ApplyDetail
  },
  data() {
    return {
      min_cluster_center: 2,
      max_cluster_center: 10,
      is_button: true,
      step_id: 0,
      id: 0,
      ticketDetail: {},
      WomantableData: [{ 'cluster_center': 3, 'score': 34 }],
      MantableData: []
    }
  },
  computed: {
  },
  created() {
    this.id = this.$route.params.id
    this.step_id = this.$route.params.step_id
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {}
      params.id = this.id
      params.step_id = this.step_id
      getWorkerDetail(params).then(res => {
        this.ticketDetail = res.data
      })
    },
    Subbit() {
      const params = {}
      params.id = this.id
      params.step_id = 2
      changeSetp().then(res => {
        this.$router.push({ path: '/worker/detail/' + this.id + '/2' })
      })
    },
    Perform() {
      const params = {}
      params.min_cluster_center = this.min_cluster_center
      params.max_cluster_center = this.max_cluster_center
      params.id = this.id
      run_kemans(params).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.table-form-expand {
  font-size: 0;
  label {
    width: 90px;
    color: #99a9bf;
  }
  .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
}
  .tags>* {
    margin: 2px;
  }
  .line {
    text-align: center;
  }

  .time-time {
    display: inline-block;
    width: 115px;
    float: left;
    padding: 5px 0 0 0;
  }
  .time-lst{
    font-size: 12px;
    span {
      font-weight: normal;
    }
    li {
      overflow: hidden;
      color: #666;
      width: 100%;
      margin: 0;
      position: relative;
      padding:0 0 0 115px;
      line-height: 18px;
    }
    .time-time {
      position: absolute;
      left: 0;
      top: 0;
    }
    .time-box {
      position: relative;
      border-left: 1px solid #ccc;
      padding: 5px 0 10px;
      float: left;
      i {
        display: inline-block;
        width: 9px;
        height: 9px;
        background: #ccc;
        border: 1px solid #fff;
        border-radius: 50%;
        margin-left: -5px;
      }
      .time-person {
        margin-left: 15px;
      }
    }
    .on {
      i{background: #666;}
    }
    .time-con {
      padding: 5px;
      margin-left: 20px;
      background: #fff;
      border: 1px solid #ccc;
      position: relative;
      clear: both;
      margin-top: 5px;
      border-radius: 5px;
      &:before {
        border-style: solid;
        border-width: 0 5px 5px;
        border-color: transparent transparent #ccc;
        width: 0;
        height: 0;
        position: absolute;
        content: ' ';
        left: 10px;
        top: -6px;
      }
      &::after {
        border-style: solid;
        border-width: 0 5px 5px;
        border-color: transparent transparent #fff;
        width: 0;
        height: 0;
        position: absolute;
        content: ' ';
        left: 10px;
        top: -5px;
      }
      p {
      margin: 0;
      padding: 0;
      }
    }
    .time-u {
      background: #eee;
      &:after {
        border-color: transparent transparent #eee;
      }
    }
  }
</style>
