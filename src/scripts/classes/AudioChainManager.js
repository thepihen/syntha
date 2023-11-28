//This class basically manages audio connections and nodes
//The UI accesses audio stuff through the ACM

import AudioNode from "./AudioNode.js";
import * as Tone from 'tone'
//import the type to tone class json otherwise this poor ACM doesn't know which tone blocks to add!
import type_to_class_json from "../../assets/module_type_to_tone_class.json"
export default class AudioChainManager {
    constructor(appName) {
        this.appName = appName;
        this.modules = [];
        this.audioStarted = false;
        this.outputRecorder = new Tone.Recorder();
    }
    addNode(id, type){
        let toneType = type_to_class_json[type];
        if(toneType == null){
            console.log("ERROR: " + type + " is not a valid type. Not adding module");
            return;
        }
        let newNode = new AudioNode(id, toneType);
        this.modules.push(newNode);
        console.log("adding node " + id + " of type " + toneType);
    }
    removeNode(id){
        let nodeIdx = this.findNode(id);
        if(nodeIdx == null){
            console.log("removeNode ERROR: could not find node with id " + id);
            return;
        }
        let node = this.modules[nodeIdx];
        this.removeAllConnections(node);
        node.handleNodeRemoval();
        this.modules.splice(nodeIdx, 1);
        //there is still an issue here: when you remove
        //the types don't get updated somewhere...
        //basically you can't immediately reconnect a new module 
        //because it could have the same type as the old one
        //Solved it by changing the way Ids are assigned to modules in Playground.vue

    }
    removeAllConnections(node){
        for(let i = 0; i<this.modules.length; i++){
            let currNode = this.modules[i];
            currNode.removeConnectionsWith(node);
        }
    }
    connectNodes(nodeFromId, nodeToId, fromPortId, toPortId){
        //find the nodes
        let fromNodeIdx = this.findNode(nodeFromId);
        let toNodeIdx = this.findNode(nodeToId);
        //add the connections
        if (fromNodeIdx == null || toNodeIdx == null) {
            console.log("ERROR: could not find node with id " + nodeFromId + " or " + nodeToId);
            return;
        }
        //TODO this structure can't work for multiple ports going to different places
        let fromNode = this.modules[fromNodeIdx];
        let toNode = this.modules[toNodeIdx];
        fromNode.setNext(this.modules[toNodeIdx], fromPortId);
        toNode.setPrevious(this.modules[fromNodeIdx], toPortId);
    }

    findNode(id){
        for(let i = 0; i < this.modules.length; i++){
            if(this.modules[i].id == id){
                return i;
            }
        }
        console.log("ERROR: could not find node with id " + id);
        return null;
    }

    updateModuleParameter(id, parameter, value){
        let idx = this.findNode(id);
        if(idx == null){
            console.log("ERROR: could not find node with id " + id);
            return;
        }
        let node = this.modules[idx];
        node.updateParameter(parameter,value);
    }

    printModules(){
        console.log("printing modules...")
        for(let i = 0; i < this.modules.length; i++){
            console.log(this.modules[i].print());
        }
    }

    async startAudio(){
        if(this.audioStarted){
            return;
        }
        await Tone.start().then(console.log('Hello party people, this is your captain ACM speaking. The audio is ready'), this.audioStarted = true)
    }
    checkConnectionValidity(fromModId, toModId, fromPortId, toPortId){
        //fromPortId and toPortId can't have multiple active connections 
        //also the connection can't already exist

        let fromModIdx = this.findNode(fromModId);
        let toModIdx = this.findNode(toModId);
        let fromMod = this.modules[fromModIdx];
        let toMod = this.modules[toModIdx];
        console.log("fromMod: " + fromMod.type + " toMod: " + toMod.type)
        
        
        //okay no, the ida to always let modules connect to audioout 
        //and from midiin is not a good idea if we want to recycle 
        //the AudioNode structure from all (and we do.)
        /*
        if(toMod.type == "AudioOut"){
            //whatever the combination we can always connect to it
            return true;
        }
        if(fromMod.type =="MidiIn"){
            return true;
        }
        */
        return (!this.hasConnections(fromModIdx, fromPortId) && !this.hasConnections(toModIdx, toPortId));
    }
    hasConnections(modId, portId){
        //check if a port has connections
        if(this.modules[modId].hasConnectionsOnPort(portId)){
            return true;
        }
        return false;
    }

    //These two magical methods are called by "midiIn" blocks 
    //when a keyboard input is received
    keyPlayed(midiKey, modId){
        let mod = this.modules[this.findNode(modId)];
        mod.keyPlayed(midiKey);
    }
    keyReleased(midiKey, modId){
        let mod = this.modules[this.findNode(modId)];
        mod.keyReleased(midiKey);
    }

    testACM(){
        console.log(this.appName + " ACM tested successfully")

    }

    async recordAudio(){
        //the idea is simple. Everything that goes through the an Audio Out
        //node is also saved in a buffer. When the user presses stop, the buffer
        //is saved as a wav file and downloaded
        Tone.Destination.connect(this.outputRecorder);
        this.outputRecorder.start()
    }
    async stopRecordAudio(){
        //save the buffer as an audio file and download it
        // the recorded audio is returned as a blob
        const recording = await this.outputRecorder.stop();
        // download the recording by creating an anchor element and blob url
        const url = URL.createObjectURL(recording);
        const anchor = document.createElement("a");
        //this is a "fake" wav file, it is actually an ogg file
        //saved as wav... Unfortunately Tone only allows to save as wav
        //with the Recorder
        anchor.download = "recording.wav";
        anchor.href = url;
        anchor.click();
        Tone.Destination.disconnect(this.outputRecorder)
    }
}

/*
The idea here is that the audio chain is represented as a "linked"
list of nodes, where each node can have many predecessors and successors.
The ending nodes are ALWAYS audio output nodes which represent a 
"toDestination()" in Tone. The starting nodes can be midi input nodes,
or really any node. 
*/











//YOU WANTED TO SPEAK TO THE MANAGER? WELL GUESS WHAT
//IT IS I; THE *AUDIO CHAIN* MANAGER
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠛⠛⠛⠉⠉⠉⠋⠛⠛⠛⠻⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠛⠉⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠉⠙⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠏⠄⠄⠄⠄⠄⠄⠄⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠹⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⠛⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠘⢻⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⠄⢠⠄⠄⡀⠄⠄⢀⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄⡁⠄⠄⢛⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⡈⢔⠸⣐⢕⢕⢵⢰⢱⢰⢐⢤⡡⡢⣕⢄⢢⢠⠄⠄⠄⠄⠄⠄⠙⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡁⠂⠅⢕⠌⡎⡎⣎⢎⢮⢮⣳⡳⣝⢮⢺⢜⢕⢕⢍⢎⠪⡐⠄⠁⠄⠸⣿⣿
// ⣿⣿⣿⣿⣿⣿⠏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠄⠄⢅⠣⡡⡣⣣⡳⡵⣝⡮⣗⣗⡯⣗⣟⡮⡮⣳⣣⣳⢱⢱⠱⣐⠄⠂⠄⢿⣿
// ⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⠄⠄⠂⠄⠄⠄⠄⠄⠄⢂⢈⠢⡱⡱⡝⣮⣿⣟⣿⣽⣷⣿⣯⣿⣷⣿⣿⣿⣾⣯⣗⡕⡇⡇⠄⠂⡀⢹⣿
// ⣿⣿⣿⣿⣿⡟⠄⠄⠄⠄⠄⠄⠂⠄⠄⠄⠄⠄⠄⠐⢀⢂⢕⢸⢨⢪⢳⡫⣟⣿⣻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡺⡮⡣⡣⠠⢂⠒⢸⣿
// ⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⠐⠄⡂⠆⡇⣗⣝⢮⢾⣻⣞⣿⣿⣿⣿⣿⣿⣿⣿⢿⣽⣯⡯⣺⢸⢘⠨⠔⡅⢨⣿
// ⣿⣿⠋⠉⠙⠃⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠁⠄⠄⠄⡂⡪⡪⡪⡮⡮⡯⣻⣽⣾⣿⣿⣿⣟⣿⣿⣿⣽⣿⣿⡯⣯⡺⡸⡰⡱⢐⡅⣼⣿
// ⣿⠡⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⠈⠆⠱⠑⠝⠜⠕⡝⡝⣞⢯⢿⣿⣿⡿⣟⣿⣿⣿⡿⡿⣽⣷⣽⡸⡨⡪⣂⠊⣿⣿
// ⣿⠡⠄⡨⣢⠐⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠍⡓⣗⡽⣝⠽⠍⠅⠑⠁⠉⠘⠘⠘⠵⡑⢜⢀⢀⢉⢽
// ⣿⠁⠠⢱⢘⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠈⠈⠱⣁⠜⡘⠌⠄⠄⡪⣳⣟⡮⢅⠤⠠⠄⠄⣀⣀⡀⡀⠄⠈⡂⢲⡪⡠⣿
// ⣿⡇⠨⣺⢐⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡀⠄⠄⠄⠤⡠⡢⢒⠦⠠⠄⠄⠄⡸⢽⣟⢮⠢⡂⡐⠄⡈⡀⠤⡀⠄⠑⢄⠨⢸⡺⣐⣿
// ⣿⣿⠈⠕⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡂⡪⡐⡥⢤⣰⣰⣰⡴⡮⠢⠂⠄⠄⡊⢮⢺⢕⢵⢥⡬⣌⣒⡚⣔⢚⢌⢨⢚⠌⣾⡪⣾⣿
// ⣿⣿⣆⠄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⡑⢕⢕⡯⡷⣕⢧⢓⢭⠨⡀⠄⡂⠨⡨⣪⡳⣝⢝⡽⣻⣻⣞⢽⣲⢳⢱⢡⠱⠨⣟⢺⣿⣿
// ⣿⣿⣿⡆⠄⡅⠇⡄⠄⠄⠄⠄⠄⠄⠄⠐⠨⢪⢹⢽⢽⣺⢝⠉⠁⠁⠄⠄⠄⢌⢎⡖⡯⡎⡗⢝⠜⣶⣯⣻⢮⡻⣟⣳⡕⠅⣷⣿⣿⣿
// ⣿⣿⣿⣿⣶⣶⣿⣷⠄⠄⠄⠄⠄⠄⠄⠄⠈⠔⡑⠕⠝⠄⡀⠄⠄⠊⢆⠂⠨⡪⣺⣮⣿⡾⡜⣜⡜⣄⠙⢞⣿⢿⡿⣗⢝⢸⣾⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⡀⠄⠄⠄⠄⢀⠄⠠⠄⠠⠄⠄⠄⠄⠄⠄⠊⠺⡹⠳⡙⡜⡓⡭⡺⡀⠄⠣⡻⡹⡸⠨⣣⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⠄⠄⠄⠄⠄⠠⠄⠄⣂⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢄⠤⡤⡄⡆⡯⡢⡣⡣⡓⢕⠽⣄⠄⠨⡂⢌⣼⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⡆⠄⠄⠄⠄⠈⠆⠄⠸⡂⠄⠄⠄⢀⠄⢀⠈⠄⠂⠁⠙⠝⠼⠭⠣⠣⠣⠑⠌⠢⠣⡣⡠⡘⣰⣱⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⢑⠄⠈⡱⠄⢘⠄⡀⠨⢐⣧⣳⣷⣶⣦⣤⣴⣶⣶⣶⡶⠄⡠⡢⡕⣜⠎⡮⣣⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⠄⠄⠄⠢⠄⠨⠄⠄⠣⡀⠄⢀⢀⢙⠃⡿⢿⠿⡿⡿⢟⢋⢔⡱⣝⢜⡜⡪⡪⣵⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⡁⠄⠄⠄⠄⠄⠄⠄⠅⠄⠡⠄⠄⠡⢀⢂⠢⡡⠡⠣⡑⣏⢯⡻⡳⣹⡺⡪⢎⠎⡆⢣⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣇⠄⠄⠄⠄⠄⠄⠄⠐⠄⠄⠁⠄⢈⠄⢂⠕⡕⡝⢕⢎⢎⢮⢎⢯⢺⢸⢬⠣⢃⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠠⠨⡐⠌⢆⢇⢧⢭⣣⡳⣵⢫⣳⢱⠱⢑⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣆⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠁⡊⢌⢢⢡⢣⢪⡺⡪⡎⡎⡎⡚⣨⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣄⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠕⡅⢗⢕⡳⡭⣳⢕⠕⡱⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠌⠄⠑⠩⢈⢂⣱⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⡀⢄⠄⣀⠄⡀⣀⢠⢄⣖⣖⣞⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⣱⡐⡕⡕⡽⣝⣟⣮⣾⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
// ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣵⣽⣸⣃⣧⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿



//realest manager i've ever seen. 10/10 would manage again