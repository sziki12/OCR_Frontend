import {PieChart} from "@mui/x-charts";
import * as React from 'react';
import {useEffect, useState} from "react";
import {getChartData} from "../../dist/endpoints/StatisticEndpoint";
import {Card, CardContent, Input, MenuItem, Select, Switch, Typography} from "@mui/material";
import getDateToShow from "../../components/utils/Utils";
import {ThemeData} from "../../components/handlers/ThemeHandler";
import {HouseholdData} from "../../components/states/HouseholdState";


export default function ChartPage() {
    const {breakpoints} = ThemeData();
    const {selectedHousehold} = HouseholdData()

    let [chartData, setChartData] = useState({
        categoryData: []
    })
    let [date, setDate] = useState({
        from: new Date(),
        to: new Date(),
        type: "Last Month",
    })
    let [animationEnabled, setAnimationEnabled] = useState(true)
    const onChange = (e) => {
        const {name, value} = e.target;
        if (name === "to" && new Date(date.from) <= new Date(value) ||
            name === "from" && new Date(date.to) >= new Date(value) ||
            name === "type") {
            setDate(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    useEffect(() => {
        getChartData(selectedHousehold.id, date).then((data) => {
            setChartData(data)
        })
    }, [date]);
    return (
        <div className={`flex flex-col space-y-4`}>
            <div className={`flex flex-${(breakpoints.md || breakpoints.sm ? ("col") : ("row"))} space-y-4`}>
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
                </div>
                <div className={"flex flex-row items-center"}>
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
                <Switch defaultChecked onChange={() => {
                    setAnimationEnabled(!animationEnabled)
                }}/>
                <p>Enable Chart Animation</p>
            </div>
            <div>
                <div
                    className={`flex flex-${(breakpoints.md || breakpoints.sm ? ("col") : ("row"))} space-${(breakpoints.md || breakpoints.sm ? ("y") : ("x"))}-10`}>
                    <Card>
                        <CardContent>
                            <Typography sx={{fontSize: 18}} gutterBottom>
                                Item Count by Category
                            </Typography>
                            <PieChart
                                series={[
                                    {
                                        data: chartData.categoryData.map((data) => {
                                            return {
                                                id: chartData[data],
                                                value: data.itemCount,
                                                label: data.category
                                            }
                                        }),
                                        highlightScope: (animationEnabled) ? {
                                            faded: 'global',
                                            highlighted: 'item'
                                        } : {},
                                        faded: (animationEnabled) ? {
                                            innerRadius: 30,
                                            additionalRadius: -30,
                                            color: 'gray'
                                        } : {},
                                    },
                                ]}
                                width={(breakpoints.md || breakpoints.sm ? (200) : (400))}
                                height={300}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <Typography sx={{fontSize: 18}} gutterBottom>
                                Item Cost by Category
                            </Typography>
                            <PieChart
                                series={[
                                    {
                                        data: chartData.categoryData.map((data) => {
                                            return {
                                                id: chartData[data],
                                                value: data.totalCost,
                                                label: data.category
                                            }
                                        }),
                                        highlightScope: (animationEnabled) ? {
                                            faded: 'global',
                                            highlighted: 'item'
                                        } : {},
                                        faded: (animationEnabled) ? {
                                            innerRadius: 30,
                                            additionalRadius: -30,
                                            color: 'gray'
                                        } : {},
                                    },
                                ]}
                                width={(breakpoints.md || breakpoints.sm ? (200) : (400))}
                                height={300}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>)
}