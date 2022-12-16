// FETCH DI RICERCA PER RANGE DI EMISSIONE

import { getBolletteList , setBolletteList } from "../../../redux/actions/actions";

export const fetchRicercaEmissioneRange = async (inizio , fine , userId , token) => {
    const baseEndpoint = `http://localhost:8080/api/bolletta/emissione-range/${ inizio }/${ fine }/userId/${ userId }`
    const header = {
        'Authorization' : 'Bearer ' + token
    }

    try {
        const response = await fetch (
            baseEndpoint ,
            {
                method : 'GET' ,
                headers : header
            }
        )

        if ( response.ok ) {
            return await response.json ();
        }
    } catch ( e ) {
        console.log ( e )
    }
}

// FETCH DI RICERCA PER RANGE DI SCADENZA
export const fetchRicercaScadenzaRange = async (inizio , fine , userId , token) => {
    const baseEndpoint = `http://localhost:8080/api/bolletta/scadenza-maggiore/${ inizio }/scadenza-minore/${ fine }/userId/${ userId }`
    const header = {
        'Authorization' : 'Bearer ' + token
    }

    try {
        const response = await fetch (
            baseEndpoint ,
            {
                method : 'GET' ,
                headers : header
            }
        )

        if ( response.ok ) {
            return  await response.json ();
        }
    } catch ( e ) {
        console.log ( e )
    }
}

//FETCH PER AGGIUNGERE UNA BOLLETTA
export const addBolletta = async (obj , key) => {
    const baseEndpoint = `http://localhost:8080/api/bolletta/new`
    const header = {
        'Content-Type' : 'application/json' ,
        'Authorization' : 'Bearer ' + key
    }

    try {
        const response = await fetch ( baseEndpoint , {
            method : 'POST' ,
            headers : header ,
            body : JSON.stringify ( obj )
        } )

        if ( response.ok ) {
            return  await response.json ();
        }

    } catch ( e ) {
        console.log ( e )
    }
}


// FETCH PER ELIMINARE UNA BOLLETTA
export const deleteBolletta = async (bollettaId , key) => {
    const baseEndpoint = `http://localhost:8080/api/bolletta/delete/${ bollettaId }`
    const header = {
        'Authorization' : 'Bearer ' + key
    }

    try {
        const response = await fetch ( baseEndpoint , {
            method : 'DELETE' ,
            headers : header ,
        } )

        if ( response.ok ) {
            return 'success'
            // handleClose()
            // dispatch ( getBolletteList ( user.token , user.id ) )
        } else {
            return 'error'
        }

    } catch ( e ) {
        return 'error'
    }
}