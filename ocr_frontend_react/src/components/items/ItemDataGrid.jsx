import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarContainer
} from '@mui/x-data-grid';
import {Box, Button} from "@mui/material";
import * as React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk, faPen, faPlus, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";


function EditToolbar(props) {
    const setRows = props.setRows
    const setRowModesModel = props.setRowModesModel

    const handleClick = async () => {
        let newItem = await props.insertItem()
        const id = newItem.id;
        setRows((oldRows) => [...oldRows, {id, name: '', quantity: 1, totalCost: 0}]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={handleClick}>
                Add Item
            </Button>
        </GridToolbarContainer>
    );
}


export default function ItemDataGrid(props)
{

    let isEditable = props.isEditable || false

    useEffect(() => {
        setRows([...props.items])
    }, [props.items]);

    const insertItem = props.insertItem
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        const updatedRows = rows.filter((row) => row.id !== id)
        setRows(updatedRows);
        props.saveItems(updatedRows)
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        const updatedRows = rows.map((row) => (row.id === newRow.id ? updatedRow : row))
        setRows(updatedRows);
        props.saveItems(updatedRows)
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 220, editable: isEditable },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            width: 140,
            editable: isEditable,
        },
        {
            field: 'totalCost',
            headerName: 'Cost',
            type: 'number',
            width: 140,
            editable: isEditable,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if(!isEditable)
                {
                    return []
                }

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<FontAwesomeIcon icon={faFloppyDisk} />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<FontAwesomeIcon icon={faXmark} />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<FontAwesomeIcon icon={faPen} />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<FontAwesomeIcon icon={faTrash} />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel,insertItem },
                }}
            />
        </Box>
    );
}