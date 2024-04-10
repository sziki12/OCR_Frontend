export default function getDateToShow(dateOfPurchase)
{
    const date = new Date(dateOfPurchase)
    const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    return year + "-" + (month < 10 ? '0' + month : month) + "-" + (day < 10 ? '0' + day : day)
}

export function isObjectEmpty(obj) {
    for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
            return false;
        }
    }

    return true;
}