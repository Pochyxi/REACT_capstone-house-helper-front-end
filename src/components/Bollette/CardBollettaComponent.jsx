import React , { useState } from 'react';
import { IconButton , Paper } from "@mui/material";
import { Col , Row } from "react-bootstrap";
import GasMeterIcon from '@mui/icons-material/GasMeter';
import OpacityIcon from '@mui/icons-material/Opacity';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import GradingIcon from '@mui/icons-material/Grading';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import EuroIcon from '@mui/icons-material/Euro';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { getBolletteList } from "../../redux/actions/actions";
import { useDispatch , useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DialogDeleteComponent from "../FeedBackComponents/DialogDeleteComponent";
import { deleteBolletta } from "./api/api";

const CardBollettaComponent = ({bolletta, handleClickEliminazione, handleClickError}) => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()
    const navigate = useNavigate ()

    const [ dialogEliminazioneFlag , setDialogEliminazioneFlag ] = useState (false);
    const handleClickOpen = () => {
        setDialogEliminazioneFlag(true);
    };
    const handleClose = () => {
        setDialogEliminazioneFlag(false);
        dispatch(getBolletteList(user.token, user.id))
    };

    //IN BASE ALLA STRINGA RITORNERA' UN'ICONA DIVERSA
    const determinaIcona = (string) => {
        switch (string) {
            case 'GAS':
                return (
                    <GasMeterIcon style={ {color : 'royalblue' , fontSize : '3em' , opacity : 0.5} }/>
                )
            case 'LUCE':
                return (
                    <LightbulbIcon style={ {color : 'darkgoldenrod' , fontSize : '3em' , opacity : 0.5} }/>
                )
            case 'ACQUA':
                return (
                    <OpacityIcon style={ {color : 'dodgerblue' , fontSize : '3em' , opacity : 0.5} }/>
                )
            case 'ALTRO':
                return (
                    <GradingIcon style={ {color : 'darkgray' , fontSize : '3em' , opacity : 0.5} }/>
                )
        }
    }


    return (
        <Paper>
            {/*CONTENITORE ESTERNO*/ }
            <Row className={ 'd-flex justify-content-center pb-2' }>
                <Col>
                    <IconButton
                        onClick={handleClickOpen}
                        style={ {
                            color : 'red'
                        } }
                        aria-label="add">
                        <BackspaceIcon/>
                    </IconButton>
                    <DialogDeleteComponent
                        dialogEliminazioneFlag={dialogEliminazioneFlag}
                        handleClose={handleClose}
                        fetchToDelete={deleteBolletta}
                        item={bolletta}
                        user={user}
                        openSuccess={ handleClickEliminazione }
                        openError={ handleClickError }
                    />
                </Col>
                {/*SEZIONE FORNITURA PIU' LOGO*/ }
                <Col
                    className={ 'd-flex' }
                    xs={ 12 }>
                    {/*COLONNA FORNITURA*/ }
                    <Col
                        sx={ {
                            fontSize : '2em'
                        } }
                        className={ 'd-flex align-items-end p-3 pt-0' }>
                        <h4 className={ 'm-0' }>{ bolletta.fornitura }</h4>
                    </Col>
                    {/*COLONNA LOGO*/ }
                    <Col className={ 'p-3 pt-0 text-end' }>
                        { determinaIcona ( bolletta.fornitura ) }
                    </Col>
                </Col>

                {/*SEZIONE DATI FATTURA*/ }
                <Col

                    className={ 'd-flex flex-wrap justify-content-center' }
                    xs={ 11 }>
                    {/*I DATI DELLA BOLLETTA*/ }
                    <Col
                        xs={ 12 }
                        md={ 6 }
                        style={ {
                            borderLeft : '3px solid black' ,
                        } }
                        className={ 'p-3' }>
                        {/*DATI BOLLETTA*/ }
                        <Row style={ {
                            position : 'relative' ,
                            bottom : '20px'
                        } }>
                            <b style={ {color : 'royalblue'} } className={ 'p-0' }><ReceiptLongIcon/> DATI BOLLETTA</b>
                        </Row>
                        {/*FORNITURA*/ }
                        <Row className={ 'px-2 mt-1' }>
                            <Col>
                                <b>Fornitura</b>
                            </Col>
                            <Col>
                                { bolletta.fornitura }
                            </Col>
                        </Row>
                        {/*NUMERO*/ }
                        <Row className={ 'px-2 mt-1' }>
                            <Col>
                                <b>N. Fattura</b>
                            </Col>
                            <Col>
                                <b>{ bolletta.numero }</b>
                            </Col>
                        </Row>
                        {/*DATA DI EMISSIONE*/ }
                        <Row className={ 'px-2 mt-1' }>
                            <Col>
                                <b>Del</b>
                            </Col>
                            <Col>
                                <b>{ bolletta.emissione }</b>
                            </Col>
                        </Row>
                    </Col>
                    {/*SEZIONE TOTALE DA PAGARE*/ }
                    <Col
                        xs={ 12 }
                        md={ 6 }
                        className={ 'p-3 d-flex flex-column justify-content-between' }
                        style={ {
                            color : 'royalblue' ,
                            borderLeft : '3px solid black'
                        } }>
                        {/*TOTALE DA PAGARE*/ }
                        <Row style={ {
                            position : 'relative' ,
                            bottom : '20px'
                        } }>
                            <b style={ {color : 'royalblue'} } className={ 'p-0' }><EuroIcon/> TOTALE DA PAGARE</b>
                        </Row>
                        <Row className={ 'flex-column align-items-end' }>
                            <Col
                                className={ 'd-flex' }
                                style={ {
                                    fontSize : '1.5em' ,
                                    fontWeight : 'bolder' ,
                                    color : 'black'
                                } }
                                xs={ 6 }>
                                <Col>
                                    { bolletta.totale }
                                </Col>
                                <Col style={ {
                                    fontSize : '.9em' ,
                                } }>
                                    <EuroIcon style={ {fontSize : '1.5em'} }/>
                                </Col>
                            </Col>
                        </Row>
                        <Row className={ 'flex-column align-items-end' }>
                            <Col
                                style={ {
                                    fontSize : '.9em' ,
                                    color : 'black'
                                } }
                                xs={ 12 }>
                                Entro il <b>{ bolletta.scadenza }</b>
                            </Col>
                        </Row>
                    </Col>
                    <Col
                        style={ {
                            borderTop : '3px solid black' ,
                            borderLeft : '3px solid black' ,
                            color : 'royalblue'
                        } }
                        xs={ 12 }>
                        <Col
                            className={ 'p-3' }
                            xs={ 12 }>
                            <Row style={ {
                                position : 'relative' ,
                                bottom : '15px'
                            } }>
                                <b style={ {color : 'royalblue'} } className={ 'p-0' }><QueryBuilderIcon/> PERIODO</b>
                            </Row>
                            <Row>
                                <Col style={ {
                                    fontSize : '1.1em' ,
                                    color : "black"
                                } }>
                                    Dal <b>{ bolletta.periodoInizio }</b> al <b>{ bolletta.periodoFine }</b>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Col>
            </Row>
        </Paper>
    );
};

export default CardBollettaComponent;