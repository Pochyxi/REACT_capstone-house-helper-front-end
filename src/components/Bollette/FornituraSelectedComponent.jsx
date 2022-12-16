import React from 'react';
import { Col , Row } from "react-bootstrap";
import { IconButton } from "@mui/material";
import GasMeterIcon from "@mui/icons-material/GasMeter";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import GradingIcon from "@mui/icons-material/Grading";
import OpacityIcon from "@mui/icons-material/Opacity";




const FornituraSelectedComponent = (props) => {

    const fornituraSelectRender = (stringa) => {
        switch (stringa) {
            case '':
                return (
                    <>
                        <h6>Seleziona la fornitura</h6>
                        <Row>
                            <Col>
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('gas')
                                        props.handleForm('fornitura', 'GAS');
                                    }}
                                    aria-label="add">
                                    <GasMeterIcon/>
                                </IconButton>
                            </Col>
                            <Col>
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('luce')
                                        props.handleForm('fornitura', 'LUCE');
                                    }}
                                    aria-label="add">
                                    <LightbulbIcon/>
                                </IconButton>
                            </Col>
                            <Col>
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('altro')
                                        props.handleForm('fornitura', 'ALTRO');
                                    }}
                                    aria-label="add">
                                    <GradingIcon />
                                </IconButton>
                            </Col>
                            <Col>
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('acqua')
                                        props.handleForm('fornitura', 'ACQUA');
                                    }}
                                    aria-label="add">
                                    <OpacityIcon />
                                </IconButton>
                            </Col>
                        </Row>
                    </>
                )
            case 'luce':
                return (
                    <>
                        <h6>Hai selezionato luce</h6>
                        <Row>
                            <Col >
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('')
                                        props.handleForm('fornitura', '')
                                    } }
                                    aria-label="add">
                                    <LightbulbIcon style={{
                                        color: 'darkgoldenrod',
                                        fontSize: '2em'
                                    }}/>
                                </IconButton>
                            </Col>
                        </Row>
                    </>
                )
            case 'gas':
                return (
                    <>
                        <h6>Hai selezionato gas</h6>
                        <Row>
                            <Col >
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('')
                                        props.handleForm('fornitura', '')
                                    } }
                                    aria-label="add">
                                    <GasMeterIcon style={ {color : 'royalblue' , fontSize : '2em'} }/>
                                </IconButton>
                            </Col>
                        </Row>
                    </>
                )

            case 'acqua':
                return (
                    <>
                        <h6>Hai selezionato acqua</h6>
                        <Row>
                            <Col >
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('')
                                        props.handleForm('fornitura', '')
                                    } }
                                    aria-label="add">
                                    <OpacityIcon style={ {color : 'dodgerblue' , fontSize : '2em'} }/>
                                </IconButton>
                            </Col>
                        </Row>
                    </>
                )

            case 'altro':
                return (
                    <>
                        <h6>Hai selezionato altro</h6>
                        <Row>
                            <Col >
                                <IconButton
                                    onClick={() => {
                                        props.setFornituraState('')
                                        props.handleForm('fornitura', '')
                                    } }
                                    aria-label="add">
                                    <GradingIcon style={ {color : 'darkgray' , fontSize : '2em'} }/>
                                </IconButton>
                            </Col>
                        </Row>
                    </>
                )

        }
    }

    return (
        <>
            {fornituraSelectRender(props.fornituraState)}
        </>
    );
};

export default FornituraSelectedComponent;