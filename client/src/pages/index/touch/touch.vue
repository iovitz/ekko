<template>
  <view class="touch-container">
    <touch-item
      v-for="itm in touchData"
      :key="itm.did"
      :nickname="itm.nickname"
      :content="itm.content"
      :avatar="itm.avatar"
      :like="itm.like"
      :files="itm.files"
      :commonCount="itm.commonCount"
      class="scroll-view-item"
    ></touch-item>
  </view>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { debounce } from 'lodash'
  import TouchItem from '@/common/components/touch-item/touch-item.vue'
  import { getDiaryDetail } from '@/common/request/diary.request'

  const touchData: any[] = []

  onMounted(async () => {
    const res = await getDiaryDetail()
    console.log('e', res)
    res.forEach((item) => {
      console.log(item)
      touchData.push({
        nickname: item.nickname,
        time: item.createdAt,
        avatar: item.avatar,
        content: item.content,
        files: JSON.parse(item.files),
        like: item.like,
        did: item.id,
        commonCount: item.commentCount
      })
    })
  })
</script>
<style lang="scss" scoped>
  .touch-scroll {
    height: 100%;
  }
  .scroll-view-item {
    border-bottom: 4px solid balck;
  }
</style>
