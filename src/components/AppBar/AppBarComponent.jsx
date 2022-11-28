import React from 'react';
import { AppBar , Box , Button , IconButton , Toolbar , Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";


const AppBarComponent = () => {
    const navigate = useNavigate ()


    return (
        <Box sx={ {flexGrow : 1 , padding : 0} }>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={ {mr : 2} }
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={ {flexGrow : 1} }>
                        News
                    </Typography>
                    <Button
                        onClick={ () => {
                            navigate ( "/login" )
                        } }
                        color="inherit">
                        Login
                    </Button>
                    <Button
                        onClick={ () => {
                            navigate ( "/signup" )
                        } }
                        color="inherit">
                        signup
                    </Button><Button
                        onClick={ () => {
                            navigate ( "/alimenti" )
                        } }
                        color="inherit">
                        Alimenti
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default AppBarComponent;