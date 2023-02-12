export function formatDate(timestamp) {
    let date = new Date (timestamp / 1);
    let month = date.getMonth()+1;
    let day = date.getDate();
    let year = date.getFullYear();
    let formattedDate = (`${month}/${day}/${year}`)
    return formattedDate;
}

export function formatAmount(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
