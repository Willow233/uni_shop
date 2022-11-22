const state = {
  // 收货地址
  address:JSON.parse(uni.getStorageSync('address')|| '{}'),
  // token
  token:uni.getStorageSync('token')||'',
  // 用户信息
  userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}'),
  // 返回之前页面 重定向{ openType, from }
  redirectInfo:null
}

const mutations = {
  // 更新存储地址
  updateAddress(state,address){
     state.address = address
     this.commit('user/saveAddressToStorage')
  },
  // 将地址数据持久化存储到本地
  saveAddressToStorage(state) {
    uni.setStorageSync('address', JSON.stringify(state.address))
  },
  // 更新存储用户信息
  updateUserInfo(state,userinfo){
    state.userinfo = userinfo
    this.commit('user/saveUserInfoToStorage')
  },
  // 将用户信息数据持久化存储到本地
  saveUserInfoToStorage(){
    uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
  },
  // 更新存储token
  updateToken(state,token){
    state.token = token
    this.commit('user/saveTokenToStorage')
  },
  // 存储token至本地
   saveTokenToStorage(state) {
      uni.setStorageSync('token', state.token)
    },
  // 更新重定向的信息对象
    updateRedirectInfo(state, info) {
      state.redirectInfo = info
    }
}

const actions = {
  
}

const getters = {
  // 收货详细地址的计算属性
    addstr(state) {
      if (!state.address.provinceName) return ''
  
      // 拼接 省，市，区，详细地址 的字符串并返回给用户
      return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
    }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
  getters
}