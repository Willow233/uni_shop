<template>
  <view>
    <view class="goods-list">
      <!-- block不支持绑定click点击事件处理函数 -->
      <view v-for="(item, i) in goodsList" :key="i" @click="gotoDetail(item)">
       <my-goods :goods="item"></my-goods>
      </view>
    </view>
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '@/api/goods.js'
  export default {
    data() {
      return {
        // 请求参数对象
        queryObj: {
          // 查询关键词
          query: '',
          // 商品分类Id
          cid: '',
          // 页码值
          pagenum: 1,
          // 每页显示多少条数据
          pagesize: 10
        },
        // 商品列表的数据
        goodsList: [],
        // 总数量，用来实现分页
        total: 0,
        // 是否正在请求数据(节流)
        isloading: false
      }
    },
    onLoad(options) {
      // 将页面参数转存到 this.queryObj 对象中
      this.queryObj.query = options.query || ''
      this.queryObj.cid = options.cid || ''
      // 获取商品列表数据
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(callback) {
        this.isloading = true
        const res = await getGoodsList(this.queryObj)
        this.isloading = false
        // 只要数据请求完毕，就立即按需调用 cb 回调函数
          callback && callback()
        
        // 为数据赋值：通过展开运算符的形式，进行新旧数据的拼接
        this.goodsList = [...this.goodsList, ...res.message.goods]
        this.total = res.message.total
      },
      // 点击跳转到商品详情页面
      gotoDetail(item) {
        uni.navigateTo({
          url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
        })
      }
    },
    onReachBottom(){
      // 判断是否还有下一页数据
        if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return uni.$showMsg('数据加载完毕！')
      if (this.isloading) return
       // 让页码值自增 +1
        this.queryObj.pagenum += 1
        // 重新获取列表数据
        this.getGoodsList()
    },
    onPullDownRefresh(){
      // 1. 重置关键数据
        this.queryObj.pagenum = 1
        this.total = 0
        this.isloading = false
        this.goodsList = []
      
        // 2. 重新发起请求 
        this.getGoodsList(() => uni.stopPullDownRefresh())
    }
  }
</script>

<style lang="scss">
</style>
