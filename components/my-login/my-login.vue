<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
    <button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex'
  import {
    getLoginResult
  } from '@/api/userinfo.js'
  export default {
    name: "my-login",
    data() {
      return {

      }
    },
    computed: {
      ...mapState('user', ['redirectInfo']),
    },
    methods: {
      ...mapMutations('user', ['updateUserInfo', 'updateToken', 'updateRedirectInfo']),
      /* getUserInfo(e){
        if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
        // 存储用户信息
        this.updateUserInfo(e.detail.userInfo)
        console.log(e)
        // 获取Token
        this.getToken(e.detail)
      }, */
      getUserProfile() {
        uni.getUserProfile({
          desc: '获取您的头像及昵称',
          success: (res) => {
            if (res.errMsg === 'getUserProfile:fail auth deny') return uni.$showMsg('您取消了登录授权！')
            // 存储用户信息
            this.updateUserInfo(res.userInfo)
            // 获取Token
            this.getToken(res)
          }
        })
      },
      async getToken(info) {
        // 微信登录接口
        const [err, res] = await uni.login().catch(err => err)
        console.log('login', res)
        if (err || res.errMsg !== 'login:ok') return uni.$showError('登陆失败')
        // 请求参数
        const query = {
          code: res.code,
          encryptedData: info.encryptedData,
          iv: info.iv,
          rawData: info.rawData,
          signature: info.signature
        }
        // 获取 token
        // const { data: loginResult } = await getLoginResult(query) 
        // 后端暂不提供token
        const loginResult = {
          "message": {
            "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEyLCJpYXQiOjE1MjU0MDIyMjMsImV4cCI6MTUyNTQ4ODYyM30.g-4GtEQNPwT_Xs0Pq7Lrco_9DfHQQsBiOKZerkO-O-o"
          },
          "meta": {
            "msg": "登录成功",
            "status": 200
          }
        }
        // 存储token
        this.updateToken(loginResult.message.token)
        // 跳转页面
        if(this.redirectInfo){
          this.navigateBack()
        }
        uni.$showMsg('登陆成功')
      },
      navigateBack(){
        if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
          uni.switchTab({
            url:this.redirectInfo.from,
            complete: () => {
              this.updateRedirectInfo(null)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
  .login-container {
    // 登录盒子的样式
    height: 750rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;
    position: relative;
    overflow: hidden;

    // 绘制登录盒子底部的半椭圆造型
    &::after {
      content: ' ';
      display: block;
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      bottom: 0;
      background-color: white;
      border-radius: 100%;
      transform: translateY(50%);
    }

    // 登录按钮的样式
    .btn-login {
      width: 90%;
      border-radius: 100px;
      margin: 15px 0;
      background-color: #c00000;
    }

    // 按钮下方提示消息的样式
    .tips-text {
      font-size: 12px;
      color: gray;
    }
  }
</style>
