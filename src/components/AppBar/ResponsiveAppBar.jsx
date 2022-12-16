import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeComponent from "../Home/HomeComponent";
import PostitComponent from "../Postit/PostitComponent";
import { Route , Routes , useLocation , useNavigate } from "react-router-dom";
import { Col , Container , Row } from "react-bootstrap";
import LoginComponent from "../Login/LoginComponent";
import SignUpComponent from "../Signup/SignUpComponent";
import SpeseComponent from "../Spese/SpeseComponent";
import BolletteComponent from "../Bollette/BolletteComponent";
import StatisticheComponent from "../Statistiche/StatisticheComponent";
import { useEffect , useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../../redux/actions/actions";
import LogoutIcon from '@mui/icons-material/Logout';
import MapComponent from "../Home/MapComponent";
import ChartBolletteComponent from "../Statistiche/ChartComponent/ChartBolletteComponent";
import LoginMaterialComponent from "../Login/LoginMaterialComponent";
import HouseHelper from '../../img/HHlogo.png'

const drawerWidth = 240;

const ResponsiveAppBar = (props) => {
    const navigate = useNavigate ()
    const user = useSelector ( state => state.user.user )
    const location = useLocation ()
    const dispatch = useDispatch ()
    const [ colorNav , setColorNav ] = useState ( {
        color : 'black' ,
        backgroundColor : 'white' ,
    } )
    const [colorDrawer, setColorDrawer] = useState ( {
        textAlign : 'center' ,
        p : 2, minHeight: '100vh',
        backgroundColor: 'white',
        color: 'black'
    })

    const handleColorNav = () => {
        if ( location.pathname === '/' ) {
            setColorNav ( {
                color : 'black' ,
                backgroundColor : 'white' ,
            } )
            setColorDrawer(state => {
                return {
                    ...state,
                    backgroundColor : 'white' ,
                }
            })
        } else if ( location.pathname === '/postit' ) {
            setColorNav ( {
                color : 'black' ,
                backgroundImage : 'linear-gradient(to left, #f1f58f, white)' ,
            } )
            setColorDrawer(state => {
                return {
                    ...state,
                    backgroundImage : 'linear-gradient(to top, #f1f58f, white)' ,
                }
            })
        } else if ( location.pathname === '/alimenti' ) {
            setColorNav ( {
                color : 'white' ,
                backgroundImage : 'linear-gradient(to left, dodgerblue, white)' ,
            } )
            setColorDrawer(state => {
                return {
                    ...state,
                    backgroundImage : 'linear-gradient(to top, dodgerblue, white)' ,
                }
            })
        } else if ( location.pathname === '/utenze' ) {
            setColorNav ( {
                color : 'white' ,
                backgroundImage : 'linear-gradient(to left, royalblue, white)' ,
            } )
            setColorDrawer(state => {
                return {
                    ...state,
                    backgroundImage : 'linear-gradient(to top, royalblue, white)' ,
                }
            })
        } else if ( location.pathname === '/statistiche' ) {
            setColorNav ( {
                color : 'white' ,
                backgroundImage : 'linear-gradient(to left, black, white)' ,
            } )
            setColorDrawer(state => {
                return {
                    ...state,
                    backgroundImage : 'linear-gradient(to top, black, white)' ,
                }
            })
        }
    }

    useEffect ( () => {
        handleColorNav ()
    } , [ location.pathname ] )

    useEffect ( () => {
        if ( !user.token ) {
            navigate ( "/login" );

        }

    } , [ user.token ] );


    const {window} = props;
    const [ mobileOpen , setMobileOpen ] = React.useState ( false );

    const handleDrawerToggle = () => {
        setMobileOpen ( !mobileOpen );
    };

    const drawer = (
        <Box onClick={ handleDrawerToggle } sx={ colorDrawer }>
            <Typography variant="h6" sx={ {my : 2, color: 'dodgerblue'} }>
                HouseHelper
            </Typography>
            <Row className={ 'align-items-center justify-content-center' }>
                <Col>
                    <img
                        style={ {
                            width : "30%" ,
                            height : "30%"
                        } }
                        src={ HouseHelper }
                        alt="logo"/>
                </Col>
            </Row>
            <Divider/>
            <List>
                { user.token ? (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    navigate ( '/' )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    borderBottom : location.pathname === '/' ? '2px solid indigo' : 'none'
                                } }>
                                <ListItemText primary={ 'HOME' }/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    navigate ( '/postit' )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    borderBottom : location.pathname === '/postit' ? '2px solid indigo' : 'none'
                                } }>
                                <ListItemText primary={ 'POSTIT' }/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    navigate ( '/alimenti' )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    borderBottom : location.pathname === '/alimenti' ? '2px solid indigo' : 'none'
                                } }>
                                <ListItemText primary={ 'SPESE' }/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    navigate ( '/utenze' )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    borderBottom : location.pathname === '/utenze' ? '2px solid indigo' : 'none'
                                } }>
                                <ListItemText primary={ 'BOLLETTE' }/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    navigate ( '/statistiche' )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    borderBottom : location.pathname === '/statistiche' ? '2px solid indigo' : 'none'
                                } }>
                                <ListItemText primary={ 'GRAFICI' }/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    dispatch ( logout () )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    color : 'red' ,
                                } }>
                                <ListItemText primary={ 'Logout' }/>
                            </ListItemButton>
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    navigate ( '/login' )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    borderBottom : location.pathname === '/login' ? '2px solid indigo' : 'none'
                                } }>
                                <ListItemText primary={ 'Login' }/>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton
                                onClick={ () => {
                                    navigate ( '/signup' )
                                } }
                                sx={ {
                                    textAlign : 'center' ,
                                    borderBottom : location.pathname === '/signup' ? '2px solid indigo' : 'none'
                                } }>
                                <ListItemText primary={ 'Iscriviti' }/>
                            </ListItemButton>
                        </ListItem>
                    </>

                )
                }

            </List>
        </Box>
    );

    const container = window !== undefined ? () => window ().document.body : undefined;


    return (
        <Box sx={ {display : 'flex'} }>
            <AppBar sx={ colorNav } component="nav">
                <Toolbar style={ {fontSize : '15px'} } className={ 'd-sm-flex justify-content-md-center' }>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={ handleDrawerToggle }
                        sx={ {mr : 2 , display : {sm : 'none'}} }
                    >
                        <MenuIcon style={ {marginRight : '5px' , color: 'black'} }/>
                    </IconButton>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={ handleDrawerToggle }
                        sx={ {mr : 2 , display : {sm : 'none'}, color: 'black'} }>
                        <Col>
                            <img
                                style={ {
                                    width : "50px" ,
                                    height : "50px"
                                } }
                                src={ HouseHelper }
                                alt="logo"/>

                        </Col>
                        <Typography
                            style={{color: 'dodgerblue'}}
                            variant="h6"
                            component="div"
                        >
                            {/*House Helper*/}
                        </Typography>
                    </IconButton>

                    <Row
                        className={ 'd-none d-sm-flex align-items-center justify-content-center' }>
                        <Col >
                            <img
                                style={ {
                                    width : "50px" ,
                                    height : "50px"
                                } }
                                src={ HouseHelper }
                                alt="logo"/>
                        </Col>
                    </Row>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={ {flexGrow : 1 , display : {xs : 'none' , sm : 'block'}} }
                    >
                        {/*House Helper*/}
                    </Typography>
                    <Box sx={ {display : {xs : 'none' , sm : 'block'}} }>
                        {
                            user.token ? (
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={ () => {
                                                navigate ( '/' )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                                borderBottom : location.pathname === '/' ? '2px solid black' :
                                                    'none' ,
                                            } }>
                                            <ListItemText primary={ 'HOME' }/>
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={ () => {
                                                navigate ( '/postit' )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                                borderBottom : location.pathname === '/postit' ? '2px solid black' :
                                                    'none' ,

                                            } }>
                                            <ListItemText primary={ 'POSTIT' }/>
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={ () => {
                                                navigate ( '/alimenti' )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                                borderBottom : location.pathname === '/alimenti' ?
                                                    '2px solid black' : 'none' ,
                                            } }>
                                            <ListItemText primary={ 'SPESE' }/>
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={ () => {
                                                navigate ( '/utenze' )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                                borderBottom : location.pathname === '/utenze' ? '2px solid black' :
                                                    'none' ,
                                            } }>
                                            <ListItemText primary={ 'BOLLETTE' }/>
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={ () => {
                                                navigate ( '/statistiche' )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                                borderBottom : location.pathname === '/statistiche' ?
                                                    '2px solid white' : 'none' ,
                                            } }>
                                            <ListItemText primary={ 'GRAFICI' }/>
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={ () => {
                                                dispatch ( logout () )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                            } }>
                                            <LogoutIcon/>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            ) : (
                                <>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={ () => {
                                                navigate ( '/login' )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                                borderBottom : location.pathname === '/login' ? '20px solid #f3f2ef' :
                                                    'none' ,
                                            } }>
                                            <ListItemText primary={ 'Login' }/>
                                        </ListItemButton>
                                        <ListItemButton
                                            onClick={ () => {
                                                navigate ( '/signup' )
                                            } }
                                            sx={ {
                                                textAlign : 'center' ,
                                                borderBottom : location.pathname === '/signup' ? '20px solid #f3f2ef' :
                                                    'none' ,
                                            } }>
                                            <ListItemText primary={ 'Registrati' }/>
                                        </ListItemButton>
                                    </ListItem>
                                </>
                            )
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    container={ container }
                    variant="temporary"
                    open={ mobileOpen }
                    onClose={ handleDrawerToggle }
                    ModalProps={ {
                        keepMounted : true , // Better open performance on mobile.
                    } }
                    sx={ {
                        display : {xs : 'block' , sm : 'none'} ,
                        '& .MuiDrawer-paper' : {boxSizing : 'border-box' , width : drawerWidth} ,
                    } }
                >
                    { drawer }
                </Drawer>
            </Box>
            <Box component="main" sx={ {width : '100%' , paddingTop : '10px'} }>
                <Container fluid
                           style={ {
                               backgroundColor : "#f3f2ef" ,
                           } }>

                    <Row style={ {marginTop : "60px" , minHeight : '100vh'} } className={ "px-0" }>
                        <Routes>
                            <Route path="/login" element={ <LoginComponent/> }/>
                            <Route path="/signup" element={ <SignUpComponent/> }/>
                            <Route path="/" element={ <HomeComponent/> }/>
                            <Route path="/alimenti" element={ <SpeseComponent/> }/>
                            <Route path="/postit" element={ <PostitComponent/> }/>
                            <Route path="/utenze" element={ <BolletteComponent/> }/>
                            <Route path="/statistiche" element={ <StatisticheComponent/> }/>
                            <Route path="/map" element={ <MapComponent/> }/>
                            <Route path="/chart" element={ <ChartBolletteComponent/> }/>
                        </Routes>
                    </Row>
                </Container>
            </Box>
        </Box>
    );
};


export default ResponsiveAppBar;