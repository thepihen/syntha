import {createApp} from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
import Playground from './Playground.vue'
import Login from './Login.vue'
import Account from './Account.vue'
import Workshop from './Workshop.vue'
import Documentation from './Documentation.vue'
import AudioChainManager from "./scripts/classes/AudioChainManager.js"
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes: [
        { path: '/syntha/', component: Home },
        { path: '/syntha/about', component: About },
        { path: '/syntha/synth', component: Playground },
        { path: '/syntha/login', component: Login },
        { path: '/syntha/account', component: Account},
        { path: '/syntha/workshop', component: Workshop },
        { path: '/syntha/docs', component: Documentation },
        { path: '/syntha/:pathMatch(.*)*', name: 'not-found', component: NotFound }
    ], // short for `routes: routes`
});
var ACM = new AudioChainManager("SynthA!");
var octave = 4;
// 5. Create and mount the root instance.
const app = createApp(App)
app.provide('ACM', ACM)
//all "midi" inputs from keyboard share the same octave
app.provide('oct', octave)
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')
/*
import './assets/main.css'
import Playground from './Playground.vue'
import Home from './Home.vue'

import { createApp } from 'vue'
import App from './App.vue'
//import Home from './Home.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: Home },
    { path: '/synth', component: Playground},
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.

const app = Vue.createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')

//createApp(App).mount('#app')
*/