import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
export default new Router({
    routes: [
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
        },
        {
            path: '/login',
            component: () => import('./Login.vue')
        },
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