function formatDate(timestamp) {
    let date = new Date (timestamp * 1000);
    let month = date.getMonth();
    let day = date.getDay();
    let year = date.getFullYear();
    let formattedDate = (`${month}/${day}/${year}`)
    return formattedDate;
}
