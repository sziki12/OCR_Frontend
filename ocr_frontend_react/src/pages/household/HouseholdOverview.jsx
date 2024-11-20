import {ThemeData} from "../../components/handlers/ThemeHandler";
import background_light from "../../resources/background_light.webp";
import background_dark from "../../resources/background_dark02.png";
import {
    Alert,
    Button,
    Dialog,
    DialogActions, DialogContent,
    DialogContentText, DialogTitle,
    Divider,
    IconButton,
    Input,
    Paper,
    Switch,
    TextField
} from "@mui/material";
import {HouseholdData} from "../../components/states/HouseholdState";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsRotate} from "@fortawesome/free-solid-svg-icons";
import {HouseholdEndpointFunctions} from "../../dist/endpoints/HouseholdEndpoint";

export default function HouseholdOverview({}) {

    const {breakpoints, selectedTheme} = ThemeData();
    const {selectedHousehold, households, setSelectedHousehold, updateHouseholds,selectedHouseholdUsers} = HouseholdData()
    const {inviteUser,saveHouseholdName,createNewHousehold} = HouseholdEndpointFunctions()
    const [editableHousehold, setEditableHousehold] = useState({id:-1,name:""})
    const [otherHouseholds, setOtherHouseholds] = useState([])
    const mode = selectedTheme.palette.mode || "light"
    let [editable, setEditable] = useState(false)
    let [invite, setInvite] = useState(false)
    let [inviteState,setInviteState] = useState(false)

    console.log(selectedHouseholdUsers)

    useEffect(() => {
        setEditableHousehold(selectedHousehold)
    }, [selectedHousehold]);

    useEffect(() => {
        setOtherHouseholds(households.filter((household)=>household.id!==selectedHousehold.id))
    }, [households, selectedHousehold]);

    const onChange = (e) => {
        let {name, value} = e.target;
        setEditableHousehold({...editableHousehold, [name]: value})
    }

    const OtherHouseholds = () => {
        return (<div>
            <Typography className={"pb-5"} variant={"h4"}>Your Households</Typography>
            <div className={"flex flex-col"}>
                {selectedHouseholdUsers.otherUsers.map((user) => {
                    return (<div key={user.id}>
                        <Typography variant={"h5"}>
                            {user.name}
                            <br/>
                            {user.email}

                        </Typography>
                        <Divider/>
                    </div>)
                })
                }
            </div>
        </div>)
    }
    const OtherUsers = () => {
        return (<>
            <Typography className={"pb-5"} variant={"h4"}>Other Users</Typography>
            <div className={"flex flex-col"}>
                {otherHouseholds.map((household) => {
                    return (<div key={household.id}>
                        <Typography variant={"h5"}>
                            {household.name}
                            <Button className={"float-right"} onClick={() => {
                                setSelectedHousehold(household)
                            }}>Select</Button>
                        </Typography>
                        <Divider/>
                    </div>)
                })
                }
            </div>
        </>)
    }
    const InviteDialog = () => {
        return (<Dialog PaperProps={{
            component: 'form',
            onSubmit: async (event) => {
                event.preventDefault()
                const formData = new FormData(event.currentTarget)
                const formJson = Object.fromEntries((formData).entries())
                const email = formJson.email
                setInvite(false)
                await inviteUser(selectedHousehold.id,email)
                setInviteState(true)
                setTimeout(()=>{setInviteState(false)},5000)
            },
        }} open={invite} onClose={() => setInvite(false)}>
            <DialogTitle>Invite User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the email of the user íou want to invite in this household.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>setInvite(false)}>Cancel</Button>
                <Button type="submit">Send Invite</Button>
            </DialogActions>
        </Dialog>)
    }

    return (
        <Paper elevation={10} className={"px-6 pt-6 pb-16 h-screen flex flex-row justify-center space-x-10"}
               sx={{
                   backgroundImage: (mode === "light") ? `url(${background_light})` : `url(${background_dark})`,
                   backgroundRepeat: "no-repeat",
                   backgroundSize: "cover",
               }}>
            <Paper className={"p-5 w-fit h-fit space-y-5"}>
                <OtherHouseholds/>
            </Paper>
            <Paper className={"p-5 w-fit h-fit space-y-5"}>
                <Typography variant={"h4"}>
                    Selected Household
                    <IconButton onClick={() => {
                        updateHouseholds()
                    }}><FontAwesomeIcon icon={faArrowsRotate}/></IconButton>
                </Typography>
                <Typography>Edit
                    <Switch
                        checked={editable}
                        onChange={() => setEditable(!editable)}
                    />
                </Typography>

                <TextField disabled={!editable} value={editableHousehold.name} placeholder={"Household Name"}
                           name={"name"}
                           onChange={onChange}/>
                <br/>
                <Button onClick={() => setInvite(true)}>Invite Others</Button>
                <Button onClick={()=>{
                    console.log(editableHousehold.id)
                    console.log(editableHousehold.name)
                    saveHouseholdName(editableHousehold.id,editableHousehold.name)
                    updateHouseholds()
                }}>Save</Button>
                {
                    (inviteState)
                    ?
                        <Alert severity="info">If a user exists with the given email, it will be notified to join.</Alert>
                    :
                        <></>
                }
            </Paper>
            <Paper className={"p-5 w-fit h-fit space-y-5"}>
                <OtherUsers/>
                <InviteDialog/>
            </Paper>
        </Paper>)
}

