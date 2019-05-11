<template>
  <div class="app-container">
    <el-steps :active="step_id" finish-status="success" simple style="margin-top: 10px">
      <el-step v-for="item in stepList" :key="item" :title="item" />
    </el-steps>
    <StepOne v-if="step_id === 0"/>
    <stepTwo v-if="step_id === 1"/>
    <stepThree v-if="step_id === 2"/>
    <stepFour v-if="step_id === 3"/>
  </div>
</template>

<script>

import StepOne from './components/stepOne'
import stepTwo from './components/stepTwo'
import stepThree from './components/stepThree'
import stepFour from './components/stepFour'

export default {
  components: {
    StepOne,
    stepTwo,
    stepThree,
    stepFour
  },
  data() {
    return {
      step_id: 0,
      stepList: ['数据收集', '聚类划分', '宿舍分配', '分配完成']
    }
  },
  created() {
    this.step_id = parseInt(this.$route.params.step_id)
  },
  methods: {
  }
}
</script>

<style scoped>
</style>
