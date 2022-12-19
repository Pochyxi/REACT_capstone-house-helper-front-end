import React , { useEffect , useState } from 'react';
import { Col , Container , Form , Row } from "react-bootstrap";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton , Switch , TextField } from "@mui/material";
import { useDispatch , useSelector } from "react-redux";
import { getProdottiList , getSpeseList , setSpeseList } from "../../redux/actions/actions";
import BackDropComponent from "../FeedBackComponents/backDropComponent";
import CardSpesaComponentV2 from "./CardSpesaComponentV2";
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import SnackbarErrorComponent from "../FeedBackComponents/SnackbarErrorComponent";
import SnackbarSuccessComponent from "../FeedBackComponents/SnackbarSuccessComponent";
import SettingsComponent from "../Spese/SettingsComponent";
import SettingsComponentV2 from "./SettingsComponentV2";

const SpeseV2Component = () => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()

    const spesaList = useSelector ( state => state.fetch.spesaList )
    const spesaLoad = useSelector ( state => state.util.spese_Load_Flag )

    useEffect ( () => {
        dispatch ( getSpeseList ( user.token , user.id ) )
        dispatch ( getProdottiList ( user.token , user.id ) )
        window.scrollTo ( 0 , 0 );
    } , [] )

    const [ricercaText, setRicercaText] = useState('')
    const [ricercaFlag, setRicercaFlag] = useState(false)


    // OFFCANVAS //
    //////////////
    const [ show , setShow ] = useState ( false );

    const handleClose = () => setShow ( false );
    const handleShow = () => setShow ( true );

    ////////////////////
    // FINE OFFCANVAS //

    // eliminazione di una lista //
    const [ snackDelLista , setSnackDelLista ] = useState ( false )

    const handleClickDelLista = () => {
        setSnackDelLista ( true )
        dispatch(getSpeseList(user.token, user.id))
    }
    const handleCloseDelLista = () => setSnackDelLista ( false )

    // errore generico //
    const [ snackErrorFlag , setSnackErrorFlag ] = useState ( false );

    const handleClickError = () => setSnackErrorFlag ( true );
    const handleCloseError = () => setSnackErrorFlag ( false )
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


    console.log (spesaList)
    console.log (ricercaText)


    return (
        <Container fluid>
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
            <SnackbarErrorComponent
                openFlag={ snackErrorFlag }
                closeFunction={ handleCloseError }
                message={ 'Purtroppo qualcosa è andato storto' }
            />
            <SnackbarSuccessComponent
                openFlag={ snackDelLista }
                closeFunction={ handleCloseDelLista }
                message={ "Lista della spesa eliminata" }
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
            {
                spesaLoad && (
                    <BackDropComponent load={ spesaLoad }/>
                )
            }
                    <Row>
                        {/*SEZIONE LATERALE*/ }
                        <SettingsComponentV2
                            show={show}
                            handleClose={handleClose}
                            handleClickLista={handleClickLista}
                            handleClickError={handleClickError}
                            handleClickProdotto={handleClickProdotto}
                        />
                        <Col xs={ 12 }>
                            <SettingsIcon style={ {color : 'gray' , fontSize : '3em'} }/>
                            <Switch
                                checked={ show }
                                onChange={ show ? handleClose : handleShow }
                                control={ <Switch defaultChecked/> }
                            />
                        </Col>
                        <Col xs={ 12 }>
                            <Row className={ 'justify-content-end text-end' }>
                                <Col xs={ 6 } className={'d-flex justify-content-end align-items-center'}>
                                    <IconButton
                                        onClick={() => setRicercaFlag(!ricercaFlag)}
                                        aria-label="add">
                                        {
                                            ricercaFlag ? (
                                                <SearchOffIcon
                                                    style={{
                                                        color: 'red',
                                                        fontSize: '2rem'
                                                    }}
                                                />
                                            ) : (
                                                <ContentPasteSearchIcon
                                                    style={{
                                                        color: 'dodgerblue',
                                                        fontSize: '2rem'
                                                    }}
                                                />
                                            )
                                        }

                                    </IconButton>
                                    {
                                        ricercaFlag && (
                                            <TextField
                                                value={ricercaText}
                                                onChange={(e) => {
                                                    setRicercaText(e.target.value)
                                                }}
                                                id="standard-basic"
                                                label="Cerca spesa"
                                                variant="standard"/>
                                        )
                                    }

                                </Col>
                            </Row>
                            <Row className={'justify-content-center'}>
                                {
                                    spesaList.filter ( spesa => spesa.nome.toUpperCase ().includes ( ricercaText.toUpperCase () ) ).map ( (spesa , i) => {
                                        return (
                                            <CardSpesaComponentV2
                                                key={spesa.id}
                                                spesa={spesa}
                                                i={i}
                                                spesaList={spesaList.filter ( spesa => spesa.nome.toUpperCase ().includes ( ricercaText.toUpperCase () ) )}
                                                handleClickDelLista={handleClickDelLista}
                                                handleClickError={handleClickError}
                                                handleClickProdData={handleClickProdData}
                                                handleClickAddProdottoList={handleClickAddProdottoList}
                                                handleClickProdottoList={handleClickProdottoList}
                                            />
                                        )
                                    } )
                                }
                            </Row>
                        </Col>
                    </Row>


        </Container>
    );
};

export default SpeseV2Component;