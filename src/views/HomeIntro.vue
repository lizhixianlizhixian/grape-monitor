<template>
  <PageHeader />
  <!-- 首屏介绍区域 -->
  <div class="intro-content">
    <div class="row-wrap">
      <!-- 左侧文字区域 -->
      <div class="text-left">
        <div class="text-inner">
          <div class="slogan">
            <h2>为科技助农，为创新兴农</h2>
          </div>
          <div class="desc-text">
            <p>葡跃系统依托物联网传感器采集葡萄果实甜度数据，可视化展示甜度变化曲线，支持短期甜度趋势预测，帮助种植户精准判断最佳采摘时机。</p>
            <p>农户可在线管理监测设备、查看历史甜度记录、导出数据报表，用数字化手段降低种植风险，提升葡萄果品品质与收益。</p>
          </div>
        </div>
        <div class="btn-wrap">
          <button class="enter-btn" @click="openLogin">进入葡跃系统查看更多 →</button>
        </div>
      </div>
      <!-- 右侧演示gif -->
      <div class="gif-right">
        <img src="/images/image4.gif" alt="葡跃系统演示动图" />
      </div>
    </div>
  </div>
  <!-- 落地案例板块 -->
  <div class="case-section">
    <h2 class="section-title">葡跃助力实现更智能的农业种植</h2>
    <div class="case-list">
      <!-- 卡片1 -->
      <div class="case-card">
        <div class="card-head">
          <img src="/images/图片1.png" alt="案例logo" />
        </div>
        <div class="card-text">
          <p>智慧葡萄园区借助葡跃甜度监测系统，实现精细化水肥调控</p>
        </div>
        <div class="card-footer">
          <div>
            <span class="data-num">35%</span>
            <span class="data-desc">果品品质提升</span>
          </div>
          <span class="link-icon">↗</span>
        </div>
      </div>
      <!-- 卡片2 -->
      <div class="case-card active">
        <div class="card-head">
          <img src="/images/图片2.png" alt="案例logo" />
        </div>
        <div class="card-text">
          <p>AI叶片病害识别新模式，降低田间巡检人力成本</p>
        </div>
        <div class="card-footer">
          <div>
            <span class="data-num">两套示范基地</span>
            <span class="data-desc">AI病害识别落地应用</span>
          </div>
          <span class="link-icon">↗</span>
        </div>
      </div>
      <!-- 卡片3 -->
      <div class="case-card">
        <div class="card-head">
          <img src="/images/图片3.png" alt="案例logo" />
        </div>
        <div class="card-text">
          <p>葡跃物联网监测平台，帮助农户降低种植风险、简化管理</p>
        </div>
        <div class="card-footer">
          <div>
            <span class="data-num">40%</span>
            <span class="data-desc">人工管护成本下降</span>
          </div>
          <span class="link-icon">↗</span>
        </div>
      </div>
      <!-- 卡片4 -->
      <div class="case-card">
        <div class="card-head">
          <img src="/images/图片4.png" alt="案例logo" />
        </div>
        <div class="card-text">
          <p>大数据预测采摘窗口期，最大化葡萄销售收益</p>
        </div>
        <div class="card-footer">
          <div>
            <span class="data-num">28万元</span>
            <span class="data-desc">农户年均增收</span>
          </div>
          <span class="link-icon">↗</span>
        </div>
      </div>
    </div>
  </div>
  <!-- 核心团队板块 -->
  <div class="team-section">
    <h2 class="section-title">葡跃核心研发团队</h2>
    <div class="team-grid">
      <!-- 江毅 项目负责人 -->
      <div class="team-item">
        <img src="/images/jianyi.png" alt="江毅">
        <div class="team-info">
          <div class="name-row">
            <span class="name">江毅</span>
            <span class="role">项目负责人</span>
          </div>
          <ul class="intro">
            <li>大数据技术专业</li>
            <li>省政府奖学金</li>
            <li>3项省级荣誉</li>
            <li>火疫联盟社团负责人</li>
            <li>开放原子社团负责人</li>
            <li>人工智能学院学生会主席</li>
          </ul>
        </div>
      </div>
      <!-- 何宇航 运营负责人 -->
      <div class="team-item">
        <img src="/images/heyuhang.png" alt="何宇航">
        <div class="team-info">
          <div class="name-row">
            <span class="name">何宇航</span>
            <span class="role">运营负责人</span>
          </div>
          <ul class="intro">
            <li>装备智能化技术专业</li>
            <li>2023校三好学生</li>
            <li>2021校二等奖学金</li>
            <li>“一带一路”杰出青年</li>
          </ul>
        </div>
      </div>
      <!-- 庞迪 技术负责人 -->
      <div class="team-item">
        <img src="/images/longdi.png" alt="庞迪">
        <div class="team-info">
          <div class="name-row">
            <span class="name">庞迪</span>
            <span class="role">技术负责人</span>
          </div>
          <ul class="intro">
            <li>农艺与种业专业</li>
            <li>2025年研究生二等奖学金</li>
            <li>2024年国家励志奖学金</li>
            <li>设施蔬菜生产职业技能（中级）</li>
          </ul>
        </div>
      </div>
      <!-- 胡锐 运维负责人（咨询弹窗对应负责人） -->
      <div class="team-item">
        <img src="/images/hului.png" alt="胡锐">
        <div class="team-info">
          <div class="name-row">
            <span class="name">胡锐</span>
            <span class="role">运维/咨询负责人</span>
          </div>
          <ul class="intro">
            <li>计算机应用技术专业</li>
            <li>院体育部负责人</li>
            <li>校体育部负责人</li>
            <li>智慧农业管理师初级</li>
          </ul>
        </div>
      </div>
      <!-- 卢益凡 市场负责人 -->
      <div class="team-item">
        <img src="/images/luyifan.png" alt="卢益凡">
        <div class="team-info">
          <div class="name-row">
            <span class="name">卢益凡</span>
            <span class="role">市场负责人</span>
          </div>
          <ul class="intro">
            <li>物联网技术专业</li>
            <li>省政府奖学金</li>
            <li>“中行杯”职业规划大赛金奖</li>
            <li>物联网单片机开发中级证书</li>
          </ul>
        </div>
      </div>
      <!-- 龚瑞杰 财务负责人 -->
      <div class="team-item">
        <img src="/images/gonruijie.png" alt="龚瑞杰">
        <div class="team-info">
          <div class="name-row">
            <span class="name">龚瑞杰</span>
            <span class="role">财务负责人</span>
          </div>
          <ul class="intro">
            <li>人工智能专业</li>
            <li>浙江省职业院校技能大赛省铜</li>
            <li>大数据财务分析师初级</li>
            <li>校程序设计大赛一等奖</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <!-- IBM风格底部板块（对应导航「了解更多」锚点位置） -->
  <div class="about-ibm-style" id="page-bottom">
    <div class="about-container">
      <div class="about-top-row">
        <div class="about-main-title">
          <h1>关于葡跃</h1>
        </div>
        <div class="four-column-nav">
          <div class="nav-column">
            <h3>我们的团队</h3>
            <p>深入了解葡跃研发团队构成、成员背景与创业初心。</p>
            <div class="link-list">
              <router-link class="brand-link" to="/about/team-core">核心研发团队 →</router-link>
            </div>
          </div>
          <div class="nav-column">
            <h3>我们的创新</h3>
            <p>物联网甜度监测、AI病害识别、采摘预测算法技术体系。</p>
            <div class="link-list">
              <router-link class="brand-link"  to="/about/tech-sugar-monitor">甜度监测方案 →</router-link>
              <router-link class="brand-link" to="/about/tech-ai-disease">人工智能识别 →</router-link>
            </div>
          </div>
          <div class="nav-column">
            <h3>发展历程</h3>
            <p>从校园创业到落地果园，记录葡跃一步步迭代成长之路。</p>
            <div class="link-list">
              <router-link class="brand-link" to="/about/history-timeline">项目大事记 →</router-link>
            </div>
          </div>
          <div class="nav-column">
            <h3>农户服务</h3>
            <p>了解葡跃如何帮助种植户降本增效，开放合作渠道。</p>
            <div class="link-list">
              <router-link class="brand-link" to="/about/system-join">入驻葡跃系统 →</router-link>
              <router-link class="brand-link" to="/about/plant-training">种植培训 →</router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="about-content-row">
        <div class="image-block">
          <img src="/images/team-big.jpg" alt="葡跃团队合影">
        </div>
        <div class="subscribe-form-area">
          <h2>葡跃项目资讯订阅</h2>
          <div class="form-line">
            <label>姓氏 *</label>
            <input type="text">
          </div>
          <div class="form-line">
            <label>名字 *</label>
            <input type="text">
          </div>
          <div class="form-line">
            <label>联系邮箱 *</label>
            <input type="email">
          </div>
          <p class="must-tip">* 所有字段均为必填项</p>
          <p class="form-desc">
            您将定期接收葡跃技术动态、种植指导资讯。每一封邮件都包含取消订阅入口。更多内容，请查阅《用户隐私协议》。
          </p>
          <button class="subscribe-btn">订阅资讯</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import PageHeader from './PageHeader.vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

// 唤起登录 / 直接进入系统
const openLogin = () => {
  if(userStore.isLogin){
    router.push('/grapeSugar')
  }else{
    userStore.openLoginDialog()
  }
}
</script>
<style scoped>
/* ==========首屏介绍样式（统一主题色变量）========== */
.intro-content {
  width: 94%;
  max-width: 1440px;
  margin: 0 auto 0;
  padding-top: 56px;
}
.row-wrap {
  display: flex;
  align-items: stretch;
  gap: 64px;
}
.text-left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.gif-right {
  flex: 0 0 480px;
}
.gif-right img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  display: block;
}
.slogan h2 {
  font-size: 54px;
  color: var(--theme-text);
  text-align: center;
  font-weight: 600;
  letter-spacing: 4px;
  margin: 0 0 52px;
  line-height: 1.2;
}
.desc-text {
  font-size: 18px;
  color: #333;
  line-height: 1.9;
}
.desc-text p {
  margin: 20px 0;
}
.btn-wrap {
  text-align: center;
}
.enter-btn {
  padding: 16px 42px;
  font-size: 18px;
  color: #ffffff;
  background-color: var(--theme-primary);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.24s ease;
  position: relative;
  z-index: 10;
}
.enter-btn:hover {
  background-color: var(--theme-primary-dark);
}

/* ==========案例板块 图片统一核心优化========== */
.case-section{
  width:94%;
  max-width:1440px;
  margin:120px auto 0;
}
.section-title{
  font-size:52px;
  font-weight:500;
  margin-bottom:40px;
  color: var(--theme-text);
}
.case-list{
  display:flex;
  gap:24px;
}
.case-card{
  flex:1;
  border:1px solid #ddd;
  border-radius:4px;
  overflow:hidden;
  transition: 0.24s;
  display: flex;
  flex-direction: column;
}
.case-card:hover {
  box-shadow: 0 6px 18px rgba(216,112,147,0.15);
  transform: translateY(-3px);
}
.case-card.active{
  border-top:3px solid var(--theme-primary);
}
.card-head{
  padding:24px 24px 12px;
  display: flex;
  justify-content: center;
}
/* 统一案例logo尺寸 */
.card-head img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  border-radius: 6px;
}
.card-text{
  padding:0 24px 32px;
  font-size:22px;
  line-height:1.5;
  /* 固定文字最小高度，卡片等高 */
  min-height: 90px;
}
.card-footer{
  padding:20px 24px;
  background:#f5f5f5;
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-top: auto;
}
.data-num{
  font-size:28px;
  font-weight:bold;
  display:block;
  color: var(--theme-primary);
}
.data-desc{
  color:#555;
}
.link-icon{
  color: var(--theme-primary);
  font-size:24px;
}

/* ==========团队板块样式（统一主题色标签）========== */
.team-section{
  width:94%;
  max-width:1440px;
  margin:120px auto 0;
}
.team-grid{
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:40px;
}
.team-item{
  display:flex;
  gap:20px;
  background: var(--card-bg);
  padding:20px;
  border-radius:12px;
  box-shadow: 0 2px 12px rgba(216,112,0.08);
  transition:0.2s;
}
.team-item:hover {
  box-shadow: 0 6px 20px rgba(216,112,147,0.16);
}
/* 团队头像统一 */
.team-item img{
  width:160px;
  height:160px;
  object-fit:cover;
  border-radius:8px;
}
.name-row{
  display:flex;
  align-items:center;
  gap:16px;
  margin-bottom:12px;
}
.name{
  font-size:42px;
  font-weight:bold;
  color: var(--theme-primary);
}
.role{
  padding:6px 20px;
  background:linear-gradient(90deg,#c8688c,#d87093);
  color:#fff;
  border-radius:999px;
  font-size:26px;
}
.intro{
  list-style:none;
  padding:0;
  margin:0;
  font-size:20px;
  line-height:1.7;
  color:#333;
}
.intro li::before{
  content:"•";
  margin-right:8px;
  color: var(--theme-primary);
}

/* ===================== IBM风格底部板块CSS（链接统一主题粉）===================== */
.about-ibm-style {
  margin-top: 140px;
  scroll-margin-top: 100px;
}
.about-container {
  width:94%;
  max-width:1480px;
  margin:0 auto;
}
.about-top-row {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap:60px;
  margin-bottom:64px;
}
.about-main-title h1{
  font-size:56px;
  font-weight:400;
  margin:0;
  color: var(--theme-text);
}
.four-column-nav{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap:32px;
}
.nav-column h3{
  font-size:20px;
  margin:0 0 10px;
  color: var(--theme-text);
}
.nav-column p{
  font-size:16px;
  color:#222;
  line-height:1.6;
  margin:0 0 14px;
}
.brand-link{
  display:block;
  color: var(--theme-primary);
  font-size:16px;
  margin:6px 0;
  cursor:pointer;
  width: fit-content;
}
.brand-link:hover{
  text-decoration: underline;
}
.about-content-row{
  display: grid;
  grid-template-columns: 1fr 520px;
  gap:60px;
}
.image-block img{
  width:100%;
  display:block;
  border-radius:10px;
  object-fit: cover;
}
.subscribe-form-area h2{
  font-size:32px;
  font-weight:400;
  border-bottom:1px solid #dddddd;
  padding-bottom:12px;
  margin-top:0;
  color: var(--theme-text);
}
.form-line{
  margin-top:26px;
}
.form-line label{
  display:block;
  font-size:16px;
  margin-bottom:8px;
}
.form-line input{
  width:100%;
  height:46px;
  background:#f7f7f7;
  border:1px solid #eeeeee;
  padding:0 12px;
  font-size:16px;
  border-radius:6px;
}
.must-tip{
  font-size:15px;
  margin:18px 0 6px;
}
.form-desc{
  font-size:14px;
  line-height:1.6;
  color:#333;
  margin-bottom:36px;
}
.subscribe-btn{
  padding:14px 36px;
  background: var(--theme-primary);
  border:none;
  font-size:16px;
  color:#fff;
  cursor:pointer;
  border-radius:6px;
  transition:0.2s;
}
.subscribe-btn:hover{
  background: var(--theme-primary-dark);
}

/* ==========响应式适配========== */
@media (max-width: 1024px) {
  .row-wrap {
    flex-direction: column;
    align-items: center;
  }
  .gif-right {
    flex: unset;
    width: 80%;
    margin-top: 60px;
  }
  .slogan h2, .section-title {
    font-size: 36px;
  }
  .case-list{
    flex-wrap:wrap;
  }
  .case-card{
    flex:1 1 42%;
  }
  .team-grid{
    grid-template-columns:1fr;
  }
  .about-top-row{
    grid-template-columns: 1fr;
  }
  .four-column-nav{
    grid-template-columns: repeat(2,1fr);
  }
  .about-content-row{
    grid-template-columns:1fr;
  }
}
@media (max-width: 640px) {
  .slogan h2, .section-title {
    font-size: 32px;
    letter-spacing: 2px;
  }
  .case-card{
    flex:1 1 100%;
  }
  .team-grid{
    grid-template-columns:1fr;
  }
  .four-column-nav{
    grid-template-columns:1fr;
  }
  .about-main-title h1{
    font-size:40px;
  }
}
</style>