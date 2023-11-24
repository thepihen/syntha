//horizontal: pitch
//vertical: amplitude
<template>
    <div class="mainDivThe">
        <div class="portContainer">
            <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
                @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut"
                :is="'Port'" :type="'OUT'" :parameter="'OUT'" :modId="this.$parent.moduleId" :ID="0"></component>
        </div>
    </div>
</template>

<style>
.mainDivThe {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 300px;
    background-color: rgb(25, 198, 117);
}

.knobClass {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 300px;
    background-color: rgb(25, 198, 117);
}

.portContainer {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgb(25, 198, 117);
}
</style>
<script>
import Knob from '../functional/Knob.vue';
import Port from '../functional/Port.vue';
export default {
    inject: ['ACM'],
    components: {
        Knob,
        Port,
    },
    created() {

    },
    methods: {
        

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
    },
}
</script>