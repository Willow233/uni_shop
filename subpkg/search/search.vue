<template>
  <view>
  <view class="search-box">
    <!-- 使用 uni-ui 提供的搜索组件 -->
    <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>

  </view>
  <!-- 搜索建议列表 -->
  <view class="sugg-list" v-if="searchResults.length !== 0">
    <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
      <view class="goods-name">{{item.goods_name}}</view>
      <uni-icons type="arrowright" size="16"></uni-icons>
    </view>
  </view>
  <!-- 搜索历史 -->
  <view class="history-box" v-else>
    <!-- 标题区域 -->
    <view class="history-title">
      <text>搜索历史</text>
      <uni-icons type="trash" size="17"></uni-icons>
    </view>
    <!-- 历史记录列表区域 -->
    <view class="history-list" >
      <uni-tag :text="item" v-for="(item, i) in historyList" :key="i"></uni-tag>
    </view>
  </view>
  
  </view>
</template>

<script>
  import {getSearchList} from '@/api/search.js'
  export default {
    data() {
      return {
          // 延时器的 timerId
            timer: null,
            // 搜索关键词
            kw: '',
            // 搜索结果列表
            searchResults:[],
            // 历史记录
            historyList:['家电','小米','牛奶']
      };
    },
    methods: {
     input(e) {
       // 清除 timer 对应的延时器
       clearTimeout(this.timer)
       // 重新启动一个延时器，并把 timerId 赋值给 this.timer
       this.timer = setTimeout(() => {
         // 如果 500 毫秒内，没有触发新的输入事件，则为搜索关键词赋值
         this.kw = e
         this.getSearchList()
       }, 500)
     },
     // 根据搜索关键词，搜索商品建议列表
    async getSearchList(){
      
      if(this.kw === '' | this.kw === null){
        this.searchResults = []
        return
      }
      const res = await getSearchList({ query: this.kw })
      this.searchResults = res.message
      // 存储不重复的历史记录值
      if(!this.historyList.some((element)=> element === this.kw)){
        this.historyList.push(this.kw)
      }
      
     
      
     },
     gotoDetail(goods_id) {
       uni.navigateTo({
         // 指定详情页面的 URL 地址，并传递 goods_id 参数
         url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
       })
     }
     }
  }
  
</script>

<style lang="scss">
.search-box {
  position: sticky;
  top: 0;
  z-index: 999;
  

}
.sugg-list {
    padding: 0 5px;
  
    .sugg-item {
      font-size: 12px;
      padding: 13px 0;
      border-bottom: 1px solid #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
  
      .goods-name {
        // 文字不允许换行（单行文本）
        white-space: nowrap;
        // 溢出部分隐藏
        overflow: hidden;
        // 文本溢出后，使用 ... 代替
        text-overflow: ellipsis;
        margin-right: 3px;
      }
    }
  }

.history-box {
  padding: 0 5px;

  .history-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    font-size: 13px;
    border-bottom: 1px solid #efefef;
  }

  .history-list {
    display: flex;
    flex-wrap: wrap;

    .uni-tag {
      margin-top: 5px;
      margin-right: 5px;
    }
  }
}
</style>
