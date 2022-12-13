import React , { useEffect , useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col , Container , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { getBolletteList , getPostitList , getSpeseList } from "../../redux/actions/actions";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { List , ListItem , ListItemButton , ListItemIcon } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MapComponent from "./MapComponent";
import { fetchBollettaScadenzaRange } from "./api/api";


const HomeComponent = () => {
    const user = useSelector ( state => state.user.user )

    const bolletteList = useSelector ( state => state.fetch.bollettaList )
    const postitList = useSelector ( state => state.fetch.postitList )
    const spesaList = useSelector ( state => state.fetch.spesaList )
    const [ postit5Giorni , setPostit5Giorni ] = useState ( [] )

    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    useEffect ( () => {
        fetchBollettaScadenzaRange ( range5DaysGenerator ().today , range5DaysGenerator ().todayPlus5 , user.id , user.token )
            .then ( r => setPostit5Giorni ( r ) )
        dispatch ( getBolletteList ( user.token , user.id ) )
        dispatch ( getPostitList ( user.token , user.id ) )
        dispatch ( getSpeseList ( user.token , user.id ) )
    } , [] )

    const range5DaysGenerator = () => {
        //DATA DI OGGI
        let today = new Date ()
        let todayPlus5 = new Date ()
        todayPlus5.setMilliseconds ( todayPlus5.getMilliseconds () + 432000000 )

        let todayYear = today.getUTCFullYear () + '-'
        let todayMonth = today.getMonth () + 1 + '-'
        let todayDay = today.getUTCDate ()

        let todayPlus5Year = todayPlus5.getUTCFullYear () + '-'
        let todayPlus5Month = todayPlus5.getMonth () + 1 + '-'
        let todayPlus5Day = todayPlus5.getUTCDate ()

        const parser = (number) => {
            if ( number < 10 ) return '0' + number
            else return number
        }

        return {
            today : todayYear + parser ( todayMonth ) + parser ( todayDay ) ,
            todayPlus5 : todayPlus5Year + parser ( todayPlus5Month ) + parser ( todayPlus5Day )
        }
    }


    return (
        <>
            <Container fluid>
                <Row className={ "justify-content-center" }>
                    <Row className={ 'my-3' }>
                        <h4>Bentornato { user.email }</h4>
                    </Row>
                    <Row className={ 'mt-3 justify-content-center' }>
                        <Row>
                            <h2 style={ {
                                borderBottom : '5px solid royalblue'
                            } }>Numeri</h2>
                        </Row>

                            <Row className={ 'justify-content-start text-center align-items-start flex-column' }>
                                <Col xs={ 6 }>
                                    <Card>
                                        <Row>
                                            <Col>
                                                <Col>
                                                    <ReceiptLongIcon style={ {
                                                        fontSize : '3em' ,
                                                        color : 'royalblue',
                                                    } }
                                                    />
                                                </Col>
                                                <b style={ {color : "royalblue"} }>BOLLETTE</b>
                                            </Col>
                                            <Col className={'d-flex align-items-center'}>
                                                <Col>
                                                    <b>{ bolletteList.length }</b>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col className={ 'my-2' } xs={ 6 }>
                                    <Card>
                                        <Row>
                                            <Col>
                                                <Col>
                                                    <CardMembershipIcon style={ {
                                                        fontSize : '3em',
                                                        color: 'darkgoldenrod'
                                                    } }/>
                                                </Col>
                                                <b style={ {color : "darkgoldenrod"} }>POSTIT</b>
                                            </Col>
                                            <Col className={ 'd-flex align-items-center' }>
                                                <Col>
                                                    <b>{ postitList.length }</b>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col xs={ 6 }>
                                    <Card>
                                        <Row>
                                            <Col>
                                                <Col>
                                                    <ShoppingCartCheckoutIcon style={ {
                                                        fontSize : '3em',
                                                        color: 'dodgerblue'
                                                    } }/>
                                                </Col>
                                                <b style={ {color : "dodgerblue"} }>SPESE</b>
                                            </Col>
                                            <Col className={ 'd-flex align-items-center' }>
                                                <Col>
                                                    <b>{ spesaList.length }</b>
                                                </Col>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                    </Row>

                    <Row className={ 'mt-3 justify-content-center' }>
                        <Row>
                            <h2 style={ {
                                borderBottom : '5px solid royalblue'
                            } }>Scadenze nei prossimi 5 giorni</h2>
                        </Row>
                        <Card>

                            <Row>
                                <Col>
                                    <List>
                                        {
                                            postit5Giorni.map ( (postit , index) => {
                                                return (
                                                    <ListItem key={ index } disablePadding>
                                                        <ListItemButton onClick={ () => navigate ( '/postit' ) }>
                                                            <ListItemIcon>
                                                                <CardMembershipIcon style={ {
                                                                    fontSize : '3em'
                                                                } }/>
                                                            </ListItemIcon>
                                                            { postit.scadenza } <ArrowRightAltIcon/>
                                                            <b>{ postit.contenuto }</b>
                                                        </ListItemButton>
                                                    </ListItem>
                                                )
                                            } )
                                        }

                                    </List>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                    <Row className={'mt-3 justify-content-center'}>
                        <Row>
                            <h2
                                style={{
                                    borderBottom: '5px solid royalblue'
                                }}>Luoghi di interesse intorno a te</h2>
                        </Row>
                    </Row>
                    <MapComponent/>
                </Row>
            </Container>

        </>

    );
};

export default HomeComponent;