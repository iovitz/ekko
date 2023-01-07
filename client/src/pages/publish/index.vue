<template>
  <view class="page-container publish-page">
    <!-- #ifdef APP-PLUS -->
    <view :style="`height: ${systemStore.statusBarHeight * 2 + 10}rpx`"></view>
    <!-- #endif -->
    <textarea
      :value="text"
      placeholder="这一刻的想法"
      class="publish-textarea"
      maxlength="1000"
      placeholder-class="publish-textarea-placeholder"
      :disable-preview="false"
      :adjust-position="true"
    />
    <uni-file-picker limit="3" :image-styles="listStyles"></uni-file-picker>

    <button class="publish-button touch-button primary entry-send-button" @click="handlePublish">Send Code</button>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { useSystemStore } from '@/store'

  const systemStore = useSystemStore()
  const text = ref('')
  const imgList = reactive([])

  const listStyles = reactive({
    border: {
      color: 'rgba(255, 255, 255, .4)',
      width: 1,
      style: 'dashed',
      radius: '2px'
    }
  })
  const handlePublish = () => {
    console.log(text.value, imgList)
  }
</script>

<style lang="scss" scoped>
  @import '@/common/styles/vars.scss';
  .publish-page {
  }
  .publish-textarea-placeholder {
    color: $touch-color-weak;
  }
  .publish-textarea {
    color: #fff;
    margin-top: 40rpx;
    width: 100%;
    line-height: 1.5em;
    height: 300rpx;
    margin-bottom: 40rpx;
  }
  .publish-button {
    margin-top: 30rpx;
  }
</style>
