import React , { useEffect , useState } from 'react';
import { Col , Container , Form , Row } from "react-bootstrap";
import Card from "@mui/material/Card";
import { useDispatch , useSelector } from "react-redux";
import { getPostitList } from "../../redux/actions/actions";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import {
    Button ,
    FormControlLabel , FormGroup ,
    IconButton ,
    MenuItem ,
    Paper ,
    Switch ,
    TextField ,
    Typography
} from "@mui/material";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import FormControl from "@mui/material/FormControl";
import { Add , Delete } from "@mui/icons-material";
import CancelIcon from '@mui/icons-material/Cancel';
import BackspaceIcon from '@mui/icons-material/Backspace';


const PostitComponent = () => {
    const user = useSelector ( state => state.user.user )

    const [ formControlLabelValue , setFormControlLabelValue ] = useState (false);
    const postitList = useSelector ( state => state.fetch.postitList )
    const dispatch = useDispatch ()
    const [ formPostitObj , setFormPostitObj ] = useState ( {
        contenuto : "" ,
        scadenza : "" ,
        userId : user.id ,
    } )
    const [ formPostitFlag , setFormPostitFlag ] = useState ( false );

    const handleForm = (key , value) => {
        setFormPostitObj ( {
            ...formPostitObj ,
            [key] : value
        } )
    }

    const postitListFilter = (arr) => {
        console.log ("questo è arr")
        console.log(arr)
        let arrN = []
        if (formControlLabelValue) {
            arrN = arr.filter( el => el.stato === true)
        } else {
            arrN = arr.filter( el => el.stato === false)
        }
        console.log ("questo e arrN prima del return")
        console.log(arrN)
        return arrN
    }

    const handleChange = (event) => {
        setFormControlLabelValue(event.target.checked);
    };

    useEffect ( () => {
        dispatch ( getPostitList ( user.token , user.id ) )
        console.log ( postitList )
    } , [] );

    const addPostit = async (obj , key) => {
        const baseEndpoint = `http://localhost:8080/api/postit/new`
        const header = {
            'Content-Type' : 'application/json' ,
            'Authorization' : 'Bearer ' + key
        }

        try {
            const response = await fetch ( baseEndpoint , {
                method : 'POST' ,
                headers : header ,
                body : JSON.stringify ( obj )
            } )

            if ( response.ok ) {
                const data = await response.json ();
                console.log ( data )
                dispatch ( getPostitList ( user.token , user.id ) )
            }

        } catch ( e ) {
            console.log ( e )
        }
    }

    const setPostitDone = async (postit , key) => {
        const baseEndpoint = `http://localhost:8080/api/postit/update/${ postit.id }`
        const header = {
            'Content-Type' : 'application/json' ,
            'Authorization' : 'Bearer ' + key
        }

        try {
            const response = await fetch ( baseEndpoint , {
                method : 'PUT' ,
                headers : header ,
                body : JSON.stringify ( {
                    stato : !postit.stato
                } )
            } )

            if ( response.ok ) {
                const data = await response.json ();
                console.log ( data )
                dispatch ( getPostitList ( user.token , user.id ) )
            }

        } catch ( e ) {
            console.log ( e )
        }
    }

    const deletePostit = async (postitId, key) => {
        const baseEndpoint = `http://localhost:8080/api/postit/delete/${postitId}`
        const header = {
            'Authorization' : 'Bearer ' + key
        }

        try {
            const response = await fetch ( baseEndpoint , {
                method : 'DELETE' ,
                headers : header ,
            } )

            if ( response.ok ) {
                dispatch ( getPostitList ( user.token , user.id ) )
            }

        } catch ( e ) {
            console.log ( e )
        }
    }

    return (
        <Container fluid>
            <Row className={ "justify-content-center" }>
                <Col
                    style={ {
                        backgroundColor : "#0d6efd" ,
                        borderRight : "2px solid royalblue" ,
                        boxShadow: "1px 1px 2px gray",
                        minHeight : 100 + "vh" ,
                        position : "fixed" ,
                        left : 0
                    } }
                    className={ "text-center" }
                    xs={ 3 }>
                    <Row className={ "p-2" }>
                        <Card
                            sx={ {minWidth : "100%" , margin : "20px auto"} }
                            className={ "p-2" }>
                            <h5>Aggiungi nuovo Postit</h5>
                            {
                                !formPostitFlag ? (
                                    <IconButton onClick={ () => setFormPostitFlag ( true ) } aria-label="add">
                                        <Add/>
                                    </IconButton>
                                ) : (
                                    <IconButton onClick={ () => setFormPostitFlag ( false ) } aria-label="delete">
                                        <CancelIcon/>
                                    </IconButton>
                                )
                            }

                            <Row>
                                {
                                    formPostitFlag && (
                                        <Form onSubmit={ (e) => {
                                            e.preventDefault ()
                                            addPostit ( formPostitObj , user.token )
                                            setFormPostitObj ( {
                                                contenuto : "" ,
                                                scadenza : "" ,
                                                userId : user.id ,
                                            } )
                                        } }>
                                            <Row className={ "p-2" }>
                                                <h6>Contenuto</h6>
                                                <FormControl>
                                                    <TextField
                                                        required
                                                        value={ formPostitObj.contenuto }
                                                        onChange={ event => handleForm ( "contenuto" , event.target.value ) }
                                                        className={ "mt-2" }
                                                        id="outlined-basic"
                                                        label="Inserisci il contenuto..."
                                                        variant="outlined"/>
                                                </FormControl>
                                            </Row>
                                            <Row className={ "p-2" }>
                                                <h6>Data di scadenza</h6>
                                                <FormControl>
                                                    <TextField
                                                        required
                                                        value={ formPostitObj.scadenza }
                                                        onChange={ event => handleForm ( "scadenza" , event.target.value ) }
                                                        className={ "mt-2" }
                                                        type={ 'date' }
                                                        id="outlined-basic"
                                                        variant="outlined"/>
                                                </FormControl>
                                            </Row>
                                            <Button type={ 'submit' } variant="contained" sx={ {my : 2} }>
                                                Aggiungi
                                            </Button>
                                        </Form>
                                    )
                                }

                            </Row>
                        </Card>
                        <Card sx={ {
                            maxHeight : "30vh" ,
                            overflow : "scroll" ,
                            '&::-webkit-scrollbar' : {
                                display : "none"
                            } ,
                            padding : 1 + "em"
                        } }>

                            <FormGroup>
                                <Row className={'d-flex justify-content-center align-items-center'}>
                                    <Col xs={8}>
                                        Mostra Postit completati
                                    </Col>
                                    <Col xs={4}>
                                        <Switch
                                            checked={formControlLabelValue}
                                            onChange={handleChange}
                                            control={ <Switch defaultChecked/> }
                                        />
                                    </Col>
                                </Row>


                            </FormGroup>
                        </Card>
                    </Row>
                </Col>
                <Col xs={ 3 }>

                </Col>
                <Col xs={ 9 }>
                    <Row className={ "justify-content-center" }>

                        {
                            postitListFilter(postitList).map ( (postit , i) => {
                                return (
                                    <Col xs={ 6 } key={ i } className={ "mt-3" }>
                                        <Paper
                                            sx={ {
                                                minHeight : 200 + "px" ,
                                                backgroundColor : postit.stato ? "#a5e39f" : "#f1f58f" ,
                                                padding : "20px" , color : postit.stato ? 'royalblue' : 'black',
                                                overflow: 'hidden'
                                            } }
                                            elevation={ 20 }>
                                            <Row className={ "justify-content-start" }>
                                                <Col xs={ 3 }>
                                                    <IconButton
                                                        onClick={() => {
                                                            deletePostit(postit.id, user.token)
                                                        }}
                                                        color={'warning'}
                                                        sx={ {
                                                            position : "relative" ,
                                                            right: '30px',
                                                            bottom: '30px',
                                                            border: "1px solid black",
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            height: '50px',
                                                            width: '50px',
                                                            backgroundColor: postit.stato? "#f1f58f" : "#a5e39f"
                                                        } }
                                                        aria-label="delete">
                                                        <h4 className={ 'text-start' }><BackspaceIcon/></h4>
                                                    </IconButton>
                                                </Col>
                                            </Row>
                                            <Row className={ "justify-content-between" }>
                                                <Col xs={ 7 }>
                                                    <b>{ postit.scadenza }</b>
                                                </Col>
                                                {
                                                    postit.stato ? (
                                                        <Col className={ "d-flex justify-content-end" } xs={ 5 }>
                                                            <DoNotDisturbOnIcon sx={ {cursor : "pointer"} }
                                                                                onClick={ () => {
                                                                                    setPostitDone ( postit , user.token )
                                                                                } } color={ "error" }/> da fare
                                                        </Col>
                                                    ) : (
                                                        <Col className={ "d-flex justify-content-end" } xs={ 5 }>
                                                            <DoneAllIcon sx={ {cursor : "pointer"} } onClick={ () => {
                                                                setPostitDone ( postit , user.token )
                                                            } } color={ 'primary' }/> fatto
                                                        </Col>

                                                    )
                                                }
                                            </Row>
                                            <Row>
                                                <Col className={ 'mt-5' }>
                                                    <Typography variant={'h5'}  sx={{wordWrap: 'break-word'}} className={ "text-center" }>{ postit.contenuto }</Typography>
                                                </Col>
                                            </Row>

                                        </Paper>
                                    </Col>

                                )
                            } )
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default PostitComponent;