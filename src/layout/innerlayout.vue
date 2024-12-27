<template>
    <div class="roche-center-container">
        <div :class="bgClass" v-if="title">{{ title }}</div>
        <div class="roche-body">
            <img src="../assets/aclogo.png" class="roche-logo left" v-if="logo" />
            <img src="../assets/位图.png" class="roche-logo right" v-if="logo" />
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    name: "InnerLayout",
    props: {
        title: {
            type: String,
            default: ""
        },
        type: {
            type: String,
            default: "1"
        },
        logo: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        bgClass() {
            return {
                "roche-title": true,
                "bg1": this.type === "1",
                "bg2": this.type === "2"
            }
        }
    }
}
</script>

<style scoped>
.roche-center-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
}

.roche-title {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: .5px;
    font-size: 90%;
    font-weight: bold;
}

.roche-title.bg1 {
    background-repeat: no-repeat;
    background-position: center;
    background-size: 40% auto;
    background-image: url(../assets/title-bg.png);
    position: absolute;
    width:100%;
    top: 0;
    z-index: 2
}

.roche-title.bg2 {
    height: 30px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: 20% auto;
    background-image: url(../assets/title-bg-2.png);
}

.roche-body {
    flex: 1;
    position: relative;
}

.roche-logo {
    position: absolute;
    top: 0;
    z-index: 2;
}

.roche-logo.left {
    top: 2%;
    left: 2%
}

.roche-logo.right {
    top: 2%;
    right: 2%;
}
</style>