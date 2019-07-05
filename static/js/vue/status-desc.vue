<template>
  <div style="float: right;">
    <div class="status">
      <div class="color Idle"></div>
      <span>空闲</span>
    </div>
    <div class="status">
      <div class="color Unavailable"></div>
      <span>离线</span>
    </div>
    <div class="status">
      <div class="color InUse"></div>
      <span>通话中</span>
    </div>
    <div class="status">
      <div class="color Ringing"></div>
      <span>响铃</span>
    </div>
  </div>
</template>

<style scoped>
    .status {
        display: inline-flex;
        align-items: center;
        padding: 10px;
    }
    .color {
        width:  20px;
        height: 20px;
    }
    span {
      margin-left: 5px;
    }
</style>

