<template>
  <div class="dashboard-container">
    <div v-if="roles.includes('admin')">
      <admin/>
    </div>
    <div v-if="roles.includes('teacher')">
      <teacher/>
    </div>
    <div v-if="roles.includes('student')">
      <student/>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Admin from './admin'
import Teacher from './teacher'
import Student from './student'

export default {
  name: 'Dashboard',
  components: {
    Admin,
    Teacher,
    Student
  },
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
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 10px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
   background: #F2F6FC;
    height: 600px;
    border-radius: 3%;
}
</style>
