export default class AudioNode {
    constructor(modId) {
        this.id = modId;
        this.type = this.generateType();
        this.next = []; //can be a list
        this.prev = []; //can be a list
    }
    setNext(node) {
        this.next.append(node);
    }
    setPrevious(node){
        this.prev.append(node);
    }
}