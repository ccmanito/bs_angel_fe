<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">usertype:{{ usertype }}</div>
    <div class="dashboard-text">userinfo:{{ userInfo }}</div>
    <div class="dashboard-text">roles:<span v-for="role in roles" :key="role">{{ role }}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      showmessage: false,
      message: ''
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
  mounted() {
    // this.openPrompt()
  },
  methods: {
    openPrompt() {
      if (Object.keys(this.userInfo.interest).length === 0 || Object.keys(this.userInfo.livinghabits).length === 0) {
        this.showmessage = true
        this.message = '<u style="color: red">个人习惯</u>及<u style="color: red">兴趣信息</u>待完善，将会影响个人宿舍分配去完善&nbsp&nbsp <a href="/"><u style="color: #2A8AEE">去完善</u></a>'
      } else if (this.userInfo.school === '' || this.userInfo.sex === '' || this.userInfo.major === '') {
        this.message = '个人信息待完善&nbsp&nbsp <a href="/"><u style="color: #2A8AEE">去完善</u></a>'
        this.showmessage = true
      }
      if (this.showmessage) {
        this.$notify({
          title: '信息补全提醒',
          dangerouslyUseHTMLString: true,
          message: '<strong>' + this.message + '</strong>',
          position: 'bottom-right',
          duration: 0
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
