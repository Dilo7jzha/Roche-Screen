<template>
    <div :class="layoutClass">
        <v-row no-gutters class="fill-height" v-if="type === 'Center'">
            <v-col :cols="12" class="content-panel">
                <slot name="center" />
            </v-col>
        </v-row>
        <v-row no-gutters class="fill-height" v-else-if="type === 'LeftRight'">
            <v-col :cols="4" class="left-panel">
                <slot name="left" />
            </v-col>
            <v-col :cols="8">
                <div class="right-panel-wapper">
                    <div class="right-panel">
                        <slot name="right" />
                    </div>
                </div>
            </v-col>
        </v-row>
        <v-row no-gutters class="fill-height" v-else-if="type === 'LeftRightTB'">
            <v-col :cols="4" class="left-panel">
                <slot name="left" />
            </v-col>
            <v-col :cols="8">
                <div class="right-panel-group">
                    <div style="height: 70%;" class="right-top-panel">
                        <slot name="right-top" />
                    </div>
                    <div style="height: 30%;" class="right-bottom-panel">
                        <slot name="right-bottom" />
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "AppLayout",
    props: {
        type: {
            type: String,
            default: "Center"
        }
    },
    computed: {
        layoutClass() {
            return {
                'fill-height': true,
                'roche-layout': true,
                'nopadding': this.type === 'Center'
            }
        }
    }
}
</script>
<style scoped>
.roche-layout {
    background: #F4F5FA;


}

.roche-layout.nopadding {
    padding: 0;
}

/* .roche-layout /deep/ .row {
    flex-direction: row;
    flex-wrap: nowrap;
} */

.content-panel {
    border-radius: 16px;
    border: 2px solid #FFFFFF;
    background: linear-gradient(140deg, #FFFFFF 0%, #FFFFFF 14%, #FCD0BC 62%, #7884C3 100%);
}

.left-panel {
    /* margin-right: 12px; */
    /* margin-top: -12px;
    margin-bottom: -12px;
    margin-left: -12px; */
    background: linear-gradient(140deg, #FFFFFF 0%, #FFFFFF 14%, #FCD0BC 62%, #7884C3 100%);

}

.right-panel-wapper {
    height: 100%;
    padding: 12px;
}

.right-panel {
    background: linear-gradient(137deg, #E3EFF8 0%, #FEEAE2 100%);
    box-shadow: 0px 2px 15px 0px rgba(178, 180, 190, 0.31);
    border-radius: 16px;
    height: 100%;
    border: 2px solid #FFFFFF;
}

.right-top-panel {
    background: linear-gradient(180deg, #FFF7F4 0%, #FFFFFF 47%, #FFFFFF 100%);
    box-shadow: 0px 2px 15px 0px rgba(178, 180, 190, 0.31);
    border-radius: 16px;
    margin-bottom: 12px;
}

.right-bottom-panel {
    background: linear-gradient(180deg, #FFF7F4 0%, #FFFFFF 47%, #FFFFFF 100%);
    box-shadow: 0px 2px 15px 0px rgba(178, 180, 190, 0.31);
    border-radius: 16px;
}

.right-panel-group {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 12px;
    height: 100%;
}

/* .roche-center-container {
    display: flex;
    flex-direction: column;
    height: 100%;

}

.roche-title {
    height: 4%;
    background-image: url(../assets/title-bg.png);
    background-repeat: no-repeat;
    background-position: top;
    background-size: 40% 100%;
    font-weight: bold;
    display: flex;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: .5px;
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
    left: 2%
}

.roche-logo.right {
    right: 2%;
} */
</style>