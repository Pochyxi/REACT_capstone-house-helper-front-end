// FETCH PER LA REGISTRAZIONE DI UN NUOVO UTENTE
import {dynamicPort} from "../../../redux/port";

export const signUp = async (obj) => {
    const baseEndpoint = `http://localhost:${dynamicPort}/api/users/new-raw`;

    const header = {
        "Content-type" : "application/json" ,
    };

    try {
        const response = await fetch ( baseEndpoint , {
            method : "POST" ,
            headers : header ,
            body : JSON.stringify ( obj ) ,
        } );

        if ( response.ok ) {
            return  await response.json ();
            // navigate ( "/login" );
        } else {
            return 'error'
        }
    } catch ( error ) {
        return 'error'
    }
};