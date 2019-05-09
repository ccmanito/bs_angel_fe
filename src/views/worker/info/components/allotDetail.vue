<template>
  <div class="allot-main">
    <div v-for="(item,index) in tagData" :key="index" style="margin-left: 2px">
      <!-- item 是一个数组数据 -->
      <hr style="FILTER: progid:DXImageTransform.Microsoft.Shadow(color:#987cb9,direction:145,strength:15);" width="100%" color="#987cb9" SIZE="1">
      <span v-for="(values,index) in item" :key="index" style="margin-left: 2px">
        <el-tooltip :content="JSON.stringify(values)" placement="top">
          <el-button type="text" style="color: #606266" size="mini">{{ values.name }} </el-button>
        </el-tooltip>
      </span>
    </div>
</div></template>

<script>
export default {
  props: {
    tagData: {
      type: Array,
      required: true,
      default: () => {
        const data = []
        return data
      }
    }
  },
  data() {
    return {
      test: ''
    }
  },
  created() {
    console.log(this.tagData, 'sssssssss')
  }
}
</script>

<style scoped>
.allot-main {
    /* background-color: rgb(208, 173, 240); */
    width: 100%;
    border:3px double #000;
}
</style>
