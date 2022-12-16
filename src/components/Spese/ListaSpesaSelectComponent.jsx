import React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select  from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSelector } from "react-redux";
import { Container , Row } from "react-bootstrap";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: '10%',
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const ListaSpesaSelectComponent = ({spesaListaNome, setSpesaListaNome}) => {
    const theme = useTheme();
    const spesaList = useSelector(state => state.fetch.spesaList)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setSpesaListaNome(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <Container fluid>
            <Row className={'justify-content-center'}>
                <FormControl sx={{ m: 1, width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label">Spese</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip"
                        multiple
                        value={spesaListaNome}
                        onChange={handleChange}
                        input={<OutlinedInput id="select-multiple-chip" label="Prodotti" />}
                        renderValue={(selected) => (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value.split(' ')[1]} />
                                ))}
                            </Box>
                        )}
                        MenuProps={MenuProps}
                    >
                        {spesaList.map((name) => (
                            <MenuItem
                                key={name.id}
                                value={name.id + " " + name.nome }
                                style={getStyles(name.nome + name.id, spesaListaNome, theme)}
                            >
                                {name.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Row>

        </Container>
    );
};

export default ListaSpesaSelectComponent;