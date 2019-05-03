import request from '@/utils/request'

// 创建work申请 ticket
export function createWorkApply(data) {
  return request({
    url: `worker/creation`,
    method: 'post',
    data: data
  })
}
// 修改申请单
export function updateWorkApply(id, data) {
  return request({
    url: `redis/v1/worker/${id}`,
    method: 'put',
    data: {
      data: data
    }
  })
}
// 获取工单列表
export function getWorkerList(params) {
  return request({
    url: `redis/v1/worker`,
    method: 'get',
    params
  })
}
// 获取工单详情
export function getWorkerDetail(id) {
  return request({
    url: `redis/v1/worker/${id}`,
    method: 'get'
  })
}
// 驳回工单
export function rejectWorker(id, content) {
  return request({
    url: `redis/v1/worker/${id}`,
    method: 'put',
    data: {
      statusId: 3,
      stepId: 4,
      approvalOpinion: content
    }
  })
}
// 确认工单
export function confirmWorker(id, data) {
  return request({
    url: `redis/v1/worker/${id}`,
    method: 'put',
    data: {
      stepId: 2,
      data: data
    }
  })
}
// 完成工单
export function completeWorker(id, objectId) {
  return request({
    url: `redis/v1/worker/${id}`,
    method: 'put',
    data: {
      stepId: 4,
      statusId: 2,
      objectId: objectId
    }
  })
}

