<template>
  <div class="page-container">
    <div class="page-header">
      <h1 class="title">{{ pageTitle }}</h1>
      <p class="subtitle">{{ pageDesc }}</p>
    </div>
    <div class="page-content">
      <h3 style="color:var(--theme-primary);margin-bottom:20px;">入驻对象</h3>
      <p>本地葡萄种植散户、家庭农场、规模化果园种植主体均可免费提交入驻申请</p>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">入驻权益</h3>
      <ul style="padding-left:20px;">
        <li>免费使用AI病害在线识别功能</li>
        <li>甜度监测数据云端存储、趋势分析服务</li>
        <li>专属农事提醒、季节种植指导推送</li>
        <li>优先参与线下种植培训、农资优惠对接</li>
        <li>果品产销对接渠道资源推荐</li>
      </ul>

      <h3 style="color:var(--theme-primary);margin:30px 0 20px;">入驻流程</h3>
      <ol style="padding-left:20px;">
        <li>填写入驻表单：园区位置、种植面积、葡萄品种、联系方式</li>
        <li>运营团队1-3个工作日完成信息核验</li>
        <li>开通系统账号，指导线上功能操作使用</li>
        <li>正式享受全周期数字化种植服务</li>
      </ol>
    </div>
  </div>
</template>

<script setup>
const pageTitle = "入驻葡跃系统"
const pageDesc = "农户线上申请入驻，一站式接入智慧种植数字化服务"
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