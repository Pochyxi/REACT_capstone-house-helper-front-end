// FETCH PER AGGIUNGERE UNA NUOVA LISTA DELLA SPESA
import { getProdottiList , getSpeseList } from "../../../redux/actions/actions";
import {dynamicPort} from "../../../redux/port";

export const addListaSpesa = async (obj , token) => {
    const baseEndpoint = `http://localhost:${dynamicPort}/api/lista/new`
    const header = {
        'Content-Type' : 'application/json' ,
        'Authorization' : 'Bearer ' + token
    }

    try {
        const response = await fetch ( baseEndpoint , {
            method : 'POST' ,
            headers : header ,
            body : JSON.stringify ( obj )
        } )

        if ( response.ok ) {
            return 'success'
        } else {
            return 'error'
        }
    } catch ( e ) {
        return 'error'
    }
}

// FETCH PER L'ELIMINAZIONE DI UN PRODOTTO
export const removeProdottoFromDatabase = async (prodottoId , token) => {
    const baseEndpoint = `http://localhost:${dynamicPort}/api/prodotto/delete/${ prodottoId }`
    const header = {
        'Authorization' : 'Bearer ' + token
    }
    try {
        const response = await fetch ( baseEndpoint , {
            method : 'DELETE' ,
            headers : header ,
        } )

        if ( response.ok ) {
            return 'success'
        } else {
            return 'error'
        }
    } catch ( e ) {
        return 'error'
    }
}

// FETCH PER L'ELIMINAZIONE DI UNA LISTA
export const removeProductOnList = async (listaId , prodottoId , token) => {
    const baseEndpoint = `http://localhost:${dynamicPort}/api/lista/delete/lista/${ listaId }/prodotto/${ prodottoId }`;

    const header = {
        "Authorization" : `Bearer ${ token }`
    };

    try {
        const response = await fetch ( baseEndpoint , {
            method : 'PUT' ,
            headers : header ,
        } );

        if ( response.ok ) {
            return 'success'

        } else {
            return 'error'
        }
    } catch ( error ) {
        return 'error'
    }
}

// FETCH PER AGGIUNGERE UN PRODOTTO ALLA LISTA
export const addProductOnList = async (listaId , prodottoId , token) => {
    const baseEndpoint = `http://localhost:${dynamicPort}/api/lista/add/lista/${ listaId }/prodotto/${ prodottoId }`;

    try {
        const response = await fetch ( baseEndpoint , {
            method : 'PUT' ,
            headers : {
                "Authorization" : `Bearer ${ token }`
            } ,
        } );

        if ( response.ok ) {
            return 'success'

        } else {
            return 'error'
        }
    } catch ( error ) {
        return 'error'
    }
}

// FETCH PER AGGIUNGERE UN NUOVO PRODOTTO NEL DATABASE
export const addProduct = async (obj , token) => {
    const baseEndpoint = `http://localhost:${dynamicPort}/api/prodotto/new`
    const header = {
        'Content-Type' : 'application/json' ,
        'Authorization' : 'Bearer ' + token
    }

    try {
        const response = await fetch ( baseEndpoint , {
            method : 'POST' ,
            headers : header ,
            body : JSON.stringify ( obj )
        } )

        if ( response.ok ) {
            return await response.json ();

        } else {
            return 'error'
        }
    } catch ( e ) {
        return 'error'
    }
}

// FETCH PER RIMUOVERE UNA LISTA DAL DATABASE
export const removeLista = async (listaId , token) => {
    const baseEndpoint = `http://localhost:${dynamicPort}/api/lista/delete/${ listaId }`;

    const header = {
        "Authorization" : `Bearer ${ token }`
    };

    try {
        const response = await fetch ( baseEndpoint , {
            method : "DELETE" ,
            headers : header ,
        } );

        if ( response.ok ) {
            return 'success'

            // setSpesaListaNome ( [] )
            //
            // dispatch ( getSpeseList ( user.token , user.id ) );

        } else {
            return 'error'
        }
    } catch ( error ) {
        return 'error'
    }
}