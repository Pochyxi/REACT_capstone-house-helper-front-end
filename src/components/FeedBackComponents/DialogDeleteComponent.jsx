import React from 'react';
import {
    Button ,
    Dialog ,
    DialogActions ,
    DialogContent ,
    DialogContentText ,
    DialogTitle ,
    Slide
} from "@mui/material";
import { useDispatch , useSelector } from "react-redux";
import { getPostitList } from "../../redux/actions/actions";

const Transition = React.forwardRef ( function Transition(props , ref) {
    return <Slide direction="up" ref={ ref } { ...props } />;
} );

const DialogDeleteComponent = (props) => {
    const user = useSelector ( state => state.user.user )

    const dispatch = useDispatch ()


    return (
        <Dialog
            open={ props.dialogEliminazioneFlag }
            onClose={props.handleClose}
            maxWidth={ 'xs' }
            TransitionComponent={ Transition }
            keepMounted
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{ "Sei sicuro di voler eliminare l'elemento?" }</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    L'azione sarà irreversibile.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    variant={ "outlined" }
                    color={ "error" }
                    onClick={props.handleClose}
                >Anulla</Button>
                <Button
                    variant={ "outlined" }
                    color={ "primary" }
                    onClick={ () => {
                        props.fetchToDelete(props.item.id, props.user.token).then( (r) => {
                                if (r === 'success') {
                                    props.openSuccess()
                                    props.handleClose()
                                } else {
                                    props.openError()
                                    props.handleClose()
                                }
                        })
                    } }
                >Elimina</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogDeleteComponent;