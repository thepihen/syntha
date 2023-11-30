<script>
export default{
    methods:{  
        openNav() {
            document.getElementById("myNav").style.width = "100%";
        },
        closeNav() {
            document.getElementById("myNav").style.width = "0%";
        }
    }
}
</script>

<template>
    <body>
        <div id="myNav" class="overlay">
            <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
            <div class="overlay-content">
                <a href="home2.html">HOME</a> <br>
                <a href="library.html">LIBRARY</a> <br>
                <a href="#">DOCUMENTATION</a> <br>
                <a href="account.html">ACCOUNT</a> <br>
                <a href="about.html">ABOUT</a>
            </div>
        </div>
        <span class="menubtn" onclick="openNav()">&#9776;</span>
        <a href="home2.html"><span class="homebtn"> &#9750;</span></a>

        <main>
            <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true">

                <div class="signup">
                    <form>
                        <label for="chk" aria-hidden="true">SIGN UP</label>
                        <input type="text" name="username" placeholder="Username" required="">
                        <input type="password" name="password" placeholder="Password" required="">
                        <button>SIGN UP</button>
                    </form>
                </div>

                <div class="login">
                    <form>
                        <label for="chk" aria-hidden="true">LOGIN</label>
                        <input type="test" name="username" placeholder="Username" required="">
                        <input type="password" name="password" placeholder="Password" required="">
                        <button>LOGIN</button>
                    </form>
                </div>
            </div>
        </main>
    </body>
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


    .overlay {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
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

    .menubtn {
        position: relative;
        right: 513px;
        bottom: 341px;
        font-size: 30px;
        cursor: pointer;
        color: var(--glow-color)
    }

    .homebtn {
        position: relative;
        right: 479px;
        bottom: 344px;
        font-size: 40px;
        cursor: pointer;
        color: var(--glow-color);
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


    .main {
        width: 350px;
        height: 500px;
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