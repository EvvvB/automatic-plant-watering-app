
const testDate = (date) => {
    let dateStr = new Date(date);
    let d = dateStr.getDate();
    let m = dateStr.getMonth() + 1;
    let y = String(dateStr.getFullYear()).slice(-2)
    let min = dateStr.getMinutes();
    min = min < 10 ? "0" + min : min;
    let hour = dateStr.getHours();
    let ampm = hour >= 12 ? "pm" : "am";
    hour = hour > 12 ? hour - 12 : hour;
    hour = hour == 0 ? 12 : hour;
    

    return hour + ":" + min + ampm + "  " + d + "-" + m + "-" + y;
  };

  export default testDate