import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ReceiptResponseTab from "./ReceiptResponseTab";
import ReceiptImageTab from "./ReceiptImageTab";
import ReceiptPlaceTab from "./ReceiptPlaceTab";
import {ReceiptData} from "../states/ReceiptState";
import {useParams} from "react-router-dom";
import {useEffect} from "react";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ReceiptTab() {
    const params = useParams()
    const [value, setValue] = React.useState(0);
    let receiptData = ReceiptData()

    const hasOcrResponse = () => {
        return receiptData.receipt && receiptData.receipt.ocrEntity
    }

    const hasImage = () => {
        return receiptData.receipt && receiptData.receipt.images && receiptData.receipt.images.length > 0
    }

    useEffect(() => {
        if (receiptData && receiptData.updateReceipt) {
            receiptData.updateReceipt(params.receiptId)
        } else {
            setTimeout(() => {
                if (receiptData && receiptData.updateReceipt) {
                    receiptData.updateReceipt(params.receiptId)
                }
            }, 1000)
        }
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(receiptData.receipt)
    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Place" {...a11yProps(0)} />
                    {
                        (hasOcrResponse())
                            ?
                            <Tab label="Ocr Response" {...a11yProps(1)} />
                            :
                            <Tab label="Ocr Response" {...a11yProps(1)} disabled/>
                    }
                    {
                        (hasImage())
                            ?
                            <Tab label="Uploaded Image" {...a11yProps(2)} />
                            :
                            <Tab label="Uploaded Image" {...a11yProps(2)} disabled/>
                    }
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <ReceiptPlaceTab/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ReceiptResponseTab isDisabled={!hasOcrResponse()}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ReceiptImageTab isDisabled={!hasImage()}/>
            </TabPanel>
        </Box>
    );
}