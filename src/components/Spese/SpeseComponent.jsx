import React , { useEffect , useState } from 'react';
import { Col , Container , Form , Row } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { getProdottiList , getSpeseList } from "../../redux/actions/actions";
import ListaSpesaSelectComponent from "./ListaSpesaSelectComponent";
import CardSpesaList from "./CardSpesaList";
import {
    Button ,
    IconButton ,
    List ,
    ListItem ,
    ListItemButton ,
    ListItemText , Skeleton , Stack ,
    Switch ,
    TextField
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import SearchIcon from '@mui/icons-material/Search';
import { styled , alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { addListaSpesa , removeProdottoFromDatabase } from "./api/api";
import SnackbarSuccessComponent from "../FeedBackComponents/SnackbarSuccessComponent";
import SnackbarErrorComponent from "../FeedBackComponents/SnackbarErrorComponent";
import DialogDeleteComponent from "../FeedBackComponents/DialogDeleteComponent";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import CardPostitComponent from "../Postit/api/CardPostitComponent";

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

const SpeseComponent = () => {
    const spesaList = useSelector ( state => state.fetch.spesaList )
    const spesaLoad = useSelector ( state => state.util.spese_Load_Flag )
    const prodottiList = useSelector ( state => state.fetch.productList )
    const user = useSelector ( state => state.user.user )
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
        dispatch ( getProdottiList ( user.token , user.id ) )
    } , [] )


    const populateSpesaListaNome = () => {
        if ( spesaListaNome.length === 0 ) {
            let arr = []
            for (let i = 0; i < spesaList.length; i++) {
                console.log ( spesaList[i].id + " " + spesaList[i].nome )
                arr.push ( spesaList[i].id + " " + spesaList[i].nome )
            }
            setSpesaListaNome ( arr )
        }
    }


    useEffect ( () => {
        populateSpesaListaNome ()
    } , [ spesaList ] )

    // OFFCANVAS //
    //////////////
    const [ show , setShow ] = useState ( false );

    const handleClose = () => setShow ( false );
    const handleShow = () => setShow ( true );

    ////////////////////
    // FINE OFFCANVAS //

    // SNACKBARS //
    ///////////////

    // aggiunta di una nuova lista //
    const [ snackAddListaFlag , setSnackAddListaFlag ] = useState ( false );

    const handleClickLista = () => setSnackAddListaFlag ( true )
    const handleCloseLista = () => setSnackAddListaFlag ( false )
    //

    // eliminazione di un prodotto //
    const [ snackElProdottoFlag , setSnackElProdottoFlag ] = useState ( false )

    const handleClickProdotto = () => {
        dispatch ( getProdottiList ( user.token , user.id ) )
        setSnackElProdottoFlag ( true )
    }
    const handleCloseProdotto = () => setSnackElProdottoFlag ( false )
    //

    // aggiunta di un prodotto nel database //
    const [ snackAddProdData , setSnackAddProdData ] = useState ( false )

    const handleClickProdData = () => setSnackAddProdData ( true )
    const handleCloseProdData = () => setSnackAddProdData ( false )
    //

    // aggiunta di un prodotto gia esistente alla lista //
    const [ snackAddProdottoList , setSnackAddProdottoList ] = useState ( false )

    const handleClickAddProdottoList = () => setSnackAddProdottoList ( true )
    const handleCloseAddProdottoList = () => setSnackAddProdottoList ( false )

    // eliminazione di un prodotto dalla lista //
    const [ snackElProdottoListFlag , setSnackElProdottoListFlag ] = useState ( false )

    const handleClickProdottoList = () => setSnackElProdottoListFlag ( true )
    const handleCloseProdottoList = () => setSnackElProdottoListFlag ( false )
    //

    // eliminazione di una lista //
    const [ snackDelLista , setSnackDelLista ] = useState ( false )

    const handleClickDelLista = () => setSnackDelLista ( true )
    const handleCloseDelLista = () => setSnackDelLista ( false )

    // errore generico //
    const [ snackErrorFlag , setSnackErrorFlag ] = useState ( false );

    const handleClickError = () => setSnackErrorFlag ( true );
    const handleCloseError = () => setSnackErrorFlag ( false )
    //

    // DIALOGS //
    /////////////

    const [ dialogEliminazioneProdottoFlag , setDialogEliminazioneProdottoFlag ] = useState ( false );
    const handleClickOpenProdotto = () => {
        setDialogEliminazioneProdottoFlag ( true );
    };
    const handleCloseProdottoDialog = () => {
        setDialogEliminazioneProdottoFlag ( false );
    };

    // FINE DIALOGS //
    //////////////////


    return (
        <Container fluid>
            <SnackbarErrorComponent
                openFlag={ snackErrorFlag }
                closeFunction={ handleCloseError }
                message={ 'Purtroppo qualcosa è andato storto' }
            />
            <SnackbarSuccessComponent
                openFlag={ snackAddListaFlag }
                closeFunction={ handleCloseLista }
                message={ "Lista della spesa aggiunta con successo!" }
            />
            <SnackbarSuccessComponent
                openFlag={ snackElProdottoFlag }
                closeFunction={ handleCloseProdotto }
                message={ "Prodotto eliminato con successo!" }
            />
            <SnackbarSuccessComponent
                openFlag={ snackElProdottoListFlag }
                closeFunction={ handleCloseProdottoList }
                message={ "Prodotto rimosso dalla lista con successo!" }
            />
            <SnackbarSuccessComponent
                openFlag={ snackAddProdottoList }
                closeFunction={ handleCloseAddProdottoList }
                message={ "Prodotto aggiunto" }
            />
            <SnackbarSuccessComponent
                openFlag={ snackAddProdData }
                closeFunction={ handleCloseProdData }
                message={ "Prodotto aggiunto al database e alla lista, il prodotto è ora disponibile per l'aggiunta automatica" }
            />
            <SnackbarSuccessComponent
                openFlag={ snackDelLista }
                closeFunction={ handleCloseDelLista }
                message={ "Lista della spesa eliminata" }
            />

            <Row className={ "justify-content-center align-items-center flex-column" }>

                <Offcanvas className={ 'p-0' } show={ show } onHide={ handleClose }>
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
                        <Row className={ 'justify-content-end' }>
                            <Col xs={ 2 }>
                                <IconButton
                                    onClick={ () => handleClose () }
                                    aria-label="delete">
                                    <CloseIcon
                                        style={ {
                                            fontSize : '2rem'
                                        } }/>
                                </IconButton>
                            </Col>
                        </Row>
                        <Row className={ "p-3" }>
                            <Card
                                sx={ {margin : "20px auto"} }
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
                                                addListaSpesa ( formObj , user.token ).then ( (r) => {
                                                    if ( r === 'success' ) {
                                                        setFormFlag ( false )
                                                        dispatch ( getSpeseList ( user.token , user.id ) )
                                                        setSpesaListaNome ( [] )
                                                        handleClickLista ()
                                                    } else {
                                                        handleClickError ()
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

                                    <List className={ "text-center p-2" }>
                                        {
                                            prodottiList.filter ( prodotto => prodotto.nome.toUpperCase ().includes ( searchObj.search.toUpperCase () ) ).map ( (prodotto , index) => {
                                                return (
                                                    <ListItem key={ index } disablePadding>
                                                        <ListItemButton onClick={ handleClickOpenProdotto }
                                                                        sx={ {color : "red"} }>
                                                            <ListItemText className={ "text-center" }
                                                                          primary={ prodotto.nome }/>
                                                        </ListItemButton>
                                                        <DialogDeleteComponent
                                                            dialogEliminazioneFlag={ dialogEliminazioneProdottoFlag }
                                                            handleClose={ handleCloseProdottoDialog }
                                                            fetchToDelete={ removeProdottoFromDatabase }
                                                            item={ prodotto }
                                                            user={ user }
                                                            openSuccess={ handleClickProdotto }
                                                            openError={ handleClickError }
                                                        />
                                                    </ListItem>
                                                )
                                            } )
                                        }

                                    </List>

                                }

                            </Card>
                        </Row>

                    </Offcanvas.Body>
                </Offcanvas>
                <Col>
                    <SettingsIcon style={ {color : 'gray' , fontSize : '3em'} }/>
                    <Switch
                        checked={ show }
                        onChange={ show ? handleClose : handleShow }
                        control={ <Switch defaultChecked/> }
                    />
                </Col>
                {
                    spesaLoad ? (
                        <Col>
                            <Stack  spacing={1}>
                                <Row className={'flex-column flex-xl-row'}>
                                    <Col>
                                        <Skeleton variant="rectangular" width={'100%'} height={200} />
                                    </Col>
                                    <Col>
                                        <Skeleton variant="rectangular" width={'100%'} height={200} />
                                    </Col>
                                    <Col>
                                        <Skeleton variant="rounded" width={'100%'} height={200} />
                                    </Col>
                                </Row>
                            </Stack>
                            <Stack className={'mt-3'}  spacing={1}>
                                <Row className={'flex-column flex-xl-row'}>
                                    <Col>
                                        <Skeleton variant="rectangular" width={'100%'} height={200} />
                                    </Col>
                                    <Col>
                                        <Skeleton variant="rectangular" width={'100%'} height={200} />
                                    </Col>
                                    <Col>
                                        <Skeleton variant="rounded" width={'100%'} height={200} />
                                    </Col>
                                </Row>
                            </Stack>

                        </Col>
                    ) : (
                        <Col xs={ 11 }>
                            {
                                spesaListaNome.length > 0 ? (
                                    <Row className={ "justify-content-center justify-content-xl-start" }>
                                        {
                                            spesaListaNome.map ( (list , i) => {
                                                return (
                                                    <Col key={ i } xs={ 12 } sm={ 10 } lg={8} xl={ 6 } xxl={ 4 }>
                                                        <CardSpesaList
                                                            handleClickDelLista={ handleClickDelLista }
                                                            handleClickAddProdData={ handleClickProdData }
                                                            handleClickAddProdottoList={ handleClickAddProdottoList }
                                                            handleClickProdottoList={ handleClickProdottoList }
                                                            setSpesaListaNome={ setSpesaListaNome }
                                                            list={ list }
                                                            spesaList={ spesaList }
                                                            index={ i }
                                                            handleClickError={ handleClickError }
                                                        />
                                                    </Col>
                                                )
                                            } )
                                        }
                                    </Row>
                                ) : (
                                    <Row className={ "justify-content-center text-center" }>
                                        <Col>
                                            <TipsAndUpdatesIcon style={ {fontSize : '3em' , color : 'royalblue'} }/>
                                        </Col>
                                        <h3>Nessuna lista trovata, aggiungine una per iniziare</h3>
                                    </Row>
                                )
                            }
                        </Col>
                    )
                }

            </Row>
        </Container>
    );
};

export default SpeseComponent;