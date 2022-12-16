import React , { useEffect , useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBolletteList , getPostitList , setBolletteList } from "../../redux/actions/actions";
import { Col , Container , Form , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import { Alert , Button , IconButton , Paper , Skeleton , Stack , Switch , TextField } from "@mui/material";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import OpacityIcon from '@mui/icons-material/Opacity';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GradingIcon from '@mui/icons-material/Grading';
import CardBollettaComponent from "./CardBollettaComponent";
import { Add , Delete } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import FormControl from "@mui/material/FormControl";
import FornituraSelectedComponent from "./FornituraSelectedComponent";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import AlarmIcon from '@mui/icons-material/Alarm';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import { addBolletta , fetchRicercaEmissioneRange , fetchRicercaScadenzaRange } from "./api/api";
import SnackbarSuccessComponent from "../FeedBackComponents/SnackbarSuccessComponent";
import SnackbarErrorComponent from "../FeedBackComponents/SnackbarErrorComponent";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const BolletteComponent = () => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()
    const navigate = useNavigate ()
    const bolletteLoad = useSelector ( state => state.util.bollette_Load_Flag )

    //LISTA DELLE BOLLETTE CHE ARRIVANO DALLA FETCH
    const bolletteList = useSelector ( state => state.fetch.bollettaList )


    // FORM PER L'AGGIUNTA DI UNA NUOVA BOLLETTA //
    ///////////////////////////////////////////////

    // FLAG PER NASCONDERE IL FORM
    const [ formUtenzaFlag , setFormUtenzaFlag ] = useState ( false );

    // STATE PER LA SELEZIONE DELLA FORNITURA
    const [ fornituraState , setFornituraState ] = useState ( '' );

    //FLAG PER L'ERRORE SE NON SCEGLI UN TIPO DI BOLLETTA
    const [ errorFornituraFlag , setErrorFornituraFlag ] = useState ( false );

    const [ formBollettaObj , setFormBollettaObj ] = useState ( {
        fornitura : '' ,
        userId : user.id ,
        numero : '' ,
        totale : '' ,
        emissione : '' ,
        periodoInizio : '' ,
        periodoFine : '' ,
        scadenza : '' ,
    } );

    const handleForm = (key , value) => {
        setFormBollettaObj ( {
            ...formBollettaObj ,
            [key] : value
        } )
    }

    //////////////
    // FINE FORM//

    // LOGICA DELLA SEZIONE DI RICERCA //
    /////////////////////////////////////

    // FLAG PER APRIRE LA SEZIONE DI RICERCA
    const [ ricercaFlag , setRicercaFlag ] = useState ( false );
    //

    // FLAG PER APRIRE LA SOTTOSEZIONE DI RICERCA PER RANGE DI EMISSIONE
    const [ ricercaRangeFlag , setRicercaRangeFlag ] = useState ( false );
    //

    // VALORI DELLA SELEZIONE EFFETTUATA NEL RANGE DI EMISSIONE
    const [ dataInizioRange , setDataInizioRange ] = useState ( '' );
    const [ dataFineRange , setDataFineRange ] = useState ( '' );
    //

    // FLAG PER APRIRE LA SOTTOSEZIONE DI RICERCA PER SCADENZA RANGE
    const [ ricercaScadenzaRangeFlag , setRicercaScadenzaRangeFlag ] = useState ( false );
    //

    // VALORI DELLA SELEZIONE EFFETTUATA NEL RANGE DI SCADENZA
    const [ dataInizioRangeScadenza , setDataInizioRangeScadenza ] = useState ( '' );
    const [ dataFineRangeScadenza , setDataFineRangeScadenza ] = useState ( '' );

    // FLAG PER APRIRE LA SOTTOSEZIONE DI RICERCA PER NUMERO FATTURA
    const [ ricercaNumeroFatturaFlag , setRicercaNumeroFatturaFlag ] = useState ( false );
    //

    // VALORE SELEZIONATO NELLA SEZIONE NUMEROM FATTURA
    const [ numeroFattura , setNumeroFattura ] = useState ( '' );
    //

    /////////////////////////////
    // FINE LOGICA DI RICERCA //


    // LOGICA DELLO SWITCH - FLAGS E FUNZIONI PER SETTARLE IN BASE ALLO SWITCH //
    /////////////////////////////////////////////////////////////////////////////

    const [ gasFlag , setGasFlag ] = useState ( true );
    const handleGas = (event) => {
        setGasFlag ( event.target.checked );
    };

    const [ acquaFlag , setAcquaFlag ] = useState ( true );
    const handleAcqua = (event) => {
        setAcquaFlag ( event.target.checked );
    };

    const [ luceFlag , setLuceFlag ] = useState ( true );
    const handleLuce = (event) => {
        setLuceFlag ( event.target.checked );
    };

    const [ altroFlag , setAltroFlag ] = useState ( true );
    const handleAltro = (event) => {
        setAltroFlag ( event.target.checked );
    };
    ////////////////////////
    // FINE LOGICA SWITCH //


    // ALL'AVVIO DELLA PAGINA FAREMO LA FETCH DELLE BOLLETTE_LIST
    useEffect ( () => {
        dispatch ( getBolletteList ( user.token , user.id ) )
        console.log ( bolletteList )
    } , [] )
    //

    // SE LA LUNGHEZZA DI FORNITURA E' MAGGIORE DI 0 ALLORA L'ALLERT VIENE DISATTIVATO
    useEffect ( () => {
        if ( formBollettaObj.fornitura.length > 0 ) {
            setErrorFornituraFlag ( false )
        }
    } , [ formBollettaObj.fornitura ] );
    //

    //FILTRARE LE BOLLETTE IN BASE ALLA LORO FORNITURA
    const filtroBySwitch = (arr) => {
        let arrFiltered = [];

        //controllo se lo switch è attivo
        // se è attivo eseguo il push sull'array dell'array
        //filtrato per fornitura gas
        if ( gasFlag ) arrFiltered.push ( ...arr.filter ( e => e.fornitura === 'GAS' ) )
        if ( luceFlag ) arrFiltered.push ( ...arr.filter ( e => e.fornitura === 'LUCE' ) )
        if ( acquaFlag ) arrFiltered.push ( ...arr.filter ( e => e.fornitura === 'ACQUA' ) )
        if ( altroFlag ) arrFiltered.push ( ...arr.filter ( e => e.fornitura === 'ALTRO' ) )

        return arrFiltered
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

    // aggiunta nuova bolletta //
    const [snackAddBollettaFlag, setSnackAddBollettaFlag] = useState ( false );

    const handleClickAddBollettaFlag = () => setSnackAddBollettaFlag ( true );
    const handleCloseAddBollettaFlag = () => setSnackAddBollettaFlag(false);
    //

    // errore generico //
    const [snackErrorFlag, setSnackErrorFlag] = useState ( false );

    const handleClickError = () => setSnackErrorFlag (true)
    const handleCloseError = () => setSnackErrorFlag(false)
    //

    // ricerca range di emissione //
    const [snackEmissioneFlag, setSnackEmissioneFlag] = useState (false)

    const handleClickEmissione = () => setSnackEmissioneFlag (true)
    const handleCloseEmissione = () => setSnackEmissioneFlag (false)
    //

    // ricerca range di scadenza //
    const [snackScadenzaFlag, setSnackScadenzaFlag] = useState (false)

    const handleClickScadenza = () => setSnackScadenzaFlag(true)
    const handleCloseScadenza = () => setSnackScadenzaFlag(false)
    //

    // eliminazione di una bolletta //
    const [snackEliminazioneFlag, setSnackEliminazioneFlag] = useState (false)

    const handleClickEliminazione = () => setSnackEliminazioneFlag(true)
    const handleCloseEliminazione = () => setSnackEliminazioneFlag(false)

    // FINE SNACKBARS //
    ////////////////////

    console.log (typeof dataInizioRange)

    return (
        <Container fluid>
            <SnackbarSuccessComponent
                openFlag={ snackAddBollettaFlag }
                closeFunction={ handleCloseAddBollettaFlag }
                message={ 'Bolletta aggiunta con successo!' }
            />
            <SnackbarSuccessComponent
                openFlag={ snackEmissioneFlag }
                closeFunction={ handleCloseEmissione }
                message={ "Bollette filtrate per range di emissione dal " + dataInizioRange + " al " + dataFineRange }
            />
            <SnackbarSuccessComponent
                openFlag={ snackScadenzaFlag }
                closeFunction={ handleCloseScadenza }
                message={ "Bollette filtrate per range di scadenza dal " + dataInizioRangeScadenza + " al " + dataFineRangeScadenza }
            />
            <SnackbarSuccessComponent
                openFlag={ snackEliminazioneFlag }
                closeFunction={ handleCloseEliminazione }
                message={ "Bolletta eliminata con successo" }
            />
            <SnackbarErrorComponent
                openFlag={ snackErrorFlag }
                closeFunction={ handleCloseError }
                message={ "Uffa, c'è qualcosa che non va" }
            />
            <Row className={ "justify-content-center" }>
                <Offcanvas show={ show } onHide={ handleClose }>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body
                        style={ {
                            backgroundColor : "royalblue" ,
                            borderRight : "2px solid royalblue" ,
                            boxShadow : "1px 1px 2px royalblue" ,
                            minHeight : '100%'
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
                        {/*CONTENITORE PER LE CARDS*/ }
                        <Row className={ "p-3" }>

                            {/*CARD PER L'AGGIUNTA DI UNA NUOVA BOLLETTA*/ }
                            <Card
                                sx={ {margin : "20px auto"} }
                                className={ "p-2" }>
                                {/*TITOLO*/ }
                                <h5>Aggiungi una nuova Bolletta</h5>
                                {/*BOTTONE CHE FA COMPARIRE IL FORM*/ }
                                {
                                    !formUtenzaFlag ? (
                                        <IconButton onClick={ () => setFormUtenzaFlag ( true ) } aria-label="add">
                                            <Add/>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={ () => setFormUtenzaFlag ( false ) } aria-label="delete">
                                            <CancelIcon/>
                                        </IconButton>
                                    )
                                }

                                {/*CONTENITORE DEL FORM*/ }
                                <Row>
                                    {
                                        // SEZIONE AGGIUNGI BOLLETTA
                                        formUtenzaFlag && (
                                            <Form onSubmit={ (e) => {
                                                e.preventDefault ()
                                                if ( formBollettaObj.fornitura.length === 0 ) {
                                                    setErrorFornituraFlag ( true )
                                                } else {
                                                    addBolletta ( formBollettaObj , user.token ).then ( (r) => {
                                                        if (r) {
                                                            setFormUtenzaFlag ( false )
                                                            dispatch ( getBolletteList ( user.token , user.id ) )
                                                            setFornituraState ( '' )
                                                            handleClickAddBollettaFlag()
                                                        } else {
                                                            handleClickError()
                                                        }

                                                    } );
                                                    setFormBollettaObj ( {
                                                        fornitura : '' ,
                                                        userId : user.id ,
                                                        numero : '' ,
                                                        totale : '' ,
                                                        emissione : '' ,
                                                        periodoInizio : '' ,
                                                        periodoFine : '' ,
                                                        scadenza : '' ,
                                                    } )
                                                }

                                            } }>
                                                <Row className={ "p-2 justify-content-center" }>
                                                    {/*COMPONENTE PER LA SELEZIONE DELLA FORNITURA*/ }
                                                    <FornituraSelectedComponent
                                                        handleForm={ handleForm }
                                                        fornituraState={ fornituraState }
                                                        setFornituraState={ setFornituraState }/>
                                                    {
                                                        // NEL CASO IN CUI NON SI SELEZIONA LA FORNITURA
                                                        errorFornituraFlag && (
                                                            <Alert severity="error">E' necessario selezionare una
                                                                fornitura</Alert>
                                                        )
                                                    }
                                                </Row>
                                                <Row className={ "p-2" }>
                                                    <h6>Numero Bolletta</h6>
                                                    <FormControl>
                                                        <TextField
                                                            required
                                                            type="number"
                                                            value={ formBollettaObj.numero }
                                                            onChange={ event => handleForm ( "numero" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            id="outlined-basic"
                                                            label="Inserisci il numero..."
                                                            variant="outlined"/>
                                                    </FormControl>


                                                </Row>
                                                <Row className={ "p-2" }>
                                                    <h6>Totale dovuto</h6>
                                                    <FormControl>
                                                        <TextField
                                                            type="number"
                                                            required
                                                            value={ formBollettaObj.totale }
                                                            onChange={ event => handleForm ( "totale" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            id="outlined-basic"
                                                            label="Inserisci il totale..."
                                                            variant="outlined"/>
                                                    </FormControl>
                                                </Row>
                                                <Row className={ "p-2" }>
                                                    <h6>Inserisci data di emissione</h6>
                                                    <FormControl>
                                                        <TextField
                                                            type="date"
                                                            required
                                                            value={ formBollettaObj.emissione }
                                                            onChange={ event => handleForm ( "emissione" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </FormControl>
                                                </Row>
                                                <Row className={ "p-2" }>
                                                    <h6>Inserisci periodo iniziale</h6>
                                                    <FormControl>
                                                        <TextField
                                                            type="date"
                                                            required
                                                            value={ formBollettaObj.periodoInizio }
                                                            onChange={ event => handleForm ( "periodoInizio" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </FormControl>
                                                </Row>
                                                <Row className={ "p-2" }>
                                                    <h6>Inserisci periodo di fine</h6>
                                                    <FormControl>
                                                        <TextField
                                                            type="date"
                                                            required
                                                            value={ formBollettaObj.periodoFine }
                                                            onChange={ event => handleForm ( "periodoFine" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </FormControl>
                                                </Row>
                                                <Row className={ "p-2" }>
                                                    <h6>Scadenza pagamento</h6>
                                                    <FormControl>
                                                        <TextField
                                                            type="date"
                                                            required
                                                            value={ formBollettaObj.scadenza }
                                                            onChange={ event => handleForm ( "scadenza" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </FormControl>
                                                </Row>
                                                <Button type={ 'submit' } variant="contained" sx={ {my : 2} }>
                                                    Aggiungi
                                                </Button>
                                            </Form>
                                        )
                                    }
                                </Row>

                            </Card>

                            {/*SEZIONE DI RICERCA*/ }
                            <Card sx={ {
                                overflow : "scroll" ,
                                '&::-webkit-scrollbar' : {
                                    display : "none"
                                } ,
                                padding : 1 + "em"
                            } }>
                                <h6>Vuoi effettuare una ricerca?</h6>
                                {/*BOTTONE CHE FA COMPARIRE IL FORM*/ }
                                {
                                    !ricercaFlag ? (
                                        <IconButton onClick={ () => setRicercaFlag ( true ) } aria-label="add">
                                            <ContentPasteSearchIcon/>
                                        </IconButton>
                                    ) : (
                                        // AL CLICK CHIUDO TUTTE LE SEZIONI
                                        <IconButton onClick={ () => {
                                            setRicercaFlag ( false )
                                            setRicercaRangeFlag ( false );
                                            setRicercaNumeroFatturaFlag ( false )
                                            setRicercaScadenzaRangeFlag ( false )
                                            dispatch ( getBolletteList ( user.token , user.id ) )
                                        } } aria-label="delete">
                                            <CancelIcon/>
                                        </IconButton>
                                    )
                                }
                                {
                                    // LA SEZIONE DI RICERCA
                                    ricercaFlag && (
                                        <>
                                            <Col className={ 'm-auto' } xs={ 12 }>
                                                {
                                                    // ICONA DI RICERCA PER PERIODO DI EMISSIONE RANGE
                                                    // TUTTE LE BOLLETTE EMESSE IN UN ARCO TEMPORALE
                                                    !ricercaNumeroFatturaFlag &&
                                                    !ricercaScadenzaRangeFlag && (
                                                        <Col className={ 'd-flex flex-column justify-content-start' }>
                                                            <Col>
                                                                <IconButton
                                                                    className={ 'p-0' }
                                                                    color={ ricercaRangeFlag ? 'secondary' : 'primary' }
                                                                    onClick={ () => setRicercaRangeFlag ( !ricercaRangeFlag ) }
                                                                    aria-label="add">
                                                                    <DateRangeIcon style={ {
                                                                        fontSize : '1.5em' ,
                                                                    } }/>
                                                                </IconButton>
                                                            </Col>
                                                            <Col>
                                                                <b>Ricerca per periodo
                                                                    emissione
                                                                    range</b>
                                                            </Col>
                                                        </Col>
                                                    )
                                                }

                                                {
                                                    // ICONA DI RICERCA PER RANGE DI SCADENZA
                                                    // TUTTE LE BOLLETTE CHE SCADONO IN UN ARCO TEMPORALE
                                                    !ricercaRangeFlag &&
                                                    !ricercaNumeroFatturaFlag && (
                                                        <Col className={ 'd-flex flex-column justify-content-start my-3' }>
                                                            <Col>
                                                                <IconButton
                                                                    className={ 'p-0' }
                                                                    color={ ricercaScadenzaRangeFlag ? 'secondary' : 'primary' }
                                                                    onClick={ () => setRicercaScadenzaRangeFlag ( !ricercaScadenzaRangeFlag ) }
                                                                    aria-label="add">
                                                                    <AlarmIcon style={ {
                                                                        fontSize : '1.5em' ,
                                                                    } }/>
                                                                </IconButton>
                                                            </Col>
                                                            <Col>
                                                                <b>Ricerca per scadenza
                                                                    range</b>
                                                            </Col>
                                                        </Col>
                                                    )
                                                }

                                            </Col>
                                        </>
                                    )
                                }

                                {
                                    // SEZIONE DI RICERCA SCADENZA RANGE
                                    ricercaScadenzaRangeFlag && (
                                        <>
                                            <Row className={ 'pt-2' }>
                                                <Col className={ 'd-flex' } xs={ 12 }>
                                                    <Col
                                                        style={ {
                                                            fontSize : '1.5em' ,
                                                            fontWeight : 'bold'
                                                        } }
                                                        className={ 'd-flex align-items-end' }>
                                                        Dal
                                                    </Col>
                                                    <Col>
                                                        <TextField
                                                            value={ dataInizioRangeScadenza }
                                                            onChange={ (e) => setDataInizioRangeScadenza ( e.target.value ) }
                                                            type="date"
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </Col>
                                                </Col>

                                                <Col className={ 'd-flex' }>
                                                    <Col
                                                        style={ {
                                                            fontSize : '1.5em' ,
                                                            fontWeight : 'bold'
                                                        } }
                                                        className={ 'd-flex align-items-end' }>
                                                        al
                                                    </Col>
                                                    <Col>
                                                        <TextField
                                                            value={ dataFineRangeScadenza }
                                                            onChange={ (e) => setDataFineRangeScadenza ( e.target.value ) }
                                                            type="date"
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </Col>
                                                </Col>

                                            </Row>
                                            <Row className={ 'pt-3' }>
                                                <Col>
                                                    <Button
                                                        onClick={ () => {
                                                            fetchRicercaScadenzaRange (
                                                                dataInizioRangeScadenza ,
                                                                dataFineRangeScadenza ,
                                                                user.id ,
                                                                user.token
                                                            ).then ( r => {
                                                                if ( r ) {
                                                                    dispatch ( setBolletteList ( r ) )
                                                                    handleClickScadenza()
                                                                } else {
                                                                    console.log ( 'error' )
                                                                    handleClickError()
                                                                }
                                                            } )
                                                        } }
                                                        variant={ 'contained' }
                                                        color={ "primary" }
                                                        aria-label="add">
                                                        <SearchIcon/>Ricerca
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                }

                                {
                                    // SEZIONE DI RICERCA EMISSIONE RANGE
                                    ricercaRangeFlag && (
                                        <>
                                            <Row className={ 'pt-2' }>
                                                <Col className={ 'd-flex' } xs={ 12 }>
                                                    <Col
                                                        style={ {
                                                            fontSize : '1.5em' ,
                                                            fontWeight : 'bold'
                                                        } }
                                                        className={ 'd-flex align-items-end' }>
                                                        Dal
                                                    </Col>
                                                    <Col>
                                                        <TextField
                                                            value={ dataInizioRange }
                                                            onChange={ (e) => setDataInizioRange ( e.target.value ) }
                                                            type="date"
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </Col>
                                                </Col>

                                                <Col className={ 'd-flex' }>
                                                    <Col
                                                        style={ {
                                                            fontSize : '1.5em' ,
                                                            fontWeight : 'bold'
                                                        } }
                                                        className={ 'd-flex align-items-end' }>
                                                        al
                                                    </Col>
                                                    <Col>
                                                        <TextField
                                                            value={ dataFineRange }
                                                            onChange={ (e) => setDataFineRange ( e.target.value ) }
                                                            type="date"
                                                            id="outlined-basic"
                                                            variant="outlined"/>
                                                    </Col>
                                                </Col>

                                            </Row>
                                            <Row className={ 'pt-3' }>
                                                <Col>
                                                    <Button
                                                        onClick={ () => {
                                                            fetchRicercaEmissioneRange (
                                                                dataInizioRange ,
                                                                dataFineRange ,
                                                                user.id ,
                                                                user.token
                                                            ).then ( r => {
                                                                if ( r ) {
                                                                    dispatch ( setBolletteList ( r ) )
                                                                    handleClickEmissione()
                                                                } else {
                                                                    console.log ( 'error' )
                                                                }
                                                            } )
                                                        } }
                                                        variant={ 'contained' }
                                                        color={ "primary" }
                                                        aria-label="add">
                                                        <SearchIcon/>Ricerca
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </>
                                    )
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
                    bolletteLoad ? (
                        <Col xs={ 12 }>
                            <Stack  spacing={1}>
                                <Row className={'flex-column flex-md-row'}>
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
                                <Row className={'flex-column flex-md-row'}>
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
                        <Col
                            style={ {
                                fontSize : '.7em'
                            } }
                            xs={ 12 }>
                            <Row className={ 'mt-4 text-center justify-content-between' }>

                                <Col className={ 'd-flex justify-content-center' }>

                                    <Col>
                                        <GasMeterIcon style={ {color : 'royalblue' , fontSize : '3em'} }/>
                                        <Switch
                                            checked={ gasFlag }
                                            onChange={ handleGas }
                                            control={ <Switch defaultChecked/> }
                                        />
                                    </Col>
                                    <Col>
                                        <LightbulbIcon style={ {color : 'darkgoldenrod' , fontSize : '3em'} }/>
                                        <Switch
                                            checked={ luceFlag }
                                            onChange={ handleLuce }
                                            control={ <Switch defaultChecked/> }
                                        />
                                    </Col>
                                    <Col>
                                        <OpacityIcon style={ {color : 'dodgerblue' , fontSize : '3em'} }/>
                                        <Switch checked={ acquaFlag }
                                                onChange={ handleAcqua }
                                                control={ <Switch defaultChecked/> }
                                        />
                                    </Col>
                                    <Col>
                                        <GradingIcon style={ {color : 'darkgray' , fontSize : '3em'} }/>
                                        <Switch
                                            checked={ altroFlag }
                                            onChange={ handleAltro }
                                            control={ <Switch defaultChecked/> }
                                        />
                                    </Col>
                                </Col>
                            </Row>
                            {
                                bolletteList.length > 0 ? (
                                    <Row className={ "justify-content-center" }>
                                        {
                                            // LE CARD BOLLETTA
                                            filtroBySwitch ( bolletteList ).map ( (bolletta , index) => {
                                                return (
                                                    <Col
                                                        className={ 'mt-3' }
                                                        xs={ 12 }
                                                        sm={ 10 }
                                                        md={ 6 }
                                                        xxl={ 4 }
                                                        key={ index }>
                                                        <CardBollettaComponent
                                                            handleClickEliminazione={handleClickEliminazione}
                                                            handleClickError={handleClickError}
                                                            bolletta={ bolletta }
                                                            index={ index }
                                                            bollettaList={ filtroBySwitch ( bolletteList ) }
                                                        />
                                                    </Col>
                                                )
                                            } )
                                        }
                                    </Row>
                                ) : (
                                    <Row className={ "justify-content-center text-center" }>
                                        <Col>
                                            <TipsAndUpdatesIcon style={ {fontSize : '5em' , color : 'royalblue'} }/>
                                        </Col>
                                        <h3>Nessuna bolletta trovata, aggiungine una per iniziare</h3>
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

export default BolletteComponent;