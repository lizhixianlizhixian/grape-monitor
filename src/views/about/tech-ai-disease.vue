<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="title">{{ pageTitle }}</h1>
      <p class="subtitle">{{ pageDesc }}</p>
    </div>
    <div class="page-content">
      <h3 style="color:var(--theme-primary);margin-bottom:20px;">技术能力</h3>
      <p>基于海量本地葡萄叶片、果实病害样本训练AI模型，可识别霜霉病、白粉病、灰霉病、蓟马、红蜘蛛等十余种高发病虫害，手机拍照即可上传识别，3秒输出诊断结果。</p>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">使用方式</h3>
      <ul style="list-style:none;padding:0;">
        <li style="padding:10px 0;border-bottom:1px solid #f5e8ec;">① 农户在葡跃系统上传清晰作物实拍照片</li>
        <li style="padding:10px 0;border-bottom:1px solid #f5e8ec;">② AI模型自动比对特征匹配病害类型</li>
        <li style="padding:10px 0;border-bottom:1px solid #f5e8ec;">③ 同步推送对症药剂、物理防治、农事操作建议</li>
        <li style="padding:10px 0;">④ 留存防治记录，形成园区病虫害周期台账</li>
      </ul>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">优势亮点</h3>
      <p>解决基层农户病害辨别难、用药乱的痛点，减少农药滥用，降低种植成本，减少病害大面积扩散风险。</p>
    </div>
  </div>
</template>

<script setup>
const pageTitle = "人工智能识别"
const pageDesc = "AI图像快速诊断葡萄常见病虫害，早发现早防治"
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