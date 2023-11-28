//Not actually a VCA, but in the future it might be...
//for now it's just a gain module
<template>
    <div class="mainDivVCA">
        <div class="knobClassVCA">
            <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'factor'" :label="'GAIN'"
                :initialValue=1 :from=0 :to=2> </component>
        </div>

        <div class="portContainerVCA">
            <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
                @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut"
                :is="'Port'" :type="'IN'" :parameter="'IN'" :modId="this.$parent.moduleId" :ID="0"></component>
            <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
                @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut"
                :is="'Port'" :type="'OUT'" :parameter="'OUT'" :modId="this.$parent.moduleId" :ID="1"></component>
        </div>
    </div>
</template>

<style>
.mainDivVCA {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 150px;
    background-color: rgb(82, 132, 155);
}

.knobClassVCA {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 5%;
    width: 95%;
    height: 100%;
    min-height:100px;
    background-color: rgb(82, 132, 155);
}

.portContainerVCA {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgb(82, 132, 155);
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
    data() {
        return {
            timeOutID: -1,
        }
    },
    methods: {
        knobUpdatedValue(data) {
            clearTimeout(this.timeOutID);
            var param, val;
            if (data != null) {
                param = data[0];
                val = parseFloat(data[1]);
            }
            //this is needed because tonejs handles the reverb decay in a stupid
            //manner... Basically every time it is changed 
            //it is like creating a new reverb object, hence moving this 
            //knob would crash the entire browser...
            this.timeOutID = setTimeout(() => {
                this.ACM.updateModuleParameter(this.$parent.moduleId, param, val);
            }, 100);
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
    },
}
</script>