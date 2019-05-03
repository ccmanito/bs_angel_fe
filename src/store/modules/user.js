import { loginByUsername, logout, getInfo, syncAvatar } from '@/api/login'
import { regeditSub } from '@/api/regedit'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    mobile: '',
    sex: '',
    github: '',
    usertype: '',
    email: '',
    school: '',
    college: '',
    major: '',
    grade: '',
    classname: '',
    professional: '', // 职业
    livinghabits: '', // 生活习惯
    interests: [],
    schoolinfo: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_USER: (state, user) => {
      state.name = user.name
      state.avatar = user.avatar
      state.email = user.email
      state.sex = user.sex
      state.mobile = user.mobile
      state.github = user.github
      state.school = user.school
      state.college = user.college
      state.major = user.major
      state.grade = user.grade
      state.classname = user.classname
      state.professional = user.professional
      state.livinghabits = user.livinghabits
      state.interests = user.interests
      state.schoolinfo = user.schoolinfo
    },
    SET_USERTYPE: (state, usertype) => {
      state.usertype = usertype
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    SyncAvatar({ commit }, info) {
      return new Promise((resolve, reject) => {
        syncAvatar(info).then(res => {
          commit('SET_AVATAR', info.avatar)
        })
        resolve()
      })
    },
    GetUserType({ commit }, info) {
      return new Promise((resolve, reject) => {
        commit('SET_USERTYPE', info)
        resolve()
      })
    },
    // github第三方登录
    RegeditGithub({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      })
    },
    RegeditSub({ commit }, Info) {
      return new Promise((resolve, reject) => {
        regeditSub(Info).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.identity_type).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(response.data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 获取用户信息
    GetInfo({ commit, state }) { // Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。
      return new Promise((resolve, reject) => { // new Promise(function(resolve, reject){ ...做一些异步操作}
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles) // 异步操作执行成功后的回调函数
          } else {
            reject('getInfo: roles must be a non-null array !') // 异步操作执行失败后的回调函数。
          }
          // commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          commit('SET_USER', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
