import React , { useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import {
    Add , Cloud , ContentCopy , ContentCut , ContentPaste ,
    Delete ,
    Edit , ExpandMore ,
    Favorite ,
    FavoriteBorder ,
    FormatAlignCenter , FormatAlignJustify ,
    FormatAlignLeft , FormatAlignRight , LocationOn , Menu , Print , Restore , Save , Share
} from "@mui/icons-material";
import {
    Accordion ,
    AccordionDetails ,
    AccordionSummary ,
    Alert ,
    AppBar ,
    Autocomplete , Avatar ,
    BottomNavigation ,
    BottomNavigationAction ,
    Box ,
    Breadcrumbs ,
    Button ,
    ButtonGroup ,
    Card ,
    CardActions ,
    CardContent ,
    Checkbox ,
    CircularProgress ,
    Dialog ,
    DialogActions ,
    DialogContent ,
    DialogContentText ,
    DialogTitle ,
    Divider ,
    Drawer ,
    Fab ,
    FormControl ,
    FormControlLabel ,
    FormGroup ,
    FormLabel ,
    Grid ,
    IconButton ,
    ImageList ,
    ImageListItem ,
    InputLabel , LinearProgress ,
    Link ,
    List ,
    ListItem ,
    ListItemIcon ,
    ListItemText ,
    MenuItem ,
    MenuList ,
    Pagination ,
    Paper ,
    Radio ,
    RadioGroup ,
    Rating ,
    Select , Skeleton ,
    Slider , Snackbar ,
    SpeedDial ,
    SpeedDialAction ,
    SpeedDialIcon ,
    Stack ,
    Step ,
    StepLabel ,
    Stepper ,
    Switch ,
    Tab ,
    Tabs ,
    TextField ,
    ToggleButton ,
    ToggleButtonGroup ,
    Toolbar ,
    Typography
} from "@mui/material";

const HomeComponent = () => {
    const user = useSelector ( state => state.user.user )
    const dispatch = useDispatch()
    const navigate = useNavigate ()


    useEffect ( () => {
        if ( user.token === undefined ) {
            navigate ( "/login" )
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    } , [ user.token ] );

    return (
        <div>

        </div>
    );
};

export default HomeComponent;