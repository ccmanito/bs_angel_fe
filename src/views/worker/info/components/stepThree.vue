<template>
  <div class="main-conter">
    <el-card class="box-card" style="margin-top: 20px">
      <div slot="header" class="clearfix">
        <span>控制台</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getWorkerDetail } from '@/api/worker'
import ApplyDetail from './dormDetail'

export default {
  components: {
    ApplyDetail
  },
  data() {
    return {
      is_button: true,
      step_id: 0,
      id: 0,
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
      })
    }
    // Subbit() { // 下一步
    //   const params = {}
    //   params.id = this.id
    //   params.step_id = 1
    //   changeSetp(params).then(res => {
    //     this.$router.push({ path: '/worker/detail/' + this.id + '/1' })
    //   })
    // }
  }
}
</script>

<style scoped>
.main-conter {
    background-color: #FFFFFF;
    width: 100%;
    height: 500px;
}
</style>
