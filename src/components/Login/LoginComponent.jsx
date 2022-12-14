import React , { useEffect , useState } from "react";
import { Form , Row , Col , Container } from "react-bootstrap";
import { Link , useNavigate } from "react-router-dom"
import { useDispatch , useSelector } from "react-redux";
import { logIn , setLoginFlagTrue } from "../../redux/actions/actions";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script'
import Card from "@mui/material/Card";
import { Alert , Backdrop , Button , CircularProgress } from "@mui/material";
import HouseHelper from '../../img/HHlogo.png'
import { setLogin_LOADFlagTrue } from "../../redux/actions/utilsActions";
import BackDropComponent from "../FeedBackComponents/backDropComponent";


function LoginComponent() {
    const clientId = process.env.REACT_APP_CLIENT_ID;

    const user = useSelector ( state => state.user.user )

    const loginFlag = useSelector ( state => state.user.loginFlag )

    const loginLoad = useSelector ( state => state.util.login_LOAD_Flag )

    const dispatch = useDispatch ()// REDUX

    const navigate = useNavigate ()

    useEffect ( () => {
        if ( user.token ) {
            navigate ( "/" );
        }

    } , [ user.token ] );

    useEffect ( () => {

        const start = () => {
            gapi.auth2.init ( {
                clientId : clientId ,
            } )
        }
        gapi.load ( "client:auth2" , start )
    } , [] );

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
            } )
        } catch ( e ) {
            console.log ( "ok" )
        }


    }

    const onFailure = () => {
        console.log ( "Something went wrong" )
    }


    const [ formObj , setFormObj ] = useState ( { // oggetto per la compilazione del form
        username : '' ,
        password : ''
    } )

    const handleForm = (key , value) => {// setta l'oggetto del form
        setFormObj ( form => {
            return {
                ...form ,
                [key] : value
            }

        } )
    }

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
        <>
            {
                loginLoad ? (
                    <BackDropComponent load={ loginLoad }/>
                ) : (
                    <Row className={ 'mt-5 justify-content-center h-100' }>

                        <Col xs={ 12 } md={ 8 } lg={ 6 }>
                            <Row className={ 'align-items-center justify-content-center' }>
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
                                        <Col>
                                            <Button className={ "w-75" } variant="contained" type="submit">
                                                ACCEDI
                                            </Button>
                                        </Col>
                                        <Col>
                                            <GoogleLogin
                                                className={ 'w-75 my-3' }
                                                clientId={ clientId }
                                                onSuccess={ onSuccess }
                                                onFailure={ onFailure }
                                                cookiePolicy={ "single_host_policy" }
                                            />
                                        </Col>
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