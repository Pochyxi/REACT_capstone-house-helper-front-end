import React , { useEffect , useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Col , Form , Row } from "react-bootstrap";
import ProdottiSelectComponent from "./selects/ProdottiSelectComponent";
import { getProdottiList , getSpeseList } from "../../redux/actions/actions";
import { useDispatch , useSelector } from "react-redux";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FormControl from "@mui/material/FormControl";
import { IconButton , TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {
    addProduct ,
    addProductOnList ,
    removeLista ,
    removeProductOnList
} from "./api/api";
import DialogDeleteComponent from "../FeedBackComponents/DialogDeleteComponent";


const CardSpesaList = ({
                           spesaList ,
                           list ,
                           handleClickError ,
                           handleClickProdottoList ,
                           handleClickAddProdottoList ,
                           handleClickAddProdData ,
                           handleClickDelLista
                       }) => {
        const user = useSelector ( state => state.user.user )
        const dispatch = useDispatch ()

        // ARRAY DI STRINGHE UTILE ALLA LISTA SELECT COMPONENT
        const [ productName , setProductName ] = React.useState ( [] );


        // FORM PER L'AGGIUNTA DI UN NUOVO PRODOTTO
        const [ formObj , setFormObj ] = useState ( {
            nome : "" ,
            prezzo : "" ,
            userId : user.id
        } );

        //flag che apre la sezione del form
        const [ formProdottiFlag , setFormProdottiFlag ] = useState ( true );

        // funzione che serve a modificare i valori del form
        const handleForm = (key , value) => {
            setFormObj ( {
                ...formObj ,
                [key] : value
            } )
        }

        // l'id della lista
        const idList = list.split ( ' ' )[0]

        //l'id del prodotto
        const idProduct = productName[0]?.split ( ' ' )[0]

        // nel caso in cui viene selezionato un prodotto viene eseguita la fetch di aggiunta
        // successivamente vengono aggiornate le liste spese ed i prodotti
        // svuoto l'array
        // dò feedback dell'avvenuta aggiunta
        useEffect ( () => {
            if ( productName.length > 0 ) {
                addProductOnList ( idList , idProduct , user.token ).then ( () => {
                    dispatch ( getSpeseList ( user.token , user.id ) );
                    dispatch ( getProdottiList ( user.token , user.id ) );
                    setProductName ( [] )
                    handleClickAddProdottoList ()
                } )
            }

        } , [ productName ] )


        // questa funzione calcola il totale del prezzo dei prodotti all'interno di una lista
        const calculateTotal = (id , listArr) => {
            const initialValue = 0

            let price = listArr.find ( el => el.id === parseInt ( id ) ).prodotti?.reduce (
                (accumulator , currentValue) => accumulator + currentValue.prezzo ,
                initialValue
            ).toString ()

            return price.split ( '.' )
        }


        // DIALOGS //
        ////////////
        const [ dialogEliminazioneListaFlag , setDialogEliminazioneListaFlag ] = useState ( false )

        const handleOpenDialog = () => setDialogEliminazioneListaFlag ( true )
        const handleCloseDialog = () => {
            setDialogEliminazioneListaFlag ( false )
        }
        // FINE DIALOGS //
        /////////////////


        return (
            <>
                { spesaList && (
                    <>

                        {/*DIALOG DI ELIMINAZIONE DI UN PRODOTTO*/ }
                        <DialogDeleteComponent
                            dialogEliminazioneFlag={ dialogEliminazioneListaFlag }
                            handleClose={ handleCloseDialog }
                            fetchToDelete={ removeLista }
                            item={ {
                                id : list.split ( ' ' )[0]
                            } }
                            user={ user }
                            openSuccess={ handleClickDelLista }
                            openError={ handleClickError }
                        />

                        {/*CARD LISTA DELLA SPESA*/ }
                        <Card sx={ {minWidth : "100%" , margin : "20px auto"} }>

                            <CardContent>

                                {/*SEZIONE TITOLO E PULSANTE DI ELIMINAZIONE*/ }
                                <Row className={ "d-flex align-items-center justify-content-center" }>
                                    <Col xs={ 6 }>
                                        <Typography style={ {textAlign : "start"} } variant="h5" component="div">
                                            {
                                                spesaList.find ( el => el.id === parseInt ( idList ) ).nome + " "
                                            }
                                        </Typography>
                                    </Col>
                                    <Col xs={ 6 }>
                                        <Typography style={ {textAlign : "end"} } variant="h6" component="div">

                                            <Button onClick={ () => {
                                                handleOpenDialog ()
                                            } }>
                                                <RemoveCircleIcon style={ {
                                                    fontSize : "30px" ,
                                                    cursor : "pointer"
                                                } } color={ "error" }/>
                                            </Button>

                                        </Typography>
                                    </Col>
                                </Row>

                                <Row className={ "justify-content-center align-items-center mb-3" }>
                                    <Row className={ "bg-light p-0" }>
                                        {
                                            // AGGIUNTA MANUALE DI UN PRODOTTO
                                            !formProdottiFlag && (
                                                <Col>
                                                    <Form onSubmit={ (e) => {
                                                        e.preventDefault ();
                                                        addProduct ( formObj , user.token ).then ( r => {
                                                            if ( r ) {
                                                                dispatch ( getProdottiList ( user.token , user.id ) )
                                                                setFormObj ( {
                                                                    nome : "" ,
                                                                    prezzo : "" ,
                                                                    userId : user.id
                                                                } )
                                                                addProductOnList ( idList , r.id , user.token )
                                                                    .then ( () => dispatch ( getSpeseList ( user.token , user.id ) ) )
                                                                handleClickAddProdData ()
                                                            } else {
                                                                handleClickError ()
                                                            }
                                                        } )
                                                    } } className={ "d-flex flex-row justify-content-center" }>
                                                        <FormControl>
                                                            <TextField
                                                                required
                                                                value={ formObj.nome }
                                                                id="outlined-required"
                                                                label="Nome prodotto"
                                                                onChange={ event => handleForm ( "nome" , event.target.value ) }
                                                            />
                                                        </FormControl>
                                                        <FormControl>
                                                            <TextField
                                                                required
                                                                id="outlined-number"
                                                                value={ formObj.prezzo }
                                                                label="Prezzo"
                                                                type="number"
                                                                onChange={ event => handleForm ( "prezzo" , event.target.value ) }
                                                                InputLabelProps={ {
                                                                    shrink : true ,
                                                                } }
                                                            />
                                                        </FormControl>
                                                        <Button
                                                            variant='outlined'
                                                            className={ 'mx-2' }
                                                            type='submit'
                                                        >
                                                            invia
                                                        </Button>
                                                        <Button
                                                            variant='outlined'
                                                            onClick={ () => {
                                                                setFormProdottiFlag ( true )
                                                            } }
                                                            color={ "error" }>
                                                            indietro
                                                        </Button>
                                                    </Form>
                                                </Col>
                                            )
                                        }
                                        {
                                            formProdottiFlag && (
                                                <Col>
                                                    <ProdottiSelectComponent productName={ productName }
                                                                             setProductName={ setProductName }/>
                                                </Col>
                                            )
                                        }
                                    </Row>
                                    {
                                        formProdottiFlag && (
                                            <Col className={ "text-end" }>
                                                <ChangeCircleIcon
                                                    onClick={ () => {
                                                        setFormProdottiFlag ( !formProdottiFlag )
                                                    } }
                                                    sx={ {
                                                        '&:hover' : {
                                                            color : "royalblue"
                                                        }
                                                    } }
                                                    style={ {
                                                        fontSize : "2em" ,
                                                        marginBottom : "5px" ,
                                                        cursor : "pointer"
                                                    } }/>
                                                <h6 className={ "d-inline" }>Inserisci manualmente</h6>
                                            </Col>
                                        )
                                    }
                                </Row>
                                <Row
                                    style={ {
                                        borderRight : '4px solid dodgerblue' ,
                                        borderBottom : '4px solid dodgerblue' ,
                                        height : '20vh' ,
                                        overflow : 'scroll'
                                    } }
                                    className={ 'justify-content-center' }>
                                    {
                                        spesaList.find ( el => el.id === parseInt ( idList ) ).prodotti.length > 0 ? (
                                            <>
                                                {
                                                    spesaList.find ( el => el.id ===
                                                        parseInt ( idList ) ).prodotti?.map ( (p , i) => {

                                                        return (

                                                            <Row
                                                                key={ i }
                                                                className={ "justify-content-between align-items-start mb-2" }
                                                            >
                                                                <Col
                                                                    className={ 'text-start text-nowrap' }
                                                                    xs={ 4 }>
                                                                    <IconButton
                                                                        style={ {margin : 0 , padding : 0} }
                                                                        onClick={ () => {
                                                                            removeProductOnList ( idList , p.id , user.token ).then ( r => {
                                                                                if ( r === 'success' ) {
                                                                                    dispatch ( getSpeseList ( user.token , user.id ) );
                                                                                    handleClickProdottoList ()
                                                                                } else {
                                                                                    handleClickError ()
                                                                                }
                                                                            } )
                                                                        } }
                                                                        aria-label="delete">
                                                                        <Delete/>
                                                                    </IconButton>
                                                                    { p.nome }
                                                                </Col>
                                                                <Col className={ 'text-end' } xs={ 4 }>
                                                                    { p.prezzo?.toString ().split ( '.' )[0]
                                                                    }
                                                                    ,
                                                                    { p.prezzo?.toString ().split ( '.' )[1] ?
                                                                        p.prezzo?.toString ().split ( '.' )[1].slice ( 0 , 2 ).length ===
                                                                        1 ?
                                                                            p.prezzo?.toString ().split ( '.' )[1].slice ( 0 , 2 ) +
                                                                            "0" :
                                                                            p.prezzo?.toString ().split ( '.' )[1].slice ( 0 , 2 ) +
                                                                            "" :
                                                                        "00"
                                                                    } €
                                                                </Col>
                                                            </Row>

                                                        )
                                                    } )
                                                }
                                            </>
                                        ) : (
                                            <Row><h6 style={ {color : 'royalblue' , textAlign : 'center'} }>Aggiungi
                                                prodotti alla lista per iniziare</h6></Row>
                                        )
                                    }
                                </Row>
                                <Row className={ "justify-content-center align-items-center mb-3" } style={ {
                                    backgroundColor : "white" ,
                                    color : "dodgerblue" ,
                                    padding : "10px" ,
                                } }
                                >
                                    <Col className={ "d-flex align-items-center justify-content-center" }>
                                        <Typography
                                            style={ {textAlign : "center" , borderBottom : '4px solid dodgerblue' ,} }
                                            variant="h6" component="div">
                                            TOTALE:
                                            { " " +
                                                calculateTotal ( idList , spesaList )[0]
                                            }
                                            ,
                                            {
                                                calculateTotal ( idList , spesaList )[1] ?
                                                    calculateTotal ( idList , spesaList )[1].slice ( 0 , 2 ).length ===
                                                    1 ?
                                                        calculateTotal ( idList , spesaList )[1].slice ( 0 , 2 ) + "0" :
                                                        calculateTotal ( idList , spesaList )[1].slice ( 0 , 2 ) + "" :
                                                    "00"

                                            } €
                                        </Typography>
                                    </Col>
                                </Row>
                            </CardContent>
                        </Card>
                    </>
                ) }
            </>

        );
    }
;

export default CardSpesaList;