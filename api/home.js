import request from '@/utils/request'

export function getSwiperList() {
 return request({
   url:'/api/public/v1/home/swiperdata'
 })
 }
 
 export function getNavList() {
  return request({
    url:'/api/public/v1/home/catitems'
  })
  }
  
  export function getFloorList() {
   return request({
     url:'/api/public/v1/home/floordata'
   })
   }