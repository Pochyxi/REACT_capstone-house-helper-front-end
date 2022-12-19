import React , { useState } from 'react';
import Offcanvas from "react-bootstrap/Offcanvas";
import { Col , Form , Row } from "react-bootstrap";
import { Button , IconButton , List , ListItem , ListItemButton , ListItemText , TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@mui/material/Card";
import { getProdottiList , getSpeseList } from "../../redux/actions/actions";
import FormControl from "@mui/material/FormControl";
import { useDispatch , useSelector } from "react-redux";
import SearchIcon from '@mui/icons-material/Search';
import { styled , alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { addListaSpesa , removeProdottoFromDatabase } from "../Spese/api/api";
import { Add , Delete } from "@mui/icons-material";
import DeleteProdottoComponent from "./DeleteProdottoComponent";


const Search = styled ( 'div' ) ( ({theme}) => ({
    position : 'relative' ,
    borderRadius : theme.shape.borderRadius ,
    backgroundColor : alpha ( theme.palette.common.white , 0.15 ) ,
    '&:hover' : {
        backgroundColor : alpha ( theme.palette.common.white , 0.25 ) ,
    } ,
    marginLeft : 0 ,
    width : '100%' ,
    [theme.breakpoints.up ( 'sm' )] : {
        marginLeft : theme.spacing ( 1 ) ,
        width : 'auto' ,
    } ,
}) );

const SearchIconWrapper = styled ( 'div' ) ( ({theme}) => ({
    padding : theme.spacing ( 0 , 2 ) ,
    height : '100%' ,
    position : 'absolute' ,
    pointerEvents : 'none' ,
    display : 'flex' ,
    alignItems : 'center' ,
    justifyContent : 'center' ,
}) );

const StyledInputBase = styled ( InputBase ) ( ({theme}) => ({
    color : 'inherit' ,
    '& .MuiInputBase-input' : {
        padding : theme.spacing ( 1 , 1 , 1 , 0 ) ,
        // vertical padding + font size from searchIcon
        paddingLeft : `calc(1em + ${ theme.spacing ( 4 ) })` ,
        transition : theme.transitions.create ( 'width' ) ,
        width : '100%' ,
        [theme.breakpoints.up ( 'sm' )] : {
            width : '12ch' ,
            '&:focus' : {
                width : '20ch' ,
            } ,
        } ,
    } ,
}) );

const SettingsComponentV2 = (props) => {
    const user = useSelector ( state => state.user.user )
    const prodottiList = useSelector ( state => state.fetch.productList )
    const dispatch = useDispatch ()

    // FORM //
    /////////
    const [ formFlag , setFormFlag ] = useState ( false );
    const [ formObj , setFormObj ] = useState ( {
        nome : "" ,
        userId : user.id
    } );
    const [ searchObj , setSearchObj ] = useState ( {
        search : "" ,
    } );

    const handleForm = (key , value) => {
        setFormObj ( {
            ...formObj ,
            [key] : value
        } )
    }

    const handleSearch = (key , value) => {
        setSearchObj ( {
            ...searchObj ,
            [key] : value
        } )
    }
    // FINE FORM //
    //////////////



    return (
        <Offcanvas className={ 'p-0' } show={ props.show } onHide={ props.handleClose }>
            <Offcanvas.Header closeButton>
            </Offcanvas.Header>
            <Offcanvas.Body
                style={ {
                    backgroundColor : "dodgerblue" ,
                    borderRight : "2px solid dodgerblue" ,
                    boxShadow : "1px 1px 2px dodgerblue" ,
                    minHeight : '100%' ,
                } }
                className={ "text-center" }
            >
                {/*ICONA PER CHIUDERE LA SEZIONE LATERALE*/ }
                <Row className={ 'justify-content-end' }>
                    <Col xs={ 2 }>
                        <IconButton
                            onClick={ () => props.handleClose () }
                            aria-label="delete">
                            <CloseIcon
                                style={ {
                                    fontSize : '2rem'
                                } }/>
                        </IconButton>
                    </Col>
                </Row>

                {/*SEZIONE CHE PERMETTE DI SELEZIONARE LE LISTE DELLA SPESA*/ }
                <Row className={ "p-3" }>
                    <Card
                        sx={ {margin : "20px auto"} }
                        className={ "p-2" }>

                        {/*AGGIUNGERE UNA NUOVA LISTA*/ }
                        <Col className={ "mt-2" }>
                            <h5>Aggiungi una nuova lista della spesa</h5>
                            {
                                !formFlag && (
                                    <IconButton
                                        onClick={ () => {
                                            setFormFlag ( true )
                                        } }
                                        aria-label="add">
                                        <Add/>
                                    </IconButton>
                                )
                            }



                        </Col>
                        {
                            // SEZIONE DI AGGIUNTA NUOVA LISTA
                            formFlag && (
                                <Col className={ "mt-3" } xs={ 12 }>
                                    <Form onSubmit={ event => {
                                        event.preventDefault ()
                                        addListaSpesa ( formObj , user.token ).then ( (r) => {
                                            if ( r === 'success' ) {
                                                setFormFlag ( false )
                                                dispatch ( getSpeseList ( user.token , user.id ) )
                                                props.handleClickLista ()
                                            } else {
                                                props.handleClickError ()
                                            }
                                        } )
                                    } }>
                                        <FormControl>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Nome lista"
                                                onChange={ event => handleForm ( "nome" , event.target.value ) }
                                            />
                                        </FormControl>
                                        <Col>
                                            <Button type={ "submit" } className={ "mt-2" } variant="contained"
                                                    color="primary">
                                                Aggiungi
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button onClick={ () => {
                                                setFormFlag ( false )
                                            } } className={ "mt-2" } variant="outlined" color="error">
                                                Annulla
                                            </Button>
                                        </Col>
                                    </Form>
                                </Col>
                            )
                        }
                    </Card>

                    {/*SEZIONE DI ELIMINAZIONE DEI PRODOTTI*/ }
                    <Card sx={ {
                        maxHeight : "30vh" ,
                        overflow : "scroll" ,
                        '&::-webkit-scrollbar' : {
                            display : "none"
                        } ,
                        padding : 1 + "em"
                    } }>
                        <h5>Gestione prodotti ({ prodottiList.length })</h5>
                        <h6>Seleziona prodotto per eliminarlo dal database</h6>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon/>
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={ searchObj.search }
                                onChange={ (e) => {
                                    handleSearch ( "search" , e.target.value )
                                } }
                                placeholder="ricerca…"
                                inputProps={ {'aria-label' : 'search'} }
                            />
                        </Search>
                        {

                            // LISTA PRODOTTI
                            <List className={ "text-center p-2" }>
                                {
                                    prodottiList.filter ( prodotto => prodotto.nome.toUpperCase ().includes ( searchObj.search.toUpperCase () ) ).map ( (prodotto , index) => {
                                        return (
                                            <DeleteProdottoComponent
                                                key={index}
                                                handleClickProdotto={props.handleClickProdotto}
                                                prodotto={prodotto}
                                            />
                                        )
                                    } )
                                }
                            </List>
                        }
                    </Card>
                </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default SettingsComponentV2;