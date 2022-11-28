import React , { useEffect } from 'react';
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../redux/actions/actions";
import { useNavigate } from "react-router-dom";

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
            <h2>Questa è la home</h2>
            <p
            onClick={()=> {
                dispatch(logout())
            }}>logout</p>
        </div>
    );
};

export default HomeComponent;