export function mapValue(val, from1,to1, from2,to2){
    return ((val - from1) / (to1 - from1) * (to2 - from2) + from2).toFixed(2);
}