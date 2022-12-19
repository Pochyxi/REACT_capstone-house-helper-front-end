import React , { useState } from 'react';
import { IconButton , ListItem , ListItemButton , ListItemText } from "@mui/material";
import { removeProdottoFromDatabase } from "../Spese/api/api";
import { getProdottiList , getSpeseList } from "../../redux/actions/actions";
import { useDispatch , useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";

const DeleteProdottoComponent = (props) => {
    const dispatch = useDispatch ()
    const user = useSelector ( state => state.user.user )

    const [ cestinoFlag , setCestinoFlag ] = useState ( false )

    return (
        <ListItem disablePadding>
            {
                cestinoFlag && (
                    <IconButton
                        onClick={ () => {
                            removeProdottoFromDatabase ( props.prodotto.id , user.token )
                                .then ( (r) => {
                                    if ( r === 'success' ) {
                                        dispatch ( getProdottiList ( user.token , user.id ) )
                                        dispatch ( getSpeseList ( user.token , user.id ) )
                                        props.handleClickProdotto ()
                                    } else {
                                        props.handleClickError ()
                                    }
                                } )
                        } }
                        aria-label="delete">
                        <Delete/>
                    </IconButton>
                )
            }

            <ListItemButton
                onClick={() => setCestinoFlag(!cestinoFlag)}
                sx={ {color : "red"} }>
                <ListItemText className={ "text-center" }
                              primary={ props.prodotto.nome }/>
            </ListItemButton>
        </ListItem>
    );
};

export default DeleteProdottoComponent;