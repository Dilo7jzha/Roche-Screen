<!-- Activity.vue -->
<template>
  <v-col class="info-section">
    <v-row class="flex-column-container">
      <!-- 注意：这里省略了企业入驻的部分，因为它已被放在另一个组件中 -->
      <v-col cols="12" class="flex-half2">
        <v-card class="pa-4" outlined>
          <h3 class="center-content">活动预告</h3>
          <v-card-text class="text-center">
            <div class="fixed-image-container">
              <v-img :src="activityImages[currentActivityImageIndex]" class="fixed-image"></v-img>
            </div>
          </v-card-text>
          <v-btn @click="toggleRotation">Toggle Rotation</v-btn>
          <v-text-field type="number" v-model.number="rotationInterval"
            placeholder="Set interval in milliseconds"></v-text-field>
        </v-card>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>

  import image1 from '@/assets/image1.png'; // 这将返回一个图片的URL
  import image2 from '@/assets/image2.png'; // 这将返回一个图片的URL
  import image3 from '@/assets/image3.png'; // 这将返回一个图片的URL

  export default {
    data() {
      return {
        isRotating: false, // 初始化为false，但将在mounted钩子中设置为true
        activityImages: [
          image1,
          image2,
          image3
        ],
        currentActivityImageIndex: 0,
        rotationInterval: 3000, // 图片切换的时间间隔，单位为毫秒
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
      startImageRotation() {
        if (this.activityImages.length === 0) {
          console.error('No images to rotate.');
          return;
        }
        if (this.isRotating) {
          // 理论上这里不应该进入，因为startImageRotation应该在非旋转状态下被调用
          // 但为了安全起见，还是加上这个检查
          console.warn('Rotation is already started.');
          return;
        }
        this.isRotating = true;
        this.intervalId = setInterval(() => {
          this.currentActivityImageIndex = (this.currentActivityImageIndex + 1) % this.activityImages.length;
        }, this.rotationInterval);
      },
      stopImageRotation() {
        if (this.intervalId !== null) {
          clearInterval(this.intervalId);
          this.intervalId = null;
          this.isRotating = false;
        }
      },
    },
    mounted() {
      // 组件挂载后自动开始轮播
      this.startImageRotation();
    },
    beforeDestroy() {
      // 组件销毁前停止轮播
      this.stopImageRotation();
    },
  };
</script>

<style scoped>
  .center-content {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中，如果需要的话 */
    height: 100%;
    /* 可能需要设置高度以确保垂直居中有效 */
  }

  .v-card {
    border-radius: 18px;
    background-color: rgba(255, 255, 255, 0);
    border-color: #cccccc00;
  }

  .weather-section {
    background: linear-gradient(140deg, #FFFFFF 0%, #FFFFFF 14%, #FCD0BC 62%, #7884C3 100%);
    position: relative;
    /* 确保子元素可以绝对定位 */
    height: 980px;
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

  .weather-image-container {
    position: absolute;
    top: 10px;
    /* 调整距离顶部的距离 */
    right: 10px;
    /* 调整距离右侧的距离 */
    z-index: 1;
    /* 确保图片在其他内容之上 */
  }

  .weather-image-container2 {
    position: absolute;
    top: 10px;
    /* 调整距离顶部的距离 */
    left: 10px;
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
    width: 82%;
    background-color: #858d951e;
    /* 更改为浅灰色背景，类似卡片样式 */
    margin: 0 auto;
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
    margin: 10px;
    /* 卡片之间的间距 */
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
</style>