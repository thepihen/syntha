<template>
    <div class="mainDivRev">
        <div class="knobClassRev">
            <!-- commented because honestly the way tone handles the decay is retarded -->
            <!--
            <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'decay'" :label="'DEC'"
                :initialValue=500 :from=50 :to=5000>
            </component>
            -->
            <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'wet'" :label="'DRY/WET'"
                :initialValue=0.5 :from=0 :to=1> </component>
        </div>

        <div class="portContainerRev">
            <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
                @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut"
                :is="'Port'" :type="'IN'" :parameter="'IN'" :modId="this.$parent.moduleId" :ID="0"></component>
            <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
                @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut" :is="'Port'"
                :type="'OUT'" :parameter="'OUT'" :modId="this.$parent.moduleId" :ID="1"></component>
        </div>
    </div>
</template>

<style>
.mainDivRev {
    position: relative;
    display: flex;
    flex-direction: column;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 150px;
    background-color: rgb(68, 48, 96);
}

.knobClassRev {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 5%;
    width: 95%;
    height: 100%;
    min-height: 300px;
    background-color: rgb(68, 48, 96);
}

.portContainerRev {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgb(68, 48, 96);
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
    data(){
        return{
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