export default class ModuleConnection{
    constructor(ACM,fromId, toId, fromPort, toPort, x1,y1,x2,y2, color="red"){
        this.fromId = fromId;
        this.toId = toId;
        this.fromPort = fromPort;
        this.toPort = toPort;
        
        //don't really need this as it depends on the screen
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        
        this.color = this.getRandomColor();
        this.addConnectionToACM(ACM, this.fromId, this.toId);
    }
    getRandomColor(){
        var colors = ["red", "green", "yellow", "cyan", 
        "magenta", "green"];
        var color = colors[Math.floor(Math.random()*colors.length)];
        return color;
    }
    printConnection(){
        console.log("fromId: " + this.fromId + " toId: " + this.toId + " fromPort: " + this.fromPort + " toPort: " + this.toPort + " x1: " + this.x1 + " y1: " + this.y1 + " x2: " + this.x2 + " y2: " + this.y2)
    }
    addConnectionToACM(ACM, fromId, toId){
        ACM.connectNodes(fromId, toId);
    }
}