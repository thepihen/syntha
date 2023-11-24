import * as Tone from 'tone'
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
        this.next.push(node);
        if(node.type == "AudioOut"){
            this.sendOutToDestination();
        }
    }
    setPrevious(node){
        this.prev.push(node);
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
                frequency: "C4"
            });
            //this.synthNode.toDestination().start();
            break;
        }
    }

    updateParameter(parameter, value){
        //issue: we need to find out if this.synthNode actually has a field
        //called $parameter. We can work this out in two ways, the stupid one
        //or the smart one
        console.log(parameter);
        console.log(this.synthNode)
        if (this.synthNode.hasOwnProperty(parameter)) {
            this.synthNode.set({
                [parameter]: value
            });
        } else {
            console.log("Oscillator does not have the field!", parameter);
            return;
        }

    }

    sendOutToDestination(){
        this.synthNode.toDestination().start();
    }
    print(){
        console.log("id: " + this.id + " type: " + this.type);
    }
}