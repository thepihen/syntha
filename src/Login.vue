
<script>
import { store } from './store.js'
export default {
    data() {
        return {
            store,
            glowcolor: "rgb(112, 224, 255)",
            username:'',
            password:'',
            loginFailed: false,
        }
    },
    created() {
        if (localStorage.getItem('loggedIn') == 'true') {
            this.loggedIn = true;
        } else {
            localStorage.setItem('loggedIn', 'false')
            this.loggedIn = false;
        }
    },

    methods: {
        openNav() {
            document.getElementById("myNav").style.width = "100%";
        },

        closeNav() {
            document.getElementById("myNav").style.width = "0%";
        },
        async sendData(action){
            console.log(this.username, this.password);

            var data = {
                "username": this.username,
                "password": this.password
            }
            data = JSON.stringify((data));
            fetch('https://syntha-backend-fef92fb3e9de.herokuapp.com/users/'+action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            })
            .then(
            response => 
                response.json()
            )
            .then(data => {
                if(data["status"] != 200){
                    //invalid data
                    console.log("Invalid Data");
                    
                    this.loginFailed = true;
                    return;
                }
                console.log('Success:', data);
                this.loginFailed=false;
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('userId', data['user_id']);
                //move the user back to home!
                this.$router.push('/syntha/');
            })
            .catch((error) => {
                console.error('Error:', error);
                
                
            });
        
        }
    }
}
</script>

<template>
    
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


        <div class="mainDivLogin">
            <span class="hamburger" style="font-size:30px;cursor:pointer;" @click="openNav()">&#9776;</span>
            <router-link class="homebtnLogin" to="/syntha/" style="text-decoration: none;">&#9750;</router-link>
            <div class="mainBoxOfSomething">
                <input type="checkbox" id="chk" aria-hidden="true">
                <div v-if="loginFailed" style="background-color:red; color:white; justify-content: center; align-items: center;">
                    Signup/Login Failed. Bad credentials or already existing account.
                </div>
                <div class="signup">
                    <form>
                        <label for="chk" aria-hidden="true">SIGN UP</label>
                        <!--
                        <input type="text" name="username" placeholder="Username" required="">
                        <input type="password" name="password" placeholder="Password" required="">
                        <button @click="sendData(username,password)">SIGN UP</button>
                        -->
                        <input type="username" v-model="username" required=""/>
                        <input type="password" v-model="password" required=""/>
                        <button @click.prevent="sendData('register')">SIGN UP</button>
                    </form>
                </div>

                <div class="login">
                    <form>
                        <label for="chk" aria-hidden="true">LOGIN</label>
                        <input type="username" v-model="username" required=""/>
                        <input type="password" v-model="password" required="" />
                        <button @click.prevent="sendData('login')">SIGN UP</button>
                    </form>
                </div>
            </div>
        </div>
    
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Raleway");

    :root {
        --glow-color: rgb(112, 224, 255);
    }

    body {
        height: 100%;
        width: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        font-family: "Raleway", sans-serif;
        background: rgb(8, 5, 41);
    }

    .mainDivLogin{
        z-index: 100;
        position: absolute;
        left: 0%;
        top: 0%;
        width: 100%;
        height:100%;
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

    .hamburger {
        padding: 10px;
            color: v-bind('glowcolor');
        /*
        position: relative;
        right: 513px;
        bottom: 341px;
        font-size: 30px;
        cursor: pointer;
        color:  v-bind('glowcolor');
        */
    }

    .homebtnLogin {
        position: relative;
        top:0%;
        left:0%;
        font-size: 40px;
        cursor: pointer;
        color:  v-bind('glowcolor');;
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


    .mainBoxOfSomething {
        width: 350px;
        height: 500px;
        position:relative;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        overflow: hidden;
        border-radius: 10px;
        background: rgb(20, 14, 83);
        box-shadow: 5px 20px 50px #000;
    }


    #chk {
        display: none;
    }

    .signup {
        position: relative;
        width: 100%;
        height: 100%;
    }

    label {
        color: #fff;
        font-size: 2.3em;
        justify-content: center;
        display: flex;
        margin: 60px;
        font-weight: bold;
        cursor: pointer;
        transition: .5s ease-in-out;
    }

    input {
        width: 60%;
        height: 20px;
        background: #e0dede;
        justify-content: center;
        display: flex;
        margin: 20px auto;
        padding: 10px;
        border: none;
        outline: none;
        border-radius: 5px;
    }

    button {
        width: 60%;
        height: 40px;
        margin: 10px auto;
        justify-content: center;
        display: block;
        color: #fff;
        background: rgb(53, 53, 202);
        font-size: 1em;
        font-weight: bold;
        margin-top: 20px;
        outline: none;
        border: none;
        border-radius: 5px;
        transition: .2s ease-in;
        cursor: pointer;
    }

    button:hover {
        background: rgb(55, 55, 129);

    }

    .login {
        height: 460px;
        background: rgb(127, 123, 249);
        border-radius: 60% / 10%;
        transform: translateY(-180px);
        transition: .8s ease-in-out;
    }

    .login label {
        color: rgb(28, 0, 128);
        transform: scale(.6);
    }

    #chk:checked~.login {
        transform: translateY(-500px);
    }

    #chk:checked~.login label {
        transform: scale(1);
    }

    #chk:checked~.signup label {
        transform: scale(.6);
    }
</style>