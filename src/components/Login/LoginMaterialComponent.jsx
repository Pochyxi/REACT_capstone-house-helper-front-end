import React from 'react';
import { Container } from "react-bootstrap";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Input } from "@mui/material";

const LoginMaterialComponent = () => {
    return (
        <Container fluid>
            <h2>FORM</h2>
            <FormControl>
                <InputLabel>Nome e cognome</InputLabel>
                <Input />
            </FormControl>
        </Container>
    );
};

export default LoginMaterialComponent;