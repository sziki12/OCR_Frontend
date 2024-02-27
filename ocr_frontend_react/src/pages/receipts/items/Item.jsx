

export default function Item(props)
{
    return(props.items?.map((item)=>
        {
            return(
                <div className="px-4 py-2 bg-sky-100">
                    <p className={"text-black"}>{item.name+": "+item.quantity+" piece"}</p>
                    <p className={"text-black"}>{"Cost: "+item.totalCost}</p>
                </div>
            )
        }))
}