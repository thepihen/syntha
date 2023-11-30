<script>
import { store } from './store.js'
export default {
    data() {
        return {
            store,
            glowcolor: "rgb(112, 224, 255)",
            userName: '',
        }
    },
    mounted(){
        let userId = localStorage.getItem('userId');
        this.getUserName(userId);
    },
    methods: {
        getUserName(id){
            const headers = { "Content-Type": "application/json" };
            fetch("https://syntha-backend-fef92fb3e9de.herokuapp.com/users/"+id,
                {
                    method: 'GET', headers: headers
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    
                    this.userName = data['result']['username'];
                });
        },
        logout() {
            //this.loggedIn = true;
            localStorage.setItem('loggedIn', 'false');
            store.logout();
            this.$router.push('/login');
        },
        
        openNav() {
            document.getElementById("myNav").style.width = "100%";
        },
        
        closeNav() {
            document.getElementById("myNav").style.width = "0%";
        },
        
        confirmSubmit() {
            var agree = confirm("Are you sure you wish to continue? Deleting your account is permanent.");
            if (agree)
            return true;
            else
            return false;
        },

        logout(){
            localStorage.setItem('loggedIn', 'false');
            this.$router.push('/syntha/');
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
    <div id="myNav" class="overlay">
        <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
        <div class="overlay-content">
            <router-link to="/syntha/">HOME</router-link><br>
            <router-link to="/syntha/workshop">LIBRARY</router-link><br>
            <router-link to="/syntha/account">ACCOUNT</router-link><br>
            <router-link to="/syntha/docs">DOCUMENTATION</router-link><br>
            <router-link to="/syntha/about">ABOUT</router-link><br>
            <!--
                <a href="library.html">LIBRARY</a> <br>
                <a href="account.html">ACCOUNT</a> <br>
                <a href="#">DOCUMENTATION</a> <br>
                <a href="#">ABOUT</a>
                -->
        </div>
    </div>
    <div class="mainDivAbout">
        <span class="weirdAssButton" style="font-size:30px;cursor:pointer;" @click="openNav()">&#9776;</span>
        <router-link class="homebtn" to="/syntha/" style="text-decoration: none;">&#9750;</router-link>
        <!--
        <a href="home2.html"><span class="homebtn"> &#9750;</span></a>
        <a href="login.html"><span class="accountbtn">log in</span></a>
        -->

        <h1 class="hey"> Hey {{userName}}!</h1>
        <h2 class="hey" style="font-size:18px">Hope you're enjoying SynthA! :) </h2>
        <button class='glowing-btn logoutButton' @click="logout">>LOGOUT&lt;</button>


    </div>

</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway");
.hey{
    font-size: 50px;
    color: rgb(112, 224, 255);
    text-align: center;
    margin-top: 24px;
    margin-bottom: 24px;
    font-family: "Raleway", sans-serif;
}
.logoutButton{
    cursor:pointer;
}
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

.mainDivAbout {
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

.darker {
    background-color: aqua;
}

.aboutDiv {
    color: aliceblue;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, -50%)
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
    --glowcolor: rgb(112, 224, 255);
}

.weirdAssButton {
    padding: 10px;
    color: v-bind('glowcolor');
}

/*
*,
*::before,
*::after {
    box-sizing: border-box;
}
*/

html,
body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: "Raleway", sans-serif;
    background: rgb(8, 5, 41);
}

main {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: "Raleway", sans-serif;
}


.glowing-btn {
    position: relative;
    padding: 0.35em 1em;
    margin-left: 550px;
    margin-top: 100px;
    margin-bottom: 50px;
    color: v-bind('glowcolor');
    border: 0.15em solid v-bind('glowcolor');
    border-radius: 0.45em;
    background: none;
    perspective: 2em;
    font-family: "Raleway", sans-serif;
    font-size: 2em;
    font-weight: 900;
    letter-spacing: 1em;
    z-index: 1000;
    -webkit-box-shadow: inset 0px 0px 0.5em 0px v-bind('glowcolor'),
        0px 0px 0.5em 0px v-bind('glowcolor');
    -moz-box-shadow: inset 0px 0px 0.5em 0px v-bind('glowcolor'),
        0px 0px 0.5em 0px v-bind('glowcolor');
    box-shadow: inset 0px 0px 0.5em 0px v-bind('glowcolor'),
        0px 0px 0.5em 0px v-bind('glowcolor');

}


.glowing-btn :hover{
    color: rgb(190, 188, 216);
    background: rgb(96, 93, 128);
}

@media only screen and (max-width: 100%) {
    .glowing-btn {
        font-size: 1em;
    }
}

.accountbtn {
    position: static;
    margin-left: 1270px;
    font-size: 20px;
    cursor: pointer;
    color: v-bind('glowcolor');
}

.homebtn {
    position: relative;
    margin-right: 70px;
    font-size: 40px;
    cursor: pointer;
    color: v-bind('glowcolor');
}


.text {
    text-align: center;
    position: relative;
    color: white;
}
</style>