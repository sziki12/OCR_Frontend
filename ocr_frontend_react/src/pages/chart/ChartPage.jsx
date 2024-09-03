import {PieChart} from "@mui/x-charts";
import * as React from 'react';
import {useEffect, useState} from "react";
import {getChartData} from "../../components/utils/BackendAccess";
import {Card, CardContent, CardHeader, Input, MenuItem, Select, Switch, Typography} from "@mui/material";
import getDateToShow from "../../components/utils/Utils";


export default function ChartPage()
{

    let [chartData,setChartData] = useState({
        categoryData:[]
    })
    let [date,setDate] = useState({
        from:new Date(),
        to:new Date(),
        type:"Last Month",
    })
    let [animationEnabled,setAnimationEnabled] = useState(true)

    const onChange = (e) => {
        const { name, value } = e.target;
        if(name === "to" && new Date(date.from) <= new Date(value) ||
        name === "from" && new Date(date.to) >= new Date(value) ||
        name === "type")
        {
            setDate(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
        {
            console.log("ELSE")
            console.log(value)
            console.log(date.from)
            console.log(date.to)
        }

    }

    useEffect(() => {
        console.log(date)
        getChartData(date).then((data)=>{
            setChartData(data)
        })
    }, [date]);
    return(
        <div className={"flex flex-col"}>
            <div className={"flex flex-row items-center"}>
                <p>From</p>
                <Input
                    className={"px-6"}
                    type="date"
                    placeholder="From"
                    name={"from"}
                    value={getDateToShow(date.from)}
                    onChange={onChange}
                    disabled={date.type !== "Custom"}
                />
                <p>To</p>
                <Input
                    className={"px-6"}
                    type="date"
                    placeholder="To"
                    name={"to"}
                    value={getDateToShow(date.to)}
                    onChange={onChange}
                    disabled={date.type !== "Custom"}
                />
            </div>
            <div className={"flex flex-row items-center"}>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={date.type}
                    label="Date Interval"
                    name={"type"}
                    onChange={onChange}
                >
                    <MenuItem value={"Last Month"}>Last Month</MenuItem>
                    <MenuItem value={"Custom"}>Custom</MenuItem>
                    <MenuItem value={"All Time"}>All Time</MenuItem>
                </Select>
                <Switch defaultChecked onChange={()=>{
                    setAnimationEnabled(!animationEnabled)
                }} />
                <p>Enable Chart Animation</p>

            </div>
            <div className={"flex flex-row"}>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            Item Count by Category
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: chartData.categoryData.map((data)=>{return {
                                        id:chartData[data],
                                        value:data.itemCount,
                                        label:data.category
                                    }}),
                                    highlightScope: (animationEnabled)?{ faded: 'global', highlighted: 'item' }:{},
                                    faded: (animationEnabled)?{ innerRadius: 30, additionalRadius: -30, color: 'gray' }:{},
                                },
                            ]}
                            width={400}
                            height={300}
                        />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography sx={{ fontSize: 18 }} gutterBottom>
                            Item Cost by Category
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: chartData.categoryData.map((data)=>{return {
                                        id:chartData[data],
                                        value:data.totalCost,
                                        label:data.category
                                    }}),
                                    highlightScope: (animationEnabled)?{ faded: 'global', highlighted: 'item' }:{},
                                    faded: (animationEnabled)?{ innerRadius: 30, additionalRadius: -30, color: 'gray' }:{},
                                },
                            ]}
                            width={400}
                            height={300}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>)
}