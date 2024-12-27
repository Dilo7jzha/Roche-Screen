<template>
  <v-app class="roche-app">
    <v-main>
      <!-- <swiper :options="swiperOption" ref="mainSwiper">
        <swiper-slide v-for="(item, index) in appData" :key="index"> -->
        <transition-group name="fade" mode="out-in" v-for="(item, index1) in appData" :key="index1">
            <div class="adjheight" v-if="currentStage === index1" key="p">
              <app-layout type="Center" v-if="item.splitType === 1">
                <template #center>
                  <swiper :options="swiperOption2" ref="subSwiper">

                    <swiper-slide v-for="(subitem, index2) in item.right" :key="index2">
                      <inner-layout v-if="subitem.contentType === '活动回放'" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '企业入驻'" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '活动预告'" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>
                    </swiper-slide>
                  </swiper>
                </template>
              </app-layout>

              <app-layout type="LeftRight" v-if="item.splitType === 2">

                <template #left>
                  <swiper :options="swiperOption2" ref="subSwiper">
                    <inner-layout type="1" logo="">
                      <weather-part />
                    </inner-layout>
                  </swiper>
                </template>
                <template #right>
                  <swiper :options="swiperOption2" ref="subSwiper">
                    <swiper-slide v-for="(subitem, index2) in item.right" :key="index2">
                      <inner-layout v-if="subitem.contentType === '活动回放'" title="活动回放" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '企业入驻'" title="企业入驻" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '活动预告'" title="活动预告" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>
                    </swiper-slide>
                  </swiper>
                </template>
              </app-layout>

              <app-layout type="LeftRightTB" v-if="item.splitType === 3">
                <template #left>
                  <swiper :options="swiperOption2" ref="subSwiper">
                    <inner-layout type="1" logo="">
                      <weather-part />
                    </inner-layout>
                  </swiper>
                </template>
                <template #right-top>
                  <swiper :options="swiperOption2" ref="subSwiper">
                    <swiper-slide v-for="(subitem, index2) in item.right" :key="index2">
                      <inner-layout v-if="subitem.contentType === '活动回放'" title="活动回放" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '企业入驻'" title="企业入驻" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '活动预告'" title="活动预告" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>
                    </swiper-slide>
                  </swiper>
                </template>
                <template #right-bottom>
                  <swiper :options="swiperOption2" ref="subSwiper">
                    <swiper-slide v-for="(subitem, index2) in item.rightBottom" :key="index2">
                      <inner-layout v-if="subitem.contentType === '活动回放'" title="活动回放" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '企业入驻'" title="企业入驻" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>

                      <inner-layout v-if="subitem.contentType === '活动预告'" title="活动预告" type="1">
                        <component :is="'CustomSwiper'" :type="swipeType(item.switchEffect)" :slides="subitem.screenContent"
                          :delay="item.screenInterval">
                        </component>

                      </inner-layout>
                    </swiper-slide>
                  </swiper>
                </template>
              </app-layout>

              <app-layout type="Center" v-if="item.splitType === 4">
                <template #center>
                  <swiper :options="swiperOption2" ref="subSwiper">
                    <video autoplay loop muted width="100%" controls>
                      <source :src="item.right[0].screenContent">
                    </video>
                  </swiper>
                </template>
              </app-layout>

              <app-layout type="Center" v-if="item.splitType === 5">
                <template #center>
                  <swiper :options="swiperOption2" ref="subSwiper">

                    <swiper-slide>
                      <inner-layout type="1" logo="">
                        <weather-part />
                      </inner-layout>
                    </swiper-slide>
                  </swiper>
                </template>
              </app-layout>
            </div>
          <!-- <div v-else-if="currentStage === 1" key="p1"></div>
          <div v-else-if="currentStage === 2" key="p2"></div> -->
        </transition-group>
        <!-- </swiper-slide> -->
      </swiper>
    </v-main>
  </v-app>
</template>

<script>
  import { swiper, swiperSlide } from "vue-awesome-swiper";
  import "swiper/dist/css/swiper.css";
  import AppLayout from './layout/layout.vue';
  import CustomSwiper from './components/CustomSwiper.vue';
  import WeatherPart from './components/WeatherPart.vue';
  import TimerComponent from './components/TimerComponent.vue';
  import EnterpriseComponent from './components/EnterpriseComponent.vue';
  import InnerLayout from './layout/innerlayout.vue';
  import { fetchImages } from './components/api.js';

  export default {
    name: 'App',
    computed: {
      swiper1() {
        return this.$refs.subSwiper.swiper;
      },
      // swiper2() {
      //   return this.$refs.mainSwiper.swiper;
      // },
    },
    components: {
      AppLayout,
      CustomSwiper,
      WeatherPart,
      EnterpriseComponent,
      InnerLayout,
      swiper,
      swiperSlide,
      TimerComponent
    },

    data() {
      return {
        layoutType: "Center",
        layoutType1: "LeftRight",
        layoutType2: "LeftRightTB",
        showSwiper: true, // 控制显示状态的变量
        rightBottom: null,
        types: [],
        slides: [],
        currentStage: 0, // 用于跟踪当前的显示阶段（0: P, 1: P1, 2: P2）
        stageDurations: [], // 初始化为空数组，等待接口数据
        startTime: null, // 用于记录上一个阶段开始的时间
        intervalId: null, // 用于存储定时器的ID
        appData: null,
        switchInterval: null, // 定时器变量
        screenIntervals: [],
        rights: [],
        swiperOption: {
          effect: 'fade',
          fadeEffect: {
            crossFade: true,
          },
          speed: 1500,// 动画切换时间，单位为毫秒
          initialSlide: 0,
          autoplay: {
            delay: 240,// 大屏模式之间的延迟时间，单位为毫秒
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
        },
        swiperOption2: {
          effect: 'fade',
          speed: 1500,// 动画切换时间，单位为毫秒
          initialSlide: 0,
          fadeEffect: {
            crossFade: true,
          },
          autoplay: {
            delay: 2000,// 幻灯片之间的延迟时间，单位为毫秒
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
        },
        appData: []
      }
    },
    computed: {
      totalDuration() {
        return this.stageDurations.reduce((sum, duration) => sum + duration, 0); // 计算总持续时间
      },
    },
    mounted() {
      this.startTime = Date.now(); // 记录当前时间作为开始时间
      this.intervalId = setInterval(this.updateStage, 1000); // 每秒检查一次阶段
    },
    created() {
      this.init();
    },
    methods: {
      async init() {
        const data = await fetchImages();
        this.appData = data;
        this.types = data.map(item => item.splitType);
        this.screenIntervals = data.map(item => item.screenInterval);
        this.rights = data.map(item => item.right);
        this.totalInterval = data.map(item => item.totalInterval)[0];
        //this.swiperOption.autoplay.delay = this.totalInterval;
        //console.log("123",this.$refs.mainSwiper.swiper.params.autoplay.delay);
        //this.$refs.mainSwiper.swiper.params.autoplay.delay=this.totalInterval;
        this.stageDurations = data.map(item => item.totalInterval);
        this.resetTimer(); // 数据更新后重置定时器
      },
      stageDurationFor(index) {
        return this.stageDurations[index];
      },
      stageEndFor(index) {
        let cumulativeDuration = 0;
        for (let i = 0; i <= index; i++) {
          cumulativeDuration += this.stageDurations[i];
        }
        return cumulativeDuration - this.stageDurations[index]; // 返回当前阶段结束前的累计时间（不包括当前阶段自身的时间）
      },
      updateStage() {
        const elapsed = Math.floor((Date.now() - this.startTime) / 1000); // 计算已过去的时间（秒）
        let cumulativeDuration = 0; // 累计持续时间
  
        // 遍历阶段持续时间数组，找到当前阶段或确定是否需要重置循环
        for (let i = 0; i < this.stageDurations.length; i++) {
          cumulativeDuration += this.stageDurations[i];
          if (elapsed < cumulativeDuration) {
            this.currentStage = i; // 更新当前阶段
            break;
          } else if (elapsed >= this.totalDuration) {
            // 如果已过去的时间超过总持续时间，则重置循环
            this.startTime = Date.now() - (elapsed % this.totalDuration); // 计算新的开始时间以重置循环
            this.currentStage = 0; // 从第一个阶段开始新的循环
            break;
          }
        }
      },
      resetTimer() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
        }
        this.startTime = Date.now();
        this.intervalId = setInterval(this.updateStage, 1000);
      },
      swipeType(switchEffect) {
        let value;
        switch (switchEffect) {
          case 1:
            value = "fade";
            break;
          case 2:
            value = "slides";
            break;
          case 3:
            value = "coverflow";
            break;
        }
        return value
      },
      getScreenInterval(number, eachInterval, speed) {
        return eachInterval * number + (number - 1) * speed;
      },
      startSwitchInterval() {
        // 清除之前的定时器
        if (this.switchInterval) {
          clearInterval(this.switchInterval);
        }
        // 设置新的定时器
        this.switchInterval = setInterval(() => {
          this.showSwiper = !this.showSwiper; // 切换显示状态
        }, 10000); // 每隔3秒切换
      }
    },
    beforeDestroy() {
      clearInterval(this.intervalId); // 组件销毁前清除定时器
    }
  };
</script>

<style scoped>
  .roche-app /deep/ .swiper-container {
    height: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 1s; /* 过渡效果持续1秒 */
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0; /* 初始和结束时的透明度 */
  }
  .adjheight {
    height: 100%;
  }
</style>