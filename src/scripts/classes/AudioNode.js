import * as Tone from 'tone'
export default class AudioNode {
    constructor(modId, toneType) {
        this.id = modId;
        this.synthNode = null;
        this.internalChain = [];
        this.type = toneType;
        this.next = {}; //can be a list
        this.prev = {}; //can be a list
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
    setNext(node, portIdFrom) {
        this.next[portIdFrom] = node;
        if(node.type == "AudioOut"){
            this.sendOutToDestination();
        }else if(node.type!="MidiIn" && this.type != "MidiIn"){
            this.synthNode.connect(node.synthNode);
        }
    }
    setPrevious(node, portIdTo){
        this.prev[portIdTo] = node;
    }
    handleNodeSetup(type){
        //this is the point where good practices go and die
        //since I no longer have enough time...
        switch (type){
            case "Oscillator":
                this.synthNode = new Tone[type]();
                this.synthNode.type = "sine";
                this.synthNode.set({
                    frequency: "C4"
                });
                this.synthNode.start();
                console.log("OSCILLATING", this.synthNode)
                //this.synthNode.toDestination().start();
            break;


            case "Theremin":
                //the theremin has a very specific chain to replicate the sound
                //of the real instrument, so even though the type "Theremin"
                //is not a Tone class, we need to fake it by creating said chain

                //ok first of all we need a sine oscillator. We can "sort of"
                //emulate the theremin timbre by using the fundamental and the first
                //2 harmonics with an exponential roll-off
                this.synthNode = new Tone.Oscillator();
                this.synthNode.type = "sine";
                this.synthNode.set({
                    frequency: "C4" //good "beginning" frequency
                });
                this.synthNode.partials = [1, 0.6, 0.2]; //I found
                //these values by playing around with an FM synth (Sytrus)
                //in FL Studio
                //next up an LFO will modulate the frequency of the oscillator
                var lfo = new Tone.LFO(7, this.synthNode.frequency.value - 10, this.synthNode.frequency.value + 10).start();

                lfo.connect(this.synthNode.frequency);
                this.internalChain.push(lfo);
                this.synthNode.start();

                
            break;

            case "Reverb":
                this.synthNode = new Tone[type]();
                this.synthNode.set({
                    decay: 0.5,
                    wet: 0.5
                });
            break;

            case "Gain":
                this.synthNode = new Tone.Multiply(1);
            break;

            case "Filter":
                this.synthNode = new Tone.Filter(3000, "lowpass");
            break;
        }
    }
    handleNodeRemoval(){
        switch (this.type){
            /*
            case "Oscillator":
                //disconnects and marks this for garbage collection
                this.synthNode.dispose();
            break;
            case "Theremin":
                this.synthNode.dispose();
            break;
            case "Reverb":
                this.synthNode.dispose();
            break;
            case "Gain":
                this.synthNode.dispose();
            break;
            case "Filter":
                this.synthNode.dispose();
            break;
            */
            case "AudioOut":
                //go through all the elmeents in this.prev 
                for (let key in this.prev) {
                    //console.log(this.prev[key])
                    this.prev[key].synthNode.disconnect();
                }
                return
            break;
            case "MidiIn":
                return
                break;
        }
        console.log(this.synthNode)
        this.synthNode.dispose();
        if(this.internalChain.length>0){
            for(let i=0; i<this.internalChain.length; i++){
                this.internalChain[i].dispose();
            }
        }
    }

    updateParameter(parameter, value){
        //issue: we need to find out if this.synthNode actually has a field
        //called $parameter. We can work this out in two ways, the stupid one
        //or the smart one
        /*  //fun fact: the tone Reverb class has a property called "decay" according
        //to the documentation, but if you change it a new reverb will actually be
        //created... 
        if (this.type == "Reverb") {
            if (parameter == "decay") {
                this.synthNode.decay = value;
                return;
            }
        }
        */
       //kinda stupid that you can't change this with set but here we are...
        if (this.type == "Oscillator" || this.type == "Filter") {
            if (parameter == "type") {
                this.synthNode.type = value;
                return;
            }
        }

        if (this.synthNode.hasOwnProperty(parameter)) {
            if(parameter=="volume"){
                this.synthNode.volume.value = value;
                return;
            }
            if(this.type=="Theremin"){
                if(parameter=="frequency"){
                    this.internalChain[0].min = value - value/20;
                    this.internalChain[0].max = value + value/20;
                    return;
                }
            }
            
            this.synthNode.set({
                [parameter]: value
            });
        } else {
            console.log(this.synthNode)
            console.log(this.type+" does not have the field", parameter);
            return;
        }

    }
    hasConnectionsOnPort(portId){
        //console.log("NEXT",this.next)
        //console.log("PREV", this.prev)
        //console.log(this.next[portId], this.prev[portId])
        if ((this.next[portId] != null || this.prev[portId] != null) || (this.next[portId] != undefined || this.prev[portId] != undefined)){
            //console.log("HAS A CONNECTION")
            return true;
        }
        return false;
    }

    removeConnectionsWith(node){
        //ez trick
        for (let key in this.next) {
            if (this.next[key] == node) {
                delete this.next[key];
            }
        }
        for (let key in this.prev) {
            if (this.prev[key] == node) {
                delete this.prev[key];
            }
        }
    }


    keyPlayed(midiKey){
        console.log("KEY PLAYED", midiKey)
        if(midiKey == undefined || midiKey == null || isNaN(midiKey)){
            return;
        }
        
        if(this.type=="MidiIn"){
            if(this.next[0] != null && this.next[0] != undefined){
                this.next[0].keyPlayed(midiKey);
            }
        }
        if(this.type=="Oscillator"){
            this.synthNode.volume.value = 0;
            this.synthNode.set({
                "frequency": Tone.Frequency(midiKey, "midi").toFrequency(),
            });
        }
    }
    
    keyReleased(midiKey){
        if (this.type == "MidiIn") {
            if (this.next[0] != null && this.next[0] != undefined) {
                this.next[0].keyReleased(midiKey);
            }
        }
        if (this.type == "Oscillator") {
            this.synthNode.volume.value = -200;
        }
    }

    sendOutToDestination(){
        this.synthNode.toDestination();
    }
    print(){
        console.log("id: " + this.id + " type: " + this.type);
    }
}