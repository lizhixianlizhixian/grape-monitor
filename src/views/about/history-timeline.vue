<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="title">{{ pageTitle }}</h1>
      <p class="subtitle">{{ pageDesc }}</p>
    </div>
    <div class="page-content">
      <div class="time-item" style="padding:16px 0;border-left:3px solid var(--theme-primary);padding-left:20px;margin-left:10px;">
        <strong>前期筹备阶段</strong>
        <p>团队组建完成，完成本地葡萄种植产业调研，确定甜度监测+AI病害识别两大核心研发方向</p>
      </div>
      <div class="time-item" style="padding:16px 0;border-left:3px solid var(--theme-primary);padding-left:20px;margin-left:10px;">
        <strong>技术研发阶段</strong>
        <p>完成初代AI病害识别模型训练、物联网甜度采集硬件原型开发，进入实验室测试优化</p>
      </div>
      <div class="time-item" style="padding:16px 0;border-left:3px solid var(--theme-primary);padding-left:20px;margin-left:10px;">
        <strong>田间试点阶段</strong>
        <p>对接本地合作果园开展实地试点，根据田间真实数据迭代算法与硬件适配性</p>
      </div>
      <div class="time-item" style="padding:16px 0;border-left:3px solid var(--theme-primary);padding-left:20px;margin-left:10px;">
        <strong>系统上线阶段</strong>
        <p>葡跃农户服务系统正式上线，开放入驻通道，同步开启线下种植培训服务</p>
      </div>
      <div class="time-item" style="padding:16px 0;border-left:3px solid var(--theme-primary);padding-left:20px;margin-left:10px;">
        <strong>规模化推广阶段</strong>
        <p>持续拓展合作园区范围，完善全流程智慧农业服务体系，助力区域葡萄产业提质增效</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const pageTitle = "项目大事记"
const pageDesc = "从校园创意到果园落地，葡跃的成长时间线"
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