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
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
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


        const [ arr , setArr ] = useState ( [] );
        const idList = list.split ( ' ' )[0]
        const idProduct = productName[0]?.split ( ' ' )[0]

        useEffect ( () => {
            if ( productName.length > 0 ) {
                addProductOnList ( idList , idProduct , user.token, "PUT" ).then ( () => {
                    setProductName ( [] )
                } )

            }

        } , [ productName ] )

        const addProductOnList = async (listaId , prodottoId , token, method) => {
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

                    console.log ( data );
                } else {
                    console.log ( "Qualcosa è andato storto" );
                }
            } catch ( error ) {
                console.log ( error );
            }
        }

        const removeProductOnList = async (listaId , prodottoId , token, method) => {
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

                    console.log ( data );
                } else {
                    console.log ( "Qualcosa è andato storto" );
                }
            } catch ( error ) {
                console.log ( error );
            }
        }

    const removeLista = async (listaId , token) => {
        const baseEndpoint = `http://localhost:8080/api/lista/delete/${ listaId}`;

        const header = {
            "Authorization" : `Bearer ${ token }`
        };

        try {
            const response = await fetch ( baseEndpoint , {
                method : "DELETE" ,
                headers : header ,
            } );

            if ( response.ok ) {

                setSpesaListaNome([])

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


        return (
            <>
                {spesaList && (
                    <Card sx={ {minWidth : "100%" , margin : "20px auto"} }>
                        <CardContent>
                            <Row>
                                <Typography style={{textAlign: "end"}} variant="h5" component="div">
                                    <Button onClick={() => {
                                        removeLista(idList, user.token)
                                    }}>
                                        <DeleteSweepIcon style={{
                                            fontSize: "40px",
                                            cursor: "pointer"
                                        }} color={"error"}/>
                                    </Button>

                                </Typography>
                            </Row>
                            <Row
                                style={ {
                                    border : "1px solid gainsboro" ,
                                    borderRadius : "5px" ,
                                    backgroundColor: "aliceblue"
                                } }
                                className={ "justify-content-center align-items-center mb-3" }>
                                <Col>
                                    <ProdottiSelectComponent productName={ productName } setProductName={ setProductName }/>
                                </Col>
                                <Col>
                                    <Typography style={{textAlign: "center"}} variant="h5" component="div">
                                        {
                                            spesaList.find ( el => el.id === parseInt ( idList ) ).nome + " "
                                        }
                                    </Typography>
                                </Col>

                                <Col style={ {
                                    textAlign : "end"
                                } }>
                                    TOTALE:
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

                            {

                                spesaList.find ( el => el.id === parseInt ( idList ) ).prodotti?.map ( (p , i) => {

                                    return (
                                        <Row key={ i }>
                                            <Row className={ "justify-content-between mb-2" }>
                                                <Col xs={ 4 }>
                                                    <Button
                                                        className={"mb-2"}
                                                        onClick={ () => {
                                                            removeProductOnList ( idList , p.id , user.token, "PUT" )
                                                        } }
                                                        color={ "error" } variant="outlined">
                                                        Annulla
                                                    </Button>
                                                </Col>
                                                <Col
                                                    style={ {
                                                        borderBottom : "1px solid royalblue" ,
                                                        textAlign : "start"
                                                    } }
                                                    xs={ 4 }>
                                                    { p.nome }
                                                </Col>

                                                <Col style={ {
                                                    borderBottom : "1px solid royalblue" ,
                                                    textAlign : "end"
                                                } }
                                                     xs={ 4 }>
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
                                        TOTALE
                                    </Col>
                                    <Col style={ {borderBottom : "1px solid green", textAlign: "center"} } xs={ 5 }>
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
                                <Row>

                                </Row>
                            </Row>


                        </CardContent>

                    </Card>
                )}
            </>

        );
    }
;

export default CardSpesaList;