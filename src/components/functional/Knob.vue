/*
adapted from https://codepen.io/wkms/pen/rNdqKzQ
*/

<script>
import { mapValue } from "../../scripts/utils/utils.js"
export default {
    props: {
        parameter: String, //The parameter the knob controls
        label: String, 
        initialValue: Number, //its initial value
        from: Number, //the minimum value
        to: Number, //the maximum value
    },
    emits:{
        updateknobvalue: null,
        //if needed validate here. Don't have time for doing everything properly
        //since we're running late :|
    },
    created(){
        this.currentKnobValue = this.initialValue;
        this.currentAngle = mapValue(this.currentKnobValue,this.from,this.to,-135,135);
        this.currentAngle = parseFloat(this.currentAngle)
    },
    data(){
        return{
            currentKnobValue:0,  
            isDraggingKnob:false,
            currentAngle:0,
            startPosition : {
                x:Number,y:Number
            },
            draggingDirection:0,
        };
    },
    methods: {
        startDraggingKnob(event){
            //if control is pressed return
            if (event.ctrlKey) {
                return;
            }
            this.isDraggingKnob = true;
            this.startPosition = {
                x: event.clientX,
                y: event.clientY,
            };
            this.draggingDirection = 0;
            window.addEventListener("mousemove", this.handleDragKnob);
            window.addEventListener("mouseup", this.stopDraggingKnob);
        },
        handleDragKnob(event) {
            this.draggingDirection = event.clientX - this.startPosition.x;
            this.draggingDirection = this.draggingDirection / Math.abs(this.draggingDirection);
            if(this.draggingDirection==0)
                this.draggingDirection = 1;

            if (this.isDraggingKnob && this.draggingDirection != 0 ) {
                this.currentAngle = this.currentAngle+10*this.draggingDirection;
                if(Math.abs(this.currentAngle)>=135){
                    let temp = this.currentAngle / Math.abs(this.currentAngle);
                    this.currentAngle = 135 * temp;
                }
                this.currentKnobValue = mapValue(this.currentAngle,-135,135, this.from, this.to);
            }
            if(isNaN(this.currentKnobValue)){
                //sometimes this happens
                this.currentKnobValue = this.from;
                this.currentAngle = -135;
                this.draggingDirection = 0;
            }
            this.updateKnobValue()
        },
        stopDraggingKnob() {
            this.isDraggingKnob = false;
            window.removeEventListener("mousemove", this.handleDragKnob);
            window.removeEventListener("mouseup", this.stopDraggingKnob);
        },
        updateKnobValue() {
            this.$emit('updateknobvalue', [this.parameter, this.currentKnobValue]);
        },
    }
};
/*
const knob = document.getElementById("knob-inner");
const pointer = document.getElementById("knob-pointer");
const currentValue = document.getElementById("current-value");

let center = 0;
let mouseIsDown = false;
let distance;

function clamp(value, max, min) {
    if (value > max) return max;
    if (value < min) return min;
    return value;
}

knob.addEventListener("mousedown", (e) => {
    center = e.pageY;
    mouseIsDown = true;
});

knob.addEventListener("mouseup", (e) => {
    mouseIsDown = false;
});

knob.addEventListener("dblclick", (e) => {
    mouseIsDown = false;
    knob.style.transform = "rotate(0deg)";
    currentValue.innerHTML = "0";
});

knob.addEventListener("mousemove", (e) => {
    if (mouseIsDown) {
        distance = clamp(center - e.pageY, 100, -100);
        knob.style.transform = "rotate(" + distance * 1.35 + "deg)";
        currentValue.innerHTML = distance;
    }
});
*/

</script>
<template>
    <div class="wrapper">
        <div class="label parameter">{{label}}</div>
        <div class="knob">
            <div class="label label-l">{{from}}</div>
            <div class="knob_inner" id="knob-inner" :style="{ transform: 'rotate(' + currentAngle + 'deg)' }" @mousedown="startDraggingKnob">
                <div class="knob_inner_pointer" id="knob-pointer">
                </div>
            </div>
            <div class="current-value" id="current-value" v-if="isDraggingKnob">{{currentKnobValue}}</div>
            <div class="label label-r">{{to}}</div>
        </div>
    </div>
</template>


<style scoped>
.wrapper {
    top: 0%;
    left: 20%;
    width:100px;
    position: relative;
    transform: translateX(-50%);
}

.parameter{
    transform: translateY(90%);
    text-align:center;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    text-shadow: 0px 0px 2px #000;
}
.knob {
    position: relative;
    width: 50px;
    height: 50px;
    margin: auto;
    cursor: pointer;
}

.knob_inner {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid rgb(235, 235, 235);
    outline: 3px solid #272d36;
    background-color: #272d36;
    box-shadow: 0px 0px 8px #000;
}

.knob_inner_pointer {
    position: relative;
    width: 12px;
    height: 12px;
    top: 6px;
    border-radius: 100px;
    background-color: rgb(254, 254, 254);
    left: 50%;
    transform: translate(-50%);
    box-shadow: 0px 0px 2px inset;
}

.label-l {
    position:absolute;
    left: -20%;
}

.label-r {
    position: absolute;
    right: -20%;
}

.label {
    position: relative;
    font-size: 16px;
    
    user-select: none;
}

.instructions {
    position: relative;
    top: 48px;
    font-size: 16px;
    user-select: none;
    font-weight: 700;
}

.current-value {
    position: relative;
    top: 36px;
    width: 50px;
    border-radius: 8px;
    margin: auto;
    text-align: center;
    font-size: 32px;
    user-select: none;
    font-weight: 700;
    padding: 5px;
    background-color: rgb(120,120,120,0.9);
    color:white;
    transform:translateY(-250%)
}
</style>