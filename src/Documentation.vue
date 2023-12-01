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

        <h2 class="docsSubTitle"> Recording and exporting audio </h2>
        Once you have a setup you like, you can record and export audio by using the two buttons on the bottom of the interface.
        Press the left button (the one with a circle) to start a recording, then press the right button (the one with a square) to stop a recording and automatically export all audio that was recorded since you pressed the other button.
        <br>SynthA! exports audio in 16 bit .wav files.

        <h2 class="docsSubTitle"> Saving / Loading presets </h2>
        If you are happy with a setup you have created and want others to be able to play with it as well, then look no further.<br>
        By pressing the "save" button on the toolbar at the top of the interface you will be asked to input a name for the preset and then that will be published on our workshop/library.
        <br>You can load existing presets in two ways: by pressing the "Load" button in the Playground, or by going to the Library page through any other page.

        <h2 class="docsSubTitle"> Modules </h2>
        In this section we will briefly present each and every module that is available at the moment in SynthA!
        <br>All modules can be accessed through the Scaffold in the Playground.
        <br>
        <h3>Basic Oscillator</h3>
        <img class="docsImage" style="width: 15%;" :src="'./src/assets/docs/mod_osc.jpg'"
            alt="Image of the oscillator module, containing the following knobs: frequency, attack, decay, sustain, release, and the following ports: frequency, out. The module has a green background">
        As the name suggests, the Basic Oscillator is in fact a basic oscillator. It can produce one among the 4 main wave shapes (sine, triangle, sawtooth, square), chosen with a selector menu.
        <br>The oscillator is powered by a Tone.Oscillator object, connected to an envelope that can alter the way its amplitude evolves over time.
        The envelope only works if you have currently connected a MidiIn module to the "FREQ" port.
        <br> An envelope works in the following way: imagine you're pressing a key on a keyboard to play a sound. You can have the sound play immediately with full volume (like hitting a snaredrum), or slowly increase over time (like playing a violin);
        that is what the attack controls, the time it takes for a sound to reach its peak. The attack is followed by a decay, which is a phase where the volume goes down until a certain given level (the sustain level).
        The sustain level specifies the level the sound should play at as you hold a key, after the attack and decay phases are finished. <br>
        Finally as you release a key, you might not want the sound to disappear immediately. The release is there for that: it specifies how long it will take for the volume to reach complete silence after you release a key.
        <br>
        Visualise them this way:
        <br>
        <img class="docsImage" style="width: 50%;" :src="'./src/assets/docs/envelope.jpg'"
            alt="Graph of an envelope with its four phases.">

        <h3>Theremin</h3>
        <img class="docsImage" style="width: 25%;" :src="'./src/assets/docs/mod_theremin.jpg'"
            alt="Image of the theremin module. It is a black square with a white circle (indicator) that can be moved around to change frequency and amplitude. It contains one port - the audio output">
        The Theremin module is more straightforward. When connected to an audio output through a chain, you can move the white indicator in the black square by clicking and dragging to modify the output frequency and amplitude.
        <br>The Theremin is at its core another Tone.Oscillator object, this time containing some partials and a Tone.LFO object (Low Frequency Oscillator - basically it outputs an oscillating signal that is used to control a parameter) modulating its frequency.
        The partials have been chosen through experimentation and are the first three (the first one being the fundamental frequency), with the following amplitudes: [1, 0.6, 0.2].

        <h3>Filter</h3>
        <img class="docsImage" style="width: 20%;" :src="'./src/assets/docs/mod_filter.jpg'"
            alt="Image of the filter module, a brownish one containing knobs for frequency and q-factor and a selector for filter type. It contains audio input and output ports">
        The Filter module takes a signal as input and produces a filtered version of it as output. The three basic filters (lowpass, highpass and bandpass) are available.
        <br>You can control the cutoff frequency of the filter ("until where it works") and the q-factor (also known as resonance in some applications) through knobs.
        The three filter types basically work in this way: the lowpass passes through sounds below the cutoff frequency, the highpass those above the cutoff frequency, the bandpass is centered at the cutoff frequency and passes sounds in a certain range around it (controlled with the q-factor).
        It is implemented with a single Tone.Filter object.
        
        <h3>Reverb</h3>
        <img class="docsImage" style="width: 15%;" :src="'./src/assets/docs/mod_reverb.jpg'"
            alt="Image of the filter module, a purple one containing a knob for the dry/wet selector. It contains audio input and output ports">
        The Reverb module is the easiest to understand. Connect any module to it and eventually route it to an audio output and it will produce a "reverbed" version of the input.
        The balance between the pure reverberant sound ("WET" signal) and the original input sound ("DRY" signal) can be controlled with the DRY/WET knob.
        It is implemented with a Tone.Reverb object. 
        <br>Fun fact for nerds: handling changes to the decay time with Tone is a pain, since it recreates the reverb every time there is a new decacy value being set.
        For this reason it is not possible to control the decay time of the reverb ("how big the room sounds") :|

        <h3>VCA</h3>
        <img class="docsImage" style="width: 20%;" :src="'./src/assets/docs/mod_gain.jpg'"
            alt="Image of the VCA module. It contains input and output ports and a gain knob to control the volume">
        The VCA (Voltage Controlled Amplifier) module lets you amplify or attenuate an input sound with the gain knob.
        The module is not actually voltage controlled but we kept the name since that's how these modules are usually called in real modular synths.
        It is implemented as a Tone.Multiply object, that takes the input Tone.Signal and multiplies by the gain "factor", then sends the result out.

        <h3>Audio Out</h3>
        <img class="docsImage" style="width: 20%;" :src="'./src/assets/docs/mod_audio.jpg'"
            alt="Image of the audio out module, simply containing one port you can connect modules to send audio to speakers">
        The Audio Out module is pretty simple. You connect anything to it and it will send the audio to your audio device. It is not actually a real Tone module, it simply takes whatever module connects to its input and calls Tone.toDestination() on it.

        <h3>Midi In</h3>
        <img class="docsImage" style="width: 30%;" :src="'./src/assets/docs/mod_midi.jpg'"
            alt="Image of the MidiIn module. it contains one output port for voice/octave, and a keyboard showing the user what note they're playing">
        The MidiIn module (improperly named) allows one to control the frequency and envelope of (for now only) the Basic Oscillator module. Connect it to a oscillator "FREQ" port to see the magic happen!
        <br>Keystrokes are mapped to notes in the following way:
        <img class="docsImage" style="width: 50%;" :src="'./src/assets/docs/mod_midi_annotated.jpg'"
            alt="MidiIn module with associated keystrokes.">
        <br>You can use "z" and "x" to change the current octave (don't worry if you don't immediately see feedback on the module itself).
        Once again this module does not correspond to a Tone object, it just tells whatever module it is connected to to play a certain note (start its envelope if needed). 

        <br>
        <br>
        <h3>That's all for now, thanks for taking time to read our documentation. We hope you enjoy SynthA!</h3>
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