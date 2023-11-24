export default {
  components: {
    Toolbar,
  },
};
<script setup>
import Toolbar from './components/Toolbar.vue'
import ControlsToolbar from './components/ControlsToolbar.vue'
//import tone js
import * as Tone from 'tone'
</script>

<template>
    <header>
        <Toolbar />
        <!-- Your main content goes here -->
    </header>

    <main @contextmenu.prevent="setVisibleContextMenu($event)">
        <div class="mainDiv">
        <div style="cursor:default">
            <!-- create a module -->
            <!-- <Module :moduleName="moduleName" :inputPorts="inputPorts" :outputPorts="outputPorts"
                @start-dragging-port="startPortDragging" @handle-port-drag="handlePortDragging" @stop-dragging-port="stopPortDragging"/>
            -->
                <!--
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        <div class="wrapper">
        -->
            <div v-for="(module, index) in modules" :key="index">
                <Module :moduleName="module.moduleName" :inputPorts="module.inputPorts"
                    :outputPorts="module.outputPorts" :createdCoordsX="module.createdCoordsX"
                    :createdCoordsY="module.createdCoordsY" :moduleId="module.id"
                    :moduleType="module.type"
                    @start-dragging-port="startPortDragging" 
                    @handle-port-drag="handlePortDragging" @stop-dragging-port="stopPortDragging" 
                    @contextmenu.prevent="setVisibleContextMenu($event)"
                    @module-moved="moduleMovedUpdate">
                    <component :is="module.type" @portClicked="startPortDragging"  
                    @modulePortMouseMoved="handlePortDragging"
                    @modulePortMouseStopMove="stopPortDragging"
                    @modulePortHover="trackPort"
                    @modulePortOut="stopTrackPort"
                    ></component>
                </Module>
            </div>
        </div>
        <div v-if="contextMenuVisible" class="context-menu"
            :style="{ top: contextMenuPosition.y + 'px', left: contextMenuPosition.x + 'px' }">
            <div class="contextualMenuButton" @click="addModule('New Module', fromContextMenu = true)">Add Module</div>
            <!-- Add more options as needed -->
        </div>
        <button id="libButton" class="libraryButton material-symbols-outlined" @click="libraryButtonClicked">arrow_forward_ios</button>
        <div id="modulesScaffold" v-if="libButtonClicked" class="modules-scaffold">
            <div class="scaffoldTitle"> MODULE SCAFFOLD </div>
            <!-- <div v-if="isDragging()"> heyyyyy </div>-->
        <!-- display all items from myJson -->
        <div v-for="(item,index) in mod_categories" :key="index">
            <!-- simply display its contents as text -->
            <div class="scaffoldCategory" :id="'category' + (index)" @click="toggleCategory(index)">
                {{ item.toLocaleUpperCase()}} <span class="material-symbols-outlined" 
                :id="'category_span' + (index)">arrow_drop_down</span></div>
            <!-- if the category is expanded then you need to showcase its content -->
            <!-- <div v-if="isExpanded(index)" class="scaffoldCategoryContent">
                {{("heyyy I'm category "+index)}}</div> -->
            <div v-if="isExpanded(index)" class="scaffoldCategoryContent">
                <!-- get the content from the synth info json-->
                <div v-for="(it, ind) in categories_content[index]" :key="ind" class="scaffoldCategoryItem" @click="addModule(it)">
                    <!-- recover from the same json it, then display 
                        the image associated to the field "preview_img_source" of the field it -->
                    <img :src="'./src/assets/images/' + it + '.png'" class="scaffoldCategoryItemImg">
                    {{it}}
                </div>
            </div>
        </div> 

        </div>
        <!-- demo clutter -->
         
        <svg class="visualConnections">
            <line v-if="(isDragging())" :x1="this.dragPortPositionX" :y1="this.dragPortPositionY" :x2="this.mouseCurrentX"
                :y2="this.mouseCurrentY" stroke="blue" stroke-width="2" />
        </svg>
    
        <svg class="visualConnections"  v-for="(item,index) in connections" :key="index">
            <line  :x1="connections[index].x1" :y1="connections[index].y1"
                :x2="connections[index].x2" :y2="connections[index].y2" :stroke="connections[index].color" stroke-width="6" />
        </svg>
        </div> <!--mainDiv-->
    </main>

    <div class="controls">
        <ControlsToolbar @play-main-function="play" oncontextmenu="return false;" />
    </div>
</template>

<style scoped>
/* checkout https: //developers.google.com/fonts/docs/material_symbols */
header {
    line-height: 1.5;
}

html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
}

body {
    display: flex;
    flex-direction: column;
    background-color: rgb(202, 60, 60);
}

main {
    top:0;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: rgb(128, 129, 150);/* #767779;*/
        background-image: linear-gradient(90deg, #a5a5a5ab 2px, transparent 1px),
            linear-gradient(#a5a5a5ab 2px, transparent 1px);
        background-size: 30px 30px;
        /* Size of each square */
    min-height: 100%;
    min-width: 100%;
    overflow: hidden;
    flex-grow: 1;
    position: absolute;
    left: 0;
}

.logo {
    display: block;
    top: 10px;
    margin: 0 auto 2rem;
}

.mainDiv {
    user-select: none;
    background-color: transparent;
    min-height: 100%;
    min-width: 100%;
    overflow: hidden;
    flex-grow: 1;
    position: absolute;
    left: 0;
    cursor:grab;
}

.context-menu {
    position: absolute;
    z-index: 1000;
    background-color: #fff;
    border: 1px solid #111;
    /*make the text black*/
    color: #000;
    border-radius: 1px;
    cursor: pointer;
    margin: 5px;
    z-index:99;
}

.contextualMenuButton {
    padding: 10px;
    background-color: #fff;
    border: 1px solid #111;
    /*make the text black*/
    color: #000;
    border-radius: 1px;
    cursor: pointer;
    margin: 5px;
    transition: background-color 0.3s, color 0.3s;
}

.libraryButton {
    /* a button on mid of main that has a ">" inside.
  When clicked will open a section containing all modules*/
    position: absolute;
    top: 50%;
    left: 1%;
    background-color: #fff;
    border: 1px solid #111;
    /*make the text black*/
    z-index:101;
    transform: translate(0, -50%);
    background-color: rgba(199, 199, 199, 0);
        /* Blue background */
        border: none;
        /* Remove borders */
        color: white;
        /* White text */
        padding: 12px 16px;
        /* Some padding */
        font-size: 16px;
        /* Set a font size */
        cursor: pointer;
        /* Mouse pointer on hover */
    transition: transform 0.3s ease;
    font-size: 32px;
}

.libraryButton:hover {
    background-color: rgb(147, 64, 224);
    /* Blue background */
}

.contextualMenuButton:hover {
    background-color: rgb(105, 105, 105);
    color: #fff;
}

.modules-scaffold {
    user-select: none;
    position: absolute;
    top: 3.45rem;
    left: 0;
    width: 25%;
    /* make this extend for all height */
    bottom: 2.2em;
    background-color: rgb(255, 255, 255);
    /*add a black border*/
    border: 1px solid #111;
    z-index: 100;
    transition: width 0.3s ease;
    overflow: scroll;
    cursor: default;
}

.modules-scaffold.active {
    width: 30%;
}

.scaffoldTitle{
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    padding: 1rem;
    background:#111;
    color:#fff;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.scaffoldCategory{
    display: flex;
    flex-direction:row;

    justify-content: space-between;
    align-items: center;
    padding: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
    background-color: rgb(255, 255, 255);
}
.scaffoldCategory:hover{
    background-color: rgb(105, 105, 105);
    color: #fff;
}
.scaffoldCategoryContent{
    display:flex;
    flex-direction:row;
}
.scaffoldCategoryItem{
    /* display items in a column */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    border: 1px solid #ccc;
    cursor: pointer;
}

.visualConnections{
    z-index:1201;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.playgroundBG{
    cursor: grab;
}

@media (min-width: 1024px) {
    header {
        display: flex;
        place-items: center;
        padding-right: calc(var(--section-gap) / 2);
    }

    /*
  .logo {
    margin: 0 2rem 0 0;
  }
*/
    header .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
    }
}
</style>
<script>
import Module from './components/Module.vue'
import BasicOsc from './components/synth_modules/BasicOsc.vue'
import AudioOut from './components/synth_modules/AudioOut.vue'
import ModuleConnection from './scripts/classes/ModuleConnection'
import list_json from './assets/synth_modules_list.json'
import synth_info_json from './assets/synth_modules.json'
export default {
    inject: ['ACM'],
    components: {
        Module,
        BasicOsc,
        AudioOut,
    },
    data() {
        return {
            libButtonClicked: false,
            contextMenuVisible: false,
            contextMenuPosition: { x: 0, y: 0 },
            modules: [],
            moduleName: "My Module",
            inputPorts: [
                { id: 1, x: 10, y: 50 },
                { id: 2, x: 10, y: 80 },
                // Add more input ports as needed
            ],
            outputPorts: [
                { id: 1, x: 190, y: 50 },
                { id: 2, x: 190, y: 80 },
                // Add more output ports as needed
            ],
            myJson: list_json,
            synth_info: synth_info_json,
            mod_categories: list_json["categories"],
            categories_content: synth_info_json["categories_content"],
            expandedCategories: [], //array of expanded categories ids
            connections: [], //save all connections between modules here
            isDraggingPort:false,
            dragPortPositionX:0,
            dragPortPositionY:0,
            mouseCurrentX:0,
            mouseCurrentY:0,
            makeConnectionPermanent:false,
            playGroundTranslateX:0,
            playGroundTranslateX:0,
            lastHoveredPortModID:-1,
            lastHoveredPortID:-1,
            lastHoveredPortX:0,
            lastHoveredPortY:0,
        };
    },
    options: {
        isDragging() {
            return this.isDraggingPort;
        },
    },
    methods: {
        isDragging(){
            return this.isDraggingPort;
        },
        startPortDragging(module, port, posX, posY) {
            // Implement the logic to handle port dragging here
            this.dragPortPositionX = posX;
            this.dragPortPositionY = posY;
            this.isDraggingPort = true;
        },
        handlePortDragging(posX, posY) {
            if(!this.isDraggingPort){
                return;
            }
            //TODO: this is just an easy fix to the fact
            //the event listener is never remoevd and i was sick
            //of seeing the console spammed
            /*
            if(!this.isDragging()){
                return;
            }*/
            this.mouseCurrentX = posX;
            this.mouseCurrentY = posY;
            //make a line between posX, posY and the current mouse position
        },
        stopPortDragging(moduleID,portID,fromX,fromY) {
            this.isDraggingPort = false;
            //if you're over another port then guess what we're connecting the two
            //if you're not over another port then guess what we're not connecting the two
            //connecting = making the connection permanently visible
            
            //this.makeConnectionPermanent = true; //for demo purposes

            //for now this is quite useless
            console.log("Module ID from: ", moduleID)
            console.log("Last Hoevered module:", this.lastHoveredPortModID)
            console.log(this.isHoveringPort);
            if(this.isHoveringPort){
                if(moduleID != this.lastHoveredPortModID){
                    console.log("fff", moduleID, this.lastHoveredPortModID)
                    this.connections.push(new ModuleConnection(moduleID, this.lastHoveredPortModID, portID, this.lastHoveredPortID, fromX, fromY, this.lastHoveredPortX, this.lastHoveredPortY));
                    this.connections[this.connections.length - 1].printConnection();
                }
            }
            this.isHoveringPort = false;
        },
        trackPort(moduleId, portID, x, y){
            //console.log(moduleId, portID, x, y);
            this.lastHoveredPortModID = moduleId;
            this.lastHoveredPortID = portID;
            this.lastHoveredPortX = x;
            this.lastHoveredPortY = y;
            this.isHoveringPort = true;
        },
        stopTrackPort(){
            this.isHoveringPort = false;
        },

        moduleMovedUpdate(moduleId, xoff, yoff){
            //update all connections to and from this module to
            //match the new position
            this.findUpdateConnectionsToModule(moduleId, xoff, yoff);
            this.findUpdateConnectionsFromModule(moduleId, xoff, yoff);
        }, 
        findUpdateConnectionsToModule(moduleId,xoff,yoff){
            if (this.connections.length == 0){
                return;
            }
            for (let i = 0; i < this.connections.length; i++) {
                if (this.connections[i].toId == moduleId) {
                    this.connections[i].x2 += xoff;
                    this.connections[i].y2 += yoff;
                }
            }
        },
        findUpdateConnectionsFromModule(moduleId, xoff, yoff){
            if (this.connections.length == 0) {
                return;
            }
            for(let i = 0; i < this.connections.length; i++){
                if (this.connections[i].fromId == moduleId){
                    this.connections[i].x1 += xoff;
                    this.connections[i].y1 += yoff;
                }
            }
        },

        setVisibleContextMenu(event) {
            console.log(this.contextMenuVisible)
            if (this.contextMenuVisible == true) {
                //console.log("Hi")
                this.contextMenuVisible = false;
            } else {
                this.contextMenuVisible = true;
                this.contextMenuPosition = { x: event.clientX, y: event.clientY };
                //console.log(event.clientX, event.clientY)
            }
            //console.log(Boolean(event.originalTarget.closest("modulesScaffold")))
            if (event.originalTarget.parentElement.classList.contains("module")){
                //manage the removal of modules here
            }
            console.log(event);
        },
        addModule(moduleName, fromContextMenu = false) {
            // Add a new module to the modules array
            if(!fromContextMenu){
                let codeName = synth_info_json[moduleName]["codename"];
                let currId = this.modules.length;
                //just have it in a random (visible hopefully) position
                this.modules.push({
                    moduleName,
                    type: codeName,
                    id: currId,
                    inputPorts: [
                        { id: 1, x: 10, y: 50 },
                        { id: 2, x: 10, y: 80 },
                    ], // Define initial input ports if needed
                    outputPorts: [
                        { id: 1, x: 190, y: 50 },
                        { id: 2, x: 190, y: 80 },
                    ], // Define initial output ports if needed
                    createdCoordsX: (Math.floor(Math.random()*600)+200),
                    createdCoordsY: (Math.floor(Math.random() * 500)+100),
                });
                return;
            }
            //add a module at the position of the context menu
            this.modules.push({
                moduleName,
                inputPorts: [
                    { id: 1, x: 10, y: 50 },
                    { id: 2, x: 10, y: 80 },
                ], // Define initial input ports if needed
                outputPorts: [
                    { id: 1, x: 190, y: 50 },
                    { id: 2, x: 190, y: 80 },
                ], // Define initial output ports if needed
                createdCoordsX: this.contextMenuPosition.x,
                createdCoordsY: this.contextMenuPosition.y,
            });
            //console.log("POS: "+this.contextMenuPosition.x + "   " + this.contextMenuPosition.y)
            // Close the context menu
            this.contextMenuVisible = false;
        },


        libraryButtonClicked() {
            this.libButtonClicked = !this.libButtonClicked;
            if (this.libButtonClicked) {
                //document.getElementById("libButton").style.left = "10%";
                document.getElementById("libButton").style.transform = "translate(calc(24cqw), -50%) ";
                document.getElementById("libButton").innerHTML = "arrow_back_ios_new";
                //document.getElementById("libButton").style.transform = "rotate(180deg)";
                //get the modulesScaffold and make a transition from 0 width to 300 px width
                //document.getElementById("modulesScaffold").classList.add("active");
                //console.log(document.getElementById("modulesScaffold")) //it doesnt exist yet here!
            }
            else {
                //document.getElementById("libButton").style.left = "1%";
                document.getElementById("libButton").innerHTML = "arrow_forward_ios";
                document.getElementById("libButton").style.transform = "translate(0px, -50%)";
            }   
        },

        toggleCategory(index) {
            // Toggle the expanded state of the category at the given index
            if (this.expandedCategories.includes(index)) {
                this.expandedCategories = this.expandedCategories.filter(i => i !== index);
                document.getElementById("category_span" + index).innerHTML = "arrow_drop_down";
            } else {
                this.expandedCategories.push(index);
                document.getElementById("category_span" + index).innerHTML = "arrow_drop_up";
            }
        },
        isExpanded(index) {
            return this.expandedCategories.includes(index);
        },


        play() {
            const synth = new Tone.Synth().toDestination();
            synth.triggerAttackRelease("C4", "2n");
            console.log("lol");
            this.ACM.testACM()
        }
    },

};
</script>