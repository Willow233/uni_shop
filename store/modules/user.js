const state = {
  address:JSON.parse(uni.getStorageSync('address')|| '{}')
}

const mutations = {
  updateAddress(state,address){
     state.address = address
     this.commit('user/saveAddressToStorage')
  },
  // 将地址数据持久化存储到本地
  saveAddressToStorage(state) {
    uni.setStorageSync('address', JSON.stringify(state.address))
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