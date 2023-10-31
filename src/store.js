import { reactive } from 'vue'

export const store = reactive({
    loggedIn: false,
    login(){
        this.loggedIn = true;
    },
    logout() {
        this.loggedIn = false;
    }
})