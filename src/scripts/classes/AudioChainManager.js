import AudioNode from "./AudioNode.js";
import * as Tone from 'tone'
export default class AudioChainManager {
    constructor(appName) {
        this.appName = appName;
    }
    addNode(){
        
    }
    removeNode(){

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