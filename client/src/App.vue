<script setup lang="ts">
  import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

  onLaunch(() => {
    console.log('App Launch')
  })
  onShow(() => {
    console.log('App Show')
  })
  onHide(() => {
    console.log('App Hide')
  })
</script>
<style lang="scss">
  /* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
  @import '@/uni.scss';
  @import '@/common/styles/uni.css';
  page,
  .page-container {
    height: 100%;
    width: 100%;
    background-color: $touch-color-primary;
    color: #fff;
  }
  .page-container {
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 0 30rpx;
  }
</style>
