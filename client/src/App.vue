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
  @import '@/common/uni.css';
  page,
  .page-container {
    height: 100%;
    width: 100%;
  }
  .page-container {
    overflow-y: scroll;
    background-color: #24283b;
    color: #fff;
    box-sizing: border-box;
    padding: 30rpx;
  }
</style>
