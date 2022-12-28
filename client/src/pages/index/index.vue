<template>
  <view class="page-container index-page">
    <view class="index-header">
      <text class="setting">MeNU</text>
      <view class="index-tab">
        <view class="tab-item" :class="{active: current === 0}" @click="() => switchSwiperCurrent(0)">Moment</view>
        <view class="tab-item" :class="{active: current === 1}" @click="() => switchSwiperCurrent(1)">Touch</view>
      </view>
      <text class="setting">编辑</text>
    </view>

    <view class="index-content">
      <swiper class="index-swiper" :current="current" @change="handleChange" duration="300">
        <swiper-item class="index-swiper-item">
          <view class="index-time-text">
            <text class="index-date-day">23</text>
            <text class="index-date-month"> 2022/12 </text>
            <view class="index-split-line"></view>
            <text class="index-date-desc">我们相识的第22天</text>
          </view>
          <view class="index-diary-wrapper">

            <DiaryListVue></DiaryListVue>
          </view>
        </swiper-item>
        <swiper-item class="index-swiper-item">123123</swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import DiaryListVue from '../../common/components/diary-list/diary-list.vue'

  const current = ref(0)

  const handleChange = (e: any) => {
    console.log(e)
    current.value = e.detail.current
  }

  const switchSwiperCurrent = (v: number) => {
    current.value = v
  }
</script>

<style lang="scss">
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
        &.active {
          color: red
        }
      }
    }
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
      border-top: 1px solid #90959b;
      margin: 20rpx 0;
      width: 50%;
      display: inline-block;
    }
    .index-date-desc {
      font-size: 24rpx;
      color: #90959b;
    }
  }
  .index-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow-y: scroll;
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
</style>
