<!-- Enterprise.vue -->
<template>
    <v-row>
        <v-col class="info-section">
            <v-row class="flex-column-container">
                <v-col cols="12" class="flex-half">
                    <v-card class="pa-4" outlined>
                        <v-card-text class="text-center">
                            <div class="fixed-image-container">
                                <img :src="getMatUrl(screenData.data.right.find(item => item.contentType === '企业入驻')?.screenContent[0])" height="100%" width="auto"/>
                                <!-- 使用v-if确保在数据加载前不渲染v-img -->
                                <!-- <v-img v-if="screenData && screenData.data && screenData.data.right"
                                       :src="screenData.data.right.find(item => item.contentType === '企业入驻')?.screenContent[0]"
                                       class="fixed-image"></v-img> -->
                                <!-- 可选：在数据加载或未找到图片时显示占位符 -->
                                <!-- <v-img v-else src="@/assets/aclogo.png"  class="fixed-image"></v-img> -->
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
                <!-- 注意：这里省略了活动预告的部分，因为它将被放在另一个组件中 -->
            </v-row>
        </v-col>
    </v-row>
</template>

<script>
import { fetchScreenData } from './api'; // 假设 api.js 在同一目录下
 
 export default {
     data() {
         return {
             screenData: null,
             loading: true,
             error: null
         };
     },
     created() {
         this.loadScreenData();
     },
     methods: {
         loadScreenData() {
             fetchScreenData()
                 .then(data => {
                     this.screenData = data;
                 })
                 .catch(error => {
                     this.error = error.message;
                 })
                 .finally(() => {
                     this.loading = false;
                 });
         },
     }
 };
</script>

<style scoped>
.background-container {
    width: 50%;
    height: auto;
    display: inline-block;
    background-image: url('@/assets/textbg.png');
    background-size: cover; /* 背景图片覆盖整个容器 */
    background-position: center; /* 背景图片居中 */
    background-repeat: no-repeat; /* 背景图片不重复 */
    text-align: center;
}
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

.temp-value {
    color: blue;
    font-size: 64px;
}

.temp-unit {
    color: blue;
    font-size: 32px;
}

.info-section {
    height: 100%;
    /* 保留这个设置，如果需要可以调整 */
    display: flex;
    /* 确保子元素使用 Flexbox 布局 */
    flex-direction: column;
    /* 垂直排列子元素 */
}

/* 设置 .flex-half 和 .flex-half2 的高度 */
.flex-half,
.flex-half2 {
    height: 100%;
    /* 固定高度 */
    flex: none;
    /* 禁用 Flexbox 的默认伸缩行为 */
    align-items: center;
}

.fixed-image-container {
    width: 100%;
    /* 容器的宽度 */
    height: auto;
    /* 容器的高度 */
    margin: 0 auto;
    /* 水平居中 */
    display: flex;
    /* 使用flexbox布局 */
    justify-content: center;
    /* 水平居中内容 */
    align-items: center;
    /* 垂直居中内容 */
    border: 1px solid #cccccc00;
    /* 可选：添加边框以更清楚地看到容器 */
}

.forecast-icon {
    width: 80px;
}

.fixed-image {
    height: 100%;
    /* 图片宽度设置为容器宽度的100% */
    width: auto;
    /* 图片高度自动调整以保持比例 */
    object-fit: cover;
    /* 图片保持比例填充容器，必要时裁剪 */
    max-width: 100%;
    /* 最大宽度，防止图片因比例问题超出容器 */
    max-height: auto;
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