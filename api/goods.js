import request from '@/utils/request'

export function getGoodsList(data) {
 return request({
   url:'/api/public/v1/goods/search',
   data
 })
 }
 
 export function getGoodsDetail(data) {
  return request({
    url:'/api/public/v1/goods/detail',
    data
  })
  }
  
  export function getGoodsOrder(data) {
   return request({
     url:'/api/public/v1/my/orders/create',
     method:'post',
     data
   })
   }
   
   export function getPayInfo(data) {
    return request({
      url:'/api/public/v1/my/orders/req_unifiedorder',
      method:'post',
      data
    })
    }
    
    export function checkPayInfo(data) {
     return request({
       url:'/api/public/v1/my/orders/chkOrder',
       method:'post',
       data
     })
     }