import React , { useEffect , useState } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col , Container , Offcanvas , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import StatisticheBolletteComponent from "./Grafici/StatisticheBolletteComponent";
import DescriptionIcon from '@mui/icons-material/Description';
import { Button , IconButton , Skeleton , Stack , Switch } from "@mui/material";
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StatistichePostitComponent from "./Grafici/StatistichePostitComponent";
import StatisticheSpeseComponent from "./Grafici/StatisticheSpeseComponent";
import ChartBolletteComponent from "./ChartComponent/ChartBolletteComponent";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { getBolletteList , getPostitList , getSpeseList } from "../../redux/actions/actions";

const StatisticheComponent = () => {
    const navigate = useNavigate ()
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()

    const spesaList = useSelector ( state => state.fetch.spesaList )
    const prodottiList = useSelector ( state => state.fetch.productList )
    const postitList = useSelector ( state => state.fetch.postitList )

    const loadBollette = useSelector ( state => state.util.bollette_Load_Flag)
    const loadPostit = useSelector ( state => state.util.postit_Load_Flag)
    const loadSpese = useSelector ( state => state.util.spese_Load_Flag)

    const [ bolletteFlag , setBolletteFlag ] = useState ( true );

    const [ postitFlag , setPostitFlag ] = useState ( false );

    const [ speseFlag , setSpeseFlag ] = useState ( false );

    useEffect(() => {
        dispatch(getSpeseList(user.token, user.id))
        dispatch(getPostitList(user.token, user.id))
        dispatch(getBolletteList(user.token, user.id))
    }, [])

    // OFFCANVAS //
    //////////////
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    ////////////////////
    // FINE OFFCANVAS //

    return (
        <Container fluid>
            <Row className={ "justify-content-center" }>
                <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    </Offcanvas.Header>
                    <Offcanvas.Body
                        style={ {
                            backgroundColor : "black" ,
                            borderRight : "2px solid black" ,
                            boxShadow : "1px 1px 2px black" ,
                            minHeight : '100%'
                        } }
                            className={ "text-center" }
                        >
                        <Row className={'justify-content-end'}>
                            <Col xs={2}>
                                <IconButton
                                    onClick={() => handleClose()}
                                    aria-label="delete">
                                    <CloseIcon
                                        style={{
                                            fontSize : '2rem'
                                        }}/>
                                </IconButton>
                            </Col>
                        </Row>
                            <Row className={ 'mt-2' }>
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
                <Col style={ {
                    fontSize : '.7em'
                } } className={ 'justify-content-center mt-3' } xs={ 12 }>
                    <Row className={ 'text-center' }>
                        {
                            loadSpese &&
                            loadBollette &&
                            loadPostit ? (
                                <Col xs={ 12 }>
                                    <Stack  spacing={1}>
                                        <Row className={'flex-column flex-md-row'}>
                                            <Col>
                                                <Skeleton variant="rectangular" width={'100%'} height={'100vh'} />
                                            </Col>
                                        </Row>
                                    </Stack>
                                </Col>
                            ) : (
                                <Col xs={12}>
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
                                </Col>
                            )
                        }

                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default StatisticheComponent;