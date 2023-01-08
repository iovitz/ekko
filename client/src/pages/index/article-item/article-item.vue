<template>
  <view class="article-card">
    <view class="article-card-header">
      <view class="article-image"></view>
      <view class="article-userinfo">
        <text class="article-username">杀马特强子</text>
        <text>两分钟前来过</text>
      </view>
      <view class="article-more">
        <uni-icons custom-prefix="custom-icon" type="more-filled" size="20" color="#fff"></uni-icons>
      </view>
    </view>
    <view class="article-card-body">
      <view class="article-content">{{ content }}</view>
    </view>
    <view class="article-card-footer"> </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const content = ref(
    '下面是一个基本组件的实例，在一个vue页面的根<view>组件下插入一个<button>组件。给这个组件的内容区写上文字“按钮”，同时给这个组件设置了一个属性“size”，并且“size”属性的值设为了“mini”。'
  )
</script>
<style lang="scss" scoped>
  @import '@/common/styles/vars.scss';
  .article-card {
    padding: 20rpx 0;
    border-bottom: 1px solid $touch-color-weak;
    letter-spacing: 0.03rem;
  }
  .article-card-header {
    display: flex;
    align-items: center;
    .article-image {
      height: 60rpx;
      width: 60rpx;
      background-color: #eee;
      border-radius: 30rpx;
      margin-right: 10rpx;
    }
    .article-userinfo {
      display: flex;
      flex-direction: column;
      font-size: 24rpx;
      line-height: 1;
      flex: 1;
      color: $touch-color-weak;
      .article-username {
        font-size: 28rpx;
        font-weight: bold;
        color: #fff;
        margin-bottom: 4rpx;
      }
    }
    .article-more {
      height: 60rpx;
      width: 60rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .article-card-body {
    margin-top: 20rpx;
    font-size: 24rpx;
    .article-content {
      line-height: 1.5em;
    }
  }
</style>
