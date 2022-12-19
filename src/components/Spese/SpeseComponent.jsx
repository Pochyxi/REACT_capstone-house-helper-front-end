import React , { useEffect , useState } from 'react';
import { Col , Container , Form , Row } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { getProdottiList , getSpeseList } from "../../redux/actions/actions";
import CardSpesaList from "./CardSpesaList";
import { Switch } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import SnackbarSuccessComponent from "../FeedBackComponents/SnackbarSuccessComponent";
import SnackbarErrorComponent from "../FeedBackComponents/SnackbarErrorComponent";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import BackDropComponent from "../FeedBackComponents/backDropComponent";
import SettingsComponent from "./SettingsComponent";


const SpeseComponent = () => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()

    // ARRAY di liste spesa
    const spesaList = useSelector ( state => state.fetch.spesaList )
    // flag del caricamente delle spese
    const spesaLoad = useSelector ( state => state.util.spese_Load_Flag )



    const [ spesaListaNome , setSpesaListaNome ] = React.useState ( [] );


    // al primo avvio setto le liste
    useEffect ( () => {
        dispatch ( getSpeseList ( user.token , user.id ) )
        dispatch ( getProdottiList ( user.token , user.id ) )
        window.scrollTo(0, 0);
    } , [] )

    // popolo l'array dedicato alla select
    useEffect ( () => {
        populateSpesaListaNome ()
    } , [ spesaList ] )

    // funzione che popola l'array della select
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

    const handleClickDelLista = () => {
        setSnackDelLista ( true )
        dispatch(getSpeseList(user.token, user.id))
        setSpesaListaNome([])
    }
    const handleCloseDelLista = () => setSnackDelLista ( false )

    // errore generico //
    const [ snackErrorFlag , setSnackErrorFlag ] = useState ( false );

    const handleClickError = () => setSnackErrorFlag ( true );
    const handleCloseError = () => setSnackErrorFlag ( false )
    //


    return (
        <Container fluid>

            {/*SNACKBARS*/ }
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

                {/*SEZIONE LATERALE*/ }
               <SettingsComponent
                   show={show}
                   handleClose={handleClose}
                   spesaListaNome={spesaListaNome}
                   setSpesaListaNome={setSpesaListaNome}
                   handleClickLista={handleClickLista}
                   handleClickError={handleClickError}
                   handleClickProdotto={handleClickProdotto}
               />

                {/*ICONA DELLE IMPOSTAZIONI*/}
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
                            <BackDropComponent load={ spesaLoad }/>
                        </Col>
                    ) : (

                        // CARD DELLE LISTE
                        <Col xs={ 11 }>
                            {
                                spesaListaNome.length > 0 ? (
                                    <Row className={ "justify-content-center justify-content-xl-start" }>
                                        {
                                            spesaListaNome.map ( (list , i) => {
                                                return (
                                                    <Col key={ i } xs={ 12 } sm={ 10 } lg={ 8 } xl={ 6 } xxl={ 4 }>
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