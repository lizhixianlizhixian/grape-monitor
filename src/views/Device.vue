<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="device-page">
    <div class="page-header">
      <h2>传感器设备管理</h2>
      <div>
        <el-button
          type="success"
          plain
          @click="refreshDeviceStatus"
          :loading="refreshLoading"
          style="margin-right: 12px;"
        >
          刷新设备状态
        </el-button>
        <el-button type="primary" style="background:#d87093;border-color:#d87093" @click="openBindDialog">
          + 绑定新监测设备
        </el-button>
      </div>
    </div>

    <!-- 设备列表表格 -->
    <el-table
      :data="deviceList"
      border
      stripe
      style="width:100%;margin-top:20px"
      v-loading="tableLoading"
      element-loading-text="正在拉取设备状态..."
    >
      <el-table-column label="设备编号" prop="id" width="140"></el-table-column>
      <el-table-column label="设备序列号(SN)" prop="sn" width="160"></el-table-column>
      <el-table-column label="地块名称" prop="plotName"></el-table-column>
      <el-table-column label="葡萄品种" prop="grapeType"></el-table-column>
      <el-table-column label="在线状态" prop="online" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.online ? 'success' : 'danger'">
            {{ scope.row.online ? '在线正常' : '离线断连' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="设备电量" prop="power" width="100">
        <template #default="scope">
          <span :style="{color:scope.row.power<20 ? 'red' : '#333', fontWeight: scope.row.power<20 ? 'bold' : 'normal'}">
            {{ scope.row.power }} %
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="viewDeviceDetail(scope.row)">详情</el-button>
          <el-button size="small" type="danger" @click="unBindDevice(scope.row)">解绑设备</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 绑定新设备弹窗 -->
    <el-dialog
      v-model="bindDialogOpen"
      title="绑定甜度传感器设备"
      width="420px"
      :close-on-click-modal="false"
    >
      <el-form ref="bindFormRef" :model="bindForm" :rules="bindRules" label-width="90px">
        <el-form-item label="设备序列号" prop="sn">
          <el-input v-model="bindForm.sn" placeholder="设备机身二维码序列号"></el-input>
        </el-form-item>
        <el-form-item label="地块名称" prop="plotName">
          <el-input v-model="bindForm.plotName" placeholder="例：东一号阳光玫瑰园"></el-input>
        </el-form-item>
        <el-form-item label="种植品种" prop="grapeType">
          <el-select v-model="bindForm.grapeType" placeholder="选择葡萄品种" style="width:100%">
            <el-option label="阳光玫瑰" value="阳光玫瑰"></el-option>
            <el-option label="巨峰" value="巨峰"></el-option>
            <el-option label="夏黑" value="夏黑"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="bindDialogOpen = false">取消</el-button>
          <el-button
            type="primary"
            style="background:#d87093;border-color:#d87093"
            :loading="submitLoading"
            @click="submitBindDevice"
          >
            确认绑定
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 设备详情弹窗 -->
    <el-dialog v-model="detailDialogOpen" title="设备详细信息" width="440px">
      <el-descriptions :column="1" border v-if="currentDetail">
        <el-descriptions-item label="设备编号">{{ currentDetail.id }}</el-descriptions-item>
        <el-descriptions-item label="序列号(SN)">{{ currentDetail.sn }}</el-descriptions-item>
        <el-descriptions-item label="地块名称">{{ currentDetail.plotName }}</el-descriptions-item>
        <el-descriptions-item label="葡萄品种">{{ currentDetail.grapeType }}</el-descriptions-item>
        <el-descriptions-item label="在线状态">
          <el-tag :type="currentDetail.online ? 'success' : 'danger'">
            {{ currentDetail.online ? '在线正常' : '离线断连' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="设备电量">
          <span :style="{color:currentDetail.power<20 ? 'red' : '#333'}">
            {{ currentDetail.power }} %
          </span>
        </el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="detailDialogOpen = false">关闭</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 底部居中返回首页按钮 -->
    <div class="bottom-btn-box">
      <el-button size="large" type="primary" @click="goHome">返回数据首页</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import { useDeviceStore } from '@/stores/deviceStore'

// 路由跳转实例
const router = useRouter()
const deviceStore = useDeviceStore()

// ============已修改：跳转 HomeIntro.vue（介绍首页 name=Intro）============
const goHome = () => {
  router.push({ name: 'Home' })
}

// 弹窗与Loading控制
const bindDialogOpen = ref(false)
const detailDialogOpen = ref(false)
const submitLoading = ref(false)
const tableLoading = ref(false)
const refreshLoading = ref(false)

// 表单Ref
const bindFormRef = ref(null)
const bindForm = ref({
  sn: '',
  plotName: '',
  grapeType: ''
})

// 详情数据
const currentDetail = ref(null)

// 设备列表数据（使用共享Store）
const deviceList = computed(() => deviceStore.deviceList)

// 加载当前用户设备数据【核心方法】
const loadUserData = async () => {
  tableLoading.value = true
  deviceStore.loadFromStorage()
  tableLoading.value = false
}

// KeepAlive缓存页面每次激活执行（切换账号、切页面强制重载数据）
onActivated(() => {
  loadUserData()
})

// 组件首次挂载兜底执行
onMounted(() => {
  loadUserData()
})

// 表单校验规则
const bindRules = ref({
  sn: [{ required: true, message: '请输入设备序列号', trigger: 'blur' }],
  plotName: [{ required: true, message: '请输入地块名称', trigger: 'blur' }],
  grapeType: [{ required: true, message: '请选择种植品种', trigger: 'change' }]
})

// 打开绑定弹窗
const openBindDialog = () => {
  bindForm.value = { sn: '', plotName: '', grapeType: '' }
  bindDialogOpen.value = true
  setTimeout(() => {
    bindFormRef.value?.clearValidate()
  }, 0)
}

// 提交绑定设备
const submitBindDevice = async () => {
  if (!bindFormRef.value) return
  try {
    await bindFormRef.value.validate()
    submitLoading.value = true

    await new Promise(resolve => setTimeout(resolve, 600))
    const data = bindForm.value

    // 序列号查重
    if (deviceList.value.some(item => item.sn === data.sn)) {
      ElMessage.error('该设备序列号已被绑定，请勿重复绑定')
      submitLoading.value = false
      return
    }

    const newDevice = {
      id: Date.now().toString(),
      name: `葡萄检测器${data.plotName}`,
      sn: data.sn,
      plotName: data.plotName,
      grapeType: data.grapeType,
      online: true,
      power: 100,
      searchedCityId: '',
      currentRegionName: '',
      baseTemp: 2000,
      baseSugar: null
    }
    deviceStore.addDevice(newDevice)
    bindDialogOpen.value = false
    ElMessage.success('设备绑定成功！可在首页切换查看')
  } catch (error) {
    console.log('表单校验未通过', error)
  } finally {
    submitLoading.value = false
  }
}

// 查看设备详情
const viewDeviceDetail = (row) => {
  currentDetail.value = row
  detailDialogOpen.value = true
}

// 解绑设备
const unBindDevice = (row) => {
  ElMessageBox.confirm(
    `确定要解绑设备【${row.plotName}】(SN: ${row.sn}) 吗？解绑后将无法监测该地块数据。`,
    '解绑确认',
    {
      confirmButtonText: '确认解绑',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(() => {
    deviceStore.deleteDevice(row.id)
    ElMessage.success(`设备已解绑`)
  }).catch(() => {})
}

// 模拟刷新设备状态
const refreshDeviceStatus = async () => {
  refreshLoading.value = true
  tableLoading.value = true

  await new Promise(resolve => setTimeout(resolve, 800))

  deviceStore.deviceList.forEach(item => {
    item.online = Math.random() > 0.15
    if (item.online) {
      item.power = Math.max(1, item.power - Math.floor(Math.random() * 5) + 1)
    }
  })
  deviceStore.saveToStorage()

  refreshLoading.value = false
  tableLoading.value = false
  ElMessage.success('设备状态已刷新')
}
</script>
<style scoped>
.device-page {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(160deg, #f0fcf9 0%, #e6f7f2 100%);
  padding: 40px 20px 120px;
  box-sizing: border-box;
}
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-header h2 {
  color: #a05773;
  margin: 0;
}
.dialog-footer {
  text-align: right;
}
.bottom-btn-box {
  margin-top: 60px;
  text-align: center;
}
</style>