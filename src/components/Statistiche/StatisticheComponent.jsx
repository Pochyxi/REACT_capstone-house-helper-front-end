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
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import BackDropComponent from "../FeedBackComponents/backDropComponent";
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import StatisticheBolletteComponentV2 from "./ChartComponent/StatisticheV2/StatisticheBolletteComponentV2";

const StatisticheComponent = () => {


    const loadBollette = useSelector ( state => state.util.bollette_Load_Flag)

    const [ bolletteFlag , setBolletteFlag ] = useState ( true );

    const [ postitFlag , setPostitFlag ] = useState ( false );

    const [ speseFlag , setSpeseFlag ] = useState ( false );

    // partire sempre dal top della pagina
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <Container fluid>
            <BackDropComponent load={loadBollette} />
            <Row className={ "justify-content-center text-center" }>
                <Col className={ 'd-flex justify-content-center' }>
                    <Col>
                        <ReceiptLongIcon style={ {color : 'royalblue' , fontSize : '3em'} }/>
                        <Switch
                            checked={ bolletteFlag }
                            onChange={  () => {
                                setBolletteFlag ( !bolletteFlag )
                                setPostitFlag ( false )
                                setSpeseFlag ( false )
                            } }
                            control={ <Switch defaultChecked/> }
                        />
                    </Col>
                    <Col>
                        <CardMembershipIcon style={ {
                            color: 'darkgoldenrod',
                            fontSize : '3em',
                        } }/>
                        <Switch
                            checked={ postitFlag }
                            onChange={ () => {
                                setPostitFlag ( !postitFlag )
                                setBolletteFlag ( false );
                                setSpeseFlag ( false )
                            } }
                            control={ <Switch defaultChecked/> }
                        />
                    </Col>
                    <Col>
                        <ShoppingCartIcon style={ {color : 'dodgerblue' , fontSize : '3em'} }/>
                        <Switch checked={ speseFlag }
                                onChange={ () => {
                                    setPostitFlag ( false )
                                    setBolletteFlag ( false );
                                    setSpeseFlag ( !speseFlag )
                                } }
                                control={ <Switch defaultChecked/> }
                        />
                    </Col>
                </Col>
                <Col style={ {
                    fontSize : '.7em'
                } } className={ 'justify-content-center mt-3' } xs={ 12 }>
                    <Row className={ 'text-center' }>
                                <Col xs={12}>
                                    {
                                        bolletteFlag &&
                                        !postitFlag &&
                                        !speseFlag && (
                                            <>
                                                <StatisticheBolletteComponent/>
                                                <StatisticheBolletteComponentV2 />
                                            </>

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
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default StatisticheComponent;