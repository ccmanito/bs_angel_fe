import request from '@/utils/request'

export function getQiniuToken() {
  return request({
    url: 'qiniu/token',
    method: 'get'
  })
}
