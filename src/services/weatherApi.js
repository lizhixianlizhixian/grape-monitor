// 天气数据服务 — 获取未来天气预报用于积温计算

import cityList from '@/data/cityList.json'

const QWEATHER_KEY = 'efa5fe0dbc62423299a4f01fcd0f09a5'
const QWEATHER_BASE = 'https://devapi.qweather.com/v7'

/**
 * 获取城市 7 天天气预报
 * @param {string} locationId - 和风天气 LocationID
 * @param {number} defaultTemp - API 不可用时的模拟基准温度
 * @returns {Promise<Array<{date: string, tempAvg: number, tempMax: number, tempMin: number, text: string}>>}
 */
export async function fetch7DayForecast(locationId, defaultTemp = 27) {
  const url = `${QWEATHER_BASE}/weather/7d?location=${locationId}&key=${QWEATHER_KEY}`

  try {
    const response = await fetch(url)
    const data = await response.json()

    if (data.code !== '200') {
      throw new Error(`天气API请求失败：${data.code}`)
    }

    return data.daily.map(day => ({
      date: day.fxDate,
      tempAvg: Math.round((parseInt(day.tempMax) + parseInt(day.tempMin)) / 2),
      tempMax: parseInt(day.tempMax),
      tempMin: parseInt(day.tempMin),
      text: day.textDay
    }))
  } catch (error) {
    console.error('天气API请求失败，使用模拟数据', error)
    return getMockForecast(defaultTemp)
  }
}

/**
 * 获取 14 天预报（7天精确 + 7天趋势推算）
 * @param {string} locationId - 和风天气 LocationID
 * @param {number} defaultTemp - 模拟基准温度
 */
export async function fetch14DayForecast(locationId, defaultTemp = 27) {
  const forecast7 = await fetch7DayForecast(locationId, defaultTemp)
  const avgTemp = forecast7.reduce((s, d) => s + d.tempAvg, 0) / forecast7.length
  const extended = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + 7 + i)
    const dateStr = date.toISOString().slice(0, 10)
    const noise = (Math.random() - 0.5) * 3
    extended.push({
      date: dateStr,
      tempAvg: Math.round(avgTemp + noise),
      tempMax: Math.round(avgTemp + 5 + noise),
      tempMin: Math.round(avgTemp - 5 + noise),
      text: '趋势预测'
    })
  }
  return [...forecast7, ...extended]
}

// 离线模拟数据（API 不可用时兜底）
function getMockForecast(defaultTemp) {
  const base = defaultTemp
  const result = []
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    const noise = (Math.random() - 0.5) * 4
    const avg = Math.round(base + noise)
    result.push({
      date: date.toISOString().slice(0, 10),
      tempAvg: avg,
      tempMax: avg + 5,
      tempMin: avg - 5,
      text: '模拟预报'
    })
  }
  return result
}

/**
 * 搜索城市（基于本地城市列表，覆盖全国所有地级市）
 * @param {string} keyword - 城市关键词
 * @returns {Promise<Array<{id: string, name: string, adm1: string, adm2: string}>>}
 */
export function searchCity(keyword) {
  if (!keyword || keyword.trim().length < 1) return Promise.resolve([])

  const kw = keyword.trim().toLowerCase()
  const results = cityList.filter(city => {
    return city.name.includes(kw) || city.p.includes(kw) || city.c.includes(kw) ||
           (city.name + city.c).includes(kw) || (city.p + city.c).includes(kw)
  })

  return Promise.resolve(
    results.slice(0, 50).map(city => ({
      id: city.id,
      name: city.name,
      adm1: city.p,
      adm2: city.c
    }))
  )
}