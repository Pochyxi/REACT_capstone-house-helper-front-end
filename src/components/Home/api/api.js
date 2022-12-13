
// RITORNA TUTTE LE BOLLETTE DI UN UTENTE LA CUI SCADENZA SI TROVA NEL RANGE DI DATE //
export const fetchBollettaScadenzaRange = async (inizio , fine , userId , token) => {
    const baseEndpoint = `http://localhost:8080/api/postit/scadenza-maggiore/${ inizio }/scadenza-minore/${ fine }/userId/${ userId }`
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
//**************************************** fine ************************************//