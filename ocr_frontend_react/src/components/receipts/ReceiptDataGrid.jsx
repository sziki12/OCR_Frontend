import { DataGrid } from '@mui/x-data-grid';
import {Box} from "@mui/material";
import * as React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getSingleReceipt} from "../../components/utils/BackendAccess";

export default function ReceiptDataGrid(props)
{

    const [receipt, setReceipt] = useState({
        description:"",
        dateOfPurchase:new Date(),
        items:[],
        totalCost:0
    })

    useEffect(() => {
        setReceipt({...props.receipt})
    }, [props.receipt]);

    const saveItems = (items)=> {
        setReceipt({
            ...receipt,
            items:items
        })
    }

    const columns = [
        //{ field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'name',
            headerName: 'Name',
            width: 300,
            editable: true,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 150,
            type: 'number',
            editable: true,
        },
        {
            field: 'totalCost',
            headerName: 'Cost',
            type: 'number',
            width: 150,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return(
        <>
            <Box sx={{ height: 400, width: '60%' }}>
                <DataGrid
                    rows={receipt.items}
                    columns={columns}
                    onCellEditStop={()=>{
                        props.setReceipt(receipt)
                        console.log(receipt)
                    }}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick

                />
            </Box>
        </>
    )
}