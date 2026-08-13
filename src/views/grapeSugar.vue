<template>
  <!-- 删除外层 global-bg，由 MainLayout 统一提供背景 -->
  <div class="grape-sugar-page">
    <div class="page-title">葡跃｜葡萄甜度趋势预测｜把握最佳采摘时机</div>

    <!-- 产区选择 + 积温基数 + 糖度基数（自动刷新预测） -->
    <div class="region-bar">
      <div class="region-select">
        <span class="region-label">产区选择</span>
        <el-select
          v-model="currentDeviceCityId"
          filterable
          remote
          reserve-keyword
          placeholder="搜索城市（如：吐鲁番、烟台）"
          :remote-method="onCitySearch"
          :loading="citySearchLoading"
          clearable
          @change="onSelectCity"
          style="width: 260px"
        >
          <el-option
            v-for="item in citySearchResults"
            :key="item.id"
            :label="item.name + ' - ' + item.adm1 + item.adm2"
            :value="item.id"
          >
            <div class="city-search-item">
              <span class="city-name">{{ item.name }}</span>
              <span class="city-adm">{{ item.adm1 }} {{ item.adm2 }}</span>
            </div>
          </el-option>
        </el-select>
      </div>
      <div class="base-input">
        <span class="region-label">积温基数</span>
        <el-input-number
          v-model="baseTemp"
          :min="0"
          :max="5000"
          :step="100"
        />
        <span class="unit-hint">℃·d</span>
      </div>
      <div class="base-input">
        <span class="region-label">糖度基数</span>
        <el-input-number
          v-model="baseSugar"
          :min="0"
          :max="30"
          :step="0.1"
          :precision="1"
        />
        <span class="unit-hint">°Bx</span>
      </div>
      <span class="model-hint">基于积温线性回归模型，参数变更自动刷新</span>
    </div>

    <div class="tab-group">
      <div
        class="tab-item"
        :class="{ active: chartType === 'line' }"
        @click="switchChartType('line')"
      >
        折线图
      </div>
      <div
        class="tab-item"
        :class="{ active: chartType === 'bar' }"
        @click="switchChartType('bar')"
      >
        柱状图
      </div>
      <div
        class="tab-item"
        :class="{ active: dataRange === '7day' }"
        @click="switchTab('7day')"
      >
        预估后七日
      </div>
      <div
        class="tab-item"
        :class="{ active: dataRange === '14day' }"
        @click="switchTab('14day')"
      >
        预估后十四日
      </div>
      <el-button
        type="primary"
        style="background:var(--theme-primary);border-color:var(--theme-primary);margin-left:20px"
        @click="exportChart"
      >
        导出图表数据
      </el-button>
    </div>
    <div class="chart-box" ref="chartRef"></div>

    <div class="device-card-wrap">
      <el-button
        class="arrow-btn arrow-left"
        circle
        @click="prevDevice"
      >
        <el-icon><ArrowLeft /></el-icon>
      </el-button>
      <el-button
        class="arrow-btn arrow-right"
        circle
        @click="nextDevice"
      >
        <el-icon><ArrowRight /></el-icon>
      </el-button>

      <!-- 滑块视窗容器 -->
      <div class="slider-viewport" ref="sliderViewportRef">
        <div class="slider-track">
          <div
            v-for="dev in deviceList"
            :key="dev.id"
            class="info-card"
            :class="{ active: selectDeviceId === dev.id }"
            @click="openEditDevice(dev)"
          >
            <div class="card-title">{{ dev.name }}</div>
            <div class="card-desc">{{ dev.greenhouse }} · {{ dev.variety }}</div>
          </div>
          <div v-if="deviceList.length === 0" class="empty-card-tip">
            当前暂无监测设备，请点击右侧新增按钮新增设备
          </div>
        </div>
      </div>

      <!-- 独立增删按钮，与箭头解耦 -->
      <div class="device-op-btn">
        <el-button type="success" size="small" @click="addNewDevice">新增设备</el-button>
        <el-button type="danger" size="small" :disabled="!selectDeviceId" @click="deleteCurrentDevice">删除选中</el-button>
      </div>
    </div>

    <!-- 编辑设备弹窗 -->
    <el-dialog v-model="editDevDialogVisible" title="编辑监测设备信息" width="540px">
      <el-form :model="editDevForm" label-width="110px">
        <el-form-item label="检测器名称">
          <el-input v-model="editDevForm.name" placeholder="葡萄检测器3号" />
        </el-form-item>
        <el-form-item label="大棚位置">
          <el-input v-model="editDevForm.greenhouse" placeholder="新大棚 / 东区5号大棚" />
        </el-form-item>
        <el-form-item label="葡萄品种">
          <el-input v-model="editDevForm.variety" placeholder="阳光玫瑰 / 巨峰" />
        </el-form-item>
        <el-form-item label="最佳采收甜度">
          <el-input-number v-model="editDevForm.standardSugar" :min="10" :max="25" />
          <span style="margin-left:8px">°Bx</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="editDevDialogVisible = false">取消</el-button>
        <el-button type="primary" style="background:var(--theme-primary);border-color:var(--theme-primary)" @click="saveEditDevice">保存修改</el-button>
      </template>
    </el-dialog>

    <!-- 开关卡片【已改造，带图标分段提示】 -->
    <div class="switch-card">
      <div class="switch-main-row">
        <el-switch v-model="globalRemindConfig.sugarBest" size="large" active-color="var(--theme-primary)" />
        <span class="switch-text">葡萄甜度最佳时提醒我🍇</span>
        <el-tag v-if="globalRemindConfig.sugarBest" color="#f8c8dc">已开启提醒</el-tag>
      </div>
      <div v-if="globalRemindConfig.sugarBest" class="switch-desc-block">
        <div class="desc-item">
          <el-icon><CircleCheck /></el-icon>
          <span>依据设备设定的最佳采收糖度阈值判定</span>
        </div>
        <div class="desc-item">
          <el-icon><Bell /></el-icon>
          <span>APP推送通知，不错过葡萄最佳赏味窗口</span>
        </div>
        <div class="desc-item">
          <el-icon><Warning /></el-icon>
          <span>避免早摘偏酸、晚摘过熟影响葡萄品质</span>
        </div>
      </div>
    </div>

    <el-drawer
      v-model="userDrawerOpen"
      title="个人中心设置"
      direction="rtl"
      size="360px"
      destroy-on-close
    >
      <div class="user-drawer-content">
        <el-card shadow="never">
          <template #header>
            <span>账号基础信息</span>
          </template>
          <el-form ref="userFormRef" :model="userInfo" label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="绑定设备">
              <el-select
                v-model="userInfo.deviceId"
                placeholder="选择监测设备"
                @change="onSelectDeviceFromDrawer"
              >
                <el-option
                  v-for="dev in deviceList"
                  :key="dev.id"
                  :label="`${dev.name}（${dev.greenhouse} · ${dev.variety}）`"
                  :value="dev.id"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="绑定手机号">
              <el-input v-model="userInfo.phone" placeholder="接收短信提醒" />
            </el-form-item>
          </el-form>
        </el-card>
        <el-divider />
        <el-card shadow="never">
          <template #header>
            <span>全局消息提醒设置</span>
          </template>
          <el-row class="remind-row">
            <el-col :span="20">葡萄甜度达标自动推送采摘提醒</el-col>
            <el-col :span="4">
              <el-switch v-model="globalRemindConfig.sugarBest" active-color="var(--theme-primary)" />
            </el-col>
          </el-row>
          <el-row class="remind-row">
            <el-col :span="20">甜度下降异常预警</el-col>
            <el-col :span="4">
              <el-switch v-model="globalRemindConfig.sugarDrop" active-color="var(--theme-primary)" />
            </el-col>
          </el-row>
          <el-row class="remind-row">
            <el-col :span="20">设备低电量提醒</el-col>
            <el-col :span="4">
              <el-switch v-model="globalRemindConfig.deviceLowPower" active-color="var(--theme-primary)" />
            </el-col>
          </el-row>
          <el-row class="remind-row">
            <el-col :span="20">传感器离线断连提醒</el-col>
            <el-col :span="4">
              <el-switch v-model="globalRemindConfig.deviceOffline" active-color="var(--theme-primary)" />
            </el-col>
          </el-row>
          <el-row class="remind-row">
            <el-col :span="20">浏览器弹窗推送</el-col>
            <el-col :span="4">
              <el-switch v-model="globalRemindConfig.browserNotice" active-color="var(--theme-primary)" />
            </el-col>
          </el-row>
        </el-card>
        <el-divider />
        <div class="drawer-btn-group">
          <el-button
            type="primary"
            style="background:var(--theme-primary);border-color:var(--theme-primary)"
            @click="saveUserConfig"
          >
            保存设置
          </el-button>
          <el-button @click="closeUserDrawer">关闭</el-button>
          <el-button type="danger" @click="logout">退出账号</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, onMounted, watch, onBeforeUnmount, onActivated, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ArrowLeft, ArrowRight, CircleCheck, Bell, Warning } from '@element-plus/icons-vue'
import * as echarts from 'echarts'
import * as XLSX from 'xlsx'
import { useRouter } from 'vue-router'
import { predictSugarTrend } from '@/utils/sugarModel'
import { fetch7DayForecast, fetch14DayForecast, searchCity } from '@/services/weatherApi'
import { grapeRegionTree } from '@/utils/regionData'

const router = useRouter()
const userStore = useUserStore()
const chartRef = ref(null)
const sliderViewportRef = ref(null)
let chartInstance = null
let resizeTimer = null

const selectDeviceId = ref('')

// ============ 产区选择 & 天气预测状态（绑定当前设备） ============
const predictionLoading = ref(false)
const citySearchLoading = ref(false)
const citySearchResults = ref([])
let citySearchTimer = null
let autoPredictTimer = null

const currentDevice = computed(() => {
  return deviceList.value.find(d => d.id === selectDeviceId.value) || null
})

const currentDeviceCityId = computed({
  get: () => currentDevice.value?.searchedCityId || '',
  set: (val) => {
    if (currentDevice.value) {
      currentDevice.value.searchedCityId = val
      saveDeviceStorage()
    }
  }
})

const baseTemp = computed({
  get: () => currentDevice.value?.baseTemp ?? 2000,
  set: (val) => {
    if (currentDevice.value) {
      currentDevice.value.baseTemp = val
      saveDeviceStorage()
    }
  }
})

const baseSugar = computed({
  get: () => currentDevice.value?.baseSugar ?? null,
  set: (val) => {
    if (currentDevice.value) {
      currentDevice.value.baseSugar = val
      saveDeviceStorage()
    }
  }
})

// ============ 设备编辑弹窗状态 ============
const editDevDialogVisible = ref(false)
const editDevForm = ref({})
let editingDevId = ref(null)

// ============ 响应式设备、甜度模板 ============
const deviceList = ref([])
const deviceSugarTemplate = ref({})

const currentIndex = computed(() => {
  return deviceList.value.findIndex(item => item.id === selectDeviceId.value)
})

const varietySugarRange = {
  '阳光玫瑰': { min:15, max:20, standard:18 },
  '巨峰': { min:13, max:18, standard:16 },
  '夏黑': { min:14, max:19, standard:17 },
  '蓝宝石': { min:13, max:18, standard:16 },
  '未知品种': { min:12, max:19, standard:15 }
}

// ============ localStorage 按账号key隔离存储 ============
function getStorageKey(type) {
  const phone = userStore.username || 'temp'
  return `farm_${phone}_${type}`
}

function saveDeviceStorage() {
  localStorage.setItem(getStorageKey('deviceList'), JSON.stringify(deviceList.value))
  localStorage.setItem(getStorageKey('sugarTpl'), JSON.stringify(deviceSugarTemplate.value))
}

const onCitySearch = (keyword) => {
  clearTimeout(citySearchTimer)
  if (!keyword || keyword.trim().length < 1) {
    citySearchResults.value = []
    return
  }
  citySearchLoading.value = true
  citySearchTimer = setTimeout(async () => {
    try {
      citySearchResults.value = await searchCity(keyword.trim())
    } catch (e) {
      console.error('城市搜索失败', e)
      citySearchResults.value = []
    } finally {
      citySearchLoading.value = false
    }
  }, 300)
}

function matchRegionByCity(cityName) {
  for (const prov of grapeRegionTree) {
    for (const city of prov.cities) {
      for (const dist of city.districts) {
        if (city.name.includes(cityName) || cityName.includes(city.name) ||
            dist.name.includes(cityName) || cityName.includes(dist.name)) {
          return dist
        }
      }
    }
  }
  return null
}

const onSelectCity = (cityId) => {
  if (!cityId) {
    if (currentDevice.value) {
      currentDevice.value.searchedCityId = ''
      currentDevice.value.currentRegionName = ''
    }
    userStore.updateRegion('')
    saveDeviceStorage()
    return
  }
  const selected = citySearchResults.value.find(c => c.id === cityId)
  if (selected && currentDevice.value) {
    currentDevice.value.searchedCityId = cityId
    currentDevice.value.currentRegionName = selected.name + ' - ' + selected.adm1 + selected.adm2
    const matched = matchRegionByCity(selected.name)
    if (matched) {
      userStore.updateRegion(matched.code)
      currentDevice.value.baseTemp = matched.baseAccTemp
    } else {
      userStore.updateRegion('')
    }
    saveDeviceStorage()
    autoRefreshPredict()
  }
}

// ============ 天气预测核心逻辑 ============
let predictSeq = 0

const autoRefreshPredict = () => {
  clearTimeout(autoPredictTimer)
  autoPredictTimer = setTimeout(() => {
    fetchWeatherAndPredict()
  }, 500)
}

const fetchWeatherAndPredict = async () => {
  const dev = currentDevice.value
  if (!dev || !dev.searchedCityId) {
    generateMockDataForCurrentDevice()
    return
  }
  predictionLoading.value = true
  const seq = ++predictSeq
  try {
    const locationId = dev.searchedCityId
    const is14Day = dataRange.value === '14day'
    const forecast = is14Day
      ? await fetch14DayForecast(locationId)
      : await fetch7DayForecast(locationId)
    if (seq !== predictSeq) return
    const dailyTemps = forecast.map(d => d.tempAvg)

    const variety = dev.variety === '巨峰' ? 'jf'
      : dev.variety === '夏黑' ? 'xh'
      : dev.variety === '蓝宝石' ? 'lbs'
      : 'ygmg'

    const trend = predictSugarTrend(dailyTemps, dev.baseTemp ?? 2000, variety, dev.baseSugar)
    const sugarValues = trend.map(t => t.sugar)

    if (!deviceSugarTemplate.value[dev.id]) {
      deviceSugarTemplate.value[dev.id] = { name: dev.variety, standardSugar: 18 }
    }
    deviceSugarTemplate.value[dev.id]['7day'] = sugarValues.slice(0, 7)
    deviceSugarTemplate.value[dev.id]['14day'] = sugarValues

    saveDeviceStorage()
    renderChart()
    ElMessage.success(
      `${dev.currentRegionName || '当前产区'}天气预报已更新！预测${is14Day ? '14' : '7'}天糖度趋势`
    )
  } catch (error) {
    if (seq !== predictSeq) return
    console.error('预测失败', error)
    ElMessage.warning('天气数据获取失败，已使用模拟数据预测')
    generateMockDataForCurrentDevice()
  } finally {
    if (seq === predictSeq) {
      predictionLoading.value = false
    }
  }
}

function generateMockDataForCurrentDevice() {
  const dev = currentDevice.value
  if (!dev) return
  if (!deviceSugarTemplate.value[dev.id]) {
    deviceSugarTemplate.value[dev.id] = { name: dev.variety, standardSugar: 18 }
  }
  const tpl = createNewSugarTpl(dev.variety)
  deviceSugarTemplate.value[dev.id]['7day'] = tpl['7day']
  deviceSugarTemplate.value[dev.id]['14day'] = tpl['14day']
  saveDeviceStorage()
  renderChart()
}

// ============ 设备存储读写 ============
function loadDeviceStorage() {
  const devStr = localStorage.getItem(getStorageKey('deviceList'))
  const tplStr = localStorage.getItem(getStorageKey('sugarTpl'))
  if (devStr) deviceList.value = JSON.parse(devStr)
  if (tplStr) deviceSugarTemplate.value = JSON.parse(tplStr)

  // 迁移旧数据：为没有产地/积温/糖度字段的设备补充默认值
  deviceList.value.forEach(d => {
    if (d.searchedCityId === undefined) d.searchedCityId = ''
    if (d.currentRegionName === undefined) d.currentRegionName = ''
    if (d.baseTemp === undefined) d.baseTemp = 2000
    if (d.baseSugar === undefined) d.baseSugar = null
  })

  if (deviceList.value.length === 0) {
    initDefaultDevice()
  }
  if (deviceList.value.length > 0) {
    const exist = deviceList.value.some(d => d.id === selectDeviceId.value)
    if (!exist) {
      selectDeviceId.value = deviceList.value[0].id
    }
  } else {
    selectDeviceId.value = ''
  }
}

function initDefaultDevice() {
  const d1 = {
    id: '1',
    name: '葡萄检测器一号',
    greenhouse: '东区5号大棚',
    variety: '阳光玫瑰',
    searchedCityId: '',
    currentRegionName: '',
    baseTemp: 2000,
    baseSugar: null
  }
  const d5 = {
    id: '5',
    name: '葡萄检测器五号',
    greenhouse: '西区2号大棚',
    variety: '巨峰',
    searchedCityId: '',
    currentRegionName: '',
    baseTemp: 2000,
    baseSugar: null
  }
  deviceList.value = [d1, d5]
  deviceSugarTemplate.value['1'] = generateDefaultSugarData('ygmg', d1.baseTemp, d1.baseSugar)
  deviceSugarTemplate.value['5'] = generateDefaultSugarData('jf', d5.baseTemp, d5.baseSugar)
  selectDeviceId.value = d1.id
  saveDeviceStorage()
}

function generateDefaultSugarData(variety, baseTempVal, baseSugarVal) {
  const mockTemps7 = [28, 29, 27, 30, 28, 26, 29]
  const mockTemps14 = [28, 29, 27, 30, 28, 26, 29, 27, 28, 30, 29, 27, 26, 28]
  const trend7 = predictSugarTrend(mockTemps7, baseTempVal, variety, baseSugarVal)
  const trend14 = predictSugarTrend(mockTemps14, baseTempVal, variety, baseSugarVal)
  return {
    name: variety === 'ygmg' ? '阳光玫瑰' : '巨峰',
    standardSugar: variety === 'ygmg' ? 18 : 16,
    '7day': trend7.map(t => t.sugar),
    '14day': trend14.map(t => t.sugar)
  }
}

function createNewSugarTpl(varietyName = '未知品种') {
  const varietyCode = varietyName === '巨峰' ? 'jf'
    : varietyName === '夏黑' ? 'xh'
    : varietyName === '蓝宝石' ? 'lbs'
    : 'ygmg'
  const dev = currentDevice.value
  const baseTempVal = dev?.baseTemp ?? 2000
  const baseSugarVal = dev?.baseSugar ?? null
  const mockTemps = [27, 28, 26, 29, 28, 27, 28, 27, 29, 28, 26, 27, 28, 29]
  const trend7 = predictSugarTrend(mockTemps.slice(0, 7), baseTempVal, varietyCode, baseSugarVal)
  const trend14 = predictSugarTrend(mockTemps, baseTempVal, varietyCode, baseSugarVal)
  const range = varietySugarRange[varietyName] || varietySugarRange['未知品种']
  return {
    name: varietyName,
    standardSugar: range.standard,
    '7day': trend7.map(t => t.sugar),
    '14day': trend14.map(t => t.sugar)
  }
}

// ============ 滑块滚动居中 ============
function scrollActiveToCenter() {
  if(!sliderViewportRef.value || !selectDeviceId.value) return
  const viewport = sliderViewportRef.value
  const activeCard = viewport.querySelector('.info-card.active')
  if(!activeCard) return
  const targetScroll = activeCard.offsetLeft - (viewport.clientWidth - activeCard.offsetWidth)/2
  viewport.scrollTo({ left: targetScroll, behavior: 'smooth' })
}

// ============ 设备编辑 ============
const openEditDevice = (dev) => {
  editingDevId.value = dev.id
  const tpl = deviceSugarTemplate.value[dev.id]
  editDevForm.value = {
    name: dev.name,
    greenhouse: dev.greenhouse,
    variety: dev.variety,
    standardSugar: tpl?.standardSugar || 15
  }
  editDevDialogVisible.value = true
}

const saveEditDevice = () => {
  const devItem = deviceList.value.find(i => i.id === editingDevId.value)
  if (devItem) {
    devItem.name = editDevForm.value.name
    devItem.greenhouse = editDevForm.value.greenhouse
    devItem.variety = editDevForm.value.variety
  }
  if (deviceSugarTemplate.value[editingDevId.value]) {
    deviceSugarTemplate.value[editingDevId.value].standardSugar = editDevForm.value.standardSugar
  }
  saveDeviceStorage()
  editDevDialogVisible.value = false
  renderChart()
  ElMessage.success('设备信息修改完成')
}

// ============ 左右箭头切换 ============
const prevDevice = () => {
  if (deviceList.value.length === 0) return
  if(currentIndex.value > 0){
    selectDeviceId.value = deviceList.value[currentIndex.value -1].id
    userInfo.value.deviceId = selectDeviceId.value
  }
  setTimeout(scrollActiveToCenter,50)
}

const nextDevice = () => {
  if (deviceList.value.length === 0) return
  if(currentIndex.value < deviceList.value.length -1){
    selectDeviceId.value = deviceList.value[currentIndex.value +1].id
    userInfo.value.deviceId = selectDeviceId.value
  }
  setTimeout(scrollActiveToCenter,50)
}

// ============ 独立新增/删除设备 ============
const addNewDevice = async () => {
  const newId = Date.now().toString()
  const newDev = {
    id: newId,
    name: `葡萄检测器${deviceList.value.length + 1}号`,
    greenhouse: '新大棚',
    variety: '未知品种',
    searchedCityId: '',
    currentRegionName: '',
    baseTemp: 2000,
    baseSugar: null
  }
  deviceList.value.push(newDev)
  deviceSugarTemplate.value[newId] = createNewSugarTpl(newDev.variety)
  selectDeviceId.value = newId
  userInfo.value.deviceId = selectDeviceId.value
  saveDeviceStorage()
  ElMessage.success('新监测设备添加成功，已自动生成甜度预测数据')
  setTimeout(scrollActiveToCenter,80)
  renderChart()
}

const deleteCurrentDevice = async () => {
  if(!selectDeviceId.value) return
  await ElMessageBox.confirm('确认删除该设备？对应甜度预测数据会同步清除！','删除确认',{type:'warning'})
  const delIdx = currentIndex.value
  const delId = selectDeviceId.value
  deviceList.value.splice(delIdx,1)
  delete deviceSugarTemplate.value[delId]
  if(deviceList.value.length>0){
    const newSelectIdx = Math.max(0,delIdx-1)
    selectDeviceId.value = deviceList.value[newSelectIdx].id
  }else{
    selectDeviceId.value = ''
  }
  userInfo.value.deviceId = selectDeviceId.value
  saveDeviceStorage()
  ElMessage.success('设备删除完成')
  setTimeout(scrollActiveToCenter,50)
  renderChart()
}

// ============ 图表渲染 ============
let baseDate = new Date()

const formatMonthDay = (date) => {
  const m = date.getMonth() + 1
  const d = date.getDate()
  return `${m}.${d}`
}

function buildDateList(startDate, count) {
  const list = []
  for(let i = 0; i < count; i++){
    const temp = new Date(startDate)
    temp.setDate(startDate.getDate() + i)
    list.push(formatMonthDay(temp))
  }
  return list
}

const getCurrentData = () => {
  if (!selectDeviceId.value || !deviceSugarTemplate.value[selectDeviceId.value]) {
    return { xData: [], sugarData: [] }
  }
  const template = deviceSugarTemplate.value[selectDeviceId.value]
  const sugarArr = template[dataRange.value]
  if (!sugarArr || sugarArr.length === 0) {
    return { xData: [], sugarData: [] }
  }
  const startDay = new Date(baseDate)
  startDay.setDate(baseDate.getDate() - 1)
  const xData = buildDateList(startDay, sugarArr.length)
  return { xData, sugarData: sugarArr }
}

const getCurrentStandard = () => {
  if (!selectDeviceId.value || !deviceSugarTemplate.value[selectDeviceId.value]) return 15
  return deviceSugarTemplate.value[selectDeviceId.value].standardSugar
}

const chartType = ref('line')
const dataRange = ref('7day')

const userDrawerOpen = ref(false)
const userFormRef = ref(null)
const userInfo = ref({
  nickname: '',
  deviceId: '',
  phone: ''
})

const globalRemindConfig = ref({
  sugarBest: false,
  sugarDrop: false,
  deviceLowPower: false,
  deviceOffline: false,
  browserNotice: false
})

const loadUserDeviceConfig = () => {
  const currentPhone = userStore.username
  if (!currentPhone) {
    selectDeviceId.value = ''
    return
  }
  loadDeviceStorage()

  const localInfoStr = localStorage.getItem('farmInfo_' + currentPhone)
  if (localInfoStr) {
    const info = JSON.parse(localInfoStr)
    selectDeviceId.value = info.deviceId || (deviceList.value[0]?.id || '')
    userInfo.value.deviceId = selectDeviceId.value
    userInfo.value.nickname = info.nickname || ''
    userInfo.value.phone = info.phone || ''
    if(info.remindSetting){
      globalRemindConfig.value = {...info.remindSetting}
    }
  } else {
    selectDeviceId.value = deviceList.value[0]?.id || ''
    userInfo.value.deviceId = selectDeviceId.value
  }
}

const renderChart = () => {
  if (!chartInstance) return
  const currentData = getCurrentData()
  if(currentData.xData.length === 0){
    chartInstance.clear()
    return
  }
  const STANDARD_SUGAR = getCurrentStandard()

  const sugarMax = Math.max(...currentData.sugarData)
  const yAxisMax = Math.ceil((sugarMax > 22 ? sugarMax : 22) / 2) * 2

  const option = {
    backgroundColor: '#0f172a',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      textStyle: { color: '#333', fontSize: 14 },
      formatter: (params) => {
        const date = params[0].axisValue
        const sugarParam = params.find((p) => p.seriesName === '葡萄甜度')
        const value = sugarParam ? sugarParam.data : '-'
        let tipStr = `<div>日期：${date}</div><div>当日平均甜度：${value} °Bx</div>`
        if (value !== '-' && value >= STANDARD_SUGAR) {
          tipStr += `<div style="color:green">✅ 达到最佳采收甜度${STANDARD_SUGAR}度</div>`
        } else {
          tipStr += `<div style="color:#ff6666">❌ 未到最佳采收甜度</div>`
        }
        return tipStr
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      name: '日期',
      nameTextStyle: { color: '#eee' },
      axisLine: { lineStyle: { color: '#444' } },
      axisLabel: { color: '#ccc' },
      data: currentData.xData
    },
    yAxis: {
      type: 'value',
      name: '甜度值 °Bx',
      nameTextStyle: { color: '#eee' },
      splitLine: { lineStyle: { color: '#222' } },
      axisLine: { lineStyle: { color: '#444' } },
      axisLabel: { color: '#ccc' },
      min: 0,
      max: yAxisMax
    },
    series: [
      {
        name: '采收标准线',
        type: 'line',
        data: Array(currentData.xData.length).fill(STANDARD_SUGAR),
        lineStyle: { color: '#ff4d4f', width: 2, type: 'dashed' },
        symbol: 'none',
        label: {
          show: true,
          position: 'end',
          formatter: `最佳采收${STANDARD_SUGAR}度`,
          color: '#ff4d4f'
        }
      },
      {
        name: '葡萄甜度',
        type: chartType.value,
        data: currentData.sugarData,
        smooth: chartType.value === 'line',
        itemStyle: {
          color: '#d87093',
          borderRadius: [6,6,0,0]
        },
        lineStyle: {
          width: 3,
          color: '#d87093'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(216,112,147,0.05)' },
            { offset: 1, color: 'rgba(216,112,147,0.4)' }
          ])
        }
      }
    ]
  }
  chartInstance.setOption(option)
}

const closeUserDrawer = () => (userDrawerOpen.value = false)

const onSelectDeviceFromDrawer = () => {
  selectDeviceId.value = userInfo.value.deviceId
}

const initChart = () => {
  chartInstance = echarts.init(chartRef.value)
  renderChart()
}

const switchChartType = (type) => {
  chartType.value = type
  autoRefreshPredict()
}

const switchTab = (type) => {
  dataRange.value = type
  autoRefreshPredict()
}

const exportChart = () => {
  if (!chartInstance) {
    ElMessage.warning('图表尚未初始化，无法导出')
    return
  }
  const currentData = getCurrentData()
  if(currentData.xData.length ===0){
    ElMessage.warning('暂无设备数据，无法导出')
    return
  }
  const imgUrl = chartInstance.getDataURL({ pixelRatio: 2 })
  const aImg = document.createElement('a')
  aImg.href = imgUrl
  aImg.download = `葡萄甜度曲线图_${dataRange.value}.png`
  aImg.click()

  const tableData = currentData.xData.map((date, idx) => {
    return {
      监测日期: date,
      当日甜度: currentData.sugarData[idx],
      是否达标: currentData.sugarData[idx] >= getCurrentStandard() ? '达标可采摘' : '未达标'
    }
  })
  const sheet = XLSX.utils.json_to_sheet(tableData)
  const book = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(book, sheet, '甜度数据')
  XLSX.writeFile(book, `葡萄甜度数据表_${dataRange.value}.xlsx`)
  ElMessage.success('图表图片+Excel数据导出成功！')
}

const saveUserConfig = () => {
  const currentPhone = userStore.username
  if (!currentPhone) {
    ElMessage.warning('请先登录！')
    return
  }
  const saveInfo = {
    nickname: userInfo.value.nickname,
    phone: userInfo.value.phone,
    deviceId: selectDeviceId.value,
    remindSetting: {...globalRemindConfig.value}
  }
  localStorage.setItem('farmInfo_' + currentPhone, JSON.stringify(saveInfo))
  saveDeviceStorage()
  ElMessage.success('个人设置保存成功！')
  closeUserDrawer()
}

const logout = async () => {
  await ElMessageBox.confirm('确定退出当前农户账号吗？', '操作确认', {
    confirmButtonText: '确认退出',
    cancelButtonText: '取消',
    type: 'warning'
  })
  const currentPhone = userStore.username
  localStorage.removeItem(getStorageKey('deviceList'))
  localStorage.removeItem(getStorageKey('sugarTpl'))
  localStorage.removeItem('farmInfo_' + currentPhone)
  userStore.logout()
  userDrawerOpen.value = false
  deviceList.value = []
  deviceSugarTemplate.value = {}
  selectDeviceId.value = ''
  ElMessage.success('账号已退出，请重新登录')
  router.push('/intro')
}

watch([chartType, dataRange, selectDeviceId], () => {
  renderChart()
  setTimeout(scrollActiveToCenter,50)
})

watch(selectDeviceId, () => {
  const dev = currentDevice.value
  if (dev && dev.searchedCityId && dev.currentRegionName) {
    const parts = dev.currentRegionName.split(' - ')
    citySearchResults.value = [{
      id: dev.searchedCityId,
      name: parts[0] || dev.currentRegionName,
      adm1: parts[1] || '',
      adm2: parts[2] || ''
    }]
  } else {
    citySearchResults.value = []
  }
})

watch([() => currentDevice.value?.baseTemp, () => currentDevice.value?.baseSugar], () => {
  if (currentDevice.value?.searchedCityId) {
    autoRefreshPredict()
  }
})

const handleResize = () => {
  clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    chartInstance?.resize()
    scrollActiveToCenter()
  }, 100)
}

onMounted(() => {
  loadUserDeviceConfig()
  initChart()
  window.addEventListener('resize', handleResize)
  setTimeout(scrollActiveToCenter,120)
})

onActivated(() => {
  loadUserDeviceConfig()
  if (chartInstance) {
    renderChart()
  }
  setTimeout(scrollActiveToCenter,80)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  clearTimeout(resizeTimer)
  clearTimeout(citySearchTimer)
  clearTimeout(autoPredictTimer)
  chartInstance?.dispose()
})
</script>

<style scoped>
.grape-sugar-page {
  width: 100%;
  min-height: 100vh;
  padding: 40px 20px 20px;
  box-sizing: border-box;
  height: auto;
}
.page-title {
  width: 100%;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #a05773;
  margin-bottom: 24px;
  letter-spacing: 1px;
}
.region-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}
.region-select {
  display: flex;
  align-items: center;
  gap: 8px;
}
.city-search-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.city-name {
  font-weight: 500;
  color: #333;
}
.city-adm {
  font-size: 12px;
  color: #999;
  margin-left: 12px;
}
.base-input {
  display: flex;
  align-items: center;
  gap: 4px;
}
.unit-hint {
  font-size: 13px;
  color: #999;
  margin-left: 2px;
}
.region-label {
  font-size: 16px;
  color: #a05773;
  font-weight: 500;
  white-space: nowrap;
}
.model-hint {
  font-size: 13px;
  color: #999;
  margin-left: 8px;
}
.tab-group {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
  margin-bottom: 16px;
}
.tab-item {
  background: rgba(216, 112, 147, 0.12);
  color: #a05773;
  font-size: 20px;
  padding: 8px 22px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid transparent;
}
.tab-item:hover {
  background: rgba(216, 112, 147, 0.22);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(216, 112, 147, 0.15);
}
.tab-item.active {
  background: var(--theme-primary);
  color: #ffffff;
  border-color: #c76d8d;
  box-shadow: 0 4px 14px rgba(216, 112, 147, 0.35);
}
.tab-item:nth-child(2) {
  margin-right: 20px;
}
.chart-box {
  width: calc(100% - 40px);
  max-width: 1200px;
  height: 340px;
  margin: 0 auto;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
.device-card-wrap {
  position: relative;
  max-width: 1200px;
  margin: 30px auto 32px;
  padding: 0 60px;
  box-sizing: border-box;
  min-height:180px;
  display: flex;
  align-items:center;
  gap:16px;
}
.slider-viewport {
  flex:1;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding:10px 0;
  scrollbar-width: none;
}
.slider-viewport::-webkit-scrollbar{display:none;}
.slider-track{
  display: flex;
  gap:30px;
  width: max-content;
}
.empty-card-tip{
  width:100%;
  text-align:center;
  color:#999;
  font-size:17px;
  padding:40px 0;
}
.device-op-btn{
  display:flex;
  flex-direction:column;
  gap:10px;
  flex-shrink:0;
}
:deep(.arrow-btn) {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width:42px;
  height:42px;
  background:#fff;
  border-color:var(--theme-primary);
  color:var(--theme-primary);
}
:deep(.arrow-left) { left:10px; }
:deep(.arrow-right) { right:10px; }

.info-card {
  width:260px;
  flex: 0 0 260px;
  background: var(--card-bg, #fff);
  padding: 22px 28px;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(216, 112, 147, 0.1);
  border-left: 6px solid var(--theme-primary);
  transition: 0.24s ease;
  cursor: pointer;
}
.info-card.active {
  background: rgba(216,112,147,0.12);
  box-shadow: 0 6px 20px rgba(216, 112, 147, 0.25);
  transform: translateY(-4px);
}
.info-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 22px rgba(216, 112, 147, 0.18);
}
.card-title {
  font-size: 22px;
  color: #a05773;
  font-weight: 600;
  margin-bottom: 8px;
}
.card-desc {
  font-size: 16px;
  color: #666;
}
.switch-card {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 1200px;
  margin: 0 auto 80px;
  background: var(--card-bg, #fff);
  padding: 20px 26px;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}
.switch-main-row {
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
}
.switch-text {
  font-size: 22px;
  color: #a05773;
  font-weight: 500;
}
.switch-desc-block {
  margin-top: 20px;
  padding-top: 18px;
  border-top: 1px dashed #f0d8e0;
  display: flex;
  flex-direction: column;
  gap:12px;
}
.desc-item {
  display:flex;
  align-items:center;
  gap:10px;
  font-size:16px;
  color:#666;
}
.desc-item :deep(.el-icon) {
  color: var(--theme-primary);
  font-size:18px;
}
.user-drawer-content {
  padding: 10px 0;
}
.remind-row {
  margin: 16px 0;
  align-items: center;
  display: flex;
}
.drawer-btn-group {
  margin-top: 30px;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}
</style>