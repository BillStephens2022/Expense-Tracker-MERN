function formatDate(timestamp) {
    let date = new Date (timestamp * 1000);
    let month = date.getMonth()+1;
    let day = date.getDate();
    let year = date.getFullYear();
    let formattedDate = (`${month}/${day}/${year}`)
    return formattedDate;
}

