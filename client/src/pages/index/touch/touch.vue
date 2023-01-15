<template>
  <view class="touch-container">
    <touch-item v-for="itm in touchData" :key="itm.id" class="scroll-view-item"></touch-item>
  </view>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { debounce } from 'lodash'
  import TouchItem from '@/common/components/touch-item/touch-item.vue'

  const touchData = [
    {
      title: '123',
      avatar: '123',
      id: 1
    },
    {
      title: '123',
      avatar: '123',
      id: 2
    },
    {
      title: '123',
      avatar: '123',
      id: 3
    }
  ]
</script>
<style lang="scss" scoped>
  .touch-scroll {
    height: 100%;
  }
  .scroll-view-item {
    border-bottom: 4px solid balck;
  }
</style>
