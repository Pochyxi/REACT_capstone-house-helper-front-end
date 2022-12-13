// FETCH PER AGGIUNGERE UN NUOVO POSTIT
import { getPostitList } from "../../../redux/actions/actions";

export const addPostit = async (obj , key) => {
    const baseEndpoint = `http://localhost:8080/api/postit/new`
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
            return 'success'
        } else {
            return 'error'
        }

    } catch ( e ) {
        return 'error'
    }
}

// FETCH PER AGGIORNARE LO STATO DI UN POSTIT A COMPLETATO
export const setPostitDone = async (postit , key) => {
    const baseEndpoint = `http://localhost:8080/api/postit/update/${ postit.id }`
    const header = {
        'Content-Type' : 'application/json' ,
        'Authorization' : 'Bearer ' + key
    }

    try {
        const response = await fetch ( baseEndpoint , {
            method : 'PUT' ,
            headers : header ,
            body : JSON.stringify ( {
                stato : !postit.stato
            } )
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

// FETCH PER ELIMINARE UN POSTIT
export const deletePostit = async (postitId , key) => {
    const baseEndpoint = `http://localhost:8080/api/postit/delete/${ postitId }`
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
        } else {
            return 'error'
        }

    } catch ( e ) {
        return 'error'
    }
}
