<template>
    <div class="mainDivAO">
        <component :is="'Port'" :type="'IN'" :parameter="'OUT'"></component>
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
        
    },
}
</script>