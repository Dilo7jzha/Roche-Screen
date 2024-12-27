import axios from 'axios';

// 测试环境用的apikey
// const apiKey = 'e580275130f34274992d5b14cc19d454';
// 本地用的apikey
const apiKey = '5d20ade791054ef1b7e9ddc79958b29d';
const apiUrl = 'https://devapi.qweather.com/v7/weather/now';
const apiUrl2 = 'https://devapi.qweather.com/v7/air/now';
const apiUrl3 = 'https://devapi.qweather.com/v7/warning/now';
const apiUrl4 = 'https://devapi.qweather.com/v7/weather/7d';

export async function getCityId(cityName) {
  try {
    const response = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?key=${apiKey}&location=${cityName}`);
    if (response.data.code === '200' && response.data.location.length > 0) {
      return {
        cityId: response.data.location[0].id,
        lat: parseFloat(response.data.location[0].lat).toFixed(2), // 将字符串转换为数字
        lon: parseFloat(response.data.location[0].lon).toFixed(2), // 将字符串转换为数字
      };
    } else {
      throw new Error('获取城市ID失败');
    }
  } catch (error) {
    console.error('Error fetching city ID:', error);
    throw error;
  }
}

export async function getRealtimeWeather(cityId) {
  try {
    const response = await fetch(`${apiUrl}?location=${cityId}&lang=zh&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getRealtimeWeatherEN(cityId) {
  const windDirectionMap = {
    'N': 'North wind',
    'NE': 'Northeast wind',
    'E': 'East wind',
    'SE': 'Southeast wind',
    'S': 'South wind',
    'SW': 'Southwest wind',
    'W': 'West wind',
    'NW': 'Northwest wind'
  };
 
  try {
    const response = await fetch(`${apiUrl}?location=${cityId}&lang=en&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
 
    // 补全 windDir 字段
    if (data && data.now && data.now.windDir) {
      const [direction] = data.now.windDir.split(' ');
      data.now.windDir = `${windDirectionMap[direction]}`;
    }
 
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getCurrentAirQuality(cityId) {
  try {
    const response = await fetch(`${apiUrl2}?location=${cityId}&lang=zh&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getCurrentAirQualityEN(cityId) {
  try {
    const response = await fetch(`${apiUrl2}?location=${cityId}&lang=en&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getWeatherWarning(cityId) {
  try {
    const response = await fetch(`${apiUrl3}?location=${cityId}&lang=en&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // 确保您已经解析了JSON数据

    // 检查是否有预警数据，并提取所需信息
    let warningInfo = {};
    if (data.warning && data.warning.length > 0) {
      const warning = data.warning[0];
      warningInfo = {
        severityColor: warning.severityColor,
        typeName: warning.typeName,
        type: warning.type,
      };
    } else {
      warningInfo = {
        severityColor: 'No Weather Warning',
        typeName: '',
        type: '',
      };
    }

    return warningInfo; // 返回包含预警信息的对象
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

export async function getWeatherWarningZH(cityId) {
  try {
    const response = await fetch(`${apiUrl3}?location=${cityId}&lang=zh&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // 确保您已经解析了JSON数据

    const severityColorMap = {
      White: '白色',
      Blue: '蓝色',
      Green: '绿色',
      Yellow: '黄色',
      Orange: '橙色',
      Red: '红色',
      Black: '黑色',
    };
    const typeMap = {
      1001: '台风',
      1002: '龙卷风',
      1003: '暴雨',
      1005: '寒潮',
      1006: '大风',
      1009: '高温',
      1014: '雷电',
      1016: '霜冻',
      1017: '大雾',
      1019: '霾',
      1609: '暴雨', // 注意：1609也映射为'暴雨'，可能需要确认这是否是预期的行为
    };
 
    // 检查是否有预警数据，并提取所需信息
    let warningInfo = {};
    if (data.warning && data.warning.length > 0 && data.warning[0] !== null) {
      const warning = data.warning[0];
      const severityColorTransformed = severityColorMap[warning.severityColor] || '无预警';
      const typeTransformed = typeMap[warning.type] || '';
      if (typeTransformed == '') {
        warningInfo = {
          severityColor: '',
          type: typeTransformed,
        };
      }else{
        warningInfo = {
          severityColor: severityColorTransformed,
          type: typeTransformed,
        };
      };
    } else {
      warningInfo = {
        severityColor: '',
        type: '',
      };
    }
 
    return warningInfo; // 返回包含预警信息的对象
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export async function getWeatherForecast(cityId) {
  try {
    const response = await fetch(`${apiUrl4}?location=${cityId}&lang=zh&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const dailySlice = data.daily.slice(1, 5);

    const processedData = dailySlice.map(day => {
      const dateParts = day.fxDate.split('-');
      const dayOfMonth = dateParts[2];
      const monthIndex = parseInt(dateParts[1], 10) - 1; // Months are zero-indexed in the array
      const monthName = monthNames[monthIndex];

      return {
        fxDate: `${dayOfMonth} ${monthName}`,
        tempMax: day.tempMax,
        tempMin: day.tempMin,
        textDay: day.textDay,
        iconDay: day.iconDay
      };
    });

    return processedData;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
}

export async function getFirstDayTempMaxMin(cityId) {
  try {
    const response = await fetch(`${apiUrl4}?location=${cityId}&lang=zh&key=${apiKey}`, {
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
      },
    });

    // 检查响应是否成功
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // 解析JSON数据
    const data = await response.json();

    // 检查返回的数据是否包含所需信息
    if (data.code !== '200' || !data.daily || data.daily.length === 0) {
      throw new Error('Failed to fetch weather data or no daily forecast data available.');
    }

    // 获取第一天的数据
    const firstDay = data.daily[0];
    const fxDate = firstDay.fxDate;

    // 从fxDate中提取日和月
    const [year, month, day] = fxDate.split('-');

    // 获取温度信息
    const tempMax = firstDay.tempMax;
    const tempMin = firstDay.tempMin;

    // 返回结果，包含tempMax, tempMin, day, 和 month
    return { tempMax, tempMin, year, day, month };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;  // 可以选择重新抛出错误或处理错误
  }
}

export function getWeatherByCode(code) {
  const weatherMap = {
    '100': '晴朗',
    '150': '晴朗',
    '101': '多云',
    '151': '多云',
    '102': '多云', // 少云归类为多云
    '152': '多云', // 少云归类为多云
    '103': '多云', // 晴间多云归类为多云
    '153': '多云', // 晴间多云归类为多云
    '104': '阴天',
    '302': '打雷',
    '303': '打雷',
    '304': '冰雹', // 雷阵雨伴有冰雹归类为冰雹
    '300': '下雨',
    '301': '下雨',
    '305': '下雨',
    '306': '下雨',
    '307': '下雨',
    '308': '下雨', // 极端降雨归类为下雨
    '309': '下雨', // 毛毛雨/细雨归类为下雨
    '310': '下雨',
    '311': '下雨',
    '312': '下雨',
    '314': '下雨', // 小到中雨归类为下雨
    '315': '下雨', // 中到大雨归类为下雨
    '316': '下雨', // 大到暴雨归类为下雨
    '317': '下雨', // 暴雨到大暴雨归类为下雨
    '318': '下雨', // 大暴雨到特大暴雨归类为下雨
    '350': '下雨',
    '351': '下雨',
    '399': '下雨', // 雨归类为下雨
    '404': '雨夹雪',
    '406': '雨夹雪', // 阵雨夹雪归类为雨夹雪
    '400': '下雪',
    '401': '下雪',
    '402': '下雪',
    '403': '下雪',
    '407': '下雪', // 阵雪归类为下雪
    '408': '下雪', // 小到中雪归类为下雪
    '409': '下雪', // 中到大雪归类为下雪
    '410': '下雪', // 大到暴雪归类为下雪
    '499': '下雪', // 雪归类为下雪
    '500': '大雾', // 薄雾归类为大雾
    '501': '大雾',
    '509': '大雾',
    '510': '大雾',
    '514': '大雾',
    '515': '大雾',
    '502': '大雾', // 霾情况复杂，暂时归类为未知
    '503': '大雾', // 扬沙归类为未知
    '504': '大雾', // 浮尘归类为未知
    '507': '大雾', // 沙尘暴归类为未知
    '508': '大雾', // 强沙尘暴归类为未知
    '511': '大雾', // 中度霾归类为未知
    '512': '大雾', // 重度霾归类为未知
    '513': '大雾', // 严重霾归类为未知
    '900': '未知', // 热归类为未知
    '901': '未知', // 冷归类为未知
    '999': '未知'  // 未知保持为未知
  };

  // 处理雷雨的情况
  if (['302', '303', '304'].includes(code) &&
    (['305', '306', '307', '308', '309', '310', '311', '312', '314', '315', '316', '317', '318', '350', '351', '399'].includes(String(parseInt(code, 10) + 1)))) {
    // 如果打雷代码后面紧跟一个下雨代码（通过简单判断代码数字加1是否在下雨代码列表中），则归类为雷雨
    // 这里是一个简化处理，只考虑了连续的情况，且假设了代码设计是顺序且连续的
    // 实际应用中可能需要更复杂的逻辑或额外的数据来判断
    return '雷雨';
  }

  // 如果代码在映射中存在，则返回对应的天气类别
  return weatherMap[code] || '未知';
}