import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useSelector } from "react-redux";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
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

const ProdottiSelectComponent = ({productName, setProductName}) => {

    const theme = useTheme();

    const spesaList = useSelector(state => state.fetch.spesaList)
    const productList = useSelector(state => state.fetch.productList)

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        setProductName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <>
            <FormControl sx={{width: "100%"}}>
                <InputLabel id="demo-multiple-chip-label">Prodotti</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={productName}
                    onChange={handleChange}
                    input={<OutlinedInput id="select-multiple-chip" label="Prodotti" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {productList.map((name) => (
                        <MenuItem
                            key={name.id}
                            value={name.id + " " + name.nome + " " + name.prezzo + "€" }
                            style={getStyles(name.nome + name.id, productName, theme)}
                        >
                            {name.nome + " " + name.prezzo + "€"}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
};

export default ProdottiSelectComponent;