import request from '@/utils/request'

// 封装完成的登录接口

export function login(data) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.loginUser',
    method: 'get',
    params: data
  })
}

export function logout() {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.cancelUser',
    method: 'get'
  })
}
export function getAlarmData(data) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.getAllAbnomalByUser',
    method: 'get',
    params: data
  })
}

export function getMaintain(data) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.getAllMaintenanceByUser',
    method: 'get',
    params: data
  })
}
