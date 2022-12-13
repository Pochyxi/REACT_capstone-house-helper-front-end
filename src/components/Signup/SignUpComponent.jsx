import React , { useEffect , useState } from "react";
import { Form , Container , Col , Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Alert , Button } from "@mui/material";
import Card from "@mui/material/Card";
import HouseHelper from '../../img/HHlogo.png'

function SignUpComponent() {
    const navigate = useNavigate ();

    const [ formObj , setFormObj ] = useState ( {
        // oggetto per la compilazione del form
        nomeCompleto : "" ,
        username : "" ,
        email : "" ,
        password : "" ,
    } );

    const [ ripetiPassword , setRipetiPassword ] = useState ( "" )
    const [checkPassword , setCheckPassword ] = useState (false)

    useEffect(() => {
        if (formObj.password === ripetiPassword) setCheckPassword(false)
    }, [formObj.password, ripetiPassword])

    const handleForm = (key , value) => {
        // setta l'oggetto del form
        setFormObj ( (form) => {
            return {
                ...form ,
                [key] : value ,
            };
        } );
    };

    const signUp = async (obj) => {
        const baseEndpoint = "http://localhost:8080/api/users/new-raw";

        const header = {
            "Content-type" : "application/json" ,
        };

        try {
            const response = await fetch ( baseEndpoint , {
                method : "POST" ,
                headers : header ,
                body : JSON.stringify ( obj ) ,
            } );

            if ( response.ok ) {
                const data = await response.json ();
                console.log ( data );
                navigate ( "/login" );
            } else {
                alert ( "Error fetching results" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };

    return (
        <Container fluid style={
            {
                borderRadius : "5px" ,
                fontSize : "1.5em" ,
                minHeight : "100vh" ,
            }
        }>
            <Row className={'mt-5 justify-content-center h-100'}>
                <Col xs={12} md={8} lg={6}>
                    <Row className={'align-items-center justify-content-center'}>
                        <Col>
                            <img
                                style={{
                                    width : "30%",
                                    height : "30%"
                                }}
                                src={HouseHelper}
                                alt="logo"/>
                        </Col>
                    </Row>
                    <Card style={{boxShadow: '2px 2px 2px royalblue'}}>
                        <Form
                            style={ {
                                margin : "0 auto" ,
                                borderLeft : "5px solid royalblue" ,
                                padding : "10px" ,
                            } }
                            onSubmit={ (e) => {
                                e.preventDefault ();
                                if (formObj.password === ripetiPassword) {
                                    signUp ( formObj );
                                    setCheckPassword(false);
                                } else {
                                    setCheckPassword(true)
                                }

                            } }
                        >
                            <Form.Group className="mb-3" controlId="formBasicNomeCompleto">
                                <Form.Label>Nome e cognome</Form.Label>
                                <Form.Control
                                    required
                                    value={ formObj.nomeCompleto }
                                    onChange={ (e) => handleForm ( "nomeCompleto" , e.target.value ) }
                                    type="text"
                                    placeholder="Inserisci nome e cognome"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Label>Nome utente</Form.Label>
                                <Form.Control
                                    required
                                    value={ formObj.username }
                                    autoComplete="current-password"
                                    onChange={ (e) => handleForm ( "username" , e.target.value ) }
                                    type="text"
                                    placeholder="Inserisci il nome utente"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Indirizzo email</Form.Label>
                                <Form.Control
                                    required
                                    value={ formObj.email }
                                    onChange={ (e) => handleForm ( "email" , e.target.value ) }
                                    type="email"
                                    placeholder="Inserisci la tua email"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    required
                                    value={ formObj.password }
                                    onChange={ (e) => handleForm ( "password" , e.target.value ) }
                                    type="password"
                                    placeholder="Inserisci Password"
                                    autoComplete="current-password"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Ripeti password</Form.Label>
                                <Form.Control
                                    required
                                    value={ ripetiPassword }
                                    onChange={ (e) => setRipetiPassword ( e.target.value ) }
                                    type="password"
                                    placeholder="Conferma Password"
                                    autoComplete="current-password"
                                />
                            </Form.Group>
                            {
                                checkPassword && (
                                    <Alert severity="error">Le password non corrispondono</Alert>
                                )
                            }

                            <Button color={'success'} variant={"outlined"} className={ "w-50 d-block mx-auto my-2" } type="submit">
                                REGISTRATI
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default SignUpComponent;
