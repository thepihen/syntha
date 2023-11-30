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
    <div class="buttons">
        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" @click="closeNav()">&times;</a>
            <div class="overlay-content">
                <a href="home2.html">HOME</a> <br>
                <a href="library.html">LIBRARY</a> <br>
                <a href="#">DOCUMENTATION</a> <br>
                <a href="account.html">ACCOUNT</a> <br>
                <a href="about.html">ABOUT</a>
            </div>
        </div>
        <span class="menubtn" @click="openNav()">&#9776;</span>
        <a href="home2.html"><span class="homebtn"> &#9750;</span></a>
        <a href="account.html"><span class="accountbtn"> &#9885;</span></a>
    </div>
    <div class="accountMain">
        <div class="pfbox">
            <br>
            <h1>PROFILE</h1>
            <table style="margin:auto;width:90%">
                <tr>
                    <th>
                        USERNAME:
                    </th>
                    <th>
                        PASSWORD:
                    </th>
                </tr>
                <tr>
                    <th>
                        <i>insert username</i>
                    </th>
                    <th>
                        <i>insert password</i>
                    </th>
                </tr>
            </table>
            <br>
            <br>
            <div class="actions"> <a href="#"><button>
                EDIT
            </button></a>
            <button onclick="confirmSubmit()">
                DELETE
            </button>
        </div>
        <br>
        <br>
    </div>
    </div>
    
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway");


:root {
    --glow-color: rgb(112, 224, 255);
}

* {
    box-sizing: border-box;
}

html,
body {
    height: 100%;
    width: 100%;
    overflow: hidden;
    font-family: "Raleway", sans-serif;
    background: rgb(8, 5, 41);
    margin: 20px;
}

.accountMain{
    background-color: rgb(115, 115, 169);
    position:absolute;
    left:0%;
    top:0%;
    width:100%;
    height:100%;
    color: white;
    text-align: center;
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

.buttons {
    z-index:1000;
    margin: 0px;
}

.menubtn {
    position: relative;
    font-size: 30px;
    right: 7px;
    bottom: 20px;
    cursor: pointer;
    color: var(--glow-color)
}

.homebtn {
    position: relative;
    left: 20px;
    bottom: 20px;
    font-size: 40px;
    cursor: pointer;
    color: var(--glow-color);
}

.accountbtn {
    position: relative;
    left: 1330px;
    bottom: 20px;
    font-size: 40px;
    cursor: pointer;
    color: var(--glow-color);
}



@media screen and (max-height: 500px) {
    .overlay a {
        font-size: 20px
    }

    .overlay .closebtn {
        font-size: 40px;
        top: 15px;
        right: 35px;
    }
}

.pfbox {
    text-align: center;
    position: static;
    color: white;
    background-color: rgb(115, 115, 169);
    margin-left: 330px;
    margin-top: 150px;
    border: 50px;
    border-radius: 5px;
    width: 50%;
}

table,
th,
td {
    border: 1px solid black;
}

.actions {
    text-align: right;
    margin-right: 20px;
    margin-top: 20px;
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