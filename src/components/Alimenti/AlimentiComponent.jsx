import React from 'react';
import { Col , Container , Row } from "react-bootstrap";

const AlimentiComponent = () => {
    return (
        <Container fluid>
            <Row>
                <Col className={"text-center"} xs={4}>
                    <h1>Alimenti</h1>
                </Col>
                <Col className={"text-center"} xs={8}>
                    <h1>Liste della spesa</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default AlimentiComponent;