<template>
    <header></header>
    <main class="docsMain">
        <div class="docsDiv">
        <h1 class="docsMainTitle"> SynthA! - User documentation </h1>
        <h2 class="docsSubTitle"> How do I operate that thing?! </h2>
        <div class="docsContent"> Welcome to the docs page! Here you will learn all about operating the SynthA! modular-style synth.
        <br>To begin you should of course click the "Playground" button on the top header. You should be led to the page in Figure 1.
        <img class="docsImage" style="width: 50%;" :src="'./src/assets/docs/playground.jpg'" 
        alt="Figure 1: A screenshot of the playground page of SynthA!. 
        The page is empty and displays a top bar with the buttons home, 
        save and load, a notebook-style background for the page and a 
        bottom bar with a record and a stop button.">
        <div class="docsImageCaption">Figure 1: the "Playground" page</div>
         For now let's not worry about any other button but the arrow on the left. Click that to open the Module Scaffold.
            The Scaffold contains all the modules you can add to the synthesizer.
            Click on a category to expand its contents; for example click on "SYNTH".
            <br> 
            Now the page should look something like Figure 2.
            
        <img class="docsImage" style="width: 50%;" :src="'./src/assets/docs/scaffold.jpg'"
        alt="A screenshot of the playground page of SynthA!. The module scaffold is visible
        on the left side of the page. The scaffold has the synth category expanded
        and two modules, basic oscillator and theremin, are visible with their 
        icons
        "
        >
        <div class="docsImageCaption">Figure 2: the Module Scaffold</div>
        Let's now create a basic setup.<br>
        <ol>
            <li>Click on the Basic Oscillator (basic_osc) entry to add it to the playground.</li>
            <br>
            <li>Now click on the I/O category in the scaffold and add an Audio Output (audio_out).</li>
            <br>
            <li>(Optional) Lower your volume if it is high</li>
            <br>
            <li>Click on the "OUT" port of the oscillator module and drag it to the "OUT" port of the audio out module. You should be hearing sound!</li>
            <br>
            <li>Play around with the frequency knob of the oscillator to hear the frequency change. Have fun!</li>
        </ol>
        <br>
        <br>
        You can click and drag on the playground background to move the canvas around (useful especially if you have many modules).
        You can click and drag a module by its top part (see Figure 3) to move it around.
        <img class="docsImage" style="width: 50%;" :src="'./src/assets/docs/moduleMove.jpg'" alt="Image of the playground with a Theremin module with a red circle around its top part">
        <div class="docsImageCaption">Figure 3: Moving a module</div> 

        recording
        saving/loading presets

        module specific documentaion
        </div>
        </div>
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
    background-color: rgb(202, 60, 60);
}

main {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background-color: #171717;
    min-height: 100%;
    min-width: 100%;
    overflow: auto;
    flex-grow: 1;
    position: absolute;
    left: 0;
}
.docsMain{
    align-items: center;
    justify-content: center;
    align-content: center;
}
.docsMainTitle{
    font-size: 64px;
    text-align: center;
}
.darker {
    background-color: aqua;
}

.docsDiv {
    color: aliceblue;
    position: absolute;
    left: 0%;
    top: 10%;
    width: 80%;
    transform: translate(10%)
}

.docsImage{
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    padding: 20px;
}
.docsImageCaption{
    text-align: center;
    font-size: 16px;
    color: rgb(236, 219, 189);
    padding-bottom: 10px;
}
.docsContent{
    font-size: 24px;
}
</style>