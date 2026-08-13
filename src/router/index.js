import { createRouter, createWebHistory } from 'vue-router'
// 布局组件
import MainLayout from '@/components/MainLayout'

const routes = [
  // 独立落地首页，修改路径为 /intro 避开根路径冲突
  {
    path: '/intro',
    name: 'Intro',
    component: () => import('../views/HomeIntro.vue')
  },
  // 带侧边栏布局（根父路由）
  {
    path: '/',
    component: MainLayout,
    children: [
      // 子路由不加斜杠
      {
        path: 'grapeSugar',
        name: 'Home',
        component: () => import('../views/grapeSugar.vue')
      },
      {
        path: 'device',
        name: 'Device',
        component: () => import('../views/Device.vue')
      },
      // 可选：默认进入甜度页面，访问 / 自动跳转到 /grapeSugar
      {
        path: '',
        redirect: 'grapeSugar'
      }
    ]
  },
  // about系列 独立无侧边页面
  {
    path: '/about/team-core',
    name: 'TeamCore',
    component: () => import('../views/about/team-core.vue')
  },
  {
    path: '/about/tech-sugar-monitor',
    name: 'TechSugarMonitor',
    component: () => import('../views/about/tech-sugar-monitor.vue')
  },
  {
    path: '/about/tech-ai-disease',
    name: 'TechAiDisease',
    component: () => import('../views/about/tech-ai-disease.vue')
  },
  {
    path: '/about/history-timeline',
    name: 'HistoryTimeline',
    component: () => import('../views/about/history-timeline.vue')
  },
  {
    path: '/about/system-join',
    name: 'SystemJoin',
    component: () => import('../views/about/system-join.vue')
  },
  {
    path: '/about/plant-training',
    name: 'PlantTraining',
    component: () => import('../views/about/plant-training.vue')
  },
  // 新增：大创葡萄PPT详情页面路由
  {
    path: '/about/grape-big-create',
    name: 'GrapeBigCreate',
    component: () => import('../views/about/grape-big-create.vue')
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫逻辑
router.beforeEach((to, from, next) => {
  const userStr = localStorage.getItem('userInfo')
  const isLogin = userStr ? JSON.parse(userStr).isLogin : false

  // 需要登录才能进入的业务页面
  const authPages = ['/grapeSugar','/device']
  // about、/intro 不需要登录，直接放行
  if (authPages.includes(to.path) && !isLogin) {
    alert("请点击右上角登录账号，进入监测系统")
    next('/intro') // 跳转至落地介绍页
    return
  }
  next()
})

export default router