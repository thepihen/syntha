<template>
    <div class="container" 
            @mouseover="handlePortMouseOver"
           @mouseout="handlePortMouseOut" 
           @mousedown="handlePortMouseClick">
        <div class="square" :style="{ backgroundColor: squareColor }">
            <div class="circle" :style="{ backgroundColor: circleColor, borderColor: circleBorderColor }">
                <div class="innerCircle" ref="innerCircle"></div>
            </div>
        </div>
    </div>
    <div class="portName">{{parameter}}</div>
</template>

<script>
export default {
    emits: {
        portClicked: null,
        portMouseMoved:null,
        portMouseStopMove:null,
    },
    props: {
        parameter: String,
        type: String,
        ID: Number,
    },
    data() {
        return {
            portType: "OUT", // Default value
            normalColor: "rgb(255, 255, 255)",
            hoverColor: "rgb(255, 255, 255)",
            circleColor: "rgb(150,150, 150)",
            circleBorderColor: "rgb(255, 255, 255)",
            squareColor: "rgb(255, 255, 255)",
            portID: 0,
        };
    },
    created() {
        this.portType = this.type;
        if (this.portType === "IN") {
            this.normalColor = "rgb(0, 0, 0)";
            this.hoverColor = "rgb(75, 75, 75)";
        } else {
            this.normalColor = "rgb(220, 220, 220)";
            this.hoverColor = "rgb(170, 170, 170)";
        }
        this.squareColor = this.normalColor;
        if(this.ID != null)
            this.portID = this.ID;
    },
    methods:{
        handlePortMouseOver(){
            this.squareColor = this.hoverColor;
        },
        handlePortMouseOut(){
            this.squareColor = this.normalColor;
        },
        handlePortMouseClick(event){

            const innerCircle = this.$refs.innerCircle;
            const rect = innerCircle.getBoundingClientRect();

            // Calculate the center position
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            //event.clientX, event.clientY
            this.$emit("portClicked", this.portID, centerX, centerY);
            window.addEventListener("mousemove", this.handlePortMouseMove);
            window.addEventListener("mouseup", this.handlePortStopMove);
        },
        handlePortMouseMove(event){
            this.$emit("portMouseMoved", event.clientX, event.clientY);
        },
        handlePortStopMove(event) {
            this.$emit("portMouseStopMove", event.clientX, event.clientY);
        },
        handlePortMouseUp() {
            console.log("mouse up");
            window.removeEventListener("mousemove", this.handleDrag);
            window.removeEventListener("mouseup", this.stopDragging);
        }
    }
};
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60px;
    cursor: grab;
}

.container:active{
    cursor: grabbing;
}
.square {
    width: 50px;
    height: 50px;
    position: relative;
}

.circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.innerCircle {
    width: 30px;
    height: 30px;
    background-color: black;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.circle:hover {
    border: 4px solid white;
}

.portName{
    text-align: center;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    text-shadow: 0px 0px 2px #000;
}
</style>
