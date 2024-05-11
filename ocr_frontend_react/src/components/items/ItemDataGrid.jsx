import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarContainer,
    useGridApiContext
} from '@mui/x-data-grid';
import {Box, Button} from "@mui/material";
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFloppyDisk, faPen, faPlus, faSave, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";


function EditToolbar(props) {
    const setRows = props.setRows
    const setRowModesModel = props.setRowModesModel

    const apiRef = useGridApiContext();
    const handleClick = async () => {
        console.log("ADD ITEM")

        let newItem = await props.insertItem()
        const id = newItem.id;
        /*setRows((oldRows) => {
            let rows = [...oldRows, {id, name: '', quantity: 1, totalCost: 0,category:"Undefined"}]
            console.log(rows)
            return rows
        });*/
        setRowModesModel((oldModel) =>{
            let rowModesModel =  ({
                ...oldModel,
                [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
            })
            console.log(rowModesModel)
            return rowModesModel
        });
    };

    const saveAllRow = ()=>{
        let rowIds = apiRef.current.getAllRowIds()
        for(let rowId of rowIds)
        {
            try{
                props.handleSaveClick(rowId)()
            }
            catch (e)
            {
                console.log(e.message)
            }
        }
    }

    return (
        <GridToolbarContainer>
            {
                (props.isEditable)
                ?
                   <>
                       <Button color="primary" startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={handleClick}>
                           Add Item
                       </Button>
                       <Button startIcon={<FontAwesomeIcon icon={faSave} />} onClick={()=>{
                           saveAllRow()
                       }}>
                           Save All
                       </Button>
                   </>
                :
                    <></>
            }
        </GridToolbarContainer>
    );
}


export default function ItemDataGrid(props)
{
    let isEditable = props.isEditable || false
    useEffect(() => {
        if(props.items && props.items.length>0)
            setRows([...props.items])
        else
            setRows([])
    }, [props.items]);

    const insertItem = props.insertItem
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});

    const editingRows = useRef([])

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel((prev)=>{
            return { ...prev, [id]: { mode: GridRowModes.View } }
        });
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
        setRows((prev)=>{
            let updatedRows = prev.map((row) => (row.id === newRow.id ? updatedRow : row))
            props.saveItems(updatedRows)
            console.log(updatedRows)
            return updatedRows
        });
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
            field: 'category',
            headerName: 'Category',
            type: 'singleSelect',
            width: 140,
            editable: isEditable,
            valueOptions: props.categories
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
                    toolbar: { setRows, setRowModesModel,insertItem,isEditable,editingRows,handleSaveClick },
                }}
            />
        </Box>
    );
}