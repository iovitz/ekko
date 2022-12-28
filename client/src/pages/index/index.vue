<template>
  <view class="page-container">
    <view class="header">
      <text class="setting">设置</text>
      <view class="index-tab">
        <test class="tab-item">片刻</test>
        <test class="tab-item">星球</test>
      </view>
      <text class="setting">编辑</text>
    </view>
    <view class="index-time-text">
      <text class="index-date-now"> 12月13日 </text>
      <text class="index-date-desc">我们相识的第一天</text>
    </view>

    <swiper>
      <swiper-item>
        <diary-list-view></diary-list-view>
      </swiper-item>
      <swiper-item>123123</swiper-item>
    </swiper>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import diaryListVue from '../../common/components/diary-list/diary-list.vue'

  const title = ref('Hello')
</script>

<style lang="scss">
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx 0;
  }
  .index-time-text {
    display: flex;
    flex-direction: column;
    padding: 20rpx 0;
    text-align: center;
    .index-date-now {
      font-size: 1.5em;
    }
    .index-date-desc {
      font-size: 28rpx;
      color: #90959b;
    }
  }
</style>
