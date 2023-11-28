export function mapValue(val, from1,to1, from2,to2){
    return ((val - from1) / (to1 - from1) * (to2 - from2) + from2).toFixed(2);
}

export function getTodaysDate(){
    // Create a new Date object, which represents the current date and time
    const today = new Date();

    // Get the date components
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Note: Months are zero-based, so add 1
    const day = today.getDate();

    // Create a formatted string (YYYY-MM-DD)
    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
}