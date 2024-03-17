export default function getDateToShow(dateOfPurchase)
{
    const date = new Date(dateOfPurchase)
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)
}