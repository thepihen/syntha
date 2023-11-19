<template>
    <div class="mainDivBO">
        <div class="knobClass">
        <component  @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'FREQ'" :initialValue=440
            :from=20 :to=4000>
        </component>
        <component  @updateknobvalue="knobUpdatedValue" :is="'Knob'" :parameter="'ATK'" :initialValue=4 :from=3
            :to=10> </component>
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
    top:0%;
    left:0%;
    width:100%;
    height:100%;
    min-height:300px;
    background-color: rgb(25, 198, 117);
}
</style>
<script>
import Knob from '../functional/Knob.vue';
export default{
    components:{
        Knob,
    },
    methods:{
        knobUpdatedValue(data){
            console.log(data);
            var param, val;
            if(data != null){
                param = data[0];
                val = parseFloat(data[1]);
                console.log(param);
                console.log(val);
            }
        }
    },
}
</script>