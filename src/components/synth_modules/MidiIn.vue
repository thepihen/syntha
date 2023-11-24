//design adapted from https://codepen.io/zastrow/pen/kxdYdk

<template>
    <div class="mainDivMI">
        <ul class="set">
            <li class="white c"></li>
            <li class="black cs"></li>
            <li class="white d"></li>
            <li class="black ds"></li>
            <li class="white e"></li>
            <li class="white f"></li>
            <li class="black fs"></li>
            <li class="white g"></li>
            <li class="black gs"></li>
            <li class="white a"></li>
            <li class="black as"></li>
            <li class="white b"></li>
        </ul>
    </div>
    <div class="portContainer">
        <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
            @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut"
            :is="'Port'" :type="'OUT'" :parameter="'OUT'" :modId="this.$parent.moduleId" :ID="0"></component>
    </div>
</template>

<style>
* {
    box-sizing: border-box
}

body {
    margin: 0;
    background: #222
}

ul {
    height: 18.875em;
    width: 34em;
    position: relative;
}

li {
    margin: 0;
    padding: 0;
    list-style: none;
    position: relative;
    float: left
}

ul .white {
    height: 16em;
    width: 4em;
    z-index: 1;
    /*
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;
    */
    border: 1px solid #bbb;
    border-radius: 0 0 5px 5px;
    box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset, 0 0 3px rgba(0, 0, 0, 0.2);
    /*background: linear-gradient(to bottom, #eee 0%, #fff 100%)*/
    background-color: rgb(24, 24, 24);
}

ul .white:active {
    border-top: 1px solid #777;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
    box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset, -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%)
}

.black {
    height: 8em;
    width: 2em;
    margin: 0 0 0 -1em;
    z-index: 2;
    border: 1px solid #bbb;
    border-radius: 0 0 3px 3px;
    box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset, 0 0 3px rgba(0, 0, 0, 0.2);
    /*box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);*/
    background-color: rgb(24, 24, 24);
}

.black:active {
    box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
    background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%)
}

.a,
.g,
.d,
.c,
.e,
.b {
    margin: 0 0 0 -1em
}

ul li:first-child {
    border-radius: 5px 0 5px 5px
}

ul li:last-child {
    border-radius: 0 5px 5px 5px
}

.mainDivMI {
    position: relative;
    display: flex;
    flex-direction: row;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    min-width: 250px;
    min-height: 150px;
    background-color: rgb(24, 24, 24);
}


.portContainer {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: rgb(24,24,24);
}
</style>
<script>
import Knob from '../functional/Knob.vue';
import Port from '../functional/Port.vue';
export default {
    inject: ['ACM'],
    components: {
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