import React , { useEffect , useState } from "react";
import { Form , Row , Col } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux";
import { logIn } from "../../redux/actions/actions";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script'
import Card from "@mui/material/Card";
import { Alert , Button } from "@mui/material";
import HouseHelper from '../../img/HHlogo.png'
import BackDropComponent from "../FeedBackComponents/backDropComponent";
import { signUp } from "../Signup/api/api";


function LoginComponent() {
    // Chiave segreta per l'autenticazione google
    const clientId = process.env.REACT_APP_CLIENT_ID;

    // Oggetto utente
    const user = useSelector ( state => state.user.user )

    // flag del login
    const loginFlag = useSelector ( state => state.user.loginFlag )

    // flag del loader
    const loginLoad = useSelector ( state => state.util.login_LOAD_Flag )

    const dispatch = useDispatch () // REDUX

    const navigate = useNavigate () // router

    // se l'oggetto utente viene compilato manda alla home
    useEffect ( () => {
        if ( user.token ) {
            navigate ( "/" );
        }

    } , [ user.token ] );

    // GOOGLE AUTH API //
    /////////////////////

    // Google auth
    useEffect ( () => {

        const start = () => {
            gapi.auth2.init ( {
                clientId : clientId ,
            } )
        }
        gapi.load ( "client:auth2" , start )
    } , [] );

    // Nel caso il login con google abbia successo
    // creo una copia nel database e provo
    // ad effettuare il login
    const onSuccess = (response) => {

        const userDataSignup = {
            nomeCompleto : response.profileObj.name ,
            username : response.profileObj.email ,
            email : response.profileObj.email ,
            password : response.profileObj.googleId ,
        }
        try {
            signUp ( userDataSignup ).then ( () => {
                //LOGIN
                const userDataLogin = {
                    username : response.profileObj.email ,
                    password : response.profileObj.googleId
                }
                dispatch ( logIn ( userDataLogin ) )
                navigate ( "/login" );
            } )
        } catch ( e ) {
            console.log ( "ok" )
        }


    }

    // semplice console log se fallisce l'auth
    const onFailure = () => {
        console.log ( "Something went wrong" )
    }

    // FINE GOOGLE AUTH API //
    /////////////////////////

    // LOGIN FORM //
    ////////////////
    // oggetto del form
    const [ formObj , setFormObj ] = useState ( { // oggetto per la compilazione del form
        username : '' ,
        password : ''
    } )

    // funzione per modificare il form
    const handleForm = (key , value) => {// setta l'oggetto del form
        setFormObj ( form => {
            return {
                ...form ,
                [key] : value
            }

        } )
    }

    // FINE LOGIN FORM //
    /////////////////////

    return (
        <>
            {
                loginLoad ? (
                    <BackDropComponent load={ loginLoad }/>
                ) : (
                    <Row className={ 'mt-5 justify-content-center h-100' }>
                        <Col xs={ 12 } md={ 8 } lg={ 6 }>
                            <Row className={ 'align-items-center justify-content-center' }>
                                {/*LOGO*/ }
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

                                {/*FORM DEL LOGIN*/}
                                <Form
                                    style={ {
                                        margin : "0 auto" ,
                                        borderLeft : "5px solid royalblue" ,
                                        padding : "10px" ,
                                    } }
                                    onSubmit={ (e) => {
                                        e.preventDefault ()
                                        dispatch ( logIn ( formObj ) )
                                        console.log ( user )
                                    } }>

                                    {/*NOME UTENTE*/}
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Nome utente</Form.Label>
                                        <Form.Control
                                            required
                                            value={ formObj.username }
                                            onChange={ (e) => handleForm ( "username" , e.target.value ) }
                                            type="text"
                                            autoComplete="current-password"
                                            placeholder="Inserisci il nome utente scelto in fase di registrazione"/>
                                        <Form.Text className="text-muted">
                                            Non condividere mai la password con nessuno.
                                        </Form.Text>
                                    </Form.Group>

                                    {/*PASSWORD*/}
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            value={ formObj.password }
                                            onChange={ (e) => handleForm ( "password" , e.target.value ) }
                                            type="password"
                                            autoComplete="current-password"
                                            placeholder="Inserisci la tua password"/>
                                        {
                                            loginFlag && (
                                                <Alert severity="error">Nome utente o password errata</Alert>
                                            )
                                        }
                                    </Form.Group>
                                    <Row className={ 'justify-content-center flex-column text-center' }>
                                              {/*PULSANTE ACCEDI*/}
                                        <Col>
                                            <Button className={ "w-75" } variant="contained" type="submit">
                                                ACCEDI
                                            </Button>
                                        </Col>

                                        {/*PULSANTE GOOGLE*/}
                                        <Col>
                                            <GoogleLogin
                                                className={ 'w-75 my-3' }
                                                clientId={ clientId }
                                                onSuccess={ onSuccess }
                                                onFailure={ onFailure }
                                                cookiePolicy={ "single_host_policy" }
                                            />
                                        </Col>

                                        {/*VAI ALLA SEZIONE SIGNUP*/}
                                        <Col>
                                            <Link to="/signup">
                                                <Button variant={ 'outlined' }
                                                        className={ "w-75 d-block text-center mx-auto" }>Registrati</Button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        </Col>
                    </Row>

                )
            }
        </>

    );
}

export default LoginComponent;