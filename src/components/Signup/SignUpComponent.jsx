import React , { useEffect , useState } from "react";
import { Form , Container , Col , Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Alert , Button } from "@mui/material";
import Card from "@mui/material/Card";
import HouseHelper from '../../img/HHlogo.png'
import { signUp } from "./api/api";
import { useDispatch , useSelector } from "react-redux";
import { logIn } from "../../redux/actions/actions";
import BackDropComponent from "../FeedBackComponents/backDropComponent";

function SignUpComponent() {
    const navigate = useNavigate ();

    const loginLoad = useSelector ( state => state.util.login_LOAD_Flag )

    const user = useSelector ( state => state.user.user )

    const dispatch = useDispatch ()

    // SIGNUP FORM //
    ////////////////

    // oggetto del form
    const [ formObj , setFormObj ] = useState ( {
        // oggetto per la compilazione del form
        nomeCompleto : "" ,
        username : "" ,
        email : "" ,
        password : "" ,
    } );

    // ripeti password
    const [ ripetiPassword , setRipetiPassword ] = useState ( "" )
    const [ checkPassword , setCheckPassword ] = useState ( false )

    // controlla se le password corrispondono
    useEffect ( () => {
        if ( formObj.password === ripetiPassword ) setCheckPassword ( false )
    } , [ formObj.password , ripetiPassword ] )

    // funzione per modificare il form
    const handleForm = (key , value) => {
        // setta l'oggetto del form
        setFormObj ( (form) => {
            return {
                ...form ,
                [key] : value ,
            };
        } );
    };

    // FINE SIGNUP FORM //
    /////////////////////


    // se il token esiste rimanda alla home
    useEffect ( () => {
        if ( user.token ) {
            navigate ( '/' )
        }
    } , [ user.token ] )

    return (
        <Container fluid style={
            {
                borderRadius : "5px" ,
                fontSize : "1.5em" ,
                minHeight : "100vh" ,
            }
        }>
            {
                loginLoad ? (
                    <BackDropComponent load={loginLoad}/>
                ) : (
                    <Row className={ 'mt-5 justify-content-center' }>
                        <Col xs={ 12 } md={ 8 } lg={ 6 }>
                            <Row className={ 'align-items-center justify-content-center' }>

                                {/*LOGO*/}
                                <Col>
                                    <img
                                        style={ {
                                            width : "30%" ,
                                            height : "30%"
                                        } }
                                        src={ HouseHelper }
                                        alt="logo"/>
                                </Col>
                            </Row>
                            <Card style={ {boxShadow : '2px 2px 2px royalblue'} }>

                                {/*FORM DEL SIGNUP*/}
                                <Form
                                    style={ {
                                        margin : "0 auto" ,
                                        borderLeft : "5px solid royalblue" ,
                                        padding : "10px" ,
                                    } }
                                    onSubmit={ (e) => {
                                        e.preventDefault ();
                                        if ( formObj.password === ripetiPassword ) {
                                            setCheckPassword ( false );
                                            signUp ( formObj ).then ( (r) => {
                                                if ( r ) {
                                                    dispatch ( logIn ( {
                                                        username : r.username ,
                                                        password : formObj.password
                                                    } ) )
                                                    setFormObj({
                                                        nomeCompleto : "" ,
                                                        username : "" ,
                                                        email : "" ,
                                                        password : "" ,
                                                    })
                                                }
                                            } )
                                        } else {
                                            setCheckPassword ( true )
                                        }
                                    } }
                                >

                                    {/*NOME E COGNOME*/}
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

                                    {/*NOME UTENTE*/}
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Nome utente</Form.Label>
                                        <Form.Control
                                            required
                                            value={ formObj.username }
                                            autoComplete="username"
                                            onChange={ (e) => handleForm ( "username" , e.target.value ) }
                                            type="text"
                                            placeholder="Inserisci il nome utente"
                                        />
                                    </Form.Group>

                                    {/*EMAIL*/}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Indirizzo email</Form.Label>
                                        <Form.Control
                                            required
                                            value={ formObj.email }
                                            onChange={ (e) => handleForm ( "email" , e.target.value ) }
                                            type="email"
                                            placeholder="Inserisci la tua email"
                                            autoComplete="username"
                                        />
                                    </Form.Group>

                                    {/*PASSWORD*/}
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

                                    {/*RIPETI PASSWORD*/}
                                    <Form.Group className="mb-3" controlId="formBasicPassword2">
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

                                    {/*PULSANTE PER REGISTRARSI*/}
                                    <Button color={ 'success' } variant={ "outlined" }
                                            className={ "w-50 d-block mx-auto my-2" } type="submit">
                                        REGISTRATI
                                    </Button>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                )
            }

        </Container>
    );
}

export default SignUpComponent;
