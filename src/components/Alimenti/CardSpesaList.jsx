import React , { useEffect , useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Col , Row } from "react-bootstrap";
import ProdottiSelectComponent from "./ProdottiSelectComponent";
import { getSpeseList , setSpeseList , setUser } from "../redux/actions/actions";
import { useDispatch , useSelector } from "react-redux";

const bull = (
    <Box
        component="span"
        sx={ {display : 'inline-block' , mx : '2px' , transform : 'scale(0.8)'} }
    >
        •
    </Box>
);

const CardSpesaList = ({spesaList , list , index}) => {
        const user = useSelector ( state => state.user.user )
        const dispatch = useDispatch ()
        const [ productName , setProductName ] = React.useState ( [] );


        const [ arr , setArr ] = useState ( [] );
        const idList = list.split ( ' ' )[0]
        const idProduct = productName[0]?.split ( ' ' )[0]

        useEffect ( () => {
            if ( productName.length > 0 ) {
                addProductOnList ( idList , idProduct , user.token ).then ( () => {
                    setProductName ( [] )
                } )

            }

        } , [ productName ] )

        const addProductOnList = async (listaId , prodottoId , token) => {
            const baseEndpoint = `http://localhost:8080/api/lista/add/lista/${ listaId }/prodotto/${ prodottoId }`;

            const header = {
                "Authorization" : `Bearer ${ token }`
            };

            try {
                const response = await fetch ( baseEndpoint , {
                    method : "PUT" ,
                    headers : header ,
                } );

                if ( response.ok ) {
                    const data = await response.json ();

                    dispatch ( getSpeseList ( user.token , user.id ) );

                    console.log ( data );
                } else {
                    console.log ( "Qualcosa è andato storto" );
                }
            } catch ( error ) {
                console.log ( error );
            }
        }

        const removeProductOnList = async (listaId , prodottoId , token) => {
            const baseEndpoint = `http://localhost:8080/api/lista/delete/lista/${ listaId }/prodotto/${ prodottoId }`;

            const header = {
                "Authorization" : `Bearer ${ token }`
            };

            try {
                const response = await fetch ( baseEndpoint , {
                    method : "PUT" ,
                    headers : header ,
                } );

                if ( response.ok ) {
                    const data = await response.json ();

                    dispatch ( getSpeseList ( user.token , user.id ) );

                    console.log ( data );
                } else {
                    console.log ( "Qualcosa è andato storto" );
                }
            } catch ( error ) {
                console.log ( error );
            }
        }


        const calculateTotal = (id , listArr) => {
            const initialValue = 0

            return listArr.find ( el => el.id === parseInt ( id ) ).prodotti?.reduce (
                (accumulator , currentValue) => accumulator + currentValue.prezzo ,
                initialValue
            ).toString ()
        }


        console.log ( "----gli id per l'add-----" )
        console.log ( idList )
        console.log ( idProduct )
        console.log ( spesaList[0].prodotti )
        console.log ( "--------------" )

        console.log ( spesaList.find ( el => el.id === parseInt ( idList ) ) )
        return (
            <Card sx={ {minWidth : "50%" , maxWidth : "70%" , margin : "20px auto"} }>
                <CardContent>
                    <Row
                        style={ {
                            border : "2px solid gainsboro" ,
                            borderRadius : "5px" ,
                        } }
                        className={ "justify-content-center align-items-center mb-3" }>
                        <Col>
                            <Typography variant="h5" component="div">
                                {
                                    spesaList.find ( el => el.id === parseInt ( idList ) ).nome + " "
                                }


                            </Typography>
                        </Col>
                        <Col>
                            <ProdottiSelectComponent productName={ productName } setProductName={ setProductName }/>
                        </Col>
                        <Col>
                            TOT:
                            { " " +
                                calculateTotal ( idList , spesaList ).split ( '.' )[0]
                            }
                            ,
                            {
                                calculateTotal ( idList , spesaList ).split ( '.' )[1] ?
                                    calculateTotal ( idList , spesaList ).split ( '.' )[1].slice(0, 2).length === 1 ?
                                        calculateTotal ( idList , spesaList ).split ( '.' )[1].slice(0, 2) + "0" :
                                        calculateTotal ( idList , spesaList ).split ( '.' )[1].slice ( 0 , 2 ) + "" :
                                    "00"

                            } €
                        </Col>
                    </Row>

                    {

                        spesaList.find ( el => el.id === parseInt ( idList ) ).prodotti?.map ( (p , i) => {

                            return (
                                <Row key={ i }>
                                    <Row className={ "justify-content-between mb-2" } sx={ {textAlign : "start"} }>
                                        <Col xs={ 4 }>
                                            <Button onClick={ () => {
                                                removeProductOnList ( idList , p.id , user.token )
                                            } } color={ "error" } variant="outlined">Annulla</Button>
                                        </Col>
                                        <Col xs={ 4 }>
                                            { p.nome }
                                        </Col>

                                        <Col style={ {borderBottom : "1px solid royalblue"} } xs={ 4 }>
                                            { p.prezzo.toString ().split ( '.' )[0]
                                            }
                                            ,
                                            { p.prezzo.toString ().split ( '.' )[1] ?
                                                p.prezzo.toString ().split ( '.' )[1].slice ( 0 , 2 ).length === 1 ?
                                                p.prezzo.toString ().split ( '.' )[1].slice ( 0 , 2 ) + "0" :
                                                    p.prezzo.toString ().split ( '.' )[1].slice ( 0 , 2 ) + "" :
                                                "00"
                                            } €
                                        </Col>
                                    </Row>
                                </Row>
                            )
                        } )

                    }
                    <Row
                        style={ {
                            borderTop : "2px solid indigo" ,
                            padding : "10px"
                        } }
                        className={ "mt-4" }>
                        <Row className={ "justify-content-between" } sx={ {textAlign : "start"} }>
                            <Col
                                style={ {
                                    borderBottom : "1px solid green"
                                } }
                                xs={ 5 }>
                                TOT
                            </Col>
                            <Col style={ {borderBottom : "1px solid green"} } xs={ 5 }>
                                { " " +
                                    calculateTotal ( idList , spesaList ).split ( '.' )[0]
                                }
                                ,
                                {
                                    calculateTotal ( idList , spesaList ).split ( '.' )[1] ?
                                        calculateTotal ( idList , spesaList ).split ( '.' )[1].slice(0, 2).length === 1 ?
                                            calculateTotal ( idList , spesaList ).split ( '.' )[1].slice(0, 2) + "0" :
                                        calculateTotal ( idList , spesaList ).split ( '.' )[1].slice ( 0 , 2 ) + "" :
                                        "00"

                                } €
                            </Col>
                        </Row>
                        <Row>

                        </Row>
                    </Row>


                </CardContent>

            </Card>
        );
    }
;

export default CardSpesaList;