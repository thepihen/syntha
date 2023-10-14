<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
import Playground from './Playground.vue'
  
const routes = {
  '/': Home,
  '/about': About,
  '/synth': Playground
}

export default {  
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
      this.currentPath = window.location.hash
    })
  }
}
</script>

<template>
  <!-- make a toolbar with all these buttons -->
  
  <div class="toolbar">
    <div class="toolbar-title">SynthA!</div>
    <div class="toolbar-actions">
        <router-link to="/">Home</router-link>
        <router-link to="/synth">Playground</router-link>
        <router-link to="/about">About</router-link>
    </div>

    <div class="version">DEMO v0.1</div>
  </div>
  
  <main >
        <div>
          <router-view></router-view>
        </div>
  </main>
</template>


<style scoped>
header {
  line-height: 1.5;
}

.toolbar {
  background-color: #333;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  /* position the toolber at the top of the screen */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  line-height: 1.5;
  z-index: 100;
  overflow: hidden;
}
.toolbar a {
   height:100%;
   float: left;
   font-size: 16px;
   color: white;
   text-align: center;
   padding: 0px 16px;
   text-decoration: none;
}
.toolbar a:hover {
   background-color: blueviolet;
}
.toolbarButton{
  height:100%;
  border: 1px solid #111;
  color:#fff;
  flex: 1;
  /* Adjust the padding as needed */
  cursor: pointer;
}
.toolbarButton:hover {
  background-color: rgb(71, 71, 71);
  color: #fff;
}
.green{
  background-color: green;
}

.divtest {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.toolbar-title {
  font-size: 24px;
}

.toolbar-actions {
  position:relative;
  display: flex;
  flex-direction: row;
  height: 100%;
}

main {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #767779;
  min-height: 100%;
  min-width: 100%;
  overflow: auto;
  flex-grow: 1;
  position: absolute;
  left: 0;
  top:0;
}
</style>