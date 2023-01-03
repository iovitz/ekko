<template>
  <scroll-view scroll-y="true" class="touch-scroll" @scroll="handleScroll" :scroll-top="topDis">
    <view v-for="itm in touchData" :key="itm.id" class="scroll-view-item">{{ itm.id }} - {{ topDis }}</view>
  </scroll-view>
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
    console.log(Math.round(scrollTop / itemHeight) * itemHeight)
  }, 300)
</script>
<style lang="scss" scoped>
  .touch-container {
    height: 100%;
  }
  .index-swiper {
    height: 400rpx;
    .index-swiper-item {
      background-color: #000;
    }
  }
  .touch-scroll {
    height: 100%;
  }
  .scroll-view-item {
    height: 100%;
  }
</style>
