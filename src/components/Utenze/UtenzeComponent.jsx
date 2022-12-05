import React , { useEffect , useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBolletteList , getPostitList , setBolletteList } from "../../redux/actions/actions";
import { Col , Container , Form , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import { Alert , Button , IconButton , Paper , Switch , TextField } from "@mui/material";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import OpacityIcon from '@mui/icons-material/Opacity';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GradingIcon from '@mui/icons-material/Grading';
import CardUtenzaComponent from "./CardUtenzaComponent";
import { Add } from "@mui/icons-material";
import CancelIcon from "@mui/icons-material/Cancel";
import FormControl from "@mui/material/FormControl";
import FornituraSelectedComponent from "./FornituraSelectedComponent";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import AlarmIcon from '@mui/icons-material/Alarm';

const UtenzeComponent = () => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()
    const navigate = useNavigate ()

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

    //FETCH PER AGGIUNGERE UNA BOLLETTA
    const addBolletta = async (obj , key) => {
        const baseEndpoint = `http://localhost:8080/api/bolletta/new`
        const header = {
            'Content-Type' : 'application/json' ,
            'Authorization' : 'Bearer ' + key
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
                dispatch ( getBolletteList ( user.token , user.id ) )
                setFornituraState ( '' )
            }

        } catch ( e ) {
            console.log ( e )
        }
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
    const [ ricercaScadenzaRangeFlag , setRicercaScadenzaRangeFlag ] = useState (false);
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

    // FETCH DI RICERCA PER RANGE DI EMISSIONE
    const fetchRicercaEmissioneRange = async (inizio, fine, userId, token) => {
        const baseEndpoint = `http://localhost:8080/api/bolletta/emissione-range/${inizio}/${fine}/userId/${userId}`
        const header = {
            'Authorization' : 'Bearer ' + token
        }

        try {
            const response = await fetch(
                baseEndpoint,
                {
                    method: 'GET',
                    headers: header
                }
            )

            if (response.ok) {
                const data = await response.json();
                dispatch(setBolletteList(data));
                // dispatch(getBolletteList(user.token, user.id))
                console.log (data)
            }
        } catch (e) {
            console.log ( e)
        }
    }

    //FETCH DI RICERCA PER RANGE DI SCADENZA
    const fetchRicercaScadenzaRange = async (inizio, fine, userId, token) => {
        const baseEndpoint = `http://localhost:8080/api/bolletta/scadenza-maggiore/${inizio}/scadenza-minore/${fine}/userId/${userId}`
        const header = {
            'Authorization' : 'Bearer ' + token
        }

        try {
            const response = await fetch(
                baseEndpoint,
                {
                    method: 'GET',
                    headers: header
                }
            )

            if (response.ok) {
                const data = await response.json();
                dispatch(setBolletteList(data));
                console.log (data)
            }
        } catch (e) {
            console.log ( e)
        }
    }

    // FETCH DI RICERCA PER NUMERO FATTURA
    const fetchRicercaNumeroFattura = async (numeroFattura, userId, token) => {
        const baseEndpoint = `http://localhost:8080/api/bolletta/numero-fattura/${numeroFattura}/userId/${userId}`
        const header = {
            'Authorization' : 'Bearer ' + token
        }

        try {
            const response = await fetch(
                baseEndpoint,
                {
                    method: 'GET',
                    headers: header
                }
            )

            if (response.ok) {
                const data = await response.json();
                dispatch(setBolletteList(data));
                console.log (data)
            }
        } catch (e) {
            console.log ( e)
        }
    }

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


    //CONTROLLA SE L'UTENTE E' LOGGATO
    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );
    //

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
    //


    console.log ( "INIZIO TEST VALORI RICERCA" )
    console.log ( "Valori range emissione")
    console.log ( dataInizioRange )
    console.log ( dataFineRange )
    console.log ("valori range scadenza")
    console.log ( dataInizioRangeScadenza)
    console.log ( dataFineRangeScadenza )
    console.log ( "valore numero fattura")
    console.log ( numeroFattura )
    console.log ( "fine----------" )

    console.log ( formBollettaObj )

    return (
        <Container fluid>
            <Row
                style={ {
                    fontSize : '.7em'
                } }
                className={ "justify-content-center" }>
                {/*SEZIONE LATERALE*/ }
                <Col
                    style={ {
                        backgroundColor : "#0d6efd" ,
                        borderRight : "2px solid royalblue" ,
                        boxShadow : "1px 1px 2px gray" ,
                        minHeight : '100%' ,
                        overflowY : 'scroll' ,
                        position : "fixed" ,
                        bottom : '0%' ,
                        top : '50px' ,
                        left : 0 ,
                        paddingBottom : '50px'
                    } }
                    className={ "text-center hideScrollBar" }
                    xs={ 3 }>

                    {/*CONTENITORE PER LE CARDS*/ }
                    <Row className={ "p-2" }>

                        {/*CARD PER L'AGGIUNTA DI UNA NUOVA BOLLETTA*/ }
                        <Card
                            sx={ {margin : "20px auto" , maxHeight : '100%'} }
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
                                                addBolletta ( formBollettaObj , user.token ).then ( () => setFormUtenzaFlag ( false ) );
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
                                                {/*COMPONENTE PER LA SELEZIONE DELLA FORNITURA*/}
                                                <FornituraSelectedComponent
                                                    handleForm={ handleForm }
                                                    fornituraState={ fornituraState }
                                                    setFornituraState={ setFornituraState }/>
                                                {
                                                    // NEL CASO IN CUI NON SI SELEZIONA LA FORNITURA
                                                    errorFornituraFlag && (
                                                        <Alert severity="error">E' necessario selezionare una fornitura</Alert>
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

                        {/*SEZIONE DI RICERCA*/}
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
                                    <IconButton onClick={ () => {
                                        setRicercaFlag ( false )
                                        setRicercaRangeFlag(false);
                                        setRicercaNumeroFatturaFlag(false)
                                        dispatch(getBolletteList(user.token, user.id))
                                    } } aria-label="delete">
                                        <CancelIcon/>
                                    </IconButton>
                                )
                            }
                            {
                                // LA SEZIONE DI RICERCA
                                ricercaFlag && (
                                    <>
                                        <Col className={ 'm-auto' } xs={ 6 }>
                                            {
                                                // ICONA DI RICERCA PER PERIODO DI EMISSIONE RANGE
                                                // TUTTE LE BOLLETTE EMESSE IN UN ARCO TEMPORALE
                                                !ricercaNumeroFatturaFlag &&
                                                !ricercaScadenzaRangeFlag && (
                                                    <Col className={ 'd-flex justify-content-start' }>
                                                        <IconButton
                                                            className={ 'p-0' }
                                                            color={ ricercaRangeFlag ? 'secondary' : 'primary' }
                                                            onClick={ () => setRicercaRangeFlag ( !ricercaRangeFlag ) }
                                                            aria-label="add">
                                                            <DateRangeIcon style={ {
                                                                fontSize : '1.5em' ,
                                                            } }/>
                                                        </IconButton>
                                                        <b className={ 'd-flex align-items-end' }>Ricerca per periodo emissione range</b>
                                                    </Col>
                                                )
                                            }

                                            {
                                                // ICONA DI RICERCA PER RANGE DI SCADENZA
                                                // TUTTE LE BOLLETTE CHE SCADONO IN UN ARCO TEMPORALE
                                                !ricercaRangeFlag &&
                                                !ricercaNumeroFatturaFlag && (
                                                    <Col className={ 'd-flex justify-content-start my-3' }>
                                                        <IconButton
                                                            className={ 'p-0' }
                                                            color={ ricercaScadenzaRangeFlag ? 'secondary' : 'primary' }
                                                            onClick={ () => setRicercaScadenzaRangeFlag ( !ricercaScadenzaRangeFlag ) }
                                                            aria-label="add">
                                                            <AlarmIcon style={ {
                                                                fontSize : '1.5em' ,
                                                            } }/>
                                                        </IconButton>
                                                        <b className={ 'd-flex align-items-end' }>Ricerca per scadenza range</b>
                                                    </Col>
                                                )
                                            }

                                            {
                                                // ICONA DI RICERCA PER NUMERO FATTURA
                                                // ARRAY CONTENENTE ANCHE 0 ELEMENTI NEL CASO IN CUI NON VIENE TROVATO IL NUMERO FATTURA
                                                !ricercaRangeFlag &&
                                                !ricercaScadenzaRangeFlag && (
                                                    <Col className={ 'd-flex justify-content-start my-3' }>
                                                        <IconButton
                                                            className={ 'p-0' }
                                                            color={ ricercaNumeroFatturaFlag ? 'secondary' : 'primary' }
                                                            onClick={ () => setRicercaNumeroFatturaFlag ( !ricercaNumeroFatturaFlag ) }
                                                            aria-label="add">
                                                            <ReceiptLongIcon style={ {
                                                                fontSize : '1.5em' ,
                                                            } }/>
                                                        </IconButton>
                                                        <b className={ 'd-flex align-items-end' }>Ricerca per numero fattura</b>
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
                                                        value={dataInizioRangeScadenza}
                                                        onChange={(e) => setDataInizioRangeScadenza(e.target.value)}
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
                                                        value={dataFineRangeScadenza}
                                                        onChange={(e) => setDataFineRangeScadenza(e.target.value)}
                                                        type="date"
                                                        id="outlined-basic"
                                                        variant="outlined"/>
                                                </Col>
                                            </Col>

                                        </Row>
                                        <Row className={ 'pt-3' }>
                                            <Col>
                                                <Button
                                                    onClick={() => {
                                                        fetchRicercaScadenzaRange(
                                                            dataInizioRangeScadenza,
                                                            dataFineRangeScadenza,
                                                            user.id,
                                                            user.token
                                                        )
                                                    }}
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
                                                        value={dataInizioRange}
                                                        onChange={(e) => setDataInizioRange(e.target.value)}
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
                                                        value={dataFineRange}
                                                        onChange={(e) => setDataFineRange(e.target.value)}
                                                        type="date"
                                                        id="outlined-basic"
                                                        variant="outlined"/>
                                                </Col>
                                            </Col>

                                        </Row>
                                        <Row className={ 'pt-3' }>
                                            <Col>
                                                <Button
                                                    onClick={() => {
                                                        fetchRicercaEmissioneRange(
                                                            dataInizioRange,
                                                            dataFineRange,
                                                            user.id,
                                                            user.token
                                                        )
                                                    }}
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
                                // SEZIONE DI RICERCA PER NUMERO FATTURA
                                ricercaNumeroFatturaFlag && (
                                    <Row className={ 'pt-2' }>
                                        <Col className={ 'd-flex' } xs={ 12 }>
                                            <Col
                                                style={ {
                                                    fontSize : '1.5em' ,
                                                    fontWeight : 'bold'
                                                } }
                                                className={ 'd-flex align-items-end' }>
                                                Inserisci numero fattura
                                            </Col>
                                            <Col>
                                                <TextField
                                                    value={numeroFattura}
                                                    onChange={(e) => setNumeroFattura(e.target.value)}
                                                    type="number"
                                                    label="N. Fattura"
                                                    id="outlined-basic"
                                                    variant="outlined"/>
                                            </Col>
                                        </Col>
                                        <Row className={ 'pt-3' }>
                                            <Col>
                                                <Button
                                                    onClick={() => {
                                                        fetchRicercaNumeroFattura(numeroFattura, user.id, user.token)
                                                    }}
                                                    variant={ 'contained' }
                                                    color={ "primary" }
                                                    aria-label="add">
                                                    <SearchIcon/>Ricerca
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                )
                            }
                        </Card>
                    </Row>
                </Col>
                {/*COLONNA FANTASMA CHE PRENDE LO SPAZIO DELLA NAVBAR SINISTRA FIXED*/}
                <Col xs={ 3 }>

                </Col>

                {/*SEZIONE DEGLI SWITCH FORNITURA*/}
                <Col xs={ 9 }>
                    <Row className={ 'text-center justify-content-between' }>
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

                    <Row className={ "justify-content-center mt-3" }>
                        {
                            // LE CARD BOLLETTA
                            filtroBySwitch ( bolletteList ).map ( (bolletta , index) => {
                                return (
                                    <Col
                                        className={ 'mt-3' }
                                        xs={ 12 }
                                        md={ 8 }
                                        lg={ 6 }
                                        key={ index }>
                                        <CardUtenzaComponent
                                            bolletta={ bolletta }
                                            index={ index }
                                            bollettaList={ filtroBySwitch ( bolletteList ) }
                                        />
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

export default UtenzeComponent;