<template>
  
    <v-row no-gutters class="roche-container">
      <v-col class="weather-section" :cols="12">
        <!-- <div class="weather-image-container">
          <img src="@/assets/位图.png" alt="Weather Icon" class="weather-image">
        </div>
        <div class="weather-image-container2">
          <img src="@/assets/aclogo.png" alt="Weather Icon" class="weather-image2">
        </div> -->
        <div class="weather-image-container3">
          <img :src="getWeatherIconPath(weatherStatusText)" alt="Weather Icon" class="weather-image3">
        </div>
        <v-card class="weather-card-p1" outlined style="border: none;">
          <v-row class="weather-brief">
            <h1>
              <span class="temp-value">{{ weather.now?.temp || '--' }}</span>
              <span class="temp-unit">°C</span>
            </h1>
            <div class="weather-info">
              <p class="temp-range">{{ FirstDayTempMaxMin.tempMin }}/{{ FirstDayTempMaxMin.tempMax }}℃</p>
              <p class="weather-status">{{ weather.now ? weather.now.text : "加载中..." }}</p>
            </div>
          </v-row>
          <div class="inline-elements">
            <img src="@/assets/location.png" alt="Location Icon" class="icon-size" />
            <p class="inline-text">上海市</p><p class="inline-text-2">{{ FirstDayTempMaxMin.year }}年{{ FirstDayTempMaxMin.month }}月{{ FirstDayTempMaxMin.day }}日</p>
          </div>
          <p class="inline-text-3">Shanghai, {{ weatherEN.now ? weatherEN.now.text : "加载中..." }}</p>
          <v-card class="weather-card-info mb-4" outlined>
            <v-row class="weather-card-row">
              <!-- 空气质量卡片 -->
              <v-col cols="12" md="6" class="weather-info-card">
                <v-card class="air-quality-card" outlined>
                  <v-card-text>
                    <img class="left-align-svg" referrerpolicy="no-referrer"
                      src="https://lanhu-oss.lanhuapp.com/SketchPng590fc3b2f667278b71caf673d30ce39b82238f91880b60803f4f6027c74d795c" />
                    <v-row justify="space-between">
                      <v-col cols="6" class="text-left">
                        <p>空气质量</p>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <p>{{ airQuality?.now?.category || "加载中..." }}</p>
                      </v-col>
                    </v-row>
                    <v-row class="mt-2" justify="center"> <!-- 使用 mt-2 添加上边距 -->
                      <v-col cols="12" class="text-center">
                        <v-card flat class="ma-0 pa-2 white-background">
                          <!-- 使用 flat 去掉边框，pa-2 添加内边距，white-background 为自定义类，设置背景为白色 -->
                          <p>Air Quality: {{ airQualityEN?.now?.category || "加载中..." }}</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- 湿度卡片 -->
              <v-col cols="12" md="6" class="weather-info-card">
                <v-card class="air-quality-card" outlined>
                  <v-card-text>
                    <img class="left-align-svg" referrerpolicy="no-referrer"
                      src="https://lanhu-oss.lanhuapp.com/SketchPng489661444a7960b7ca597f01631e6216fc1c9a342f2b6187f2a802ac6eb39320" />
                    <v-row justify="space-between">
                      <v-col cols="6" class="text-left">
                        <p>湿度</p>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <p>{{ weather.now?.humidity || '--' }}%</p>
                      </v-col>
                    </v-row>
                    <v-row class="mt-2" justify="center"> <!-- 使用 mt-2 添加上边距 -->
                      <v-col cols="12" class="text-center">
                        <v-card flat class="ma-0 pa-2 white-background">
                          <!-- 使用 flat 去掉边框，pa-2 添加内边距，white-background 为自定义类，设置背景为白色 -->
                          <p>Humidity: {{ weather.now?.humidity || '--' }}%</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <v-col cols="12" md="6" class="weather-info-card">
                <v-card class="air-quality-card" outlined>
                  <v-card-text>
                    <img class="left-align-svg" referrerpolicy="no-referrer"
                      src="https://lanhu-oss.lanhuapp.com/SketchPng03e7ecde2fb2aad35c29a78ad5e10725bcccc9df326b0452bbd2127bc7d8b843" />
                    <v-row justify="space-between">
                      <v-col cols="6" class="text-left">
                        <p>降水量</p>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <p>{{ weather.now?.precip || '--' }}毫米</p>
                      </v-col>
                    </v-row>
                    <v-row class="mt-2" justify="center"> <!-- 使用 mt-2 添加上边距 -->
                      <v-col cols="12" class="text-center">
                        <v-card flat class="ma-0 pa-2 white-background">
                          <!-- 使用 flat 去掉边框，pa-2 添加内边距，white-background 为自定义类，设置背景为白色 -->
                          <p>Precipitation: {{ weather.now?.precip || '--' }}mm</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>

              <!-- 风力和降水量卡片可以放在下面的行中，或者根据需要调整布局 -->
              <v-col cols="12" md="6" class="weather-info-card">
                <v-card class="air-quality-card" outlined>
                  <v-card-text>
                    <img class="left-align-svg" referrerpolicy="no-referrer"
                      src="https://lanhu-oss.lanhuapp.com/SketchPng5a2ea6961587efc0058bc520e6b0e97f97b343261c86626b31c66982bed9f3ff" />
                    <v-row justify="space-between">
                      <v-col cols="6" class="text-left">
                        <p>风力</p>
                      </v-col>
                      <v-col cols="6" class="text-right">
                        <p>{{ weather.now?.windDir || '--' }} {{ weather.now?.windScale || '--' }}级</p>
                      </v-col>
                    </v-row>
                    <v-row class="mt-2" justify="center"> <!-- 使用 mt-2 添加上边距 -->
                      <v-col cols="12" class="text-center">
                        <v-card flat class="ma-0 pa-2 white-background">
                          <!-- 使用 flat 去掉边框，pa-2 添加内边距，white-background 为自定义类，设置背景为白色 -->
                          <p>Wind power: {{ weatherEN.now?.windDir || '--' }} {{ weather.now?.windScale || '--' }}</p>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-card>

        <v-card class="weather-warning mb-4" outlined>
          <div class="flex-container">
            <div class="warning-content">
              <div class="warning-header">
                <p>天气预警/ Weather Warning</p>
                <!-- 假设这里有一个图标，但因为没有具体的图标URL，所以暂时用文本代替 -->
                <!-- <img src="icon-url" alt="Weather Warning Icon" class="warning-icon"> -->
              </div>
              <h3 class="warning-text">
                {{ warningZH.severityColor || "" }}
                {{ warningZH.type || "无" }}预警/
                {{ warning.severityColor || "" }}
                {{ warning.typeName || "" }}
              </h3>
            </div>
            <div class="warning-icon-wrapper">
              <!-- <svg v-if="warning.severityColor !== 'No Weather Warning'" id="bg_svg" width="64" height="64" viewBox="0 0 64 64" :fill="warningColor">
                <rect width="64" height="64"/>
              </svg> -->
              <svg v-if="(warning.severityColor) && (warning.severityColor !== 'No Weather Warning')" id="bg_svg" width="64" height="64" viewBox="0 0 64 64" :fill="warning.severityColor">
                <rect width="64" height="64"/>
              </svg>
              <!-- <svg :src="getWarningIconPath(typeText)" class="orange-svg"></svg> -->
              <svg id="warning-icon" :width="48" :height="48" viewBox="0 0 16 16" class="centered-icon">
                <!-- 这里是 SVG 的路径数据，您需要根据实际的 SVG 文件来填写 -->
                <path
                  v-for="(pathData, index) in typeText"
                  :key="index"
                  :d="pathData"
                />
              </svg>
            </div>
          </div>
        </v-card>

        <v-card class="pa-4" outlined>
          <v-layout row wrap class="forecast-group">
            <v-flex v-for="(day, index) in forecast" :key="index" class="pa-2">
              <v-card class="forecast mb-2" outlined>
                <v-card-text>
                  <img :src="getImagePath(day.iconDay)" alt="Weather Icon" class="forecast-icon">
                  <!-- <h3>{{ day.textDay }}</h3> -->
                  <h3 class="warning-text text-center">{{ day.tempMin }} - {{ day.tempMax }}°C</h3>
                  <p class="text-center">{{ day.fxDate }}</p>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>

</template>

<script>
import {
  getCityId,
  getRealtimeWeather,
  getRealtimeWeatherEN,
  getCurrentAirQuality,
  getCurrentAirQualityEN,
  getWeatherWarning,
  getWeatherForecast,
  getWeatherByCode,
  getFirstDayTempMaxMin,
  getWeatherWarningZH,
} from "./weatherApi";

export default {
  data() {
    return {
      cityId: null,
      weather: {}, // 初始化为一个空对象
      weatherEN: {},
      lat: null,
      lon: null,
      airQuality: null,
      airQualityEN: null,
      warning: [],
      warningZH: [],
      forecast: [],
      FirstDayTempMaxMin: [],
      currentActivityImageIndex: 0,
      rotationInterval: 3000, // 图片切换的时间间隔，单位为毫秒
      warningColor: 'orange', // 或者使用十六进制颜色代码 '#FFA500'
    };
  },
  watch: {
    // 当rotationInterval变化时，如果轮播正在进行，则重新设置定时器
    rotationInterval() {
      if (this.isRotating) {
        this.stopImageRotation();
        this.startImageRotation();
      }
    },
  },
  methods: {
    toggleRotation() {
      if (this.isRotating) {
        this.stopImageRotation();
      } else {
        this.startImageRotation();
      }
    },
    getImagePath(iconCode) {
      const weatherText = getWeatherByCode(iconCode);
      return require(`@/assets/weather-icon/${weatherText}.png`);
    },
    getWeatherIconPath(weatherStatus) {
      return require(`@/assets/weather-icon/${weatherStatus}.png`);
    },
  },
  computed: {
    // 添加一个新的计算属性weatherStatusText
    weatherStatusText() {
      // 检查weather.now是否存在且weather.now.icon是一个有效的代码
      if (this.weather.now && this.weather.now.icon) {
        // 直接调用getWeatherByCode函数并返回结果
        // 注意：确保getWeatherByCode函数已经正确导入并可以在此处使用
        return getWeatherByCode(this.weather.now.icon);
      }
      // 如果weather.now不存在或weather.now.icon无效，则返回晴朗
      // 这里返回晴朗，因为模板中会使用"加载中..."作为默认值
      return '晴朗';
    },
    typeText() {
      let iconName = []; // 初始值设为'svg'，但这里看起来不太合理，通常初始值应该与逻辑相关

      // 检查this.warning是否存在且this.warning.type是一个有效的代码
      if (this.warning && this.warning.type) {
        // 假设getWeatherByCode函数是用来根据type获取天气图标的，但这里直接用了type作为iconName
        // 如果getWeatherByCode确实返回了一个合适的iconName，则应该使用它的返回值
        // 但根据注释和代码，这里直接用了this.warning.type
        iconName = this.warning.type; // 注意：这里可能逻辑有误，通常不会直接用type作为图标名
      } else {
        // 如果warning不存在或warning.type无效，根据逻辑应该设置为一个默认的晴朗图标代码
        // 但由于初始值已经设为'svg'，且下面的switch没有处理'svg'，这里的else可能是多余的
        // 除非'svg'不是一个有效的图标代码，且需要特别处理
        iconName = ''; // 可以设为空字符串或其他表示“无效”的标识符
      }

      // 根据iconName的值转换为对应的图标代码
      switch (iconName) {
        case '1001':
          iconName = ["M9.21 1.491c-3.757-.066-6.613 2.537-6.88 5.705-.292 3.494 2.107 4.947 2.428 5.232C2.853 12.4.585 10.28.204 8.296a.104.104 0 0 0-.1-.085.103.103 0 0 0-.103.114c.403 3.526 3.405 6.2 6.79 6.186 3.604-.016 6.518-2.147 6.89-5.646.35-3.295-2.108-5.008-2.424-5.292 2.023.02 4.162 2.15 4.54 4.133.008.048.05.084.098.085a.102.102 0 0 0 .1-.071.103.103 0 0 0 .004-.043c-.406-3.521-3.405-6.126-6.788-6.185ZM8 9.503A1.502 1.502 0 1 1 8 6.5a1.502 1.502 0 0 1 0 3.004Z"];
          break;
        case '1002':
          iconName = ["M2.653 4.48c-.105-.315-.105-.573.014-.791.53-.967 2.19-2.004 4.637-2.443 2.743-.492 4.582.057 5.1.746a.71.71 0 0 1 .033.837c.897-.528 1.158-1.081 1.014-1.58C13.166.246 10.41-.369 7.09.244c-3.417.632-5.456 2.22-5.362 3.229.031.337.38.804.925 1.006Z",
            "M11.568 3.056c-.178-.621-1.676-1.49-3.99-1.047-2.362.452-3.348 1.804-3.29 2.43.02.208.237.498.575.624-.066-.196-.065-.356.01-.492.327-.6 1.358-1.244 2.877-1.516 1.704-.306 2.845.035 3.166.463a.44.44 0 0 1 .022.52c.556-.329.718-.672.63-.982Z",
            "M15.583 1.905c.062.674-.27 1.59-1.036 2.482.365.215.778.548.828.978.11.964-.43 2.058-1.606 2.953.008.007.016.012.024.017a.15.15 0 0 1 .03.023 1.278 1.278 0 0 1 .34 1.041c-.058.378-.301.568-.598.8-.3.232-.654.508-.926 1.062-.097.198-.38.559-.564.729-.378.35-.722.4-1.007.44-.18.026-.336.049-.462.141-.294.216-.43.424-.553.612-.101.154-.193.294-.356.415a.915.915 0 0 1-.432.167c-.165.03-.326.06-.519.252-.073.073-.128.19-.188.317-.078.167-.165.351-.31.476-.103.089-.21.146-.306.197-.117.062-.216.115-.27.207-.093.16-.123.34-.147.487-.028.167-.048.292-.149.299-.106.007-.964-1.02-1.167-1.975-.045-.21-.102-.478-.018-.791.022-.085.049-.15.085-.238.031-.078.07-.175.12-.319l.016-.044a2.85 2.85 0 0 0 .134-.446c.034-.234-.267-.455-.457-.595a1.666 1.666 0 0 1-.12-.092c-.149-.138-1.019-.973-.964-1.71 0-.189.048-.376.139-.542-.958-.5-1.593-1.174-1.774-1.808a1.946 1.946 0 0 1-.05-.459C1.513 6.41.583 5.356.424 4.445c-.073-.427.173-.94.554-1.38 0 .001-.035.686.285 1.026.956 1.018 3.98 1.787 7.223 1.262 3.613-.585 5.97-2.628 5.763-3.967-.06-.39-.198-.651-.538-.972 0 0 1.784.537 1.873 1.491Zm-5.95 9.347c1.13-.1 2.536-.664 3.386-1.793.17-.241.273-.524.298-.818-.83.52-1.902.951-3.247 1.199-1.852.341-3.422.098-4.581-.408.03.104.077.201.142.287.54.625 1.978 1.714 4.002 1.533ZM4.122 7.37c1.124.775 3.08 1.268 5.706.85 2.927-.463 4.836-2.11 4.671-3.22a1.227 1.227 0 0 0-.15-.395c-1.082 1.143-2.899 2.206-5.571 2.61-2.004.302-3.616.223-4.876-.072.06.088.134.165.22.227Z"
          ];
          break;
        case '1003':
          iconName = ["M7.9 10a4.99 4.99 0 0 0 3.827-1.783 3 3 0 1 0 .553-5.63A4.999 4.999 0 0 0 7.9 0a4.998 4.998 0 0 0-4.359 2.549 3 3 0 1 0 .586 5.732A4.988 4.988 0 0 0 7.9 10Zm-.791-6.398c-.057-.362.17-.8.496-.997.256-.153.551-.133.806.023l.07.042a.846.846 0 0 1 .409.853L8.532 5.8H7.454L7.11 3.602ZM8.599 6.9a.6.6 0 1 1-1.2 0 .6.6 0 0 1 1.2 0Zm.344 4.804a.494.494 0 0 0-.157-.641c-.205-.13-.467-.053-.586.172l-2.143 4.061a.494.494 0 0 0 .157.641c.205.13.467.053.586-.172l2.143-4.061ZM2.8 11.556c.191.115.257.37.146.57l-1.2 2.165a.391.391 0 0 1-.546.153.427.427 0 0 1-.146-.57l1.2-2.165a.39.39 0 0 1 .546-.153Zm3 0c.191.115.257.37.146.57l-1.2 2.165a.391.391 0 0 1-.546.153.427.427 0 0 1-.146-.57l1.2-2.165a.39.39 0 0 1 .546-.153Zm9 0c.191.115.257.37.146.57l-1.2 2.165a.391.391 0 0 1-.546.153.427.427 0 0 1-.146-.57l1.2-2.165a.39.39 0 0 1 .546-.153Zm-2.854.569a.427.427 0 0 0-.146-.57.391.391 0 0 0-.546.154l-1.2 2.166a.428.428 0 0 0 .146.57.391.391 0 0 0 .546-.154l1.2-2.166Z"];
          break;
        case '1005':
          iconName = ["M8.5.5a.5.5 0 1 0-1 0v1.293l-.646-.647a.5.5 0 1 0-.708.708L7.5 3.207V5c0 .014 0 .028.002.041A2.997 2.997 0 0 0 5.687 6.09a.512.512 0 0 0-.035-.022l-1.553-.896-.495-1.85a.5.5 0 1 0-.966.26l.237.882-1.12-.646a.5.5 0 0 0-.5.866l1.12.646-.884.237a.5.5 0 0 0 .26.966l1.848-.495 1.553.896a.503.503 0 0 0 .036.019 2.994 2.994 0 0 0 0 2.096.508.508 0 0 0-.036.019l-1.553.896-1.849-.495a.5.5 0 0 0-.259.966l.884.237-1.12.646a.5.5 0 1 0 .5.866l1.12-.646-.237.883a.5.5 0 1 0 .966.258l.495-1.849 1.553-.896a.507.507 0 0 0 .035-.022 3 3 0 0 0 1.815 1.048.51.51 0 0 0-.002.04v1.793l-1.354 1.353a.5.5 0 0 0 .708.708l.646-.647V15.5a.5.5 0 0 0 1 0v-1.293l.646.647a.5.5 0 0 0 .708-.708L8.5 12.793V10.99c0-.01 0-.02-.002-.031H8.5V5.04h-.002l.002-.03V3.207l1.354-1.353a.5.5 0 1 0-.707-.708l-.647.647V.5Z", 
            "M16 5.064 13.897 4l-1.946.985-1.722-.435-.229.928L12.061 6l1.836-.93 1.68.85.423-.856Zm0 3L13.897 7l-1.946.985-1.722-.435-.229.928L12.061 9l1.836-.93 1.68.85.423-.856ZM13.897 10 16 11.065l-.423.856-1.68-.85-1.836.929L10 11.478l.23-.928 1.721.435L13.897 10Z"
          ];
          break;
        case '1006':
          iconName = ["M15.497 3.077S7.525.722 4.845.023a.794.794 0 0 0-.956.568L.024 15a.81.81 0 0 0 .544.968.811.811 0 0 0 1-.554l1.671-6.23 12.373-4.817a.696.696 0 0 0-.115-1.291Z",
            "M11.756 7.71a.296.296 0 0 0-.512 0L7.04 15a.292.292 0 0 0 .256.438h8.41a.292.292 0 0 0 .256-.437L11.756 7.71Zm-.956 2.41c-.036-.317.287-.59.7-.59.412 0 .736.273.7.59l-.316 2.785h-.768L10.8 10.12Zm1.267 3.91a.563.563 0 1 1-1.125 0 .563.563 0 0 1 1.125 0Z"
          ];
          break;
        case '1009':
          iconName = ["M3 2a.6.6 0 0 0-.6.6v1.8H.6a.6.6 0 1 0 0 1.2h1.8v1.8a.6.6 0 0 0 1.2 0V5.6h1.8a.6.6 0 1 0 0-1.2H3.6V2.6A.6.6 0 0 0 3 2Zm8.5 1a.5.5 0 0 0-.5.5v6.063a2 2 0 1 0 1 0V3.5a.5.5 0 0 0-.5-.5Z",
            "m10.2 8.399-.532.356a3.3 3.3 0 1 0 3.665 0l-.533-.356V2.5a1.3 1.3 0 1 0-2.6 0v5.899ZM9 2.5a2.5 2.5 0 0 1 5 0v5.258a4.5 4.5 0 1 1-5 0V2.5Z"
          ];
          break;
        case '1014':
          iconName = ["M7.058 0h5.403c.264 0 .422.311.279.548l-2.975 3.85a.173.173 0 0 0 .05.232.147.147 0 0 0 .08.024h3.13c.416 0 .63.53.345.855L4.12 16l2.203-8.082a.177.177 0 0 0-.025-.146.159.159 0 0 0-.055-.048.148.148 0 0 0-.07-.018H2.976a.451.451 0 0 1-.236-.067.49.49 0 0 1-.173-.183.532.532 0 0 1-.006-.503L6.56.311C6.66.119 6.85 0 7.057 0Z"];
          break;
        case '1017':
          iconName = ["M12.227 8.13a.263.263 0 0 0-.454 0l-3.738 6.482a.26.26 0 0 0 .227.388h7.476a.26.26 0 0 0 .227-.388L12.227 8.13Zm-.85 2.144c-.032-.282.256-.524.623-.524s.655.242.623.524l-.282 2.476h-.682l-.282-2.476Zm1.127 3.476a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM.75 2a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5H.75Zm7 3.5a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5ZM0 9.75A.75.75 0 0 1 .75 9h7.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 9.75ZM.75 5.5a.75.75 0 0 0 0 1.5h4.5a.75.75 0 1 0 0-1.5H.75Z"]; // 设置为晴朗图标代码
          break;
        case '1019':
          iconName = ["M12.543 4.487c-1.581 0-3.876 1.712-4.57 2.888C7.282 6.2 4.987 4.487 3.406 4.487a3.486 3.486 0 0 0 0 6.97c1.58 0 3.876-1.75 4.569-2.906.693 1.156 2.988 2.906 4.569 2.906a3.486 3.486 0 0 0 0-6.97h-.001Z"];
          break;
        case '1609':
          iconName = ["M7.9 10a4.99 4.99 0 0 0 3.827-1.783 3 3 0 1 0 .553-5.63A4.999 4.999 0 0 0 7.9 0a4.998 4.998 0 0 0-4.359 2.549 3 3 0 1 0 .586 5.732A4.988 4.988 0 0 0 7.9 10Zm-.791-6.398c-.057-.362.17-.8.496-.997.256-.153.551-.133.806.023l.07.042a.846.846 0 0 1 .409.853L8.532 5.8H7.454L7.11 3.602ZM8.599 6.9a.6.6 0 1 1-1.2 0 .6.6 0 0 1 1.2 0Zm-5.896 7.517c.097-.133.04-.303-.128-.38-.167-.077-.381-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.381.03.478-.102l1.05-1.444Zm2.45 0c.097-.133.04-.303-.128-.38-.167-.077-.381-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.381.03.478-.102l1.05-1.444Zm2.322-.38c.167.077.225.247.128.38l-1.05 1.444c-.097.133-.31.178-.478.102-.167-.077-.225-.247-.128-.38l1.05-1.444c.097-.133.31-.178.478-.102Zm5.028.38c.097-.133.04-.303-.128-.38-.167-.077-.382-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.382.03.478-.102l1.05-1.444Zm-2.578-.38c.167.077.225.247.128.38l-1.05 1.444c-.097.133-.31.178-.478.102-.167-.077-.225-.247-.128-.38l1.05-1.444c.097-.133.31-.178.478-.102Zm5.028.38c.097-.133.04-.303-.128-.38-.167-.077-.381-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.381.03.478-.102l1.05-1.444Zm-12.25-3c.097-.133.04-.303-.128-.38-.167-.077-.381-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.381.03.478-.102l1.05-1.444Zm2.45 0c.097-.133.04-.303-.128-.38-.167-.077-.381-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.381.03.478-.102l1.05-1.444Zm2.322-.38c.167.077.225.247.128.38l-1.05 1.444c-.097.133-.31.178-.478.102-.167-.077-.225-.247-.128-.38l1.05-1.444c.097-.133.31-.178.478-.102Zm5.028.38c.097-.133.04-.303-.128-.38-.167-.077-.382-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.382.03.478-.102l1.05-1.444Zm-2.578-.38c.167.077.225.247.128.38l-1.05 1.444c-.097.133-.31.178-.478.102-.167-.077-.225-.247-.128-.38l1.05-1.444c.097-.133.31-.178.478-.102Zm5.028.38c.097-.133.04-.303-.128-.38-.167-.077-.381-.03-.478.102l-1.05 1.444c-.097.133-.04.303.128.38.167.077.381.03.478-.102l1.05-1.444Z"];
          break;
        default: // 其他所有情况
          iconName = [""];
          break;
      }

      return iconName; // 返回最终的图标代码
    },
  },
  async created() {

    try {
      const { cityId, lat, lon } = await getCityId("上海"); // 默认值为上海
      this.cityId = cityId;
      this.lat = lat;
      this.lon = lon;
      this.weather = await getRealtimeWeather(cityId);
      this.weatherEN = await getRealtimeWeatherEN(cityId);
      this.airQuality = await getCurrentAirQuality(cityId);
      this.airQualityEN = await getCurrentAirQualityEN(cityId);
      this.warning = await getWeatherWarning(cityId);
      this.warningZH = await getWeatherWarningZH(cityId);
      this.forecast = await getWeatherForecast(cityId); // 获取天气预报并赋值
      this.FirstDayTempMaxMin = await getFirstDayTempMaxMin(cityId);
    } catch (error) {
      console.error("Error fetching weather data in component:", error);
    }
  },
};
</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 水平分布，两端对齐 */
  padding: 16px; /* 根据需要调整内边距 */
}
 
.warning-content {
  flex: 1; /* 占据剩余空间 */
}
 
.warning-icon-wrapper {
  position: relative; /* 设置为相对定位，以便子元素可以使用绝对定位 */
  width: 64px; /* 设置容器宽度 */
  height: 64px; /* 设置容器高度 */
  margin-left: auto; /* 使图标靠右对齐 */
}

.text-att {
  color:  #343a40ab;
}
 
.warning-icon-wrapper svg {
  position: absolute; /* 设置为绝对定位，使其重叠 */
  top: 0; /* 顶部对齐 */
  left: 0; /* 左侧对齐 */
}
.right-align-svg {
  display: block;
  /* 这通常不是必需的，因为 svg 默认是 inline-block，但设为 block 可以确保没有其他布局干扰 */
  margin-right: 0;
  /* 这通常是默认的，但明确设置可以避免潜在的覆盖 */
}


.centered-icon {
  fill: rgb(255, 255, 255);
  position: absolute; /* 设置为绝对定位 */
  top: -18%; /* 顶部对齐到容器的中点 */
  left: -18%; /* 左侧对齐到容器的中点 */
  transform: translate(18%, 18%); /* 使用transform属性将SVG的中心点对齐到容器的中心点 */
}

.v-card {
  border-radius: 18px;
  background-color: rgba(255, 255, 255, 0);
  border-color: #cccccc00;
}

.weather-section {
  background-color: linear-gradient(140deg, #FFFFFF 0%, #FFFFFF 14%, #FCD0BC 62%, #7884C3 100%) ;
  background: no-repeat;
  position: relative;
  /* 确保子元素可以绝对定位 */
  height: 100%;
  max-width: 650px;
}

.temp-value {
  color: blue;
  font-size: 64px;
}

.temp-unit {
  color: blue;
  font-size: 32px;
}

.weather-card-p1 {
  background-color: rgba(255, 255, 255, 0);
  /* // 注意：这个背景色会应用到实时天气卡片上，如果需要也可以为天气预报卡片设置单独的背景色 */
  margin-top: 100px;
  margin-left: 40px;
}

.info-section {
  height: 50vh;
  /* 保留这个设置，如果需要可以调整 */
  display: flex;
  /* 确保子元素使用 Flexbox 布局 */
  flex-direction: column;
  /* 垂直排列子元素 */
}

/* 设置 .flex-half 和 .flex-half2 的高度 */
.flex-half,
.flex-half2 {
  height: 500px;
  /* 固定高度 */
  flex: none;
  /* 禁用 Flexbox 的默认伸缩行为 */
  align-items: center;
}

/* // 如果需要，还可以为.weather-card添加样式来调整背景图片等 */
.weather-card {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(255, 255, 255, 0.1);
}

.roche-container {
  display: flex;
  justify-content: center;
    /* 水平居中 */
  align-items: center;

}

.weather-image-container {
  position: absolute;
  top: 5%;
  /* 调整距离顶部的距离 */
  right: 10%;
  /* 调整距离右侧的距离 */
  z-index: 1;
  /* 确保图片在其他内容之上 */
}

.weather-image-container2 {
  position: absolute;
  top: 5%;
  /* 调整距离顶部的距离 */
  left: 10%;
  /* 调整距离右侧的距离 */
  z-index: 1;
  /* 确保图片在其他内容之上 */
}

.weather-image-container3 {
  position: absolute;
  top: 100px;
  /* 调整距离顶部的距离 */
  right: 60px;
  /* 调整距离右侧的距离 */
  z-index: 1;
  /* 确保图片在其他内容之上 */
}

.weather-image {
  width: 50px;
  /* 调整图片宽度 */
  height: auto;
  /* 保持图片比例 */
  /* 可以添加其他样式，如透明度、边框等 */
}

.weather-image2 {
  width: auto;
  /* 调整图片宽度 */
  height: 25px;
  /* 保持图片比例 */
  /* 可以添加其他样式，如透明度、边框等 */
}

.weather-image3 {
  width: 150px;
  /* 调整图片宽度 */
  height: auto;
  /* 保持图片比例 */
  /* 可以添加其他样式，如透明度、边框等 */
}

.fixed-image-container {
  width: 200px;
  /* 容器的宽度 */
  height: 150px;
  /* 容器的高度 */
  margin: 0 auto;
  /* 水平居中 */
  display: flex;
  /* 使用flexbox布局 */
  justify-content: center;
  /* 水平居中内容 */
  align-items: center;
  /* 垂直居中内容 */
  overflow: hidden;
  /* 防止图片溢出容器 */
  border: 1px solid #cccccc00;
  /* 可选：添加边框以更清楚地看到容器 */
}

.forecast-icon {
  width: 80px;
}

.fixed-image {
  width: 100%;
  /* 图片宽度设置为容器宽度的100% */
  height: auto;
  /* 图片高度自动调整以保持比例 */
  object-fit: cover;
  /* 图片保持比例填充容器，必要时裁剪 */
  max-width: 200px;
  /* 最大宽度，防止图片因比例问题超出容器 */
  max-height: 200px;
  /* 最大高度，同样防止超出 */
}

.icon-size {
  width: 18px;
  /* 或你想要的任何大小 */
  height: 18px;
  /* 或你想要的任何大小 */
  display: inline-block;
  /* 让图片成为内联块级元素，可以与其他内联元素在同一行 */
  vertical-align: middle;
  /* 可选，用于垂直居中对齐图片和文本 */
}

.inline-text {
  display: inline-block;
  /* 让文本成为内联块级元素 */
  vertical-align: middle;
  /* 与图片垂直居中对齐 */
  margin-left: 8px;
}

.inline-text-2 {
  display: inline-block;
  /* 让文本成为内联块级元素 */
  vertical-align: middle;
  /* 与图片垂直居中对齐 */
  margin-left: 8px;
  color:  #343a40ab;
}

.inline-text-3 {
  display: inline-block;
  /* 让文本成为内联块级元素 */
  vertical-align: middle;
  /* 与图片垂直居中对齐 */
  margin-left: 5%;;
  color:  #343a40ab;
}

.forecast {
  background-color: white;
  max-width: 110px;
  margin: 0 auto;
  /* 如果希望卡片居中 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 添加一些阴影 */
  padding-top: 15%;
  padding-bottom: 15%;
}

.weather-warning {
  width: 85%;
  background-color: #858d951e;
  /* 更改为浅灰色背景，类似卡片样式 */
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 30px;
  /* 居中卡片 */
  border: 1px solid #dee2e6;
  /* 更改边框颜色为浅灰色 */
  border-radius: 8px;
  /* 添加圆角 */
  box-shadow: 0 2px 4px rgba(174, 141, 141, 0.1);
  /* 添加轻微的阴影效果 */
  padding: 16px;
  /* 增加内边距，使内容不紧贴边框 */
  min-height: 70px;
  /* 保持最小高度 */
  text-align: center;
  /* 使内容居中 */
}

.warning-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  /* 与下面的<h3>标签保持一些间距 */
}

.warning-header p {
  margin: 0;
  /* 移除段落默认的上下边距 */
  font-weight: bold;
  /* 加粗文字 */
  color: #343a40ab;
  /* 使用深灰色文字 */
}

.warning-text {
  margin: 0;
  /* 移除标题默认的上下边距 */
  color: #343a40;
  /* 使用深灰色文字 */
  left: 16px;
  text-align: left;
  /* 左对齐文本 */
  font-size: 16px;
}

.weather-info {
  margin-top: 26px;
  /* 在温度范围和天气状况之间增加垂直间距 */
  margin-left: 10px;
}

.temp-range,
.weather-status {
  margin: 0;
  /* 确保段落之间没有额外的外边距 */
  line-height: 1.5;
  /* 调整行高，使文本更易读 */
}

.weather-card-info {
  margin: 0;
  margin-left: 2%;
  margin-right: 8%;
}

.weather-info-card {
  flex: 1;
  min-width: 200px;
  /* 根据需要调整卡片的最小宽度 */
}

.air-quality-card,
.humidity-card,
.wind-card,
.precipitation-card {
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  border-color: #cccccc00;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.weather-info-card .v-card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  /* 图标或文本与下方文本之间的间距 */
}

.weather-info-card .v-card-text p {
  margin: 0;
  /* 移除段落默认的上下边距 */
  font-size: 16px;
}

/* 如果使用了自定义图标，并且需要调整图标的大小或样式，可以在这里添加相应的CSS */
.qi-2002 {
  font-size: 24px;
  /* 根据需要调整图标大小 */
  color: #343a40;
  /* 根据需要调整图标颜色 */
}

.forecast-group {
  margin-left: 5%;
  margin-right: 5%;
}

.text-right {
  font-weight: bold;
}

.left-align-svg {
  display: block;
  /* 这通常不是必需的，因为 svg 默认是 inline-block，但设为 block 可以确保没有其他布局干扰 */
  margin-left: 0;
  /* 这通常是默认的，但明确设置可以避免潜在的覆盖 */
  margin-bottom: 16px;
}

.v-application p {
  margin-bottom: 0px;
}

.weather-brief {
  margin-left: 5%;
}

.white-background {
  background-color: white;
}

.inline-elements {
  margin-left: 5%;
}

.orange-svg {
  color: orange;
}
</style>