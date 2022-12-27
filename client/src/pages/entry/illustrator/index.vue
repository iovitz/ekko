<template>
  <view class="page-container">
    <template v-for="(pageItem, idx) in list" :key="idx">
      <view v-if="idx === currentWelcomeIdx">
        <template v-for="(text, textIndex) in pageItem.text" :key="textIndex">
          <view>{{ text }}</view>
        </template>
        <image :url="pageItem.url" />
      </view>
    </template>
  </view>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'

  const currentWelcomeIdx = ref(0)
  const list = reactive([
    {
      url: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      text: ['第一行', '第二行', '第三行', '第四行']
    },
    {
      url: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      text: ['第一行', '第二行', '第三行', '第四行']
    },
    {
      url: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
      text: ['第一行', '第二行', '第三行', '第四行']
    }
  ])
</script>

<style lang="scss"></style>
