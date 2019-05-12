import request from '@/utils/request'

// 宿舍信息录入
export function createWorkApply(data) {
  return request({
    url: `sys/dorm/info`,
    method: 'post',
    data: data
  })
}
// 获取宿舍列表
export function getDormList(params) {
  return request({
    url: `sys/dorm/info`,
    method: 'get',
    params
  })
}

// 清空宿舍人员信息
export function EmptyDorm(params) {
  return request({
    url: `sys/dorm/info`,
    method: 'put',
    params
  })
}

// 删除宿舍信息
export function DeleteDorm(params) {
  return request({
    url: `sys/dorm/info`,
    method: 'delete',
    params
  })
}

export function getdorminfo(params) {
  return request({
    url: `sys/dorm/detail`,
    method: 'get',
    params
  })
}
// 学校信息录入
export function createSchoolApply(data) {
  return request({
    url: `sys/school/info`,
    method: 'post',
    data: data
  })
}

// 获取学校信息列表
export function getSchoolList(params) {
  return request({
    url: `sys/school/info`,
    method: 'get',
    params
  })
}

// 获取学校信息
export function getSchoolInfo(params) {
  return request({
    url: `sys/school/info`,
    method: 'get',
    params
  })
}
// 更新宿舍人员信息
export function updateSchoolApply(params) {
  return request({
    url: `sys/school/info`,
    method: 'put',
    data: params
  })
}

// 删除学校信息
export function DeleteSchool(params) {
  return request({
    url: `sys/school/info`,
    method: 'delete',
    params
  })
}

export function getUserList(params) {
  return request({
    url: `sys/user/list`,
    method: 'get',
    params
  })
}

export function DeleteUser(params) {
  return request({
    url: `sys/user/list`,
    method: 'delete',
    params
  })
}

export function getstatistics() {
  return request({
    url: `sys/statistics`,
    method: 'get'
  })
}
