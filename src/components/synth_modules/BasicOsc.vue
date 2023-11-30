<template>
    <div class="mainDivBO">
        <div class="knobClass">
        <component  @updateknobvalue="knobUpdatedValue" :is="'Knob'" 
        :parameter="'frequency'" :label="'FREQ'" :initialValue=440
        :from=20 :to=4000>
        </component>
        
        <br>
        </div>
        <div class="knobClass2">
            <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'ADSRattack'" :label="'ATK'" :initialValue=0.1
                :from=0 :to=2> </component>
            <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'ADSRdecay'" :label="'DEC'" :initialValue=1
                :from=0 :to=2> </component>
        </div>
        <div class="knobClass3">
                        <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'ADSRsustain'" :label="'SUS'" :initialValue=0.5
                            :from=0 :to=1> </component>
                        <component @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'ADSRrelease'" :label="'REL'" :initialValue=0.5
                            :from=0 :to=5> </component>
        </div>
        <!-- sorry if it looks like crap -->
        <select v-model="selectedWaveType" @change="handleWaveTypeChange">
            <option>sine</option>
            <option>triangle</option>
            <option>sawtooth</option>
            <option>square</option>
        </select>

        <div class="portContainer">
            <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"  
                @portMouseStopMove="handlePortMouseStopMove" 
                @portHovered="handlePortHover" @portOut="handlePortOut"
                :is="'Port'" :type="'IN'" 
                :parameter="'FREQ'" 
                :modId="this.$parent.moduleId"
                :ID="0"></component>
            <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"  
                @portMouseStopMove="handlePortMouseStopMove" 
                @portHovered="handlePortHover" @portOut="handlePortOut"
                :is="'Port'" :type="'OUT'"
                :parameter="'OUT'" 
                :modId="this.$parent.moduleId"
                :ID="1"></component>
        </div>
    </div>
</template>

<style>
.mainDivBO{
    position:relative;
    display:flex;
    flex-direction: column;
    top:0%;
    left:0%;
    width:100%;
    height:100%;
    min-height:300px;
    background-color: rgb(25, 198, 117);
}

.knobClass{
    position:relative;
    display:flex;
    flex-direction: row;
    flex-wrap: wrap;
    top:0%;
    left:0%;
    width:100%;
    height:100%;
    min-height:150px;
    background-color: rgb(25, 198, 117);
}
.knobClass2 {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 150px;
    background-color: rgb(25, 198, 117);
}

.knobClass3 {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-height: 150px;
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
export default{
    inject: ['ACM'],
    components:{
        Knob,
        Port,
    },
    created(){
        this.selectedWaveType = "sine";
    },
    data(){
        return{
            selectedWaveType: "sine",
        }
    },
    methods:{
        knobUpdatedValue(data){
            var param, val;
            if(data != null){
                param = data[0];
                val = parseFloat(data[1]);
            }
            this.ACM.updateModuleParameter(this.$parent.moduleId, param, val);
        },


        //PORT FUNCTIONS (EVERY MODULE NEEDS TO HAVE THESE!)
        handlePortClick(portID, x,y){
            console.log("parent", this.$parent.moduleId)
            this.$emit("portClicked", this.$parent.moduleId, portID,x,y);
        },

        handlePortMouseMove(x,y) {
            this.$emit("modulePortMouseMoved", x,y);
        },

        handlePortMouseStopMove(modId,portID,x,y){
            console.log("stopped moving ", modId)
            this.$emit("modulePortMouseStopMove", modId, portID,x,y);
        },
        handlePortHover(portID, x, y){
            this.$emit("modulePortHover", this.$parent.moduleId, portID, x, y);
        },
        handlePortOut(portId){
            this.$emit("modulePortOut", this.$parent.moduleId, portId)
        },

        handleWaveTypeChange(){
            console.log(this.selectedWaveType)
            this.ACM.updateModuleParameter(this.$parent.moduleId, "type", this.selectedWaveType);
        }
    },
}
</script>