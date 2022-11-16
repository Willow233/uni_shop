const state = {
  // 购物车的数组，用来存储购物车中每个商品的信息对象
  // 每个商品的信息对象，都包含如下 6 个属性：
  // { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
  cart:JSON.parse(uni.getStorageSync('cart') || '[]')
}

const mutations = {
  addToCart(state, goods) {
  // 根据提交的商品的Id，查询购物车中是否存在这件商品
  // 如果不存在，则 findResult 为 undefined；否则，为查找到的商品信息对象
  const findResult = state.cart.find((x) => x.goods_id === goods.goods_id)
  if (!findResult) {
          // 如果购物车中没有这件商品，则直接 push
          state.cart.push(goods)
        } else {
          // 如果购物车中有这件商品，则只更新数量即可
          findResult.goods_count++
        }
        this.commit('cart/saveToStorage')
      },
  
  // 更新商品勾选状态
  updateGoodsState(state,goods){
    const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
    if(findResult){
      findResult.goods_state = goods.goods_state
      this.commit('cart/saveToStorage')
    }
  }
  // 更新商品数量
  updateGoodsCount(state,goods){
    const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
    if(findResult){
      findResult.goods_count = goods.goods_count
      this.commit('cart/saveToStorage')
    }
  },
  // 根据 Id 从购物车中删除对应的商品信息
  removeGoodsById(state, goods_id) {
    // 调用数组的 filter 方法进行过滤
    state.cart = state.cart.filter(x => x.goods_id !== goods_id)
    // 持久化存储到本地
    this.commit('m_cart/saveToStorage')
  }
  // 将购物车中的数据持久化存储到本地
  saveToStorage(state) {
    uni.setStorageSync('cart', JSON.stringify(state.cart))
  }
}

const actions = {
  
}

const getters ={
   // 统计购物车中商品的总数量
     total(state) {
        let c = 0
        // 循环统计商品的数量，累加到变量 c 中
        state.cart.forEach(goods => c += goods.goods_count)
        return c
     }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
