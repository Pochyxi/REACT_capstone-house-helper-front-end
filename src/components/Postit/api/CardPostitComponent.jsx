import React , { useState } from 'react';
import { IconButton , Paper , Typography } from "@mui/material";
import { Col , Row } from "react-bootstrap";
import BackspaceIcon from "@mui/icons-material/Backspace";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import { deletePostit , setPostitDone } from "./api";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { getPostitList } from "../../../redux/actions/actions";
import { useDispatch , useSelector } from "react-redux";
import DialogDeleteComponent from "../../FeedBackComponents/DialogDeleteComponent";

const CardPostitComponent = (props) => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch ()


    // DIALOG
    const [ dialogFlag , setDialogFlag ] = useState ( false );

    const handleClose = () => {
        setDialogFlag ( false );
    };

    const handleClickOpen = () => {
        setDialogFlag ( true );
    };

    return (
        <Col xs={ 12 } sm={10} md={6} lg={ 4 } xxl={3} className={ "mt-3" }>
            <Paper
                sx={ {
                    minHeight : 200 + "px" ,
                    backgroundColor : props.postit.stato ? "#a5e39f" : "#f1f58f" ,
                    padding : "20px" , color : props.postit.stato ? 'royalblue' : 'black' ,
                    overflow : 'hidden'
                } }
                elevation={ 20 }>
                <Row className={ "justify-content-start" }>
                    <Col xs={ 3 }>
                        <DialogDeleteComponent
                            dialogEliminazioneFlag={ dialogFlag }
                            handleClose={ handleClose }
                            fetchToDelete={ deletePostit }
                            item={ props.postit }
                            user={ user }
                            openSuccess={ props.handleClickDelete }
                            openError={ props.handleClickError }
                        />
                        <IconButton
                            onClick={ handleClickOpen }
                            color={ 'warning' }
                            sx={ {
                                position : "relative" ,
                                right : '30px' ,
                                bottom : '30px' ,
                                border : "1px solid black" ,
                                borderTop : "none" ,
                                borderLeft : "none" ,
                                height : '50px' ,
                                width : '50px' ,
                                backgroundColor : props.postit.stato ? "#f1f58f" : "#a5e39f"
                            } }
                            aria-label="delete">
                            <h4 className={ 'text-start' }><BackspaceIcon/></h4>
                        </IconButton>
                    </Col>
                </Row>
                <Row className={ "justify-content-between" }>
                    <Col xs={ 7 }>
                        <b>{ props.postit.scadenza }</b>
                    </Col>
                    <Col className={ "d-flex justify-content-end" } xs={ 5 }>
                        {
                            props.postit.stato ? (
                                <>
                                    <DoNotDisturbOnIcon
                                        sx={ {cursor : "pointer"} }
                                        onClick={ () => {
                                            setPostitDone ( props.postit , user.token ).then ( (r) => {
                                                if ( r === 'success' ) {
                                                    props.handleClickUpdate ()
                                                    dispatch ( getPostitList ( user.token , user.id ) )
                                                } else {
                                                    props.handleClickError ()
                                                }
                                            } )
                                        } } color={ "error" }/> da fare
                                </>
                            ) : (
                                <>
                                    <DoneAllIcon
                                        sx={ {cursor : "pointer"} }
                                        onClick={ () => {
                                            setPostitDone ( props.postit , user.token ).then ( (r) => {
                                                if ( r === 'success' ) {
                                                    props.handleClickUpdate ()
                                                    dispatch ( getPostitList ( user.token , user.id ) )
                                                } else {
                                                    props.handleClickError ()
                                                }
                                            } )
                                        } } color={ 'primary' }/> fatto
                                </>
                            )
                        }
                    </Col>
                </Row>
                <Row>
                    <Col className={ 'mt-5' }>
                        <Typography variant={ 'h5' } sx={ {wordWrap : 'break-word'} }
                                    className={ "text-center" }>{ props.postit.contenuto }</Typography>
                    </Col>
                </Row>

            </Paper>
        </Col>
    );
};

export default CardPostitComponent;