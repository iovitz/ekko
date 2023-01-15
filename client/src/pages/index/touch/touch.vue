<template>
  <view class="touch-container">
    <view v-for="itm in touchData" :key="itm.id" class="scroll-view-item">{{ itm.id }} - {{ topDis }}</view>
  </view>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { debounce } from 'lodash'

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
  const topDis = ref(0)

  const handleScroll = debounce(({ detail }: any) => {
    const { scrollHeight, scrollTop } = detail
    const itemHeight = scrollHeight / touchData.length
    topDis.value = Math.round(scrollTop / itemHeight) * itemHeight
  }, 300)
</script>
<style lang="scss" scoped>
  .touch-scroll {
    height: 100%;
  }
  .scroll-view-item {
    border-bottom: 4px solid balck;
  }
</style>
