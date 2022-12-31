<template>
  <view class="page-container">
    <!-- #ifdef APP-PLUS -->
    <view :style="`height: ${systemStore.statusBarHeight * 2 + 10}rpx`"></view>
    <!-- #endif -->
    <view class="entry-title">TOUCH</view>
    <view :class="`entry-phone ${isInputFocus ? 'active' : ''}`">
      <text class="entry-phone-type">+86</text>
      <input
        v-model="phoneNumber"
        type="number"
        :maxlength="11"
        placeholder="Phone Number"
        class="entry-phone-inputer serif-font"
        placeholder-class="serif-font"
        @focus="() => handleInputStatusChange(true)"
        @blur="() => handleInputStatusChange(false)"
        @input="handleInput"
      />
    </view>
    <button :disabled="isButtonDisabled" class="touch-button primary entry-send-button">Send Verify Code</button>
    <view class="entry-auto-login-tip">Automatic registration after verification of unregistered mobile phones</view>

    <view class="entry-test-login">测试账号登录</view>
  </view>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useSystemStore } from '@/store'

  const systemStore = useSystemStore()
  const phoneNumber = ref('')
  const isInputFocus = ref(false)
  const isButtonDisabled = ref(true)
  const handleInputStatusChange = (v: boolean) => {
    isInputFocus.value = false
  }
  const handleInput = (v: any) => {
    const regTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/

    if (regTel.test(v.detail.value)) {
      isButtonDisabled.value = false
      console.log('成功过')
    } else {
      isButtonDisabled.value = true
      console.log('失败')
    }
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
  }
  .entry-auto-login-tip,
  .entry-send-button {
    max-width: 500rpx;
    margin: 0 auto;
  }
  .entry-send-button {
    font-size: 28rpx;
    text-align: center;
    max-width: 500rpx;
    margin-top: 60rpx;
  }
  .entry-auto-login-tip {
    font-size: 28rpx;
    color: $touch-color-weak;
    margin-top: 20rpx;
    text-align: center;
  }
  .entry-test-login {
    position: absolute;
    bottom: 200rpx;
    width: 300rpx;
    left: 50%;
    margin-left: -150rpx;
    text-align: center;
  }
</style>
