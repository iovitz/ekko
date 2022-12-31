<template>
  <view class="page-container">
    <!-- #ifdef APP-PLUS -->
    <view :style="`height: ${systemStore.statusBarHeight * 2 + 10}rpx`"></view>
    <!-- #endif -->
    <view class="entry-title">TOUCH</view>
    <view class="entry-phone">
      <text class="entry-phone-type">+86</text>
      <input v-model="phoneNumber" class="input-placeholder" placeholder="Your Phone Number" placeholder-class="input-placeholder" />
    </view>
    <view>Automatic registration after verification of unregistered mobile phones</view>
  </view>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useSystemStore } from '@/store'

  const systemStore = useSystemStore()
  const phoneNumber = ref()
</script>

<style lang="scss">
  .entry-title {
    font-size: 3em;
    text-align: center;
    margin-top: 100rpx;
  }
  .entry-phone {
    font-size: 48rpx;
    display: flex;
  }
  .input-placeholder {
    font-family: caslon, 'Times New Roman', Times, serif, STSong, NSimSun, SimSun, serif;
  }
</style>
