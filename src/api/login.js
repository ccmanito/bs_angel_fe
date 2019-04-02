import request from '@/utils/request'

// export function login(username, password) {
//   return request({
//     url: 'api/user/login',
//     method: 'post',
//     data: {
//       username,
//       password
//     }
//   })
// }
export function loginByUsername(username, password, identity_type) {
  const data = {
    username,
    password,
    identity_type
  }
  return request({
    url: 'api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: 'api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: 'api/user/logout',
    method: 'post'
  })
}
