<template>
  <view>123123</view>
</template>

<script setup lang="ts">
  const prop = defineProps<{
    avatar: string
    nickname: string
    content: string
    file: {
      url: string
      type: string
    }
    like: number
    common: number
  }>()
</script>

<style lang="scss" scoped></style>
