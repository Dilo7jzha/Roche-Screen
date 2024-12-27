<template>
    <div class="recommendPage">
        <h3 class="center-content">
            <div class="background-container">
                活动预告
            </div>
        </h3>
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide>
                <div class="swiper-zoom-container">
                    <img src="../assets/content1.png">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-zoom-container">
                    <img src="../assets/content2.png">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-zoom-container">
                    <img src="../assets/content1.png">
                </div>
            </swiper-slide>
            <swiper-slide>
                <div class="swiper-zoom-container">
                    <img src="../assets/content2.png">
                </div>
            </swiper-slide>
            <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
        </swiper>
    </div>
</template>

<script>
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
    name: "CustomSwiper",
    props: {
        slides: {
            type: Array,
            default() {
                return [];
            }
        },
        type: {
            type: String,
            default: "fade"
        },
        speed: {
            type: Number,
            default: 1500
        },
        delay: {
            type: Number,
            default: 5000
        },
        pagination: {
            type: Boolean,
            default: true
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    data() {
        let options;
        switch (this.type) {
            case "fade":
                options = {
                    effect: 'fade',
                }
                break;
            case "coverflow":
                options = {
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflowEffect: {
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true
                    }
                }
                break;

            case "cube":
                options = {
                    effect: 'cube',
                    grabCursor: true,
                    cubeEffect: {
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94
                    }
                }
                break;

            default:
                options = {};
                break;
        }
        let paginationOption;
        if (this.pagination) {
            paginationOption = {
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            }
        } else {
            paginationOption = {};
        }
        return {
            swiperOption: {
                speed: this.speed,// 动画切换时间，单位为毫秒
                initialSlide: 0,//默认页
                // spaceBetween: 30,//间距

                ...options,

                //effect: 'fade',

                /** coverflow begin*/
                // effect: 'coverflow',
                // grabCursor: true,
                // centeredSlides: true,
                // slidesPerView: 'auto',
                // coverflowEffect: {
                //     rotate: 50,
                //     stretch: 0,
                //     depth: 100,
                //     modifier: 1,
                //     slideShadows: true
                // },
                /** coverflow end*/

                /** cube begin*/
                // effect: 'cube',
                // grabCursor: true,
                // cubeEffect: {
                //     shadow: true,
                //     slideShadows: true,
                //     shadowOffset: 20,
                //     shadowScale: 0.94
                // },
                /** cube end*/

                // slidesPerView: 'auto',
                // centeredSlides: true,
                autoplay: {
                    delay: this.delay,// 幻灯片之间的延迟时间，单位为毫秒
                    stopOnLastSlide: false,
                    disableOnInteraction: false
                },
                // 显示分页
                ...paginationOption,
                // pagination: {
                //     el: ".swiper-pagination",
                //     clickable: true //允许分页点击跳转
                // },
                // 设置点击箭头
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev"
                }
            }
        };
    },
    computed: {
        swiper() {
            return this.$refs.mySwiper.swiper;
        }
    },
    mounted() {
        // current swiper instance
        // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
        //console.log("this is current swiper instance object", this.swiper);
    },
};
</script>
<style scoped>

.background-container {
    width: 100%;
    display: inline-block;
    background-image: url('@/assets/textbg.png');
    background-size: cover; /* 背景图片覆盖整个容器 */
    background-position: center; /* 背景图片居中 */
    background-repeat: no-repeat; /* 背景图片不重复 */
    text-align: center;
}
.recommendPage {
    position: relative;
    height: 100%;
}

.center-content {
    display: flex;
    justify-content: center;
    /* 水平居中 */
    align-items: center;
    /* 垂直居中，如果需要的话 */
    margin-top: 1%;
  }

.recommendPage .swiper-container {
    position: absolute;
    inset: 0;
    padding: 0;
    height: 90%;
    margin-top: 3%;
}

.recommendPage .swiper-container .swiper-slide {
    background-position: center;
    background-size: cover;
    height: 100%;
    width: auto;
    background: transparent;
    font-size: 16px;
    text-align: center;

    background-repeat: no-repeat;
}

/* .recommendPage .swiper-container .swiper-slide1 {
    background-image: url("https://v1.github.surmon.me/images/example/8.jpg");
}

.recommendPage .swiper-container .swiper-slide2 {
    background-image: url("https://v1.github.surmon.me/images/example/7.jpg");
}

.recommendPage .swiper-container .swiper-slide3 {
    background-image: url("https://v1.github.surmon.me/images/example/6.jpg");
} */
</style>