//design adapted from https://codepen.io/zastrow/pen/kxdYdk

<template>
    <div class="mainDivFilter">
        <div class="knobClassFilter">
            <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'frequency'" :label="'FREQ'"
                :initialValue=1500 :from=20 :to=18000>
            </component>
            <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'Q'" :label="'Q'" :initialValue=0
                :from=0 :to=10> </component>
        </div>
    
    </div>
    
    <div class="portContainerFilter">
        <select v-model="selectedFilterType" @change="handleFilterTypeChange">
            <option>lowpass</option>
            <option>highpass</option>
            <option>bandpass</option>
        </select>
        <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
            @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut" :is="'Port'"
            :type="'IN'" :parameter="'IN'" :modId="this.$parent.moduleId" :ID="0"></component>
        <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
            @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut" :is="'Port'"
            :type="'OUT'" :parameter="'OUT'" :modId="this.$parent.moduleId" :ID="1"></component>
    </div>
</template>

<style>
/*
* {
    box-sizing: border-box
}
*/


.mainDivFilter {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-width: 250px;
    min-height: 150px;
    background-color: rgb(185, 149, 91);
    color: #bbb;
}
.knobClassFilter {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 150px;
    background-color: rgb(107, 86, 53);
}

.portContainerFilter {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgb(107, 86, 53);
}
</style>
<script>
import Port from '../functional/Port.vue';
import Knob from '../functional/Knob.vue';
export default {
    inject: ['ACM'],
    components: {
        Port,
        Knob,
    },
    data() {
        return {
            selectedFilterType: "lowpass",
        }
    },
    emits: ['portClicked', 'modulePortMouseMoved', 'modulePortMouseStopMove', 'modulePortHover', 'modulePortOut'],
    methods: {
        knobUpdatedValue(data) {
            var param, val;
            if (data != null) {
                param = data[0];
                val = parseFloat(data[1]);
            }
            this.ACM.updateModuleParameter(this.$parent.moduleId, param, val);
        },


        //PORT FUNCTIONS (EVERY MODULE NEEDS TO HAVE THESE!)
        handlePortClick(portID, x, y) {
            console.log("parent", this.$parent.moduleId)
            this.$emit("portClicked", this.$parent.moduleId, portID, x, y);
        },

        handlePortMouseMove(x, y) {
            this.$emit("modulePortMouseMoved", x, y);
        },

        handlePortMouseStopMove(modId, portID, x, y) {
            console.log("stopped moving ", modId)
            this.$emit("modulePortMouseStopMove", modId, portID, x, y);
        },
        handlePortHover(portID, x, y) {
            this.$emit("modulePortHover", this.$parent.moduleId, portID, x, y);
        },
        handlePortOut(portId) {
            this.$emit("modulePortOut", this.$parent.moduleId, portId)
        },

        handleFilterTypeChange() {
            this.ACM.updateModuleParameter(this.$parent.moduleId, "type", this.selectedFilterType);
        }
    },
}
</script>