import React , { useEffect , useState } from 'react';
import { Col , Container , Form , Offcanvas , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import { useDispatch , useSelector } from "react-redux";
import { getPostitList } from "../../redux/actions/actions";
import {
    Button , FormGroup ,
    IconButton , Skeleton , Stack ,
    Switch ,
    TextField ,

} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { Add } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarSuccessComponent from "../FeedBackComponents/SnackbarSuccessComponent";
import SnackbarErrorComponent from "../FeedBackComponents/SnackbarErrorComponent";
import { addPostit } from "./api/api";
import CardPostitComponent from "./api/CardPostitComponent";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

const PostitComponent = () => {
    const user = useSelector ( state => state.user.user )

    const [ formControlLabelValue , setFormControlLabelValue ] = useState ( false );
    const postitList = useSelector ( state => state.fetch.postitList )
    const postitLoad = useSelector(state => state.util.postit_Load_Flag)
    const dispatch = useDispatch ()
    const [ formPostitObj , setFormPostitObj ] = useState ( {
        contenuto : "" ,
        scadenza : "" ,
        userId : user.id ,
    } )
    const [ formPostitFlag , setFormPostitFlag ] = useState ( false );

    const handleForm = (key , value) => {
        setFormPostitObj ( {
            ...formPostitObj ,
            [key] : value
        } )
    }

    const postitListFilter = (arr) => {

        let arrN = []
        if ( formControlLabelValue ) {
            arrN = arr.filter ( el => el.stato === true )
        } else {
            arrN = arr.filter ( el => el.stato === false )
        }

        return arrN
    }

    const handleChange = (event) => {
        setFormControlLabelValue ( event.target.checked );
    };

    useEffect ( () => {
        dispatch ( getPostitList ( user.token , user.id ) )
    } , [] );

    // OFFCANVAS //
    //////////////
    const [ show , setShow ] = useState ( false );

    const handleClose = () => setShow ( false );
    const handleShow = () => setShow ( true );

    ////////////////////
    // FINE OFFCANVAS //

    // SNACKBARS //
    // questa è la flag che compare all'aggiunta di un postit
    const [ snackAddPostitFlag , setSnackAddPostitFlag ] = useState ( false );

    const handleClickPostit = () => {
        setSnackAddPostitFlag ( true );
    };

    const handleClosePostit = () => {
        setSnackAddPostitFlag ( false );
    };
    //

    // questa è la flag che compare se qualche fetch va in errore
    const [ snackErrorFlag , setSnackErrorFlag ] = useState ( false );

    const handleClickError = () => {
        setSnackErrorFlag ( true );
    };

    const handleCloseError = () => {
        setSnackErrorFlag ( false );
    };
    //

    // questa è la flag che compare all'eliminazione di un postit
    const [ snackDeletePostitFlag , setSnackDeletePostitFlag ] = useState ( false );

    const handleClickDelete = () => {
        setSnackDeletePostitFlag ( true );
    };

    const handleCloseDelete = () => {
        setSnackDeletePostitFlag ( false );
    };
    //

    // questa è la flag che compare all'aggiornamento dello
    // stato di un postit
    const [ snackUpdatePostitFlag , setSnackUpdatePostitFlag ] = useState ( false );

    const handleClickUpdate = () => {
        setSnackUpdatePostitFlag ( true );
    };

    const handleCloseUpdate = () => {
        setSnackUpdatePostitFlag ( false );
    };
    //


    return (
        <Container fluid>
            <SnackbarSuccessComponent
                openFlag={ snackAddPostitFlag }
                closeFunction={ handleClosePostit }
                message={ 'Postit aggiunto con successo!' }
            />
            <SnackbarErrorComponent
                openFlag={ snackErrorFlag }
                closeFunction={ handleCloseError }
                message={ 'Purtroppo qualcosa è andato storto' }
            />
            <SnackbarSuccessComponent
                openFlag={ snackUpdatePostitFlag }
                closeFunction={ handleCloseUpdate }
                message={ 'Stato postit aggiornato con successo' }
            />
            <SnackbarErrorComponent
                openFlag={ snackErrorFlag }
                closeFunction={ handleCloseError }
                message={ 'Purtroppo qualcosa è andato storto' }
            />
            <SnackbarSuccessComponent
                openFlag={ snackDeletePostitFlag }
                closeFunction={ handleCloseDelete }
                message={ 'Postit eliminato con successo' }
            />
            <Row className={ "justify-content-center flex-column" }>
                <Offcanvas className={ 'p-0' } show={ show } onHide={ handleClose }>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body
                        style={ {
                            backgroundColor : "#f1f58f" ,
                            borderRight : "2px solid #f1f58f" ,
                            boxShadow : "1px 1px 2px #f1f58f" ,
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
                        <Row className={ "p-2" }>
                            <Card
                                sx={ {minWidth : "100%" , margin : "20px auto"} }
                                className={ "p-2" }>
                                <h5>Aggiungi nuovo Postit</h5>
                                {
                                    !formPostitFlag ? (
                                        <IconButton onClick={ () => setFormPostitFlag ( true ) } aria-label="add">
                                            <Add/>
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={ () => setFormPostitFlag ( false ) } aria-label="delete">
                                            <CancelIcon/>
                                        </IconButton>
                                    )
                                }

                                <Row>
                                    {
                                        formPostitFlag && (
                                            <Form onSubmit={ (e) => {
                                                e.preventDefault ()
                                                addPostit ( formPostitObj , user.token ).then ( (r) => {
                                                    if ( r === 'success' ) {
                                                        console.log ( r )
                                                        dispatch ( getPostitList ( user.token , user.id ) )
                                                        handleClickPostit ()
                                                    } else {
                                                        handleClickError ()
                                                    }
                                                } )
                                                setFormPostitObj ( {
                                                    contenuto : "" ,
                                                    scadenza : "" ,
                                                    userId : user.id ,
                                                } )
                                            } }>
                                                <Row className={ "p-2" }>
                                                    <h6>Contenuto</h6>
                                                    <FormControl>
                                                        <TextField
                                                            required
                                                            value={ formPostitObj.contenuto }
                                                            onChange={ event => handleForm ( "contenuto" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            id="outlined-basic"
                                                            label="Inserisci il contenuto..."
                                                            variant="outlined"/>
                                                    </FormControl>
                                                </Row>
                                                <Row className={ "p-2" }>
                                                    <h6>Data di scadenza</h6>
                                                    <FormControl>
                                                        <TextField
                                                            required
                                                            value={ formPostitObj.scadenza }
                                                            onChange={ event => handleForm ( "scadenza" , event.target.value ) }
                                                            className={ "mt-2" }
                                                            type={ 'date' }
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
                            <Card sx={ {
                                maxHeight : "30vh" ,
                                overflow : "scroll" ,
                                '&::-webkit-scrollbar' : {
                                    display : "none"
                                } ,
                                padding : 1 + "em"
                            } }>

                                <FormGroup>
                                    <Row className={ 'd-flex justify-content-center align-items-center' }>
                                        <Col xs={ 8 }>
                                            Mostra Postit completati
                                        </Col>
                                        <Col xs={ 4 }>
                                            <Switch
                                                checked={ formControlLabelValue }
                                                onChange={ handleChange }
                                                control={ <Switch defaultChecked/> }
                                            />
                                        </Col>
                                    </Row>


                                </FormGroup>
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
                    postitLoad ? (
                        <Col>
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
                        <Col>
                            {
                                postitList.length > 0 ? (
                                    <Row className={ "justify-content-center" }>

                                        {
                                            postitListFilter ( postitList ).map ( (postit , i) => {
                                                return (
                                                    <CardPostitComponent
                                                        key={ i }
                                                        postit={ postit }
                                                        snackUpdatePostitFlag={ snackUpdatePostitFlag }
                                                        handleCloseUpdate={ handleCloseUpdate }
                                                        snackErrorFlag={ snackErrorFlag }
                                                        handleCloseError={ handleCloseError }
                                                        snackDeletePostitFlag={ snackDeletePostitFlag }
                                                        handleCloseDelete={ handleCloseDelete }
                                                        handleClickDelete={ handleClickDelete }
                                                        handleClickError={ handleClickError }
                                                        handleClickUpdate={ handleClickUpdate }
                                                    />
                                                )
                                            } )
                                        }
                                    </Row>
                                ) : (
                                    <Row className={ "justify-content-center text-center" }>
                                        <Col>
                                            <TipsAndUpdatesIcon style={ {fontSize : '3em' , color : 'royalblue'} }/>
                                        </Col>
                                        <h3>Nessun Postit trovato, aggiungine uno per iniziare</h3>
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

export default PostitComponent;