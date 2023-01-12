<template>
  <view class="page-container">
    <!-- #ifdef APP-PLUS -->
    <view :style="`height: ${systemStore.statusBarHeight * 2 + 10}rpx`"></view>
    <!-- #endif -->
    <view class="entry-title">TOUCH</view>
    <view :class="`entry-phone ${isInputFocus ? 'active' : ''}`">
      <input
        v-model="phoneNumber"
        type="number"
        :maxlength="4"
        placeholder="Verify Code"
        class="entry-phone-inputer serif-font"
        placeholder-class="serif-font"
        @focus="() => handleInputStatusChange(true)"
        @blur="() => handleInputStatusChange(false)"
      />
    </view>
    <button :disabled="isButtonDisabled" class="touch-button primary entry-send-button">Confirm</button>
  </view>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useSystemStore } from '@/store'
  import { storage } from '@/common/utils/store/storage'
  import { printer } from '@/common/utils'

  onMounted(() => {
    if (storage.get('token')) {
      uni.navigateTo({
        url: '/pages/index/index'
      })
    } else {
      printer.info('没有Login')
    }
  })
  const systemStore = useSystemStore()
  const phoneNumber = ref('')
  const isInputFocus = ref(false)
  const isButtonDisabled = ref(true)
  const handleInputStatusChange = (v: boolean) => {
    isInputFocus.value = false
  }
</script>

<style lang="scss">
  @import '@/common/styles/vars.scss';
  .entry-title {
    font-size: 3em;
    text-align: center;
    margin-top: 200rpx;
    color: $touch-color-active;
  }
  .entry-phone {
    font-size: 48rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid $touch-color-weak;
    width: 550rpx;
    margin: 100rpx auto 0;
    transition: all ease 300ms;
    padding-bottom: 10rpx;
    &.active {
      border-color: #fff;
    }
  }
  .entry-phone-type {
    width: 100rpx;
  }
  .entry-phone-inputer {
    width: 400rpx;
    font-size: 48rpx;
    text-align: center;
  }
  .entry-send-button {
    max-width: 500rpx;
    margin: 0 auto;
  }
  .entry-send-button {
    font-size: 32rpx;
    text-align: center;
    max-width: 500rpx;
    margin-top: 60rpx;
  }
  .entry-test-login {
    position: absolute;
    bottom: 200rpx;
    width: 400rpx;
    padding: 40rpx 0;
    left: 50%;
    margin-left: -200rpx;
    text-align: center;
  }
</style>
