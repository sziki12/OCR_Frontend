import {
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    GridRowModes,
    GridToolbarContainer,
    useGridApiContext
} from '@mui/x-data-grid';
import {Box, Button, Dialog} from "@mui/material";
import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {categoriseItems} from "../../dist/endpoints/ItemEndpoint"
import {faFloppyDisk, faPen, faPlus, faSave, faTrash, faXmark, faIcons} from "@fortawesome/free-solid-svg-icons";
import {HouseholdData} from "../states/HouseholdState";
import {ReceiptData} from "../states/ReceiptState";


function EditToolbar(props) {
    const rows = props.rows
    const setRows = props.setRows
    const setRowModesModel = props.setRowModesModel
    const receipt = props.receipt
    const {updateReceipt} = ReceiptData()

    const {selectedHousehold} = HouseholdData()

    const [categorise, setCategorise] = useState(false);
    const [showNameDialog, setShowNameDialog] = useState(false);
    const [categoriseModel, setCategoriseModel] = useState("mistral");

    const apiRef = useGridApiContext();

    useEffect(() => {
        setTimeout(() => {
            console.log("Autosizing columns...")
            apiRef.current.autosizeColumns({
                includeOutliers: true,
                includeHeaders: true,
                expand: true,
                outliersFactor: 1.5
            })
        }, 250)
    }, [apiRef])

    const handleClick = async () => {
        let newItem = await props.insertItem()
        const id = newItem.id;
        /*Removed due to items update on Submit
        setRows((oldRows) => {
            let rows = [...oldRows, {id, name: '', quantity: 1, totalCost: 0,category:"Undefined"}]
            console.log(rows)
            return rows
        });*/
        setRowModesModel((oldModel) => {
            return ({
                ...oldModel,
                [id]: {mode: GridRowModes.Edit, fieldToFocus: 'name'},
            })
        });
    };

    const saveAllRow = () => {
        let rowIds = apiRef.current.getAllRowIds()
        props.saveItems(rows)
        for (let rowId of rowIds) {
            try {
                props.handleSaveClick(rowId)()
            } catch (e) {
                //console.log(e.message)
            }
        }
    }

    return (
        <GridToolbarContainer>
            {
                (props.isEditable)
                    ?
                    <>
                        <Button color="primary" startIcon={<FontAwesomeIcon icon={faPlus}/>} onClick={handleClick}>
                            Add Item
                        </Button>
                        <Button startIcon={<FontAwesomeIcon icon={faSave}/>} onClick={() => {
                            saveAllRow()
                        }}>
                            Save All
                        </Button>

                        <Button disabled={categorise} startIcon={<FontAwesomeIcon icon={faIcons}/>}
                                onClick={async () => {
                                    if (typeof (receipt.name) !== "undefined" && receipt.name !== "") {
                                        setCategorise(true)
                                        await categoriseItems(selectedHousehold.id, receipt.id,categoriseModel)
                                        updateReceipt(receipt.id)
                                        setCategorise(false)
                                    } else {
                                        setShowNameDialog(true)
                                    }

                                }}>
                            Categorise Items
                        </Button>
                        {
                            (showNameDialog)
                                ?
                                <Dialog
                                    className={"p-10 m-10"}
                                    open={showNameDialog}
                                    onClose={() => setShowNameDialog(false)}
                                >
                                    <p>To Categorise the items please fill the receipt's Name</p>
                                    <Button onClick={() => setShowNameDialog(false)}>Ok</Button>
                                </Dialog>
                                :
                                <></>
                        }
                    </>
                    :
                    <></>
            }
        </GridToolbarContainer>
    );
}

//TODO Replace with list on mobile size
export default function ItemDataGrid(props) {
    let isEditable = props.isEditable || false
    useEffect(() => {
        if (props.items && props.items.length > 0)
            setRows([...props.items])
        else
            setRows([])
    }, [props.items]);

    const receipt = props.receipt
    const insertItem = props.insertItem
    const [rows, setRows] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const saveItems = props.saveItems

    const editingRows = useRef([])

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({...rowModesModel, [id]: {mode: GridRowModes.Edit}});
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel((prev) => {
            return {...prev, [id]: {mode: GridRowModes.View}}
        });
    };

    const handleDeleteClick = (id) => () => {
        const updatedRows = rows.filter((row) => row.id !== id)
        setRows(updatedRows);
        saveItems(updatedRows)
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: {mode: GridRowModes.View, ignoreModifications: true},
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = {...newRow, isNew: false};
        setRows((prev) => {
            let updatedRows = prev.map((row) => (row.id === newRow.id ? updatedRow : row))
            saveItems(updatedRows)
            return updatedRows
        });
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    /* const outliersFactor = "1.5"
     const autosizeOptions = {
         columns: ['name', 'quantity', 'totalCost', 'category'],
         includeHeaders:true,
         includeOutliers:true,
         outliersFactor: Number.isNaN(parseFloat(outliersFactor))
             ? 1
             : parseFloat(outliersFactor),
         expand:true,
     };*/

    const columns = [
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 150,
            editable: isEditable
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            type: 'number',
            minWidth: 75,
            editable: isEditable,
        },
        {
            field: 'totalCost',
            headerName: 'Cost',
            type: 'number',
            minWidth: 100,
            editable: isEditable,
        },
        {
            field: 'category',
            headerName: 'Category',
            type: 'singleSelect',
            minWidth: 150,
            editable: isEditable,
            valueOptions: props.categories
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
            cellClassName: 'actions',
            getActions: ({id}) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (!isEditable) {
                    return []
                }

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<FontAwesomeIcon icon={faFloppyDisk}/>}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<FontAwesomeIcon icon={faXmark}/>}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<FontAwesomeIcon icon={faPen}/>}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<FontAwesomeIcon icon={faTrash}/>}
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
                //height: 500,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
            className={"flex flex-grow"}
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
                    toolbar: {
                        rows,
                        setRows,
                        setRowModesModel,
                        insertItem,
                        isEditable,
                        editingRows,
                        handleSaveClick,
                        receipt,
                        saveItems
                    },
                }}
                /*autosizeOnMount
                autosizeOptions={autosizeOptions}*/
            />
        </Box>
    );
}