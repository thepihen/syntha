export default {
  components: {
    Toolbar,
  },
};
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Toolbar from './components/Toolbar.vue'
import ControlsToolbar from './components/ControlsToolbar.vue'

//import tone js
import * as Tone from 'tone'

function  play(){
  const synth = new Tone.Synth().toDestination();
  synth.triggerAttackRelease("C4", "2n");
  console.log("lol");
}

</script>

<template>
  
  <header>
    <Toolbar/>
      <!-- Your main content goes here -->
  </header> 

  <main  @contextmenu.prevent="setVisibleContextMenu($event)">
    <div>
      <!-- create a module -->
      <Module :moduleName="moduleName" :inputPorts="inputPorts" :outputPorts="outputPorts"
        @start-dragging="handlePortDragging" />
      <!---
        <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
        <div class="wrapper">
        -->
      <div v-for="(module, index) in modules" :key="index">
        <Module :moduleName="module.moduleName" :inputPorts="module.inputPorts" :outputPorts="module.outputPorts"
          @start-dragging="handlePortDragging" />
      </div>
    </div>
    <div class="libraryButton">
      <button>></button>
    </div>
    <div v-if="contextMenuVisible" class="context-menu"
      :style="{ top: contextMenuPosition.y + 'px', left: contextMenuPosition.x + 'px' }">
      <div class="contextualMenuButton" @click="addModule('New Module')">Add Module</div>
      <!-- Add more options as needed -->
    </div>
    
  
  </main>
  
  <div class="controls">
    <ControlsToolbar @play-main-function="play" oncontextmenu="return false;"/>
    </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width:100%; 
}

body {
  display: flex;
  flex-direction: column;
  background-color: rgb(202, 60, 60);;
}
main {
  margin:0;
  padding:0;
  box-sizing: border-box;
  background-color: #767779;
  min-height:100%;
  min-width: 100%;
  overflow: hidden;
  flex-grow: 1;
  position:absolute;
  left:0;
}

.logo {
  display: block;
  top: 10px;
  margin: 0 auto 2rem;
}
.mainDiv{
  background-color: white;
}
.context-menu{
  position: absolute;
  z-index: 1000;
  background-color: #fff;
  border: 1px solid #111;
  /*make the text black*/
  color: #000; 
  border-radius: 1px;
  cursor: pointer;
  margin: 5px;
}
.contextualMenuButton{
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
.libraryButton{
  /* a button on mid of main that has a ">" inside.
  When clicked will open a section containing all modules*/
  position: absolute;
  top:50%;
  left: 1%;
  background-color: #fff;
  border: 1px solid #111;
  /*make the text black*/
  color: #000;
}
.contextualMenuButton:hover {
  background-color: rgb(105, 105, 105);
  color: #fff;
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
import Module from './components/Modules.vue'
export default {
  components: {
    Module,
  },
  
  data() {
    return {
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
    };
  },
  methods: {
    handlePortDragging(port) {
      // Implement the logic to handle port dragging here
    },
    setVisibleContextMenu(event) {
      console.log(this.contextMenuVisible)
      if (this.contextMenuVisible == true) {
        console.log("Hi")
        this.contextMenuVisible = false;
      }else{
      this.contextMenuVisible = true;
      this.contextMenuPosition = { x: event.clientX, y: event.clientY };
      console.log(event.clientX, event.clientY)
      }
    },
    addModule(moduleName) {
      // Add a new module to the modules array
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
      });

      // Close the context menu
      this.contextMenuVisible = false;
    },
  },
  
};
</script>