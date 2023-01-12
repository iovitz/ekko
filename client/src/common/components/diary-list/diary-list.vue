<template>
  <view class="diary-list">
    <DiaryItem
      v-for="(itm, idx) in diaryStore.myDiaryList"
      :key="idx"
      :timestamp="itm.createdAt"
      :content="itm.content"
      :img="itm.files"
      :id="itm.id"
      :files="itm.files"
    ></DiaryItem>
  </view>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import DiaryItem from '../diary-item/diary-item.vue'
  import { useDiaryStore } from '@/store'

  const diaryStore = useDiaryStore()
</script>

<style lang="scss">
  .diary-list {
    height: 100%;
  }
</style>
