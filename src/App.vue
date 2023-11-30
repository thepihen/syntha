<script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
import Playground from './Playground.vue'
import Login from './Login.vue'
import Workshop from './Workshop.vue'
import { store } from './store.js'  

// all this might just be tremendously useless. TODO: check
//if this, and/or the one in router.js can be deleted
const routes = {
  '/': Home,
  '/about': About,
  '/synth': Playground,
  '/login': Login
}

export default {  
  inject:['ACM'], //inject the audio context manager
  data() {
    return {
      store,
      currentPath: window.location.hash,
    }
  },
  created(){
    if (localStorage.getItem('loggedIn') == 'true'){
      this.loggedIn = true;
    }else{
      localStorage.setItem('loggedIn', 'false')
      this.loggedIn = false;
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
    });
    window.addEventListener('loginEvent', (event) => {
      this.loggedIn = localStorage.getItem('loggedIn');
    });
  },
  methods: {
    testButton(){
      console.log("testButton clicked");
      var data = JSON.stringify({
        "name": "testPresetName",
        "data": "testPresetData",
        "creator_id": "1"
      });
      fetch('http://localhost:5000/presets/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      /*
      var xhr = new XMLHttpRequest();
      var url = "http://localhost:5000/presets/new";
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var json = JSON.parse(xhr.responseText);
          console.log("response received!");
        }
      };
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(data);
      */
    }, //end testButton

    //this will start the Audio Context Manager (the object that
    //manages everything related to audio and nodes underneath
    //the application)
    async startACM(){
      //we're basically "tricking" the user into giving us permission
      //to play audio
      await this.ACM.startAudio();
    },
  }
}
</script>

<template>
  <!-- make a toolbar with all these buttons -->
  
  <div class="toolbar" style="user-select: none;">
    <div class="toolbar-title">SynthA!</div>
    <div class="toolbar-actions">
        <router-link to="/syntha/">Home</router-link>
        <router-link @click="startACM" to="/syntha/synth">Playground</router-link>
        <router-link to="/syntha/workshop">Workshop</router-link>
        <router-link to="/syntha/docs">Documentation</router-link>
        <router-link to="/syntha/about">About</router-link>
        <button @click="testButton" class="testButton">CLick me!</button>
    </div>
    <div class="accountSection">
      <router-link to="/syntha/login" v-if="(store.loggedIn==false)">Login</router-link>
      <router-link to="/syntha/account" v-if="(store.loggedIn)">Account</router-link> <!-- here we will put the actual account -->
    </div>
    <div class="version">v1.0</div>
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

.testButton{
  z-index:5000;
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
  border: 1px solid #000;
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
  /* align left */
  flex: 1;
  text-align: left;
  margin-left: 10px;
  margin-right: 10px;


}

.toolbar-actions {
  position:relative;
  display: flex;
  flex-direction: row;
  height: 100%;
  flex: 15;
    text-align: left;
    margin-left: 10px;
    margin-right: 10px;
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