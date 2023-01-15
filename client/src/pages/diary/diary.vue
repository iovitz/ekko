<template>
  <view class="diary-page">
    <view class="diary-content"> {{ content }} </view>
    <view class="diary-images">
      <view v-for="(itm, idx) in files" :key="idx">
        <image :src="itm.url" />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue'
  import { getDiaryDetail } from '@/common/request/diary.request'

  const content = ref('')

  const files = ref<
    Array<{
      type: string
      url: string
    }>
  >([])

  onMounted(async () => {
    const pages = getCurrentPages<{
      options: {
        id: number
      }
    }>()
    const currentPage = pages[pages.length - 1]
    const { id } = currentPage.options
    const res = await getDiaryDetail(id)
    content.value = res.content
    files.value = res.files ? JSON.parse(res.files) : []
  })
</script>

<style lang="scss" scoped>
  .diary-page {
    padding: 30rpx;
  }
</style>
