<template>
  <div class="allot-main">
    <span v-for="(item,index) in dormData" :key="index" style="margin-left: 2px">
      <el-tag size="mini" type="warning"> {{ item.name }}</el-tag>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    dormData: {
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
  }
}
</script>

<style scoped>
.allot-main {
}
</style>
