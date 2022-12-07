import React , { useEffect , useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col , Container , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import StatisticheBolletteComponent from "./Grafici/StatisticheBolletteComponent";
import DescriptionIcon from '@mui/icons-material/Description';
import { Button , IconButton } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StatistichePostitComponent from "./Grafici/StatistichePostitComponent";
import StatisticheSpeseComponent from "./Grafici/StatisticheSpeseComponent";

const StatisticheComponent = () => {
    const navigate = useNavigate ()
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()

    const spesaList = useSelector ( state => state.fetch.spesaList )
    const prodottiList = useSelector ( state => state.fetch.productList )
    const postitList = useSelector ( state => state.fetch.postitList )

    const [ bolletteFlag , setBolletteFlag ] = useState ( true );

    const [ postitFlag , setPostitFlag ] = useState ( false );

    const [ speseFlag , setSpeseFlag ] = useState ( false );

    return (
        <Container fluid

        >
            <Row
                style={ {
                    fontSize : '.7em'
                } }
                className={ "justify-content-center" }>


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
                    xs={ 3 }
                >
                    <Col className={ 'mt-2' }>
                        <Card sx={ {margin : "25px auto" , maxHeight : '100%'} }
                              className={ "p-2" }>
                            <h6>Seleziona la statistica da visualizzare</h6>
                            <Row className={'justify-content-center'}>
                                <Col xs={12}>
                                    <Button
                                        className={'w-100'}
                                        onClick={ () => {
                                            setBolletteFlag ( !bolletteFlag )
                                            setPostitFlag ( false )
                                            setSpeseFlag ( false )
                                        } }
                                        variant={ bolletteFlag ? 'contained' : 'outlined' }
                                        style={ {borderRadius : 'none'} } aria-label="add">
                                        <DescriptionIcon/>Bollette
                                    </Button>
                                </Col>
                                <Col xs={12}>
                                    <Button
                                        className={'w-100 my-2'}
                                        // color={ postitFlag ? 'secondary' : '' }
                                        variant={ postitFlag ? 'contained' : 'outlined' }
                                        onClick={ () => {
                                            setPostitFlag ( !postitFlag )
                                            setBolletteFlag ( false );
                                            setSpeseFlag ( false )
                                        } }
                                        style={ {borderRadius : 'none'} }>
                                        <MailIcon/>Postit
                                    </Button>
                                </Col>
                                <Col xs={12}>
                                    <Button
                                        className={'w-100'}
                                        onClick={ () => {
                                            setPostitFlag ( false )
                                            setBolletteFlag ( false );
                                            setSpeseFlag ( !speseFlag )
                                        } }
                                        variant={ speseFlag ? 'contained' : 'outlined' }
                                        style={ {borderRadius : 'none'} }>
                                        <ShoppingCartIcon/>Spese
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Col>
                <Col xs={ 3 }>

                </Col>
                <Col className={ 'justify-content-center' } xs={ 9 }>
                    <Row className={ 'text-center justify-content-center' }>
                        {
                            bolletteFlag &&
                            !postitFlag &&
                            !speseFlag && (
                                <StatisticheBolletteComponent/>
                            )
                        }
                        {
                            !bolletteFlag &&
                            !speseFlag &&
                            postitFlag && (
                                <StatistichePostitComponent/>
                            )
                        }

                        {
                            !bolletteFlag &&
                            !postitFlag &&
                            speseFlag && (
                                <StatisticheSpeseComponent/>
                            )
                        }
                    </Row>

                </Col>
            </Row>
        </Container>
    );
};

export default StatisticheComponent;