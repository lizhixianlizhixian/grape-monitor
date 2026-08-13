<template>
  <div class="grape-about-page">
    <!-- 顶部固定导航栏复用Header -->
    <PageHeader />
    <div class="page-container">
      <!-- 1. 项目总览板块 -->
      <section class="section overview">
        <div class="wrap">
          <h2 class="section-title">项目总览</h2>
          <div class="overview-card">
            <div class="text-box">
              <h3>算法模型+硬件采集+软件赋能 三位一体葡萄智慧种植系统</h3>
              <p>通过自主硬件采集田间环境数据，AI模型分析葡萄全周期生长状态，配套移动端软件实现数据可视化、农事智能提醒、AI种植助手，全程人工科学干预，降低农药残留、提升果实甜度，标准化提升葡萄品质。</p>
              <ul class="feature-list">
                <li>多维度环境数据自动采集</li>
                <li>全生长周期葡萄种植指导方案</li>
                <li>AI智能农事预警与操作建议</li>
                <li>数字化转型替代传统经验种植</li>
              </ul>
            </div>
            <div class="img-box">
              <img src="grape-main.png" alt="青提葡萄">
            </div>
          </div>
        </div>
      </section>

      <!-- 2. 行业痛点 & 解决方案 -->
      <section class="section problem-solve bg-light">
        <div class="wrap">
          <h2 class="section-title">行业痛点与解决方案</h2>
          <div class="two-col">
            <div class="col-left">
              <h3>现存问题</h3>
              <p>传统葡萄种植依赖农户经验，无法根据温湿度、光照、土壤等环境变化做出精细化、及时农事响应，施肥打药无数据支撑，易出现农残超标、甜度不均、产量不稳定问题。</p>
            </div>
            <div class="col-right">
              <h3>解决思路</h3>
              <p>自研轻量化五参数环境传感器，低成本、小型化，设备实时采集田间参数，数据直连农户手机端；以数据驱动科学种植，推动农业由经验型转向数字化精细化管理。</p>
            </div>
          </div>
          <div class="field-img">
            <img src="grape-greenhouse.jpg" alt="温室葡萄种植实景">
          </div>
        </div>
      </section>

      <!-- 3. 项目研发历程时间线 -->
      <section class="section timeline">
        <div class="wrap">
          <h2 class="section-title">项目完整研发历程</h2>
          <div class="timeline-box">
            <div class="time-item">
              <div class="time-tag">01 2023.10-2024.08</div>
              <div class="time-content">组建优秀研发团队</div>
            </div>
            <div class="time-item">
              <div class="time-tag">02 2024.09-2024.11</div>
              <div class="time-content">采集器外观、内部传感器硬件设计</div>
            </div>
            <div class="time-item">
              <div class="time-tag">03 2024.10-2024.11</div>
              <div class="time-content">开发便携式田间安装装置</div>
            </div>
            <div class="time-item">
              <div class="time-tag">04 2024.11-2025.01</div>
              <div class="time-content">回归算法插入、训练模型，整合环境数据集</div>
            </div>
            <div class="time-item">
              <div class="time-tag">05 2024.12-2025.01</div>
              <div class="time-content">软件输出端界面、交互逻辑设计</div>
            </div>
            <div class="time-item">
              <div class="time-tag">06 2025.01至今</div>
              <div class="time-content">市场宣传推广、产品持续迭代优化</div>
            </div>
            <div class="time-item">
              <div class="time-tag">07 2025.05-2025.10</div>
              <div class="time-content">第一代产品模式落地升级</div>
            </div>
            <div class="time-item">
              <div class="time-tag">08 2025.10至今</div>
              <div class="time-content">第二代产品全面迭代升级</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. 核心硬件：五参数环境采集器 -->
      <section class="section hardware bg-light">
        <div class="wrap">
          <h2 class="section-title">核心技术：自研五参数环境采集器</h2>
          <div class="hardware-card">
            <div class="hardware-img">
              <img src="sensor-device.jpg" alt="田间传感器设备">
            </div>
            <div class="hardware-feature">
              <h3>设备核心优势</h3>
              <ul>
                <li>✅ 多参数实时监测：温湿度、土壤、光照、CO₂同步采集</li>
                <li>✅ 异常阈值及时报警，手机端推送提醒</li>
                <li>✅ 全周期数据本地存储+云端同步分析</li>
                <li>✅ ABS防水外骨骼，户外可移动、快速安装</li>
                <li>✅ 体积小巧，大棚多点布控，降低硬件成本</li>
              </ul>
            </div>
          </div>
          <div class="device-map">
            <h4>温室大棚设备分布规划图</h4>
            <img src="device-map.png" alt="大棚设备分布图">
          </div>
        </div>
      </section>

      <!-- 5. 知识产权专利成果 -->
      <section class="section patent">
        <div class="wrap">
          <h2 class="section-title">知识产权成果</h2>
          <div class="patent-card">
            <img src="patent-notice.png" alt="专利申请受理通知书">
            <div class="patent-text">
              <h3>智能农业多功能磁吸传感器支架外观设计专利</h3>
              <p>申请号：202530316341.9</p>
              <p>申请人：江毅、林仕臣、焦幼娜、陈江涛、冯羿博、王星月</p>
              <p>受理日期：2025年06月04日，国家知识产权局正式受理</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import PageHeader from '../PageHeader.vue'
</script>

<style scoped>
.grape-about-page {
  width: 100%;
  min-height: 100vh;
  padding-top: 60px;
}
.page-container {
  max-width: 1200px;
  margin: 0 auto;
}
.section {
  padding: 60px 20px;
}
.bg-light {
  background-color: #f9f6f8;
}
.section-title {
  text-align: center;
  font-size: 28px;
  color: #d87093;
  margin-bottom: 40px;
  font-weight: 700;
}
.wrap {
  max-width: 1100px;
  margin: 0 auto;
}

/* 项目总览 */
.overview-card {
  display: flex;
  gap: 40px;
  align-items: center;
}
.text-box {
  flex: 1;
}
.text-box h3 {
  font-size: 22px;
  color: #333;
  margin-bottom: 16px;
}
.text-box p {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 16px;
}
.feature-list {
  padding-left: 20px;
}
.feature-list li {
  line-height: 2;
  color: #444;
}
.img-box img {
  width: 300px;
  border-radius: 8px;
}

/* 痛点解决方案 */
.two-col {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}
.col-left, .col-right {
  flex: 1;
  padding: 24px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(216,112,147,0.1);
}
.col-left h3, .col-right h3 {
  color: #d87093;
  margin-bottom: 12px;
}
.field-img img {
  width: 100%;
  border-radius: 10px;
}

/* 时间线 */
.timeline-box {
  border-left: 3px solid #d87093;
  padding-left: 24px;
  margin-left: 10px;
}
.time-item {
  margin-bottom: 32px;
  position: relative;
}
.time-item::before {
  content: "";
  width: 12px;
  height: 12px;
  background: #d87093;
  border-radius: 50%;
  position: absolute;
  left: -30px;
  top: 6px;
}
.time-tag {
  font-weight: 600;
  color: #d87093;
  font-size: 15px;
}
.time-content {
  font-size: 16px;
  margin-top: 4px;
  color: #333;
}

/* 硬件板块 */
.hardware-card {
  display: flex;
  gap: 40px;
  align-items: center;
  margin-bottom: 40px;
}
.hardware-img img {
  width: 500px;
  border-radius: 8px;
}
.hardware-feature h3 {
  color: #d87093;
  margin-bottom: 16px;
}
.hardware-feature li {
  line-height: 2.2;
  font-size: 16px;
}
.device-map h4 {
  text-align: center;
  margin-bottom: 16px;
  color: #666;
}
.device-map img {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
}

/* 专利板块 */
.patent-card {
  display: flex;
  gap: 30px;
  align-items: center;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(216,112,147,0.1);
}
.patent-card img {
  width: 320px;
  border: 1px solid #ddd;
}
.patent-text h3 {
  color: #333;
  margin-bottom: 12px;
}
.patent-text p {
  line-height: 2;
  color: #555;
}
</style>