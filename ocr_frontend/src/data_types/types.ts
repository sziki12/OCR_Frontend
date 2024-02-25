

interface Receipt{
    id:number,
    description:string,
    totalCost:number,
    items:[Item],
    dateOfPurchase:Date,
}

interface Item{
    name:String,
    quantity:Number,
    id:Number,
    totalCost:Number,
}

