<template>
  <view class="diary-list">
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
    <DiaryItem></DiaryItem>
  </view>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  import DiaryItem from '../diary-item/diary-item.vue'

  const data = reactive([])
</script>

<style lang="scss">
  .diary-list {
    height: 100%;
  }
</style>
