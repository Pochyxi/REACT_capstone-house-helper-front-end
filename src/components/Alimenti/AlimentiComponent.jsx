import React , { useEffect , useState } from 'react';
import { Col , Container , Form , Row } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { getProdottiList , getSpeseList } from "../redux/actions/actions";
import ProdottiSelectComponent from "./ProdottiSelectComponent";
import ListaSpesaSelectComponent from "./ListaSpesaSelectComponent";
import CardSpesaList from "./CardSpesaList";
import { Button , TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";

const AlimentiComponent = () => {
    const spesaList = useSelector ( state => state.fetch.spesaList )
    const prodottiList = useSelector ( state => state.fetch.productList )
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()
    const [ formFlag , setFormFlag ] = useState (false);
    const [ formObj , setFormObj ] = useState ( {
        nome : "" ,
        userId : user.id
    } );

    const handleForm = (key , value) => {
        setFormObj ( {
            ...formObj ,
            [key] : value
        } )
    }

    const [ spesaListaNome , setSpesaListaNome ] = React.useState ( [] );


    useEffect ( () => {
        dispatch ( getSpeseList ( user.token , user.id ) )
        dispatch ( getProdottiList ( user.token ) )
    } , [] )

    const addListaSpesa = async (obj, token) => {
        const baseEndpoint = `http://localhost:8080/api/lista/new`
        const header = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        try {
            const response = await fetch ( baseEndpoint, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(obj)
            })

            if ( response.ok ) {
                const data = await response.json();
                console.log(data)
                setFormFlag(false)
                dispatch( getSpeseList(user.token, user.id))
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container fluid>
            <Row className={ "justify-content-center" }>
                <Col className={ "text-center" } xs={ 3 }>
                    <Row>
                        <Col xs={ 12 }>
                            <h2>Seleziona la lista della spesa</h2>
                            <ListaSpesaSelectComponent spesaListaNome={ spesaListaNome }
                                                       setSpesaListaNome={ setSpesaListaNome }/>
                        </Col>

                        <Col className={ "mt-2" }>
                            <h3>Oppure aggiungine una nuova</h3>
                            {
                                !formFlag && (
                                    <Button onClick={() => {
                                        setFormFlag(true)
                                    }} variant="contained" color="success">
                                        Aggiungi Lista
                                    </Button>
                                )
                            }

                        </Col>
                        {
                            formFlag && (
                                <Col className={ "mt-3" } xs={ 12 }>
                                    <Form onSubmit={event => {
                                        event.preventDefault()
                                        addListaSpesa(formObj, user.token)
                                    }}>
                                        <FormControl>
                                            <TextField
                                                required
                                                id="outlined-required"
                                                label="Nome lista"
                                                onChange={ event => handleForm ( "nome" , event.target.value ) }
                                            />
                                        </FormControl>
                                        <Col>
                                            <Button type={"submit"} className={"mt-2"} variant="outlined" color="success">
                                                Aggiungi
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button onClick={() => {
                                                setFormFlag(false)
                                            }} className={"mt-2"} variant="outlined" color="error">
                                                Annulla
                                            </Button>
                                        </Col>

                                    </Form>

                                </Col>
                            )
                        }

                    </Row>
                </Col>
                <Col xs={ 9 }>
                    <Row className={ "justify-content-center" }>
                        {
                            spesaListaNome.map ( (list , i) => {
                                let size = 12
                                switch (spesaListaNome.length) {
                                    case 1:
                                        size = 12
                                        break
                                    case 2:
                                        size = 6
                                        break
                                    default:
                                        size = 12
                                }
                                return (
                                    <Col key={ i } xs={ size }>
                                        <CardSpesaList setSpesaListaNome={setSpesaListaNome} list={ list } spesaList={ spesaList } index={ i }/>
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

export default AlimentiComponent;