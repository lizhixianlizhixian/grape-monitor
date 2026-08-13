// 葡萄甜度线性回归预测模型（基于积温）
// 模型公式：糖度 = intercept + slope × 积温
// 使用真实历史数据拟合，用户当前积温/糖度作为额外校准点

// 历史训练数据（源自 Python 模型真实数据）
const HISTORICAL_DATA = [
  { year: 2021, accTemp: 3568, sugar: 16.0 },
  { year: 2022, accTemp: 2990, sugar: 14.5 },
  { year: 2023, accTemp: 4128, sugar: 18.0 },
  { year: 2024, accTemp: 3978, sugar: 17.3 },
  { year: 2025, accTemp: 4371, sugar: 22.5 }
]

// 按品种微调系数（不同品种糖度积累效率不同）
const VARIETY_FACTOR = {
  ygmg: { name: '阳光玫瑰', factor: 1.0 },
  jf:   { name: '巨峰',     factor: 0.92 },
  xh:   { name: '夏黑',     factor: 1.05 },
  lbs:  { name: '蓝宝石',   factor: 0.98 }
}

// 仅用历史数据拟合的模型参数（备用）
const BASE_MODEL = fitLinearRegression(HISTORICAL_DATA)

/**
 * 最小二乘线性回归拟合
 * @param {Array<{accTemp: number, sugar: number}>} dataPoints
 * @returns {{slope: number, intercept: number, r2: number}}
 */
function fitLinearRegression(dataPoints) {
  const n = dataPoints.length
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 }

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0
  for (const p of dataPoints) {
    sumX += p.accTemp
    sumY += p.sugar
    sumXY += p.accTemp * p.sugar
    sumX2 += p.accTemp * p.accTemp
  }

  const denominator = n * sumX2 - sumX * sumX
  if (Math.abs(denominator) < 1e-10) {
    return { slope: 0, intercept: sumY / n, r2: 0 }
  }

  const slope = (n * sumXY - sumX * sumY) / denominator
  const intercept = (sumY - slope * sumX) / n

  const yMean = sumY / n
  let ssRes = 0, ssTot = 0
  for (const p of dataPoints) {
    const yPred = intercept + slope * p.accTemp
    ssRes += (p.sugar - yPred) ** 2
    ssTot += (p.sugar - yMean) ** 2
  }
  const r2 = ssTot > 0 ? 1 - ssRes / ssTot : 0

  return { slope, intercept, r2 }
}

/**
 * 根据累积积温预测糖度
 * @param {number} accumulatedTemp - 累积积温（℃·d）
 * @param {string} variety - 品种代码，默认阳光玫瑰
 * @param {number} slope - 斜率
 * @param {number} intercept - 截距
 * @returns {number} 预测糖度（°Bx）
 */
export function predictSugar(accumulatedTemp, variety = 'ygmg', slope = BASE_MODEL.slope, intercept = BASE_MODEL.intercept) {
  const rawSugar = intercept + slope * accumulatedTemp
  const factor = VARIETY_FACTOR[variety]?.factor || 1.0
  return Math.round(rawSugar * factor * 10) / 10
}

/**
 * 根据每日温度数组，计算逐日累积积温（≥10°C），并预测对应糖度
 * 斜率从历史数据拟合（物理规律），截距由用户当前糖度锚定（批次差异）
 *
 * @param {number[]} dailyTemps - 每日平均温度数组
 * @param {number} baseAccTemp - 当前有效累积积温（≥10°C 的积温基数）
 * @param {string} variety - 品种代码
 * @param {number|null} baseSugar - 用户填写的当前糖度基数，用于锚定截距
 * @returns {Array<{day: number, accTemp: number, sugar: number}>}
 */
export function predictSugarTrend(dailyTemps, baseAccTemp = 0, variety = 'ygmg', baseSugar = null) {
  // 斜率从历史数据拟合（糖度随积温增长的物理规律，同品种通用）
  const { slope: historicalSlope } = BASE_MODEL
  const factor = VARIETY_FACTOR[variety]?.factor || 1.0

  // 截距：用户提供糖度基数 → 锚定直线穿过 (baseAccTemp, baseSugar)，考虑品种系数
  //       sugar = factor × (intercept + slope × accTemp)
  //       → intercept = sugar / factor - slope × accTemp
  //       未提供 → 使用历史数据拟合的截距
  const intercept = baseSugar != null
    ? baseSugar / factor - historicalSlope * baseAccTemp
    : BASE_MODEL.intercept

  let accTemp = baseAccTemp
  return dailyTemps.map((temp, index) => {
    const effectiveTemp = Math.max(0, temp - 10)
    accTemp += effectiveTemp
    const rawSugar = intercept + historicalSlope * accTemp
    return {
      day: index + 1,
      accTemp: Math.round(accTemp),
      sugar: Math.round(rawSugar * factor * 10) / 10
    }
  })
}

/**
 * 获取模型信息（含历史数据拟合结果）
 */
export function getModelInfo() {
  return {
    formula: `糖度 = ${BASE_MODEL.intercept.toFixed(4)} + ${BASE_MODEL.slope.toFixed(5)} × 积温`,
    baseR2: BASE_MODEL.r2,
    intercept: BASE_MODEL.intercept,
    slope: BASE_MODEL.slope,
    historicalData: HISTORICAL_DATA,
    varieties: VARIETY_FACTOR
  }
}