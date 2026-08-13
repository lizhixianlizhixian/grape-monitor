// 中国主要葡萄产区数据（省→市→区三级联动）
// baseAccTemp 为有效积温基数（≥10°C），已从总积温换算

export const grapeRegionTree = [
  {
    name: '新疆',
    cities: [
      {
        name: '吐鲁番市',
        districts: [
          { code: 'turpan', name: '高昌区', baseAccTemp: 3200, locationId: '101130501' }
        ]
      },
      {
        name: '和田地区',
        districts: [
          { code: 'hetian', name: '和田市', baseAccTemp: 3100, locationId: '101131301' }
        ]
      },
      {
        name: '哈密市',
        districts: [
          { code: 'hami', name: '伊州区', baseAccTemp: 3000, locationId: '101131201' }
        ]
      },
      {
        name: '石河子市',
        districts: [
          { code: 'shz', name: '石河子市', baseAccTemp: 2800, locationId: '101130301' }
        ]
      }
    ]
  },
  {
    name: '河北',
    cities: [
      {
        name: '秦皇岛市',
        districts: [
          { code: 'changli', name: '昌黎县', baseAccTemp: 2500, locationId: '101091101' },
          { code: 'qhd', name: '海港区', baseAccTemp: 2400, locationId: '101091101' }
        ]
      },
      {
        name: '张家口市',
        districts: [
          { code: 'huailai', name: '怀来县', baseAccTemp: 2100, locationId: '101090303' },
          { code: 'zjk', name: '宣化区', baseAccTemp: 2000, locationId: '101090302' }
        ]
      }
    ]
  },
  {
    name: '山东',
    cities: [
      {
        name: '烟台市',
        districts: [
          { code: 'penglai', name: '蓬莱区', baseAccTemp: 2400, locationId: '101120502' },
          { code: 'yantai', name: '福山区', baseAccTemp: 2300, locationId: '101120501' }
        ]
      },
      {
        name: '青岛市',
        districts: [
          { code: 'pingdu', name: '平度市', baseAccTemp: 2400, locationId: '101120210' },
          { code: 'qingdao', name: '黄岛区', baseAccTemp: 2300, locationId: '101120206' },
        ]
      },
      {
        name: '威海市',
        districts: [
          { code: 'weihai', name: '环翠区', baseAccTemp: 2200, locationId: '101121301' }
        ]
      }
    ]
  },
  {
    name: '山西',
    cities: [
      {
        name: '运城市',
        districts: [
          { code: 'xiaxian', name: '夏县', baseAccTemp: 2200, locationId: '101100801' }
        ]
      },
      {
        name: '太原市',
        districts: [
          { code: 'qingxu', name: '清徐县', baseAccTemp: 2100, locationId: '101100108' }
        ]
      }
    ]
  },
  {
    name: '陕西',
    cities: [
      {
        name: '咸阳市',
        districts: [
          { code: 'xianyang', name: '杨陵区', baseAccTemp: 2200, locationId: '101110201' }
        ]
      },
      {
        name: '西安市',
        districts: [
          { code: 'xian', name: '鄠邑区', baseAccTemp: 2300, locationId: '101110112' }
        ]
      },
      {
        name: '渭南市',
        districts: [
          { code: 'weinan', name: '临渭区', baseAccTemp: 2200, locationId: '101110501' }
        ]
      }
    ]
  },
  {
    name: '甘肃',
    cities: [
      {
        name: '武威市',
        districts: [
          { code: 'wuwei', name: '凉州区', baseAccTemp: 1900, locationId: '101160501' }
        ]
      },
      {
        name: '张掖市',
        districts: [
          { code: 'zhangye', name: '甘州区', baseAccTemp: 1900, locationId: '101160701' }
        ]
      },
      {
        name: '兰州市',
        districts: [
          { code: 'lanzhou', name: '皋兰县', baseAccTemp: 1800, locationId: '101160108' }
        ]
      },
      {
        name: '嘉峪关市',
        districts: [
          { code: 'jiayuguan', name: '嘉峪关市', baseAccTemp: 1700, locationId: '101161401' }
        ]
      }
    ]
  },
  {
    name: '宁夏',
    cities: [
      {
        name: '银川市',
        districts: [
          { code: 'yinchuan', name: '西夏区', baseAccTemp: 2100, locationId: '101170103' }
        ]
      }
    ]
  },
  {
    name: '辽宁',
    cities: [
      {
        name: '大连市',
        districts: [
          { code: 'dalian', name: '金州区', baseAccTemp: 2000, locationId: '101070201' }
        ]
      },
      {
        name: '沈阳市',
        districts: [
          { code: 'shenyang', name: '苏家屯区', baseAccTemp: 1800, locationId: '101070107' }
        ]
      },
      {
        name: '锦州市',
        districts: [
          { code: 'jinzhou', name: '北镇市', baseAccTemp: 1900, locationId: '101070703' }
        ]
      }
    ]
  },
  {
    name: '吉林',
    cities: [
      {
        name: '长春市',
        districts: [
          { code: 'changchun', name: '九台区', baseAccTemp: 1600, locationId: '101060108' }
        ]
      }
    ]
  },
  {
    name: '黑龙江',
    cities: [
      {
        name: '哈尔滨市',
        districts: [
          { code: 'haerbin', name: '双城区', baseAccTemp: 1400, locationId: '101050102' }
        ]
      }
    ]
  },
  {
    name: '云南',
    cities: [
      {
        name: '红河州',
        districts: [
          { code: 'milet', name: '弥勒市', baseAccTemp: 2800, locationId: '101290301' }
        ]
      },
      {
        name: '昆明市',
        districts: [
          { code: 'kunming', name: '呈贡区', baseAccTemp: 2900, locationId: '101290106' }
        ]
      },
      {
        name: '大理州',
        districts: [
          { code: 'dali', name: '宾川县', baseAccTemp: 2700, locationId: '101290201' }
        ]
      }
    ]
  },
  {
    name: '四川',
    cities: [
      {
        name: '成都市',
        districts: [
          { code: 'chengdu', name: '龙泉驿区', baseAccTemp: 2600, locationId: '101270107' }
        ]
      },
      {
        name: '攀枝花市',
        districts: [
          { code: 'panzhihua', name: '仁和区', baseAccTemp: 3500, locationId: '101270201' }
        ]
      }
    ]
  },
  {
    name: '贵州',
    cities: [
      {
        name: '贵阳市',
        districts: [
          { code: 'guiyang', name: '息烽县', baseAccTemp: 2400, locationId: '101260109' }
        ]
      }
    ]
  },
  {
    name: '江苏',
    cities: [
      {
        name: '连云港市',
        districts: [
          { code: 'lyg', name: '东海县', baseAccTemp: 2500, locationId: '101191002' }
        ]
      },
      {
        name: '徐州市',
        districts: [
          { code: 'xuzhou', name: '铜山区', baseAccTemp: 2600, locationId: '101190801' }
        ]
      }
    ]
  },
  {
    name: '浙江',
    cities: [
      {
        name: '宁波市',
        districts: [
          { code: 'ningbo', name: '慈溪市', baseAccTemp: 2800, locationId: '101210408' }
        ]
      },
      {
        name: '金华市',
        districts: [
          { code: 'jinhua', name: '浦江县', baseAccTemp: 2900, locationId: '101210901' }
        ]
      }
    ]
  },
  {
    name: '安徽',
    cities: [
      {
        name: '合肥市',
        districts: [
          { code: 'hefei', name: '包河区', baseAccTemp: 2700, locationId: '101220104' }
        ]
      }
    ]
  },
  {
    name: '湖北',
    cities: [
      {
        name: '孝感市',
        districts: [
          { code: 'xiaogan', name: '云梦县', baseAccTemp: 2800, locationId: '101200401' }
        ]
      }
    ]
  },
  {
    name: '湖南',
    cities: [
      {
        name: '长沙市',
        districts: [
          { code: 'changsha', name: '长沙县', baseAccTemp: 3000, locationId: '101250108' }
        ]
      }
    ]
  },
  {
    name: '广西',
    cities: [
      {
        name: '桂林市',
        districts: [
          { code: 'guilin', name: '兴安县', baseAccTemp: 3200, locationId: '101300501' }
        ]
      }
    ]
  },
  {
    name: '福建',
    cities: [
      {
        name: '福州市',
        districts: [
          { code: 'fuzhou', name: '闽侯县', baseAccTemp: 3300, locationId: '101230109' }
        ]
      },
      {
        name: '厦门市',
        districts: [
          { code: 'xiamen', name: '同安区', baseAccTemp: 3400, locationId: '101230205' }
        ]
      }
    ]
  },
  {
    name: '广东',
    cities: [
      {
        name: '广州市',
        districts: [
          { code: 'guangzhou', name: '从化区', baseAccTemp: 3600, locationId: '101280111' }
        ]
      }
    ]
  },
  {
    name: '河南',
    cities: [
      {
        name: '郑州市',
        districts: [
          { code: 'zhengzhou', name: '中牟县', baseAccTemp: 2600, locationId: '101180108' }
        ]
      },
      {
        name: '洛阳市',
        districts: [
          { code: 'luoyang', name: '偃师区', baseAccTemp: 2500, locationId: '101180902' }
        ]
      }
    ]
  },
  {
    name: '江西',
    cities: [
      {
        name: '南昌市',
        districts: [
          { code: 'nanchang', name: '新建区', baseAccTemp: 3000, locationId: '101240105' }
        ]
      }
    ]
  },
  {
    name: '北京',
    cities: [
      {
        name: '北京市',
        districts: [
          { code: 'beijing', name: '延庆区', baseAccTemp: 2300, locationId: '101010108' }
        ]
      }
    ]
  },
  {
    name: '天津',
    cities: [
      {
        name: '天津市',
        districts: [
          { code: 'tianjin', name: '滨海新区', baseAccTemp: 2500, locationId: '101030101' }
        ]
      }
    ]
  },
  {
    name: '上海',
    cities: [
      {
        name: '上海市',
        districts: [
          { code: 'shanghai', name: '嘉定区', baseAccTemp: 2700, locationId: '101020104' }
        ]
      }
    ]
  }
]

// 扁平化所有区县节点，便于快速查找
let _flatMap = null
function buildFlatMap() {
  if (_flatMap) return _flatMap
  _flatMap = {}
  grapeRegionTree.forEach(prov => {
    prov.cities.forEach(city => {
      city.districts.forEach(dist => {
        _flatMap[dist.code] = { ...dist, province: prov.name, city: city.name }
      })
    })
  })
  return _flatMap
}

/**
 * 根据区县 code 查找完整信息
 */
export function findDistrictByCode(code) {
  return buildFlatMap()[code] || null
}

/**
 * 获取有效积温基数（≥10°C）
 */
export function getBaseAccTemp(code) {
  return findDistrictByCode(code)?.baseAccTemp || 2000
}

/**
 * 获取和风天气 LocationID
 */
export function getLocationId(code) {
  return findDistrictByCode(code)?.locationId || '101010100'
}

/**
 * 获取完整产区名称
 */
export function getFullRegionName(code) {
  const d = findDistrictByCode(code)
  return d ? `${d.province}${d.city}${d.name}` : '未设置产区'
}

/**
 * 获取省→市→区级联路径
 */
export function getCascadePath(code) {
  const d = findDistrictByCode(code)
  return d ? { province: d.province, city: d.city, district: d.code } : null
}

// 保留旧接口兼容
export const grapeRegions = (() => {
  const flat = buildFlatMap()
  return Object.values(flat).map(d => ({
    code: d.code,
    name: `${d.province}${d.city}${d.name}`,
    province: d.province,
    baseAccTemp: d.baseAccTemp,
    desc: ''
  }))
})()

export function getRegionByCode(code) {
  const d = findDistrictByCode(code)
  return d ? { code, name: `${d.province}${d.city}${d.name}`, province: d.province, baseAccTemp: d.baseAccTemp, desc: '' } : null
}