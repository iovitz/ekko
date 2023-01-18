<template>
  <view class="touch-item">
    <view class="touch-header">
      <view class="touch-avatar" :src="props.avatar" mode="scaleToFill" />
      <view class="touch-user-info">
        <text class="touch-nickname">{{ props.nickname || 'nickname' }}</text>
        <text>3分钟前</text>
      </view>
    </view>
    <view class="touch-body">
      <view class="touch-content">{{ props.content || '' }}</view>
      <view class="touch-options">
        <view class="touch-options-item">喜欢{{ props.like }}</view>
        <view class="touch-options-item">评论{{ props.commonCount }}</view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  const props = defineProps<{
    avatar: string
    nickname: string
    content: string
    files: {
      url: string
      type: string
    }[]
    like: number
    commonCount: number
  }>()
</script>

<style lang="scss" scoped>
  @import '@/common/styles/vars.scss';
  .touch-item {
    padding: 30rpx 0;
    border-bottom: 1px solid $touch-color-weak;
    .touch-header {
      display: flex;
      .touch-avatar {
        height: 60rpx;
        width: 60rpx;
        border-radius: 30rpx;
        background-color: #eee;
        margin-right: 10rpx;
      }
      .touch-user-info {
        display: flex;
        flex-direction: column;
        font-size: 24rpx;
        justify-content: center;
        .touch-nickname {
          font-size: 32rpx;
        }
      }
    }
    .touch-body {
      .touch-content {
        padding: 10rpx 0;
      }
      .touch-options {
        display: flex;
        .touch-options-item {
          flex: 1;
          text-align: center;
          padding: 10rpx 0;
        }
      }
    }
  }
</style>
