import { reactive } from 'vue'
//this will be shared among all components,
//and will be reactive. The logic is explained here:
//https://vuejs.org/guide/scaling-up/state-management.html#simple-state-management-with-reactivity-api
export const store = reactive({
    loggedIn: false,
    login(){
        this.loggedIn = true;
    },
    logout() {
        this.loggedIn = false;
    }
})