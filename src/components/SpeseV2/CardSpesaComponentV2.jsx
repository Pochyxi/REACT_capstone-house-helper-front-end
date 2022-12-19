import React , { useEffect , useState } from 'react';
import Card from "@mui/material/Card";
import { Col , Form , Row } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import { Button , IconButton , TextField } from "@mui/material";
import { addProduct , addProductOnList , removeLista , removeProductOnList } from "../Spese/api/api";
import { getProdottiList , getSpeseList } from "../../redux/actions/actions";
import RemoveIcon from "@mui/icons-material/Remove";
import { Add } from "@mui/icons-material";
import FormControl from "@mui/material/FormControl";
import ProdottiSelectComponentV2 from "./ProdottiSelectComponentV2";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import { useDispatch , useSelector } from "react-redux";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import BackspaceIcon from "@mui/icons-material/Backspace";
import DialogDeleteComponent from "../FeedBackComponents/DialogDeleteComponent";
import { deleteBolletta } from "../Bollette/api/api";

const CardSpesaComponentV2 = ({
                                  spesa ,
                                  i ,
                                  spesaList ,
                                  handleClickDelLista ,
                                  handleClickError,
                                  handleClickProdData ,
                                  handleClickAddProdottoList ,
                                  handleClickProdottoList
                              }) => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()


    // FORM PER L'AGGIUNTA DI UN NUOVO PRODOTTO
    const [ formObj , setFormObj ] = useState ( {
        nome : "" , prezzo : "" , userId : user.id
    } );

    //flag che apre la sezione del form
    const [ formProdottiFlag , setFormProdottiFlag ] = useState ( true );

    // funzione che serve a modificare i valori del form
    const handleForm = (key , value) => {
        setFormObj ( {
            ...formObj , [key] : value
        } )
    }

    const rettificaPrezzo = (prezzoStringato) => {
        let arrayString = prezzoStringato.split ( '.' )

        if ( arrayString.length === 1 ) {
            return arrayString.join ( ',' ) + ',00'
        } else if ( arrayString.length === 2 ) {
            let decimalsArr = arrayString[1].split ( '' )
            if ( decimalsArr.length === 1 ) {
                return arrayString.join ( ',' ) + '0'
            } else if ( decimalsArr.length === 2 ) {
                return arrayString.join ( ',' )
            } else if ( decimalsArr.length > 2 ) {
                return arrayString[0] + ',' + arrayString[1].split ( '' )[0] + arrayString[1].split ( '' )[1]
            }

        }

    }

    const ordinaProdotti = (array) => {
        let obj = {
            prodottoUnico : [] , totalPriceList : 0
        }
        const handleObj = (key , value) => {
            obj[key] = value;
        }

        if ( array ) {
            for (let prodotto of array) {

                obj.totalPriceList = obj.totalPriceList + prodotto.prezzo

                if ( obj.prodottoUnico.find ( el => el.nome === prodotto.nome ) ) {
                    obj[prodotto.nome] = {
                        quant : obj[prodotto.nome].quant + 1 , unit : rettificaPrezzo ( prodotto.prezzo.toString () ) ,
                    }
                    obj[prodotto.nome + 'TotalPrice'] = obj[prodotto.nome + 'TotalPrice'] + prodotto.prezzo
                } else {
                    handleObj ( prodotto.nome , {
                        quant : 1 , unit : rettificaPrezzo ( prodotto.prezzo.toString () ) ,
                    } , )
                    obj.prodottoUnico.push ( prodotto )
                    obj[prodotto.nome + 'TotalPrice'] = prodotto.prezzo
                }
            }
        }
        return obj
    }

    // DIALOG ELIMINAZIONE
    const [ dialogEliminazioneFlag , setDialogEliminazioneFlag ] = useState ( false );
    const handleClickOpen = () => {
        setDialogEliminazioneFlag ( true );
    };

    const handleClose = () => {
        setDialogEliminazioneFlag ( false );
    };
    //


    return (
        <Col
            className={ 'mt-3' }
            xs={ 12 }
            sm={ 10 }
            md={ 6 }
            xxl={ 4 }
            key={ spesa.id }>
            <Card className={ 'p-2' }>
                <Row className={ 'd-flex justify-content-center pb-2' }>
                    <Col>
                        <IconButton
                            onClick={ handleClickOpen }
                            style={ {
                                color : 'red'
                            } }
                            aria-label="add">
                            <BackspaceIcon/>
                        </IconButton>
                        <DialogDeleteComponent
                            dialogEliminazioneFlag={ dialogEliminazioneFlag }
                            handleClose={ handleClose }
                            fetchToDelete={ removeLista }
                            item={ spesa }
                            user={ user }
                            openSuccess={ handleClickDelLista }
                            openError={ handleClickError }
                        />
                    </Col>
                </Row>
                <Row className={ 'align-items-center' }>
                    <Col>
                        <Col className={ 'text-end d-flex justify-content-start align-items-center' }>
                            <h4 style={ {display : 'inline' , margin : 0} }><ShoppingBagIcon
                                style={ {fontSize : '2rem'} }/></h4>
                            <h4 style={ {display : 'inline' , margin : 0} }>{ spesa.nome }</h4>
                        </Col>
                    </Col>
                    <Col className={ 'text-end d-flex justify-content-end align-items-center' }>
                        <h4 style={ {display : 'inline' , margin : 0} }><CalendarMonthIcon
                            style={ {fontSize : '2rem'} }/></h4>
                        <h4 style={ {display : 'inline' , margin : 0} }>{ spesa.dataCreazione }</h4>
                    </Col>
                </Row>
                <Row
                    style={{

                    }}
                    className={'text-center my-2'}>
                    <h4 className={'w-75 m-auto'}>
                        {ordinaProdotti ( spesaList[i].prodotti ).prodottoUnico.length + ' '}PRODOTTI
                    </h4>
                    <Col xs={12}>
                        <Card
                            style={{
                            borderBottom: '2px solid dodgerblue',
                                boxShadow: '0 0 5px dodgerblue'
                        }}>

                        </Card>
                    </Col>
                </Row>
                <Row
                    style={{
                        height: '30vh',
                        overflow: 'auto'
                    }}
                    className={ 'justify-content-center align-items-start' }>
                    {
                        ordinaProdotti ( spesaList[i].prodotti ).prodottoUnico.length > 0 ? (
                            <>
                                { ordinaProdotti ( spesaList[i].prodotti ).prodottoUnico.sort().reverse().map ( (prodotto , index) => {

                                    return (
                                        <Row
                                            className={ 'justify-content-center' }
                                            key={ index }>
                                            <Row className={ 'justify-content-center align-items-center' }>
                                                <Col
                                                    style={ {
                                                        borderLeft : '2px solid dodgerblue'
                                                    } }
                                                >
                                        <span style={ {
                                            fontWeight : 'bold' ,
                                            fontSize : '1.2rem'
                                        } }>{ prodotto.nome }</span>
                                                </Col>
                                                <Col className={ 'd-flex justify-content-center p-0' }>
                                                    <IconButton
                                                        onClick={ () => {
                                                            removeProductOnList ( spesa.id , prodotto.id , user.token ).then ( r => {
                                                                if ( r === 'success' ) {
                                                                    dispatch ( getSpeseList ( user.token , user.id ) );
                                                                    handleClickProdottoList ()
                                                                } else {
                                                                    handleClickError ()
                                                                }
                                                            } )
                                                        } }
                                                        aria-label="edit">
                                                        <RemoveIcon/>
                                                    </IconButton>
                                                    <IconButton
                                                        onClick={ () => {
                                                            addProductOnList ( spesa.id , prodotto.id , user.token ).then ( () => {
                                                                dispatch ( getSpeseList ( user.token , user.id ) );
                                                                handleClickAddProdottoList ()
                                                            } )
                                                        } }
                                                        aria-label="add">
                                                        <Add style={{color: 'dodgerblue'}}/>
                                                    </IconButton>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col
                                                    style={ {
                                                        borderLeft : '2px solid dodgerblue'
                                                    } }
                                                    className={ 'text-end' }>
                                                    { ordinaProdotti ( spesaList[i].prodotti )[prodotto.nome].quant } x { ordinaProdotti ( spesaList[i].prodotti )[prodotto.nome].unit } €
                                                </Col>
                                            </Row>
                                            <Row className={ 'my-2' }>
                                                <Card style={{
                                                     backgroundImage : 'linear-gradient(to right, royalblue, dodgerblue)' ,
                                                     color : 'whitesmoke'
                                                }}>
                                                    <Col

                                                        className={ 'text-end' }>
                                                        <h6 style={ {
                                                            display : 'inline'
                                                        } }>{ rettificaPrezzo ( ordinaProdotti ( spesaList[i].prodotti )[prodotto.nome +
                                                        'TotalPrice'].toString () ) } </h6>€
                                                    </Col>
                                                </Card>
                                            </Row>
                                        </Row>
                                    )

                                } ) }
                            </>
                        ) : (<Row
                            className={ 'justify-content-center text-center' }
                            style={ {
                                backgroundImage : 'linear-gradient(to right, royalblue, dodgerblue)' ,
                                color : 'whitesmoke'
                            } }><h4>Aggiungi prodotti per iniziare</h4></Row>)
                    }

                </Row>
                <Row>
                    <Col xs={12}>
                        <Card
                            style={{
                                borderBottom: '2px solid dodgerblue',
                                boxShadow: '0 0 5px dodgerblue'
                            }}>

                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col
                        className={ "d-flex align-items-center justify-content-end mt-2" }>
                        <Typography
                            style={ {
                                textAlign : "center" ,
                                backgroundImage : 'linear-gradient(to right, royalblue, dodgerblue)' ,
                                color : 'whitesmoke',
                                borderRadius : '5px',
                                boxShadow: '0 0 5px 2px dodgerblue'
                            } }
                            variant="h5" component="div">
                            Totale { rettificaPrezzo ( (ordinaProdotti ( spesaList[i].prodotti ).totalPriceList).toString () ) } €
                        </Typography>
                    </Col>
                </Row>
                <Row className={ 'justify-content-center text-center mt-4' }>
                    { // AGGIUNTA MANUALE DI UN PRODOTTO
                        !formProdottiFlag && (<Col>
                            <Form onSubmit={ (e) => {
                                e.preventDefault ();
                                addProduct ( formObj , user.token ).then ( r => {
                                    if ( r ) {
                                        dispatch ( getProdottiList ( user.token , user.id ) )
                                        setFormObj ( {
                                            nome : "" , prezzo : "" , userId : user.id
                                        } )
                                        addProductOnList ( spesa.id , r.id , user.token )
                                            .then ( () => dispatch ( getSpeseList ( user.token , user.id ) ) )
                                        handleClickProdData ()
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
                                    Invia
                                </Button>
                            </Form>
                        </Col>) }
                    { formProdottiFlag && (
                        <Col xs={ 6 }>
                            <ProdottiSelectComponentV2
                                idList={ spesa.id }
                                handleClickAddProdottoList={handleClickAddProdottoList}
                            />
                        </Col>
                    ) }

                    <Col className={ "d-flex align-items-center" }>
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
                                fontSize : "2em" , marginBottom : "5px" , cursor : "pointer"
                            } }/>
                        {
                            formProdottiFlag ? (
                                <h6 className={ "d-inline" }>Inserisci manualmente</h6>
                            ) : (
                                <h6 className={ "d-inline" }>Inserisci automaticamente</h6>
                            )
                        }

                    </Col>
                </Row>
            </Card>
        </Col>);
};

export default CardSpesaComponentV2;