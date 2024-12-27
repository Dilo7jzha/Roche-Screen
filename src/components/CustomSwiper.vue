<template>
    <div class="roche-swiper">
        <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(item, index) in slides" :key="index">
                <div class="swiper-zoom-container" v-if="zoomContainer">
                    <div v-if="getMediaType(item) === 'image'">
                        <img :src="getMatUrl(item)">
                    </div>
                    <div v-else>
                        <video width="100%" height="100%" controls>
                            <source :src="item">
                        </video>
                    </div>
                </div>
                <img :src="getMatUrl(item)" v-else-if="getMediaType(item) === 'image'">
                <video autoplay loop muted width="100%" controls v-else>
                    <source :src="item">
                </video>

            </swiper-slide>

            <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
            <div class="swiper-button-prev swiper-button-white" slot="button-prev" v-if="navigation"></div>
            <div class="swiper-button-next swiper-button-white" slot="button-next" v-if="navigation"></div>
            <div class="swiper-scrollbar" slot="scrollbar" v-if="scrollbar"></div>
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
                    return [
                        {
                            type: 'image',
                            url: require("../assets/content-img.png"),
                            title: ''
                        },
                        {
                            type: 'image',
                            url: require("../assets/content-img.png"),
                            title: ''
                        },
                        {
                            type: 'video',
                            url: require("../assets/sample-video.mp4"), // 注意：这里通常不能直接 require 一个视频文件，你可能需要提供一个静态路径
                            title: 'Sample Video'
                        }
                    ];
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
            },
            zoomContainer: {
                type: Boolean,
                default: false
            },
            scrollbar: {
                type: Boolean,
                default: false
            },
            navigation: {
                type: Boolean,
                default: false
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
                        fadeEffect: {
                            crossFade: true,
                        }
                    }
                    break;
                case "coverflow":
                    options = {
                        effect: 'coverflow',
                        grabCursor: true,
                        centeredSlides: true,
                        slidesPerView: 'auto',
                        autoplay: false,
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
                            shadow: false,
                            slideShadows: false,
                        }
                    }
                    break;
                case "flip":
                    options = {
                        effect: 'flip',
                        grabCursor: true,
                        flipEffect: {
                            shadow: false,
                            slideShadows: false,
                        }
                    }
                    break;
                case "slides":
                    options = {
                        spaceBetween: 200,//间距
                        slidesPerView: "auto",
                        centeredSlides: true,
                    }
                    break;
                default:
                    options = {};
                    break;
            }

            let paginationOption = {};
            if (this.pagination) {
                paginationOption = {
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                }
            }

            let scrollbarOption = {};
            if (this.scrollbar) {
                scrollbarOption = {
                    scrollbar: {
                        el: '.swiper-scrollbar',
                        hide: true
                    }
                }
            }

            let navigationOptions = {};
            if (this.navigation) {
                navigationOptions = {
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }
                }
            }

            return {
                swiperOption: {
                    loop: this.slides.length > 1, 
                    // loop: ture,
                    speed: this.speed,// 动画切换时间，单位为毫秒
                    initialSlide: 0,//默认页

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
                    autoplay: this.slides.length > 1 ? { // 当只有一张图片时，不自动播放
                        delay: this.delay,
                        stopOnLastSlide: false,
                        disableOnInteraction: false
                    } : false,
                    // autoplay: {
                    //     delay: this.delay,// 幻灯片之间的延迟时间，单位为毫秒
                    //     stopOnLastSlide: false,
                    //     disableOnInteraction: false
                    // },
                    // 显示分页
                    ...paginationOption,
                    ...scrollbarOption,
                    ...navigationOptions,// 设置点击箭头
                    // pagination: {
                    //     el: ".swiper-pagination",
                    //     clickable: true //允许分页点击跳转
                    // },
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
        methods: {
            getMediaType(src) {
                // src = src.toLowerCase();
                // console.log("src"+src);
                // let fileType = src.substring(src.lastIndexOf('.') + 1);
                // switch (fileType) {
                //     case "png":
                //     case "jpg":
                //     case "jpeg":
                //     case "svg":
                //     case "gif":
                //         return "image";
                //     default:
                //         return "video";

                // }

                if (src.indexOf("userFileId") == -1) {
                    return "video";
                } else {
                    return "image";
                }

            }
        }
    };
</script>
<style scoped>
    .roche-swiper {
        position: relative;
        height: 100%;
    }

    .roche-swiper .swiper-container {
        position: absolute;
        inset: 0;
        padding: 0;
        height: 100%;
    }

    .roche-swiper .swiper-container .swiper-slide {
        height: 100%;
        width: auto;
        background: transparent;
        font-size: 16px;
        text-align: center;
    }

    .roche-swiper .swiper-container .swiper-slide img {
        height: 100%;
        width: auto;
    }

    .roche-swiper /deep/ .swiper-pagination-bullet {
        width: 30px;
        height: 5px;
        border-radius: 0px;
        background: #ffffffe0;
        transition: all 1.5s;
    }
</style>