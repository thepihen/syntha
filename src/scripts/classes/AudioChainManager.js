//This class basically manages audio connections and nodes
//The UI accesses audio stuff through the ACM

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
        this.modules.push(newNode);
        console.log("adding node " + id + " of type " + toneType);
    }
    removeNode(id){

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
        await Tone.start()
        console.log('audio is ready')
    }
    checkConnectionValidity(fromModId, toModId, fromPortId, toPortId){
        //first issue: fromPortId and toPortId can't have multiple active connections 
        //also the connection can't already exist

        //if the toModId is a AudioOut we can always connect to it
        let fromModIdx = this.findNode(fromModId);
        let toModIdx = this.findNode(toModId);
        let fromMod = this.modules[fromModIdx];
        let toMod = this.modules[toModIdx];
        console.log("fromMod: " + fromMod.type + " toMod: " + toMod.type)
        if(toMod.type == "AudioOut"){
            //whatever the combination we can always connect to it
            return true;
        }
        if(fromMod.type =="MidiIn"){
            return true;
        }

        return (!this.hasConnections(fromModIdx, fromPortId) && !this.hasConnections(toModIdx, toPortId));
    }
    hasConnections(modId, portId){
        //check if a port has connections
        if(this.modules[modId].hasConnectionsOnPort(portId)){
            return true;
        }
        return false;
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