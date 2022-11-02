<template>
  <view>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
     <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
       <block v-for="(item, i) in cateList" :key="i">
         <view :class="['left-scroll-view-item', i === active ? 'active' : '']"  @click="activeChanged(i)">{{item.cat_name}}</view>
       </block>
     </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}">
        <view class="cate-lv2" v-for="(item2, i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
  import {getCateList} from '@/api/cate.js'
  export default {
    data() {
      return {
        // 窗口可用高度 = 屏幕高度 - navigationBar高度 - tabBar高度
        wh:0,
        active:0,
        cateList:[],
        cateLevel2:[]
      }
    },
    onLoad(){
      this.getWH()
      this.getCateList()
    },
    methods:{
      getWH(){
        // 获取当前系统信息
        const sysInfo = uni.getSystemInfoSync()
        // 为wh窗口可用高度动态赋值
        this.wh = sysInfo.windowHeight
      },
      async getCateList(){
        const res = await getCateList()
        this.cateList = res.message
        // 初始默认二级节点
        this.cateLevel2 =  res.message[0].children
      },
      // 选中项改变的事件处理函数
        activeChanged(i) {
          this.active = i
          // 为二级分类列表重新赋值
            this.cateLevel2 = this.cateList[i].children
        }
      
    }
  }
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
}
</style>
