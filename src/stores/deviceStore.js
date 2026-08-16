import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/userStore'

export const useDeviceStore = defineStore('device', {
  state: () => ({
    deviceList: [],
    sugarTemplate: {}   // { [deviceId]: { name, standardSugar, '7day': [], '14day': [] } }
  }),

  actions: {
    // ============= 存储key =============
    getStorageKey() {
      const userStore = useUserStore()
      const phone = userStore.username || 'temp'
      return {
        deviceList: `puyue_deviceList_${phone}`,
        sugarTpl: `puyue_sugarTpl_${phone}`
      }
    },

    // ============= 持久化 =============
    saveToStorage() {
      const keys = this.getStorageKey()
      localStorage.setItem(keys.deviceList, JSON.stringify(this.deviceList))
      localStorage.setItem(keys.sugarTpl, JSON.stringify(this.sugarTemplate))
    },

    loadFromStorage() {
      const keys = this.getStorageKey()
      const devStr = localStorage.getItem(keys.deviceList)
      const tplStr = localStorage.getItem(keys.sugarTpl)

      if (devStr) {
        try {
          this.deviceList = JSON.parse(devStr)
        } catch (e) {
          this.deviceList = []
        }
      }
      if (tplStr) {
        try {
          this.sugarTemplate = JSON.parse(tplStr)
        } catch (e) {
          this.sugarTemplate = {}
        }
      }

      // 迁移旧数据：Device.vue 旧存储 key（deviceListData_${uid}）
      if (this.deviceList.length === 0) {
        const uid = localStorage.getItem('userId')
        if (uid) {
          const oldDevStr = localStorage.getItem(`deviceListData_${uid}`)
          if (oldDevStr) {
            try {
              const oldDevices = JSON.parse(oldDevStr)
              this.deviceList = oldDevices.map(d => ({
                id: d.deviceId || d.id,
                name: d.name || `葡萄检测器${d.plotName || ''}`,
                sn: d.sn || '',
                plotName: d.plotName || '',
                grapeType: d.grapeType || '',
                online: d.online !== undefined ? d.online : true,
                power: d.power !== undefined ? d.power : 100,
                searchedCityId: '',
                currentRegionName: '',
                baseTemp: 2000,
                baseSugar: null
              }))
              this.saveToStorage()
              localStorage.removeItem(`deviceListData_${uid}`)
            } catch (e) {
              // 忽略
            }
          }
        }
      }

      // 迁移旧数据：grapeSugar 旧存储 key（farm_${phone}_deviceList）
      if (this.deviceList.length === 0) {
        const userStore = useUserStore()
        const phone = userStore.username || 'temp'
        const oldDevStr = localStorage.getItem(`farm_${phone}_deviceList`)
        const oldTplStr = localStorage.getItem(`farm_${phone}_sugarTpl`)
        if (oldDevStr) {
          try {
            this.deviceList = JSON.parse(oldDevStr).map(d => ({
              ...d,
              plotName: d.greenhouse || d.plotName || '',
              grapeType: d.variety || d.grapeType || '',
              sn: d.sn || '',
              online: d.online !== undefined ? d.online : true,
              power: d.power !== undefined ? d.power : 100,
              searchedCityId: d.searchedCityId || '',
              currentRegionName: d.currentRegionName || '',
              baseTemp: d.baseTemp || 2000,
              baseSugar: d.baseSugar || null
            }))
            this.saveToStorage()
            localStorage.removeItem(`farm_${phone}_deviceList`)
          } catch (e) {
            // 忽略
          }
        }
        if (oldTplStr) {
          try {
            this.sugarTemplate = JSON.parse(oldTplStr)
            this.saveToStorage()
            localStorage.removeItem(`farm_${phone}_sugarTpl`)
          } catch (e) {
            // 忽略
          }
        }
      }

      // 补齐缺失字段
      this.deviceList.forEach(d => {
        if (d.searchedCityId === undefined) d.searchedCityId = ''
        if (d.currentRegionName === undefined) d.currentRegionName = ''
        if (d.baseTemp === undefined) d.baseTemp = 2000
        if (d.baseSugar === undefined) d.baseSugar = null
        if (d.sn === undefined) d.sn = ''
        if (d.online === undefined) d.online = true
        if (d.power === undefined) d.power = 100
        if (d.plotName === undefined && d.greenhouse !== undefined) d.plotName = d.greenhouse
        if (d.grapeType === undefined && d.variety !== undefined) d.grapeType = d.variety
      })

      // 首次使用初始化默认设备
      if (this.deviceList.length === 0) {
        this.initDefaultDevices()
      }
    },

    // ============= 默认设备 =============
    initDefaultDevices() {
      this.deviceList = [
        {
          id: '1',
          name: '葡萄检测器一号',
          sn: 'SN-20230901-001',
          plotName: '东区5号大棚',
          grapeType: '阳光玫瑰',
          searchedCityId: '',
          currentRegionName: '',
          baseTemp: 2000,
          baseSugar: null,
          online: true,
          power: 68
        },
        {
          id: '5',
          name: '葡萄检测器五号',
          sn: 'SN-20230901-002',
          plotName: '西区2号大棚',
          grapeType: '巨峰',
          searchedCityId: '',
          currentRegionName: '',
          baseTemp: 2000,
          baseSugar: null,
          online: false,
          power: 12
        }
      ]
      this.sugarTemplate['1'] = this._generateDefaultSugarData('ygmg', 2000, null)
      this.sugarTemplate['5'] = this._generateDefaultSugarData('jf', 2000, null)
      this.saveToStorage()
    },

    _generateDefaultSugarData(varietyCode, baseTempVal, baseSugarVal) {
      // 延迟导入避免循环依赖
      const { predictSugarTrend } = require('@/utils/sugarModel')
      const mockTemps7 = [28, 29, 27, 30, 28, 26, 29]
      const mockTemps14 = [28, 29, 27, 30, 28, 26, 29, 27, 28, 30, 29, 27, 26, 28]
      const trend7 = predictSugarTrend(mockTemps7, baseTempVal, varietyCode, baseSugarVal)
      const trend14 = predictSugarTrend(mockTemps14, baseTempVal, varietyCode, baseSugarVal)
      return {
        name: varietyCode === 'ygmg' ? '阳光玫瑰' : '巨峰',
        standardSugar: varietyCode === 'ygmg' ? 18 : 16,
        '7day': trend7.map(t => t.sugar),
        '14day': trend14.map(t => t.sugar)
      }
    },

    // ============= 设备CRUD =============
    addDevice(device) {
      this.deviceList.push(device)
      // 创建初始糖度模板
      const varietyCode = device.grapeType === '巨峰' ? 'jf'
        : device.grapeType === '夏黑' ? 'xh'
        : device.grapeType === '蓝宝石' ? 'lbs'
        : 'ygmg'
      this.sugarTemplate[device.id] = this._generateDefaultSugarData(varietyCode, device.baseTemp || 2000, device.baseSugar)
      this.saveToStorage()
    },

    deleteDevice(id) {
      const idx = this.deviceList.findIndex(d => d.id === id)
      if (idx !== -1) {
        this.deviceList.splice(idx, 1)
      }
      delete this.sugarTemplate[id]
      this.saveToStorage()
    },

    updateDevice(id, updates) {
      const dev = this.deviceList.find(d => d.id === id)
      if (dev) {
        Object.assign(dev, updates)
      }
      this.saveToStorage()
    },

    getDeviceById(id) {
      return this.deviceList.find(d => d.id === id) || null
    },

    // ============= 糖度模板 =============
    getSugarTemplate(id) {
      return this.sugarTemplate[id] || null
    },

    setSugarTemplate(id, template) {
      this.sugarTemplate[id] = template
      this.saveToStorage()
    },

    updateStandardSugar(id, standardSugar) {
      if (this.sugarTemplate[id]) {
        this.sugarTemplate[id].standardSugar = standardSugar
        this.saveToStorage()
      }
    }
  }
})