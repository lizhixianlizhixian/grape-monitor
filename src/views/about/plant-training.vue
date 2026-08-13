<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="title">{{ pageTitle }}</h1>
      <p class="subtitle">{{ pageDesc }}</p>
    </div>
    <div class="page-content">
      <h3 style="color:var(--theme-primary);margin-bottom:20px;">培训形式</h3>
      <p>线上：系统内图文教程、短视频实操教学、季节性农事直播答疑；线下：定期入园实地教学、田间实操示范、集中专题讲座。</p>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">核心培训内容</h3>
      <ul style="list-style:none;padding:0;">
        <li style="padding:10px 0;border-bottom:1px solid #f5e8ec;">🍇 不同品种葡萄修剪、疏花疏果标准化操作</li>
        <li style="padding:10px 0;border-bottom:1px solid #f5e8ec;">🍇 水肥科学管控，配合甜度监测定制施肥方案</li>
        <li style="padding:10px 0;border-bottom:1px solid #f5e8ec;">🍇 常见病虫害绿色防控、科学用药实操</li>
        <li style="padding:10px 0;border-bottom:1px solid #f5e8ec;">🍇 葡跃系统硬件、AI识别功能实操教学</li>
        <li style="padding:10px 0;">🍇 采收分级、仓储保鲜、果品销售渠道拓展技巧</li>
      </ul>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">报名方式</h3>
      <p>入驻系统农户可直接在平台预约当期培训场次，非入驻农户可联系运营人员登记报名，大部分基础种植培训全程公益免费。</p>
    </div>
  </div>
</template>

<script setup>
const pageTitle = "种植培训"
const pageDesc = "线上线下结合，标准化葡萄种植技术公益培训服务"
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