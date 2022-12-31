<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
  import { printer } from './common/utils'

  onLaunch(() => {
    printer.info('平台：', uni.getSystemInfoSync().platform)
    printer.info('高度', uni.getSystemInfoSync().statusBarHeight)
  })
  onShow(() => {
    printer.info('App Show')
  })
  onHide(() => {
    printer.info('App Hide')
  })
</script>
<style lang="scss">
  @import '@/common/styles/global.scss';
</style>
