
<script>
export default {
    props: {
        moduleName: String, // The name of the module
        inputPorts: Array, // An array of input ports (objects with id, x, y)
        outputPorts: Array, // An array of output ports (objects with id, x, y)
    },
    data() {
        return {
            isDragging: false,
            startPosition: { x: 0, y: 0 },
            currentPosition: { x: 0, y: 0 },
        };
    },
    computed: {
        elementStyles() {
            return {
                transform: `translate(${this.currentPosition.x}px, ${this.currentPosition.y}px)`,
            };
        },
    },
    methods: {
        startDragging(port) {
            // Implement the logic to start dragging the port
            // You can use Vue's $emit to notify the parent component
            // that a port is being dragged
            this.$emit('start-dragging', port);
        },
    
    startDragging(event) {
        console.log("AAAA");
        this.isDragging = true;
        this.startPosition = {
            x: event.clientX - this.currentPosition.x,
            y: event.clientY - this.currentPosition.y,
        };
        window.addEventListener("mousemove", this.handleDrag);
        window.addEventListener("mouseup", this.stopDragging);
    },
    handleDrag(event) {
        console.log('handleDrag');
        if (this.isDragging) {
            this.currentPosition = {
                x: event.clientX - this.startPosition.x,
                y: event.clientY - this.startPosition.y,
            };
        }
    },
    stopDragging() {
        this.isDragging = false;
        window.removeEventListener("mousemove", this.handleDrag);
        window.removeEventListener("mouseup", this.stopDragging);
    },
    },
};
</script>

<template>
    <div class="module" @mousedown="startDragging" :style="elementStyles">
        <div class="module-title">{{ moduleName }}</div>
        <div class="module-knobs">
            <!-- Add your knobs here (you can use Vue components for knobs) -->
            <knob v-for="i in 3" :key="i"></knob>
        </div>
        <div class="module-io">
            <div class="input-ports">
                <div class="input-port" v-for="inputPort in inputPorts" :key="inputPort.id"
                    @mousedown="startDragging(inputPort)"></div>
            </div>
            <div class="output-ports">
                <div class="output-port" v-for="outputPort in outputPorts" :key="outputPort.id"
                    @mousedown="startDragging(outputPort)"></div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.module {
    width: 200px;
    height: 150px;
    background-color: #ccc;
    border: 1px solid #000;
    position: absolute;
    left: 30%; 
    top:50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: move;
}

.module-title {
    background-color: #000;
    color: #fff;
    padding: 0px;
    height: 20%;
    width: 100%;
    align-items: center;
    text-align: center;
}

.module-knobs {
    margin-top: 10px;
}

.module-io {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
}

.input-ports,
.output-ports {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input-port,
.output-port {
    width: 15px;
    height: 15px;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 50%;
    margin: 5px;
    cursor: pointer;
}
</style>