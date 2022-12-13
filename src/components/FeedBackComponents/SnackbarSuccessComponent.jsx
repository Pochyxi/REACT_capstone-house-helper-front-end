import React from 'react';
import { Alert , Snackbar } from "@mui/material";

const SnackbarSuccessComponent = ({openFlag, closeFunction, message}) => {
    return (
        <Snackbar
            style={{marginTop: '60px'}}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={ openFlag }
            autoHideDuration={ 4000 }
            onClose={closeFunction}
        >
            <Alert severity="success">{ message }</Alert>
        </Snackbar>
    );
};

export default SnackbarSuccessComponent;