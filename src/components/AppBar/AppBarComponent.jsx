import React , { useEffect } from 'react';
import { AppBar , Box , Button , IconButton , Tab , Tabs , Toolbar , Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation , useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../../redux/actions/actions";


const AppBarComponent = () => {
    const navigate = useNavigate ()
    const user = useSelector ( state => state.user.user )
    const location = useLocation()
    const dispatch = useDispatch()
    const [ value , setValue ] = React.useState ( '' );
    const handleChange = (event , newValue) => {
        setValue ( newValue );
    };


    useEffect ( () => {
        if (!user.token) {
            navigate("/login");
        }
    }, [user.token] );


    // VALUE A SECONDA DELLA PATHNAME
    useEffect ( () => {
        if (location.pathname === '/') {
            setValue('HOME');
        } else if (location.pathname === "/alimenti") {
            setValue('ALIMENTI');
        } else if (location.pathname === "/postit") {
            setValue('POSTIT');
        } else if (location.pathname === "/utenze") {
            setValue('UTENZE')
        } else if (location.pathname === "/statistiche") {
            setValue('STATISTICHE');
        }
    }, [location.pathname] );

    // NAVIGAZIONE A SECONDA DEL VALUE
    useEffect ( () => {

        if (value === 'HOME') {
            navigate("/")
        } else if (value === 'ALIMENTI') {
            navigate("/alimenti")
        } else if (value === 'POSTIT') {
            navigate("/postit")
        } else if (value === 'UTENZE') {
            navigate("/utenze")
        } else if(value === 'STATISTICHE') {
            navigate("/statistiche")
        }
    }, [value] );




    return (
        <Box sx={ {flexGrow : 1 , padding : 0} }>
            <AppBar position="fixed">
                <Toolbar>
                    {
                        !user.token && (
                            <>
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
                                </Button>
                            </>
                        )
                    }

                    {
                        user.token && (
                            <Button
                                onClick={() => dispatch(logout())}
                                style={{color: 'white'}}
                                variant="text" sx={ {my : 2} }>
                                LOGOUT
                            </Button>

                        )
                    }

                    <Typography variant="h6" component="div" sx={ {flexGrow : 1, textAlign: 'center'} }>
                        HOUSE HELPER
                    </Typography>
                    {
                        value && (
                            <Tabs
                                onChange={ handleChange }
                                indicatorColor={ "secondary" }
                                textColor={ "inherit" }
                                value={ value }
                                aria-label="basic tabs example">
                                <Tab value="HOME" label={ "HOME" }/>
                                <Tab value={ "POSTIT" } label="POSTIT"/>
                                <Tab value={ "ALIMENTI" } label="ALIMENTI"/>
                                <Tab value={ "UTENZE" } label="UTENZE"/>
                                <Tab value={ "STATISTICHE" } label="STATISTICHE"/>
                            </Tabs>
                        )
                    }


                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default AppBarComponent;