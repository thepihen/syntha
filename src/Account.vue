<script>
import { store } from './store.js'
export default {
    data() {
        return {
            store,
        }
    },
    methods: {
        logout() {
            //this.loggedIn = true;
            localStorage.setItem('loggedIn', 'false');
            store.logout();
            this.$router.push('/login');
        }
    },
    created() {
        if (localStorage.getItem('loggedIn') == 'true') {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
    },
}
</script>
<template>
    <header></header>
    <main>
        <div class="centralDiv"> <button @click="logout">Logout</button> </div>
        
    </main>
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
    width: 100%;
    overflow: auto;
}

body {
    display: flex;
    flex-direction: column;
}

main {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #7e12d1;
    min-height: 100%;
    min-width: 100%;
    overflow: auto;
    flex-grow: 1;
    position: absolute;
    left: 0;
}

.darker {
    background-color: aqua;
}

.centralDiv {
    color: aliceblue;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%)
}
</style>