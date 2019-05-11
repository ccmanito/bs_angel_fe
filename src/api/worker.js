import request from '@/utils/request'

// 创建work申请 ticket
export function createWorkApply(data) {
  return request({
    url: `worker/info`,
    method: 'post',
    data: data
  })
}
// 获取工单列表
export function getWorkerList(params) {
  return request({
    url: `worker/info`,
    method: 'get',
    params
  })
}

export function deletetask(params) {
  return request({
    url: `worker/info`,
    method: 'delete',
    params
  })
}

// 获取工单详情
export function getWorkerDetail(params) {
  return request({
    url: `worker/detail`,
    method: 'get',
    params
  })
}

export function changeSetp(params) {
  return request({
    url: `worker/detail`,
    method: 'put',
    data: params
  })
}

export function run_kemans(data) {
  return request({
    url: `worker/perfrom/kemans`,
    method: 'post',
    data: data
  })
}

export function get_sse_picture(params) {
  return request({
    url: `worker/perfrom/kemans`,
    method: 'get',
    params
  })
}

export function perform(data) {
  return request({
    url: `worker/perfrom/allot`,
    method: 'post',
    data: data
  })
}
// 申请权限
export function create_apply_auth(data) {
  return request({
    url: `worker/auth`,
    method: 'post',
    data: data
  })
}
// 获取权限列表
export function get_auth_apply(params) {
  return request({
    url: `worker/auth`,
    method: 'get',
    params
  })
}

// 更改权限列表
export function editauth(params) {
  return request({
    url: `worker/auth`,
    method: 'put',
    data: params
  })
}
