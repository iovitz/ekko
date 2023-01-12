<template>
  <view class="page-container publish-page">
    <!-- #ifdef APP-PLUS -->
    <view :style="`height: ${systemStore.statusBarHeight * 2 + 10}rpx`"></view>
    <!-- #endif -->
    <textarea
      v-model="content"
      placeholder="这一刻的想法"
      class="publish-textarea"
      maxlength="1000"
      placeholder-class="publish-textarea-placeholder"
      :disable-preview="false"
      :adjust-position="true"
    />
    <uni-file-picker limit="3" :image-styles="listStyles" @select="handleSelect" @delete="handleDelete"></uni-file-picker>

    <view class="publish-switch-wrapper uni-list-cell uni-list-cell-pd">
      <view class="uni-list-cell-db">分享到Touch</view>
      <switch @change="handleSwitchChange" />
    </view>

    <button class="publish-button touch-button primary entry-send-button" @click="handlePublish">Send Code</button>
  </view>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { useDiaryStore, useSystemStore } from '@/store'

  const systemStore = useSystemStore()
  const diaryStore = useDiaryStore()
  const content = ref('')
  const isPublic = ref(false)
  let imgList: any[] = []

  const listStyles = reactive({
    border: {
      color: 'rgba(255, 255, 255, .4)',
      width: 1,
      style: 'dashed',
      radius: '2px'
    }
  })
  const handlePublish = () => {
    diaryStore.publishDiary(content.value, imgList, isPublic.value)
    uni.navigateBack()
  }
  const handleSwitchChange = ({ detail }: any) => {
    isPublic.value = detail.value
  }
  const handleSelect = (e: { tempFiles: any[] }) => {
    const { tempFiles } = e
    tempFiles.forEach((item) => {
      imgList.push(item)
    })
  }
  const handleDelete = (e: any) => {
    imgList = imgList.filter(({ uuid }) => e.tempFile.uuid !== uuid)
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
  .publish-switch-wrapper::after {
    display: none;
  }
</style>
