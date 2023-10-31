export default class ModuleConnection{
    constructor(fromId, toId, fromPort, toPort, x1,y1,x2,y2, color="Red"){
        this.fromId = fromId;
        this.toId = toId;
        this.fromPort = fromPort;
        this.toPort = toPort;
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
    }
    printConnection(){
        console.log("fromId: " + this.fromId + " toId: " + this.toId + " fromPort: " + this.fromPort + " toPort: " + this.toPort + " x1: " + this.x1 + " y1: " + this.y1 + " x2: " + this.x2 + " y2: " + this.y2)
    }
}