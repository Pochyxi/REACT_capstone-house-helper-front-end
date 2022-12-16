import React from 'react';
import { Backdrop , CircularProgress } from "@mui/material";

const BackDropComponent = ({load}) => {
    return (
        <Backdrop open={ load }>
            <CircularProgress color="primary"/>
        </Backdrop>
    );
};

export default BackDropComponent;