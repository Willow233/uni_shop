import request from '@/utils/request'

export function getLoginResult(data) {
 return request({
   url:'/api/public/v1/users/wxlogin',
   method:'post',
   data
 })
 }