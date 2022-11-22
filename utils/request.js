const baseUrl = 'https://api-hmugo-web.itheima.net'
// const baseUrl = 'https://www.uinav.com'


export default ({url='',data={},method='GET',header={},...others})=>{
  uni.showLoading({
    title: '数据加载中...',
  })
  if(url.indexOf('/my/') !== -1){
     // 为请求头添加身份认证字段
    header = {
    // 字段的值可以直接从 vuex 中进行获取
    Authorization: uni.$store.state.user.token}
  }
  return new Promise((resolve,reject)=>{
    // wx.request是一个异步任务 转成promise对象 再用async await转为同步任务
    uni.request({
      url: baseUrl + url,
      data,
      method,
      header,
      success:(res)=>{
        uni.hideLoading()
        // console.log('请求成功:',res)
        // console.log(res.data.meta.status)
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