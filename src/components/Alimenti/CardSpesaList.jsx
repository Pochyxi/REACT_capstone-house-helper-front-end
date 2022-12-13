import React , { useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Col , Form , Row } from "react-bootstrap";
import ProdottiSelectComponent from "./ProdottiSelectComponent";
import { getProdottiList , getSpeseList , setSpeseList , setUser } from "../../redux/actions/actions";
import { useDispatch , useSelector } from "react-redux";
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import FormControl from "@mui/material/FormControl";
import { IconButton , TextField } from "@mui/material";
import { Delete } from "@mui/icons-material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const bull = (
    <Box
        component="span"
        sx={ {display : 'inline-block' , mx : '2px' , transform : 'scale(0.8)'} }
    >
        •
    </Box>
);

const CardSpesaList = ({spesaList , list , setSpesaListaNome}) => {
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
                addProductOnList ( idList , idProduct , user.token , "PUT" ).then ( () => {
                    setProductName ( [] )
                } )

            }

        } , [ productName ] )

        const addProductOnList = async (listaId , prodottoId , token , method) => {
            const baseEndpoint = `http://localhost:8080/api/lista/add/lista/${ listaId }/prodotto/${ prodottoId }`;

            try {
                const response = await fetch ( baseEndpoint , {
                    method : method ,
                    headers : {
                        "Authorization" : `Bearer ${ token }`
                    } ,
                } );

                if ( response.ok ) {
                    const data = await response.json ();

                    dispatch ( getSpeseList ( user.token , user.id ) );
                    dispatch ( getProdottiList ( user.token , user.id ) );

                    console.log ( "fetch eseguita" );
                } else {
                    console.log ( "Qualcosa è andato storto" );
                }
            } catch ( error ) {
                console.log ( error );
            }
        }

        const removeProductOnList = async (listaId , prodottoId , token , method) => {
            const baseEndpoint = `http://localhost:8080/api/lista/delete/lista/${ listaId }/prodotto/${ prodottoId }`;

            const header = {
                "Authorization" : `Bearer ${ token }`
            };

            try {
                const response = await fetch ( baseEndpoint , {
                    method : method ,
                    headers : header ,
                } );

                if ( response.ok ) {
                    const data = await response.json ();

                    dispatch ( getSpeseList ( user.token , user.id ) );

                } else {
                    console.log ( "Qualcosa è andato storto" );
                }
            } catch ( error ) {
                console.log ( error );
            }
        }

        const removeLista = async (listaId , token) => {
            const baseEndpoint = `http://localhost:8080/api/lista/delete/${ listaId }`;

            const header = {
                "Authorization" : `Bearer ${ token }`
            };

            try {
                const response = await fetch ( baseEndpoint , {
                    method : "DELETE" ,
                    headers : header ,
                } );

                if ( response.ok ) {

                    setSpesaListaNome ( [] )

                    dispatch ( getSpeseList ( user.token , user.id ) );

                } else {
                    console.log ( "Qualcosa è andato storto" );
                }
            } catch ( error ) {
                console.log ( error );
            }
        }


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

        const addProduct = async (obj , token) => {
            const baseEndpoint = `http://localhost:8080/api/prodotto/new`
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
                    dispatch ( getProdottiList ( user.token , user.id ) )
                    setFormObj ( {
                        nome : "" ,
                        prezzo : "" ,
                        userId : user.id
                    } )
                    addProductOnList ( idList , data.id , user.token , "PUT" )
                        .then ( () => dispatch ( getSpeseList ( user.token , user.id ) ) )

                }
            } catch ( e ) {
                console.log ( e )
            }
        }

        return (
            <>
                { spesaList && (
                    <>
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
                                                removeLista ( idList , user.token )
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
                                                        addProduct ( formObj , user.token )
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
                                <Row className={ "justify-content-center align-items-center mb-3" } style={ {
                                    backgroundColor : "white" ,
                                    color : "royalblue" ,
                                    padding : "10px" ,
                                } }
                                >
                                    <Col className={ "d-flex align-items-center justify-content-center" }>
                                        <Typography
                                            style={ {textAlign : "center" , borderBottom : '4px solid royalblue' ,} }
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


                                <Row
                                    style={ {
                                        borderLeft : '4px solid black' ,
                                        maxHeight : '20vh' ,
                                        overflow : 'scroll'
                                    } }
                                    className={ 'justify-content-center' }>
                                {
                                    spesaList.find ( el => el.id === parseInt ( idList ) ).prodotti?.map ( (p , i) => {

                                        return (

                                                <Row key={ i } className={ "justify-content-between align-items-end mb-2" }>
                                                    <Col
                                                        className={ 'text-start text-nowrap' }
                                                        xs={ 4 }>
                                                        <IconButton
                                                            style={ {margin : 0 , padding : 0} }
                                                            onClick={ () => {
                                                                removeProductOnList ( idList , p.id , user.token , "PUT" )
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
                                </Row>
                                <Row
                                    style={ {
                                        padding : "10px" ,
                                        justifyContent : "center"
                                    } }
                                    className={ "mt-4" }>
                                    <Row
                                        style={ {
                                            borderBottom : "4px solid royalblue"
                                        } }
                                        className={ "justify-content-center" }
                                        sx={ {textAlign : "start"} }>
                                        <Col className={ 'p-0' } xs={ 6 }>
                                            TOTALE
                                        </Col>
                                        <Col className={ 'p-0' } style={ {textAlign : "end"} } xs={ 6 }>
                                            { " " +
                                                calculateTotal ( idList , spesaList )[0]
                                            }
                                            ,
                                            {
                                                calculateTotal ( idList , spesaList )[1] ?
                                                    calculateTotal ( idList , spesaList )[1].slice ( 0 , 2 ).length === 1 ?
                                                        calculateTotal ( idList , spesaList )[1].slice ( 0 , 2 ) + "0" :
                                                        calculateTotal ( idList , spesaList )[1].slice ( 0 , 2 ) + "" :
                                                    "00"

                                            } €
                                        </Col>
                                    </Row>
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