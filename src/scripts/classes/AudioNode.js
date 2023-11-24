import * as Tone from 'tone'
import { TickSignal } from 'tone/build/esm/core/clock/TickSignal';
export default class AudioNode {
    constructor(modId, toneType) {
        this.id = modId;
        this.synthNode = null;
        this.type = toneType;
        this.next = []; //can be a list
        this.prev = []; //can be a list
        this.createSynthNode(toneType);
    }
    createSynthNode(toneType){
        if(toneType == null){
            console.log("passed a null module type, returning...")
            console.log("Note this is probably because the module type doesn't need initialisation")
            return;
        }
        this.handleNodeSetup(toneType);
    }
    setNext(node) {
        this.next.append(node);
    }
    setPrevious(node){
        this.prev.append(node);
    }
    handleNodeSetup(type){
        //this is the point where good practices go and die
        //since I no longer have enough time...
        switch (type){
            case "Oscillator":
                console.log("aaaa")
            this.synthNode = new Tone[type]();
            this.synthNode.type = "sine";
            this.synthNode.set({
                frequency: 440
            });
            this.synthNode.toDestination().start();
            break;
        }
    }
}