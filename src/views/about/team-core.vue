<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="title">{{ pageTitle }}</h1>
      <p class="subtitle">{{ pageDesc }}</p>
    </div>
    <div class="page-content">
      <h3 style="color:var(--theme-primary);margin-bottom:20px;">团队构成</h3>
      <ul style="list-style:none;padding:0;">
        <li style="padding:12px 0;border-bottom:1px solid #f5e8ec;">
          <strong>AI算法组</strong>：负责病害识别模型、甜度预测算法研发，依托深度学习优化田间识别准确率
        </li>
        <li style="padding:12px 0;border-bottom:1px solid #f5e8ec;">
          <strong>物联网硬件组</strong>：自研田间甜度采集传感器、环境监测终端，适配果园复杂户外场景
        </li>
        <li style="padding:12px 0;border-bottom:1px solid #f5e8ec;">
          <strong>农业技术组</strong>：具备多年葡萄种植实操经验，结合本地气候定制标准化种植方案
        </li>
        <li style="padding:12px 0;">
          <strong>运营服务组</strong>：对接农户入驻、线下培训、系统售后，打通技术落地最后一公里
        </li>
      </ul>
      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">团队优势</h3>
      <p>团队融合计算机技术与传统农业经验，拒绝纯理论研发，所有技术方案均经过本地果园实地测试迭代，贴合中小农户实际种植需求，低成本、易上手、见效快。</p>
    </div>
  </div>
</template>

<script setup>
const pageTitle = "核心研发团队"
const pageDesc = "深耕智慧农业，专注葡萄数字化种植的专业技术团队"
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