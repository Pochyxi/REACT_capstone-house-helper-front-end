import React , { useEffect , useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col , Container , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { getBolletteList , getPostitList , getSpeseList } from "../../redux/actions/actions";
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { List , ListItem , ListItemButton , ListItemIcon , Skeleton } from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MapComponent from "./MapComponent";
import { fetchBollettaScadenzaRange } from "./api/api";
import { setPostit_LOADFlagFalse , setPostit_LOADFlagTrue } from "../../redux/actions/utilsActions";


const HomeComponent = () => {
    const user = useSelector ( state => state.user.user )

    const bolletteList = useSelector ( state => state.fetch.bollettaList )
    const postitList = useSelector ( state => state.fetch.postitList )
    const spesaList = useSelector ( state => state.fetch.spesaList )
    const [ postit5Giorni , setPostit5Giorni ] = useState ( [] )

    const loadBollette = useSelector ( state => state.util.bollette_Load_Flag)
    const loadPostit = useSelector ( state => state.util.postit_Load_Flag)
    const loadSpese = useSelector ( state => state.util.spese_Load_Flag)

    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    useEffect ( () => {
        dispatch ( setPostit_LOADFlagTrue () )
        fetchBollettaScadenzaRange ( range5DaysGenerator ().today , range5DaysGenerator ().todayPlus5 , user.id , user.token )
            .then ( r => {
                setPostit5Giorni ( r )
                setTimeout ( () => {
                    dispatch ( setPostit_LOADFlagFalse )
                } , 1000 )
            } )
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
                        <h4
                            style={{
                                fontFamily: 'monospace',
                                fontWeight: 'bolder',
                                fontSize: '1.5rem'
                            }}
                            className={'text-center'}
                        >
                            Bentornato { user.email }
                        </h4>
                    </Row>
                    <Row className={ 'mt-3 justify-content-center' }>

                        <Row>
                            <Card style={ {
                                borderTop : '5px solid #6610f2' ,
                                boxShadow : '0 0 5px #6610f2'
                            } }>

                            </Card>
                            <h2 >Numeri</h2>
                        </Row>

                        {
                            loadSpese &&
                            loadBollette &&
                            loadPostit ? (
                                <Row
                                    style={ {
                                        borderLeft : '5px solid #6610f2' ,
                                        borderBottom : '1px solid gainsboro'
                                    } }
                                    className={ 'p-2 justify-content-start text-center align-items-center' }
                                >
                                    <Col xs={ 6 }>
                                        <Skeleton variant="rectangular" width={ '100%'} height={ 70 }/>
                                    </Col>
                                    <Col xs={ 6 }>
                                        <Skeleton variant="rectangular" width={ '100%' } height={ 70 }/>
                                    </Col>
                                    <Col xs={ 6 } className={'mt-2'}>
                                        <Skeleton variant="rectangular" width={ '100%' } height={ 70 }/>
                                    </Col>
                                </Row>
                            ) : (
                                <Row
                                    style={ {
                                        borderLeft : '5px solid #6610f2' ,
                                        borderBottom : '1px solid gainsboro'
                                    } }
                                    className={ 'p-2 justify-content-start text-center align-items-center' }
                                >
                                    <Col xs={ 6 }>
                                        <Card style={ {backgroundColor : 'royalblue' , color : "whitesmoke"} }>
                                            <Row>
                                                <Col>
                                                    <Col>
                                                        <ReceiptLongIcon style={ {
                                                            fontSize : '3em' ,
                                                        } }
                                                        />
                                                    </Col>
                                                    <b>BOLLETTE</b>
                                                </Col>
                                                <Col className={ 'd-flex align-items-center' }>
                                                    <Col>
                                                        <b>{ bolletteList.length }</b>
                                                    </Col>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                    <Col className={ 'my-2' } xs={ 6 }>
                                        <Card style={ {backgroundColor : '#f1f58f' , color : "grey"} }>
                                            <Row>
                                                <Col>
                                                    <Col>
                                                        <CardMembershipIcon style={ {
                                                            fontSize : '3em' ,
                                                        } }/>
                                                    </Col>
                                                    <b>POSTIT</b>
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
                                        <Card style={ {backgroundColor : 'dodgerblue' , color : "whitesmoke"} }>
                                            <Row>
                                                <Col>
                                                    <Col>
                                                        <ShoppingCartCheckoutIcon style={ {
                                                            fontSize : '3em' ,
                                                        } }/>
                                                    </Col>
                                                    <b>SPESE</b>
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
                            )
                        }
                    </Row>

                    <Row className={ 'mt-5 justify-content-center' }>
                        <Row>
                            <Card style={ {
                                borderTop : '5px solid #6610f2' ,
                                boxShadow : '0 0 5px #6610f2'
                            } }>

                            </Card>
                            <h2>Scadenze Postit nei prossimi 5 giorni</h2>
                        </Row>
                        <Row style={ {
                            borderLeft : '5px solid #6610f2' ,
                            borderBottom : '1px solid gainsboro'
                        } }
                             className={ 'p-0' }
                        >

                                {
                                    loadPostit ? (
                                        <Row>
                                            <Skeleton variant="rectangular" width={ '100%' } height={ 70 }/>
                                            <Skeleton variant="rectangular" width={ '100%' } height={ 70 }/>
                                        </Row>
                                    ) : (
                                        <Row>
                                            <Col>
                                                <List>
                                                    {
                                                        postit5Giorni.length > 0 ? (
                                                            <>
                                                                {
                                                                    postit5Giorni.map ( (postit , index) => {
                                                                        return (
                                                                            <ListItem
                                                                                style={{
                                                                                    backgroundColor: 'rgba(241,245,143,0.48)',
                                                                                    marginTop: '10px',
                                                                                }}
                                                                                key={ index }
                                                                                disablePadding>
                                                                                <ListItemButton
                                                                                    onClick={ () => navigate ( '/postit' ) }>
                                                                                    <ListItemIcon>
                                                                                        <CardMembershipIcon style={ {
                                                                                            fontSize : '3em',
                                                                                        } }/>
                                                                                    </ListItemIcon>
                                                                                    { postit.scadenza } <ArrowRightAltIcon/>
                                                                                    <b>{ postit.contenuto }</b>
                                                                                </ListItemButton>
                                                                            </ListItem>
                                                                        )
                                                                    } )
                                                                }
                                                            </>
                                                        ) : (
                                                            <>
                                                                <h6>Non ci sono scadenze nei prossimi 5 giorni!</h6>
                                                                <p>Potresti controllare nella sezione
                                                                    <span style={ {
                                                                        color : 'royalblue' ,
                                                                        fontWeight : "bold" ,
                                                                        cursor : 'pointer'
                                                                    } }
                                                                          onClick={ () => navigate ( '/utenze' ) }
                                                                    > BOLLETTE </span>
                                                                    se ci sono scadenze non registrate</p>
                                                            </>

                                                        )
                                                    }


                                                </List>
                                            </Col>
                                        </Row>
                                    )
                                }

                        </Row>
                    </Row>
                    <Row className={ 'mt-5 justify-content-center' }>
                        <Row>
                            <Card style={ {
                                borderTop : '5px solid #6610f2' ,
                                boxShadow : '0 0 5px #6610f2'
                            } }>

                            </Card>
                            <h2
                                >Luoghi di interesse intorno a te</h2>
                        </Row>
                        <MapComponent/>
                    </Row>
                </Row>
            </Container>

        </>

    );
};

export default HomeComponent;