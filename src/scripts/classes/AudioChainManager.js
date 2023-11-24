import AudioNode from "./AudioNode.js";
import * as Tone from 'tone'
//import the type to tone class json
import type_to_class_json from "../../assets/module_type_to_tone_class.json"
export default class AudioChainManager {
    constructor(appName) {
        this.appName = appName;
        this.modules = [];
    }
    addNode(id, type){
        let toneType = type_to_class_json[type];
        if(toneType == null){
            console.log("ERROR: " + type + " is not a valid type. Not adding module");
            return;
        }
        let newNode = new AudioNode(id, toneType);
        console.log("adding node " + id + " of type " + toneType);
    }
    removeNode(id){

    }
    connectNode(from,to){

    }
    async startAudio(){
        await Tone.start()
        console.log('audio is ready')
    }

    testACM(){
        console.log(this.appName + " ACM tested successfully")
    }
}

/*
The idea here is that the audio chain is represented as a "linked"
list of nodes, where each node can have many predecessors and successors.
The ending nodes are ALWAYS audio output nodes which represent a 
"toDestination()" in Tone. The starting nodes can be midi input nodes,
or really any node. 
*/