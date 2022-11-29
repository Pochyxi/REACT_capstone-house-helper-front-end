import React , { useEffect } from 'react';
import { Col , Container , Row } from "react-bootstrap";
import { useDispatch , useSelector } from "react-redux";
import { getProdottiList , getSpeseList } from "../redux/actions/actions";
import ProdottiSelectComponent from "./ProdottiSelectComponent";
import ListaSpesaSelectComponent from "./ListaSpesaSelectComponent";
import CardSpesaList from "./CardSpesaList";
import { Button } from "@mui/material";

const AlimentiComponent = () => {
    const spesaList = useSelector ( state => state.fetch.spesaList )
    const prodottiList = useSelector ( state => state.fetch.productList )
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()

    const [ productName , setProductName ] = React.useState ( [] );
    const [ spesaListaNome , setSpesaListaNome ] = React.useState ( [] );


    useEffect ( () => {
        dispatch ( getSpeseList ( user.token , user.id ) )
        dispatch ( getProdottiList ( user.token ) )
    } , [] )

    console.log ( spesaList )
    console.log ( prodottiList )
    console.log ( spesaListaNome )
    return (
        <Container fluid>
            <Row className={ "justify-content-center" }>
                <Col className={ "text-center" } xs={ 12 }>
                    <Col>
                        <h2>Seleziona la lista della spesa</h2>
                    </Col>
                    <ListaSpesaSelectComponent spesaListaNome={ spesaListaNome }
                                               setSpesaListaNome={ setSpesaListaNome }/>
                    <Col className={"mt-2"}>
                        <h3>Oppure aggiungine una nuova</h3>
                        <Button variant="contained" color="success">
                            Aggiungi Lista
                        </Button>
                    </Col>
                    <Row className={"justify-content-center"}>
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
                                    case 3:
                                        size = 4
                                        break
                                    default:
                                        size = 12
                                }
                                return (
                                    <Col xs={size}>
                                        <CardSpesaList  list={ list } spesaList={ spesaList } index={ i }/>
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