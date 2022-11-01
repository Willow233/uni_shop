/* import { $http } from '@escook/request-miniprogram'
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://www.uinav.com'

// 请求开始之前做一些事情
$http.beforeRequest = function (options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}

// 请求完成之后做一些事情
$http.afterRequest = function (options) {
  uni.hideLoading()
  // console.log(options)
  // 解构数据
  const {message,meta} = options.data
  
  if(meta.status !== 200){
    return uni.showToast({
      title:'数据加载失败！',
      duration:1500,
      icon:'none'
    })
  } else {
      console.log(message);
    return new Promise((resolve)=>{
      resolve(message)
    })
  }
} */
const baseUrl = 'https://www.uinav.com'

export default ({url='',data={},method='GET',...others}={})=>{
  uni.showLoading({
    title: '数据加载中...',
  })
  return new Promise((resolve,reject)=>{
    // wx.request是一个异步任务 转成promise对象 再用async await转为同步任务
    uni.request({
      url: baseUrl + url,
      data,
      method,
      success:(res)=>{
        uni.hideLoading()
        console.log('请求成功:',res)
        console.log(res.data.meta.status);
        if(res.data.meta.status !== 200){
          return uni.showToast({
            title:'数据加载失败！',
            duration:1500,
            icon:'none'
          })}
        resolve(res.data)        
      },
      fail:(err)=>{
        console.log('请求失败：',err);
        reject(err)
      }
    })
  })
  
}