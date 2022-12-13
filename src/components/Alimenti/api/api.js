// FETCH PER AGGIUNGERE UNA NUOVA LISTA DELLA SPESA
import { getProdottiList , getSpeseList } from "../../../redux/actions/actions";

export const addListaSpesa = async (obj , token) => {
    const baseEndpoint = `http://localhost:8080/api/lista/new`
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
    const baseEndpoint = `http://localhost:8080/api/prodotto/delete/${ prodottoId }`
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