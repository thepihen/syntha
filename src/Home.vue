<template>

        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
            <div class="overlay-content">
                <router-link to="/syntha/">HOME</router-link><br>
                <router-link to="/syntha/workshop">LIBRARY</router-link><br>
                <router-link to="/syntha/account">ACCOUNT</router-link><br>
                <router-link to="/syntha/docs">DOCUMENTATION</router-link><br>
                <router-link to="/syntha/about">ABOUT</router-link><br>
                <router-link to="/syntha/quiz" v-if="konamiCode">QUIZ??</router-link><br>
            </div>
        </div>
        
        <div class="mainDivHome">
            <span class="goofyAahButton" style="font-size:30px;cursor:pointer;" @click="openNav()">&#9776;</span>
            <!--
            <a href="login.html"><span class="accountbtn">log in</span></a>
            -->
            <router-link class="accountbtn" to="/syntha/login" v-if="(loggedIn==false)"
                style="text-decoration: none;">LOGIN</router-link>
            <router-link class="accountbtn" to="/syntha/account" v-if="(loggedIn)"
                style="text-decoration: none;">Account</router-link>
            <router-link to="/syntha/synth" class='glowing-btn'>OPEN SYNTHA</router-link>
        </div>


</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway");
        .goofyAahButton{
            padding: 10px;
            color: v-bind('glowcolor');
        }
        .mainDivHome {
            /*
        align-items: center;
        justify-content: center;
        align-content: center;
        */
            z-index: 100;
            position: absolute;
            left: 0%;
            top: 0%;
            width: 100%;
            height: 100%;
            overflow: hidden;
            font-family: "Raleway", sans-serif;
            background: rgb(8, 5, 41);
    
        }
    .overlay {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        background-color: rgb(0, 0, 0);
        background-color: rgba(16, 9, 45, 0.95);
        overflow-x: hidden;
        transition: 0.5s;
    }

    .overlay-content {
        position: relative;
        top: 25%;
        width: 100%;
        text-align: center;
        margin-top: 30px;
    }

    .overlay a {
        padding: 8px;
        text-decoration: none;
        font-size: 36px;
        color: rgb(112, 224, 255);
        display: block;
        transition: 0.3s;
    }

    .overlay a:hover,
    .overlay a:focus {
        color: #f1f1f1;
    }

    .overlay .closebtn {
        position: absolute;
        top: 20px;
        right: 45px;
        font-size: 60px;
    }

    @media screen and (max-height: 450px) {
        .overlay a {
            font-size: 20px
        }

        .overlay .closebtn {
            font-size: 40px;
            top: 15px;
            right: 35px;
        }
    }


    :root {
        --glow-color: rgb(112, 224, 255);
    }
/*
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
*/
/*
    html,
    body {
        height: 100%;
        width: 100%;
        overflow: hidden;
        font-family: "Raleway", sans-serif;
        background: rgb(8, 5, 41);

    }

    main {
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
*/
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
    background-color: rgb(202, 60, 60);
}

main {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    min-height: 100%;
    min-width: 100%;
    overflow: auto;
    flex-grow: 1;
    position: absolute;
    left: 0;
}

    .glowing-btn {
        /* don't let this shit be underlined */
        text-decoration: none;
        position: relative;
        top:50%;
        left:25%;
        transform: translate(-50%, -50%);
        color:  v-bind('glowcolor');
        cursor: pointer;
        padding: 0.35em 1em;
        border: 0.15em solid  v-bind('glowcolor');
        border-radius: 0.45em;
        background: none;
        perspective: 2em;
        font-family: "Raleway", sans-serif;
        font-size: 2em;
        font-weight: 900;
        letter-spacing: 1em;

        -webkit-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
            0px 0px 0.5em 0px  v-bind('glowcolor');
        -moz-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
            0px 0px 0.5em 0px  v-bind('glowcolor');
        box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
            0px 0px 0.5em 0px  v-bind('glowcolor');
    }

    .glowing-txt {
        float: left;
        margin-right: -0.8em;
        -webkit-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
            0 0 0.45em  v-bind('glowcolor');
        -moz-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
            0 0 0.45em  v-bind('glowcolor');
        text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em  v-bind('glowcolor');
    }


    .glowing-btn::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0.7;
        filter: blur(1em);
        transform: translateY(120%) rotateX(95deg) scale(1, 0.35);
        background:  v-bind('glowcolor');
        pointer-events: none;
    }

    .glowing-btn::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        background-color:  v-bind('glowcolor');
        box-shadow: 0 0 2em 0.2em  v-bind('glowcolor');
        transition: opacity 100ms linear;
    }

    .glowing-btn:hover {
        color: rgba(0, 0, 0, 0.8);
        text-shadow: none;
        animation: none;
    }

    .glowing-btn:hover .glowing-txt {
        animation: none;
    }


    .glowing-btn:hover:before {
        filter: blur(1.5em);
        opacity: 1;
    }

    .glowing-btn:hover:after {
        opacity: 1;
    }

    @media only screen and (max-width: 600px) {
        .glowing-btn {
            font-size: 1em;
        }
    }

    .accountbtn {
        position: fixed;
        right:0%;
        padding: 16px;
        font-size: 20px;
        cursor: pointer;
        color:  v-bind('glowcolor');
    }
</style>


<script>
import { store } from './store.js'
export default{
    data() {
        return {
            store,
            glowcolor: "rgb(112, 224, 255)",
            konamiCode: false,
            sequenceKeys:0,
            sequence: ['w', 'w', 's', 's', 'a', 'd', 'a', 'd', 'b', 'a'],
        }
    },
    created() {
        if (localStorage.getItem('loggedIn') == 'true') {
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }
    },
    mounted(){
        window.addEventListener("keydown", this.trackKeys)
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.trackKeys)// Make sure to call next() to indicate that the navigation can continue
    },
    
methods:{
    //[38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
    trackKeys(event){
        console.log(event.key)
        let key = event.key;
        
        if (key == (this.sequence[this.sequenceKeys])) {
            console.log("got one")
            this.sequenceKeys++;
            if (this.sequenceKeys == this.sequence.length) {
                this.konamiCode = true;
                this.sequenceKeys = 0;
                window.removeEventListener("keydown", this.trackKeys)
                console.log("Secret Unlocked")
            }
        } else {
            this.sequenceKeys = 0;
        }
    },
    openNav() {
        document.getElementById("myNav").style.width = "100%";
    },
    
    closeNav() {
        document.getElementById("myNav").style.width = "0%";
    }
    }
}
</script>