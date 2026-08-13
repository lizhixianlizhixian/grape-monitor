<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="title">{{ pageTitle }}</h1>
      <p class="subtitle">{{ pageDesc }}</p>
    </div>
    <div class="page-content">
      <h3 style="color:var(--theme-primary);margin-bottom:20px;">方案原理</h3>
      <p>采用近红外无损检测技术，搭配田间物联网采集终端，无需采摘果实即可快速检测葡萄可溶性固形物（甜度），数据自动同步云端系统，替代传统抽样送检模式，降低检测损耗。</p>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">核心流程</h3>
      <ol style="padding-left:20px;">
        <li>园区布设监测点位，固定便携式甜度采集设备</li>
        <li>生长期定期批量采样检测，数据自动上传葡跃平台</li>
        <li>系统生成甜度变化曲线，匹配水肥、光照环境数据</li>
        <li>根据糖分走势调整灌溉施肥方案，精准把控上市采收时机</li>
      </ol>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">落地价值</h3>
      <p>避免盲目采收导致甜度不达标、过早落果减产；分级采收提升果品溢价，帮助农户稳定把控果实品质。</p>
    </div>
  </div>
</template>

<script setup>
const pageTitle = "甜度监测方案"
const pageDesc = "物联网无损检测，实时把控葡萄果实糖分积累节奏"
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "微软雅黑", sans-serif;
}
.page-header {
  margin-bottom: 40px;
  border-left: 5px solid var(--theme-primary);
  padding-left: 16px;
}
.title {
  color: var(--theme-primary);
  font-size: 32px;
  margin: 0 0 8px;
}
.subtitle {
  color: #666;
  font-size: 16px;
}
.page-content {
  line-height: 1.8;
  color: #333;
  font-size: 15px;
}
</style>