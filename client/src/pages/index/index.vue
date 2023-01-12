<template>
  <view class="page-container index-page">
    <!-- #ifdef APP-PLUS -->
    <view :style="`height: ${systemStore.statusBarHeight * 2 + 10}rpx`"></view>
    <!-- #endif -->
    <view class="index-header">
      <view class="index-tab">
        <view class="tab-item" :class="{ active: current === 0 }" @click="() => switchSwiperCurrent(0)">MOMENT</view>
        <view class="tab-item" :class="{ active: current === 1 }" @click="() => switchSwiperCurrent(1)">TOUCH</view>
      </view>
      <image src="@/static/icons/setting.png" class="index-setting-icon" @click="handleGoSetting" />
    </view>

    <view class="index-content">
      <swiper class="index-swiper" :current="current" @change="handleChange" duration="300" refresher-threshold="50">
        <swiper-item class="index-swiper-item">
          <view class="index-time-text">
            <text class="index-date-day">23</text>
            <text class="index-date-month"> 2022/12 </text>
            <view class="index-split-line"></view>
            <text class="index-date-desc">我们相识的第22天, 当前使用{{ systemStore.isApp ? 'app' : 'not app' }}</text>
          </view>
          <view class="index-diary-wrapper">
            <DiaryListVue></DiaryListVue>
          </view>
        </swiper-item>
        <swiper-item class="index-swiper-item">
          <Touch class="index-touch"></Touch>
        </swiper-item>
      </swiper>
      <view class="index-go-publish" v-if="current === 0" @click="goPublish">+</view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import DiaryListVue from '@/common/components/diary-list/diary-list.vue'
  import { useSystemStore } from '@/store'
  import { printer, phoneVibrateShort } from '@/common/utils'
  import Touch from './touch/touch.vue'

  const systemStore = useSystemStore()
  const current = ref(0)

  const handleChange = (e: any) => {
    current.value = e.detail.current
    if (e.detail.source === 'touch') {
      phoneVibrateShort()
    }
  }

  const goPublish = () => {
    uni.navigateTo({
      url: '/pages/publish/publish'
    })
  }

  const handleGoSetting = () => {
    printer.info('前往设置')
  }

  const switchSwiperCurrent = (v: number) => {
    current.value = v
  }
</script>

<style lang="scss" scoped>
  @import '@/common/styles/vars.scss';
  .index-page {
    display: flex;
    flex-direction: column;
  }
  .index-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80rpx;
    .index-tab {
      display: flex;
      .tab-item {
        margin-right: 30rpx;
        font-size: 32rpx;
        padding: 20rpx 10rpx;
        color: $touch-color-weak;
        &.active {
          color: $touch-color-active;
        }
      }
    }
    .index-setting-icon {
      height: 48rpx;
      width: 48rpx;
    }
  }
  .index-touch {
    height: 100%;
  }
  .index-time-text {
    display: flex;
    flex-direction: column;
    padding: 50rpx 0;
    text-align: center;
    align-items: center;
    .index-date-day {
      font-size: 3em;
      line-height: 1;
    }
    .index-split-line {
      border-top: 1px solid $touch-color-weak;
      margin: 20rpx 0;
      width: 50%;
      display: inline-block;
    }
    .index-date-desc {
      font-size: 24rpx;
      color: $touch-color-weak;
    }
  }
  .index-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
    position: relative;
  }
  .index-swiper {
    flex: 1;
  }
  .index-swiper-item {
    display: flex;
    flex-direction: column;
  }
  .index-diary-wrapper {
    flex: 1;
    overflow-y: scroll;
    margin-bottom: 20rpx;
  }
  .index-go-publish {
    height: 100rpx;
    width: 100rpx;
    font-size: 60rpx;
    line-height: 100rpx;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -50rpx;
    bottom: 60rpx;
    z-index: 999;
    background-color: $touch-color-active;
    border-radius: 60rpx;
  }
</style>
