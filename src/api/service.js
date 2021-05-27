import request from '@/utils/request'

export function serviceBasis(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.getGeBasicInfo',
    method: 'get',
    params: query
  })
}
export function serviceAllBasis(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.getAllInfoByUser',
    method: 'get',
    params: query
  })
}
export function onServiceInfo(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.getGeRealTimeInfo',
    method: 'get',
    params: query
  })
}
export function getPH(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.getRealTimePH',
    method: 'get',
    params: query
  })
}
export function getTemperature(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.temperatureLine',
    method: 'get',
    params: query
  })
}
export function getFeed(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.feedLine',
    method: 'get',
    params: query
  })
}
export function getDisCharge(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.dischargeLine',
    method: 'get',
    params: query
  })
}
export function getHumidity(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.humidityLine',
    method: 'get',
    params: query
  })
}
export function getOxygen(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.oxygenLine',
    method: 'get',
    params: query
  })
}

export function getWeight(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.weightBrokenLine',
    method: 'get',
    params: query
  })
}
export function setRemrk(query) {
  // 返回一个promise对象
  return request({
    url: '/do.jhtml?router=appApiService.setGeRemark',
    method: 'get',
    params: query
  })
}
