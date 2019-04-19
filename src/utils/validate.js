/**
 * Created by jiachenpan on 16/11/18.
 */

import { getusername } from '@/api/regedit'

/* 注册用户名检测*/
export function isvalidUsername(from, value, callback) { // 用户名验证函数
  if (value.includes('@')) {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'))
      } else {
        const source = true
        getusername(value, source).then(res => {
          if (res.data['identifier'].length > 0) {
            callback(new Error('用户名已存在！'))
          } else {
            callback()
          }
        })
      }
    }
  } else {
    if (value !== '') {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'))
      } else {
        const source = true
        getusername(value, source).then(res => {
          if (res.data['identifier'].length > 0) {
            callback(new Error('用户名已存在！'))
          } else {
            callback()
          }
        })
      }
    }
  }
}

// 用户修改信息绑定验证邮箱
export function isvalidEmail(from, value, callback) { // 用户名验证函数
  if (value !== '') {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (!reg.test(value)) {
      callback(new Error('请输入有效的邮箱'))
    } else {
      const source = false
      getusername(value, source).then(res => {
        if (res.data['identifier'].length > 0) {
          callback(new Error('该邮箱已存在！'))
        } else {
          callback()
        }
      })
    }
  }
}

// 用户修改信息绑定验证手机号 isvalidMobile
export function isvalidMobile(from, value, callback) {
  if (value !== '') {
    const reg = /^1[3456789]\d{9}$/
    if (!reg.test(value)) {
      callback(new Error('请输入有效的手机号码'))
    } else {
      const source = false
      getusername(value, source).then(res => {
        if (res.data['identifier'].length > 0) {
          callback(new Error('该手机号已存在！'))
        } else {
          callback()
        }
      })
    }
  }
}
/* 登录用户名检测*/
export function isvalidUsername1(from, value, callback) { // 用户名验证函数
  if (value.includes('@')) {
    if (value !== '') {
      const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的邮箱'))
      } else {
        const source = true
        getusername(value, source).then(res => {
          if (res.data['identifier'].length <= 0) {
            callback(new Error('用户名不存在！'))
          } else {
            callback()
          }
        })
      }
      return 'email'
    }
  } else {
    if (value !== '') {
      const reg = /^1[3456789]\d{9}$/
      if (!reg.test(value)) {
        callback(new Error('请输入有效的手机号码'))
      } else {
        const source = true
        getusername(value, source).then(res => {
          if (res.data['identifier'].length <= 0) {
            callback(new Error('用户名不存在！'))
          } else {
            callback()
          }
        })
      }
      return 'mobile'
    }
  }
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

// user类型判断
export function validateusertype(str) {
  if (str.includes('@')) {
    const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    if (reg.test(str)) {
      return 'email'
    }
  } else {
    return 'mobile'
  }
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}
