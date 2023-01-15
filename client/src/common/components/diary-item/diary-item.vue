<template>
  <view class="diary-item" @click="goDetail" :class="{ uploading: !Boolean(id) }">
    <view class="diary-item-left">
      <view class="diary-time"> {{ time }} </view>
      <view class="diary-permission"> Touch可见 </view>
    </view>
    <view class="diary-item-right">
      <view class="diary-item-content">
        <text class="diary-item-content-text">{{ props.content }}</text>
      </view>
      <view class="diary-item-first-img"></view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { computed } from 'vue'

  const props = defineProps<{
    id: number | null
    timestamp: number | string
    content: string
    files: {
      type: string
      url: string
    } | null
  }>()
  const time = computed(() => {
    const date = new Date(props.timestamp)
    return `${date.getMonth() + 1}/${date.getDay()}`
  })

  const goDetail = () => {
    uni.navigateTo({ url: `/pages/diary/diary?id=${props.id}` })
  }
</script>

<style lang="scss" scoped>
  @import '@/uni.scss';
  @import '@/common/styles/vars.scss';
  .diary-item {
    height: 220rpx;
    width: 100%;
    background-color: $touch-color-deepin;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    transition: all ease 300ms;
    &.uploading {
      opacity: 0.5;
    }
  }
  .diary-item-content {
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 24rpx;
  }
  .diary-item-content-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .diary-item-left {
    display: flex;
    height: 100%;
    width: 160rpx;
    flex-direction: column;
    text-align: center;
  }
  .diary-time {
    margin-top: 30rpx;
    font-size: 48rpx;
  }
  .diary-permission {
    font-size: 24rpx;
  }
  .diary-item-right {
    flex: 1;
    height: 100%;
  }
</style>
