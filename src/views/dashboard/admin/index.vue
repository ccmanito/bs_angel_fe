<template>
  <div class="dashboard-container">
    {{ roles }}
    <div v-if="roles.includes('admin')">
      我是超级管理员
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Admin',
  data() {
    return {
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
    this.openPrompt()
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

<style scoped>

</style>
