//design adapted from https://codepen.io/zastrow/pen/kxdYdk

<template>
    <div class="mainDivMI">
        <ul class="set">
            <!-- note the setActiveKey key is referred to the key you press 
            on your keyboard, not the actual key on the piano! -->
            <li class="white c" @click="setActiveKey('a')" :class="{ 'w-active': activeKey === 'a' }"></li>
            <li class="black cs" @click="setActiveKey('w')" :class="{ 'b-active': activeKey === 'w' }"></li>
            <li class="white d" @click="setActiveKey('s')" :class="{ 'w-active': activeKey === 's' }"></li>
            <li class="black ds" @click="setActiveKey('e')" :class="{ 'b-active': activeKey === 'e' }"></li>
            <li class="white e" @click="setActiveKey('d')" :class="{ 'w-active': activeKey === 'd' }"></li>
            <li class="white f" @click="setActiveKey('f')" :class="{ 'w-active': activeKey === 'f' }"></li>
            <li class="black fs" @click="setActiveKey('t')" :class="{ 'b-active': activeKey === 't' }"></li>
            <li class="white g" @click="setActiveKey('g')" :class="{ 'w-active': activeKey === 'g' }"></li>
            <li class="black gs" @click="setActiveKey('y')" :class="{ 'b-active': activeKey === 'y' }"></li>
            <li class="white a" @click="setActiveKey('h')" :class="{ 'w-active': activeKey === 'h' }"></li>
            <li class="black as" @click="setActiveKey('u')" :class="{ 'b-active': activeKey === 'u' }"></li>
            <li class="white b" @click="setActiveKey('j')" :class="{ 'w-active': activeKey === 'j' }"></li>
        </ul>
    </div>
    <div class="portContainer">
        <!-- this could probably be automated with a v-for but I'm lazy -->
        <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
            @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut"
            :is="'Port'" :type="'OUT'" :parameter="'V/OCT'" :modId="this.$parent.moduleId" :ID="0"></component>

            
        <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
            @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut" :is="'Port'"
            :type="'OUT'" :parameter="'GATE'" :modId="this.$parent.moduleId" :ID="1"></component>
            
        <component @portClicked="handlePortClick" @portMouseMoved="handlePortMouseMove"
            @portMouseStopMove="handlePortMouseStopMove" @portHovered="handlePortHover" @portOut="handlePortOut" :is="'Port'"
            :type="'OUT'" :parameter="'VEL'" :modId="this.$parent.moduleId" :ID="2"></component>
        <!-- you could go on and on... but that doesn't make sense here -->
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
/*
ul .white:active {
    border-top: 1px solid #777;
    border-left: 1px solid #999;
    border-bottom: 1px solid #999;
    box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset, -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
    background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%)
}
*/
.w-active {
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
.b-active {
    box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
    background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%)
}
/*
.black:active {
    box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset, 0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
    background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%)
}
*/

.a,.g,.d,.c,.e,.b {
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
    data(){
        return{
            activeKey:null,
        }
    },
    emits: ['portClicked', 'modulePortMouseMoved', 'modulePortMouseStopMove', 'modulePortHover', 'modulePortOut'],
    created() {
        window.addEventListener("keydown", this.playKeyPressed);
        window.addEventListener("keyup", this.playKeyReleased);
    },
    methods: {
        playKeyPressed(event){
            this.setActiveKey(event.key)
        },
        setActiveKey(key){
            this.activeKey = key.toLowerCase();
        },
        playKeyReleased(event){
            if(this.activeKey == event.key.toLowerCase()){
                this.activeKey = null;
            }
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