<template>
    <div class="mainDivAO">
        <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
            @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut" :is="'Port'"
            :type="'IN'" :parameter="'OUT'" :ID="0"></component>
    </div>
</template>

<style>
.mainDivAO{
    position: relative;
    display: flex;
    flex-direction: column;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height:100px;
    background-color: rgb(160, 51, 138);
 }
</style>
<script>
import Port from '../../components/functional/Port.vue'
export default {
    components: {
        Port
    },
    methods: {
        //PORT FUNCTIONS (EVERY MODULE NEEDS TO HAVE THESE!)
        handlePortClick(portID, x, y) {
            this.$emit("portClicked", this.$parent.moduleId, portID, x, y);
        },

        handlePortMouseMove(x, y) {
            this.$emit("modulePortMouseMoved", x, y);
        },

        handlePortMouseStopMove(portID, x, y) {
            this.$emit("modulePortMouseStopMove", this.$parent.moduleId, portID, x, y);
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