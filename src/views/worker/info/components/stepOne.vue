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
        <el-form-item label="结束时间：">
          <span v-if="ticketDetail.countdown !== '已关闭'" style="color:#67C23A "> {{ ticketDetail.end_date }}</span>
          <span v-if="ticketDetail.countdown === '已关闭'" style="color:#F56C6C "> {{ ticketDetail.end_date }}</span>
        </el-form-item>
        <el-form-item label="管理员：">
          {{ ticketDetail.proposer_name }}
        </el-form-item>
        <el-form-item label="分配单位：">
          {{ ticketDetail.school }}
        </el-form-item>
        <el-form-item label="创建时间：">
          {{ ticketDetail.create_date }}
        </el-form-item>
        <el-form-item label="操作" style="margin-top:20px">
          <el-button :disabled="is_button" size="mini" type="success" @click="Subbit">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getWorkerDetail, changeSetp } from '@/api/worker'

export default {
  components: {
  },
  data() {
    return {
      is_detail: false,
      is_button: true,
      step_id: 0,
      id: 0,
      Num: 0,
      ticketDetail: {},
      ticketData: {}
    }
  },
  computed: {
  },
  created() {
    this.id = this.$route.params.id
    this.fetchData()
  },
  methods: {
    fetchData() {
      const params = {}
      params.id = this.id
      params.step_id = this.step_id
      getWorkerDetail(params).then(res => {
        this.ticketDetail = res.data
        if (this.ticketDetail.countdown === '已关闭') {
          this.is_button = false
        }
      })
    },
    Subbit() { // 下一步
      const params = {}
      params.id = this.id
      params.step_id = 1
      changeSetp(params).then(res => {
        this.$router.push({ path: '/worker/detail/' + this.id + '/1' })
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
