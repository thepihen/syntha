<script>
export default {
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
                <a href="home.html">HOME</a> <br>
                <a href="library.html">LIBRARY</a> <br>
                <a href="account.html">ACCOUNT</a> <br>
                <a href="#">DOCUMENTATION</a> <br>
                <a href="about.html">ABOUT</a>
            </div>
        </div>
        <span style="font-size:30px;cursor:pointer;color:var(--glow-color)" onclick="openNav()">&#9776;</span>
        <a href="login.html"><span class="accountbtn">log in</span></a>

        <main>
            <button class='glowing-btn'><span>OPEN SYNTHA</span></button>
        </main>

    </body>
</template>

<style scoped>
    @import url("https://fonts.googleapis.com/css?family=Raleway");

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

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

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


    .glowing-btn {
        position: relative;
        color: var(--glow-color);
        cursor: pointer;
        padding: 0.35em 1em;
        border: 0.15em solid var(--glow-color);
        border-radius: 0.45em;
        background: none;
        perspective: 2em;
        font-family: "Raleway", sans-serif;
        font-size: 2em;
        font-weight: 900;
        letter-spacing: 1em;

        -webkit-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
            0px 0px 0.5em 0px var(--glow-color);
        -moz-box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
            0px 0px 0.5em 0px var(--glow-color);
        box-shadow: inset 0px 0px 0.5em 0px var(--glow-color),
            0px 0px 0.5em 0px var(--glow-color);
    }

    .glowing-txt {
        float: left;
        margin-right: -0.8em;
        -webkit-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
            0 0 0.45em var(--glow-color);
        -moz-text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3),
            0 0 0.45em var(--glow-color);
        text-shadow: 0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em var(--glow-color);
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
        background: var(--glow-color);
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
        background-color: var(--glow-color);
        box-shadow: 0 0 2em 0.2em var(--glow-color);
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
        margin-left: 1400px;
        margin-bottom: 20px;
        font-size: 20px;
        cursor: pointer;
        color: var(--glow-color);
    }
</style>
