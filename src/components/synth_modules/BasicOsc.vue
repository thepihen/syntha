<template>
    <div class="mainDivBO">
        Yehjhsrijongfjrdbob
        dthokodko

        tkohtokhto

    </div>
    <component :is="'Knob'" :parameter="'ATK'" :initialValue=4
                    :from=3 :to=10
                    > </component>
</template>

<style> 
.mainDivBO{
    width:500px;
    height:500px;
    background-color: rgb(25, 198, 117);
}
</style>
<script>
import Knob from '../functional/Knob.vue';
export default{
    components:{
        Knob,
    }
}
</script>