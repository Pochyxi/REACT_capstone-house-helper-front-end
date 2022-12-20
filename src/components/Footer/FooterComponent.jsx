import React from 'react';
import { Col , Row } from "react-bootstrap";
import HouseHelper from "../../img/HHlogo.png";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const FooterComponent = () => {
    return (
        <Row
            className={'mt-4 py-4 justify-content-start'}
            style={ {
                backgroundColor: '#e2e2e2',
                color: '#4e4e4e'
            } }>
            <Col
                className={'d-flex align-items-center'}
                xs={12}>
                <img
                    style={ {
                        width : "30px" ,
                        height : "30px"
                    } }
                    src={ HouseHelper }
                    alt="logo"/>
                <h4
                    style={{
                        lineHeight: 0
                    }}
                    className={'m-0 mx-2 d-inline'}>House Helper</h4>
            </Col>
            <Col
                className={'m-2'}
                xs={12}>
                <h5>La casa diventa azienda</h5>
            </Col>

            <Col
                xs={12}
                md={6}
                lg={3}
            >

                <Row>
                    <h6>Informazioni</h6>
                </Row>
                <p>Creato da: <span style={{color: 'royalblue', fontWeight: 'bold'}}>Adiener Lopez Velazquez</span></p>
                <p>Tecnologie: React, Redux, Bootstrap, Material, Charts.css  </p>
                <p>API: Google Auth API, Google Maps API</p>
            </Col>
            <Col
            xs={12}
            md={6}
            lg={3}
            >
                <Row>
                    <h6>Contatti</h6>
                    <p><GitHubIcon /> <a
                        target={'_blank'}
                        href={'https://github.com/Pochyxi'}>GitHub</a>
                    </p>
                    <p><LinkedInIcon /> <a
                        target={'_blank'}
                        href={'https://www.linkedin.com/in/adiener-lopez-934089236/'}>Linkedin</a>
                    </p>
                </Row>
            </Col>
            <Col
            xs={12}
            md={6}
            lg={3}
            >
                <h6>Repositories</h6>
                <p><a
                    target={'_blank'}
                    href={'https://github.com/Pochyxi/capstone-house-helper-front-end'}
                >Font-end</a></p>
                <p><a
                    target={'_blank'}
                    href={'https://github.com/Pochyxi/JAVA_HouseHelper_Capstone_Back-End'}
                >Back-end</a></p>
            </Col>
        </Row>
    );
};

export default FooterComponent;