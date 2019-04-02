import request from '@/utils/request'

export function regeditSub(params) {
  return request({
    url: 'api/user/regedit',
    method: 'post',
    data: params
  })
}

export function getusername(str) {
  return request({
    url: 'api/user/isuser',
    method: 'get',
    params: { str }
  })
}
