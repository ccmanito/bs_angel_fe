import request from '@/utils/request'

export function getQiniuToken() {
  return request({
    url: 'qiniu/token',
    method: 'get'
  })
}

export function subPersonalInfo(data) {
  return request({
    url: 'user/info',
    method: 'post',
    data: data
  })
}

export function getInterest() {
  return request({
    url: 'sys/interest',
    method: 'get'
  })
}
