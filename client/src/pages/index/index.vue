<template>
  <view class="page-container">
    <view class="header">
      <view class="index-tab">
        <test class="tab-item">瞬间</test>
        <test class="tab-item">关注</test>
      </view>
      <!-- <image url></image> -->
    </view>
    <view class="index-time-text">
      <text class="index-date-now"> 12月13日 </text>
      <text class="index-date-desc">我们相识的第一天</text>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const title = ref('Hello')
</script>

<style lang="scss">
  .index-time-text {
    display: flex;
    flex-direction: column;
    .index-date-now {
      font-size: 1.5em;
      font-weight: bold;
    }
    .index-date-desc {
      font-size: 28rpx;
      color: #90959b;
    }
  }
</style>
