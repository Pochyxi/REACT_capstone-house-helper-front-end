import React , { useEffect , useState } from 'react';
import { Col , Container , Form , Row } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { getProdottiList , getSpeseList } from "../redux/actions/actions";
import ProdottiSelectComponent from "./ProdottiSelectComponent";
import ListaSpesaSelectComponent from "./ListaSpesaSelectComponent";
import CardSpesaList from "./CardSpesaList";
import { Button , List , ListItem , ListItemButton , ListItemText , TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import SearchIcon from '@mui/icons-material/Search';
import { styled , alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

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

const AlimentiComponent = () => {
    const spesaList = useSelector ( state => state.fetch.spesaList )
    const prodottiList = useSelector ( state => state.fetch.productList )
    const user = useSelector ( state => state.user.user )
    const [ deleteProdottiFlag , setDeleteProdottiFlag ] = useState (false);
    const dispatch = useDispatch ()
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

    const [ spesaListaNome , setSpesaListaNome ] = React.useState ( [] );


    useEffect ( () => {
        dispatch ( getSpeseList ( user.token , user.id ) )
        dispatch ( getProdottiList ( user.token ) )
    } , [] )

    const addListaSpesa = async (obj , token) => {
        const baseEndpoint = `http://localhost:8080/api/lista/new`
        const header = {
            'Content-Type' : 'application/json' ,
            'Authorization' : 'Bearer ' + token
        }

        try {
            const response = await fetch ( baseEndpoint , {
                method : 'POST' ,
                headers : header ,
                body : JSON.stringify ( obj )
            } )

            if ( response.ok ) {
                const data = await response.json ();
                console.log ( data )
                setFormFlag ( false )
                dispatch ( getSpeseList ( user.token , user.id ) )
            }
        } catch ( e ) {
            console.log ( e )
        }
    }
    const removeProdottoFromDatabase = async (token , prodottoId) => {
        const baseEndpoint = `http://localhost:8080/api/prodotto/delete/${ prodottoId }`
        const header = {
            'Authorization' : 'Bearer ' + token
        }

        try {
            const response = await fetch ( baseEndpoint , {
                method : 'DELETE' ,
                headers : header ,
            } )

            if ( response.ok ) {
                dispatch ( getProdottiList ( user.token ) )
                dispatch ( getSpeseList ( user.token , user.id ) )
                setSpesaListaNome ( [] )
            }
        } catch ( e ) {
            console.log ( e )
        }
    }

    console.log ( prodottiList.filter ( list => list.nome.toUpperCase ().includes ( searchObj.search.toUpperCase () ) ) )

    return (
        <Container fluid>
            <Row className={ "justify-content-center" }>
                <Col
                    style={ {
                        backgroundColor : "aliceblue" ,
                        borderRight : "2px solid royalblue" ,
                        minHeight : 100 + "vh" ,
                        position : "fixed" ,
                        left : 0
                    } }
                    className={ "text-center" }
                    xs={ 3 }>
                    <Row className={ "p-2" }>
                        <Card
                            sx={ {minWidth : "100%" , margin : "20px auto"} }
                            className={ "p-2" }>
                            <Col xs={ 12 }>
                                <h5>Seleziona la lista della spesa</h5>
                                <ListaSpesaSelectComponent spesaListaNome={ spesaListaNome }
                                                           setSpesaListaNome={ setSpesaListaNome }/>
                            </Col>

                            <Col className={ "mt-2" }>
                                <h5>Oppure aggiungine una nuova</h5>
                                {
                                    !formFlag && (
                                        <Button onClick={ () => {
                                            setFormFlag ( true )
                                        } } variant="contained" color="primary">
                                            Aggiungi Lista
                                        </Button>
                                    )
                                }

                            </Col>
                            {
                                formFlag && (
                                    <Col className={ "mt-3" } xs={ 12 }>
                                        <Form onSubmit={ event => {
                                            event.preventDefault ()
                                            addListaSpesa ( formObj , user.token )
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
                                                <Button type={ "submit" } className={ "mt-2" } variant="outlined"
                                                        color="success">
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
                        <Card sx={ {
                            maxHeight : "30vh" ,
                            overflow : "scroll" ,
                            '&::-webkit-scrollbar' : {
                                display : "none"
                            },
                            padding: 1 +"em"
                        } }>
                            <h5>Gestione prodotti</h5>
                            <h6>Seleziona prodotto per eliminarlo dal database</h6>
                            <Search>
                                <SearchIconWrapper>
                                    <SearchIcon/>
                                </SearchIconWrapper>
                                <StyledInputBase
                                    onFocus={ () => setDeleteProdottiFlag(true)}
                                    onBlur={ () => setDeleteProdottiFlag(false)}
                                    value={ searchObj.search }
                                    onChange={ (e) => {
                                        handleSearch ( "search" , e.target.value )
                                    } }
                                    placeholder="ricerca…"
                                    inputProps={ {'aria-label' : 'search'} }
                                />
                            </Search>
                            {
                                deleteProdottiFlag && (
                                    <List className={ "text-center p-2" }>
                                        {
                                            prodottiList.filter ( prodotto => prodotto.nome.toUpperCase ().includes ( searchObj.search.toUpperCase () ) ).map ( (prodotto , index) => {
                                                return (
                                                    <ListItem key={ index } disablePadding>
                                                        <ListItemButton onClick={ () => {
                                                            removeProdottoFromDatabase ( user.token , prodotto.id )
                                                        } } sx={ {color : "red"} }>
                                                            <ListItemText className={ "text-center" }
                                                                          primary={ prodotto.nome }/>
                                                        </ListItemButton>
                                                    </ListItem>
                                                )
                                            } )
                                        }

                                    </List>
                                )
                            }

                        </Card>
                    </Row>
                </Col>
                <Col xs={ 3 }>

                </Col>
                <Col xs={ 9 }>
                    <Row className={ "justify-content-center" }>
                        {
                            spesaListaNome.map ( (list , i) => {
                                let size = 12
                                switch (spesaListaNome.length) {
                                    case 1:
                                        size = 12
                                        break
                                    case 2:
                                        size = 6
                                        break
                                    default:
                                        size = 12
                                }
                                return (
                                    <Col key={ i } xs={ size }>
                                        <CardSpesaList setSpesaListaNome={ setSpesaListaNome } list={ list }
                                                       spesaList={ spesaList } index={ i }/>
                                    </Col>
                                )
                            } )
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AlimentiComponent;