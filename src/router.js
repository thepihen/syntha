import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
export default new Router({
    routes: [
        {
            path: '/syntha/',
            component: () => import('./App.vue')
        },
        {
            path: '/syntha/synth/:presetId?',
            name: 'Playground',
            component: () => import('./Playground.vue')
        },
        {
            path: '/syntha/about',
            component: () => import('./About.vue')
        },
        {
            path: '/syntha/login',
            component: () => import('./Login.vue')
        },
        {
            path: '/syntha/docs',
            component: () => import('./Documentation.vue')
        },
        {
            path: '/syntha/quiz',
            component: () => import('./Quiz.vue')
        }
        // Add more routes as needed
    ]

})
/*
const routes = [
    {
        path: '/',
        component: () => import('./App.vue')
    },
    {
        path: '/synth',
        component: () => import('./Playground.vue')
    },
    {
        path: '/about',
        component: () => import('./About.vue')
    }
    // Add more routes as needed
]

const router = new VueRouter({
    routes,
    mode: 'history' // Optional: Removes the '#' from URLs
})

export {router}
*/