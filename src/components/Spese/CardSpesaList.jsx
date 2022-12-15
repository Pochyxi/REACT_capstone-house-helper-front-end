import React , { useEffect , useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Col , Form , Row } from "react-bootstrap";
import ProdottiSelectComponent from "./ProdottiSelectComponent";
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
                           setSpesaListaNome ,
                           handleClickError ,
                           handleClickProdottoList ,
                           handleClickAddProdottoList ,
                           handleClickAddProdData ,
                           handleClickDelLista
                       }) => {
        const user = useSelector ( state => state.user.user )
        const dispatch = useDispatch ()
        const [ productName , setProductName ] = React.useState ( [] );
        const [ formProdottiFlag , setFormProdottiFlag ] = useState ( true );
        const [ formObj , setFormObj ] = useState ( {
            nome : "" ,
            prezzo : "" ,
            userId : user.id
        } );


        const idList = list.split ( ' ' )[0]
        const idProduct = productName[0]?.split ( ' ' )[0]

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


        const calculateTotal = (id , listArr) => {
            const initialValue = 0

            let price = listArr.find ( el => el.id === parseInt ( id ) ).prodotti?.reduce (
                (accumulator , currentValue) => accumulator + currentValue.prezzo ,
                initialValue
            ).toString ()

            return price.split ( '.' )
        }

        const handleForm = (key , value) => {
            setFormObj ( {
                ...formObj ,
                [key] : value
            } )
        }

        // DIALOGS //
        ////////////
        const [ dialogEliminazioneListaFlag , setDialogEliminazioneListaFlag ] = useState ( false )

        const handleOpenDialog = () => setDialogEliminazioneListaFlag ( true )
        const handleCloseDialog = () => {
            dispatch ( getSpeseList ( user.token , user.id ) );
            setDialogEliminazioneListaFlag ( false )
            setSpesaListaNome([])
        }


        // FINE DIALOGS //
        /////////////////

    console.log (list)

        return (
            <>
                { spesaList && (
                    <>
                        <DialogDeleteComponent
                            dialogEliminazioneFlag={ dialogEliminazioneListaFlag }
                            handleClose={ handleCloseDialog }
                            fetchToDelete={ removeLista }
                            item={ {
                                id: list.split(' ')[0]
                            } }
                            user={ user }
                            openSuccess={ handleClickDelLista }
                            openError={ handleClickError }
                        />
                        <Card sx={ {minWidth : "100%" , margin : "20px auto"} }>
                            <CardContent>
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
                                                handleOpenDialog()
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
                                        borderBottom: '4px solid dodgerblue',
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