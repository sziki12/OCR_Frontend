import {AppBar, Toolbar, Button, Box, Icon, Typography, IconButton} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReceipt } from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";

export default function MainToolbar()
{
    const navigate = useNavigate();
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={()=>{navigate('/receipts')}}>
                        <FontAwesomeIcon icon={faReceipt} width={50} color={"lightBlue"}/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}