export const SET_USER = "SET_USER";
export const LOG_OUT = "LOG_OUT";

export const SET_SPESE_LIST= "SET_SPESE_LIST";
export const SET_PRODOTTI_LIST= "SET_PRODOTTI_LIST";
export const SET_POSTIT_LIST= "SET_POSTIT_LIST";
export const SET_BOLLETTE_LIST= "SET_BOLLETTE_LIST";
export const SET_LOGIN_FLAG_TRUE = "SET_LOGIN_FLAG_TRUE";
export const SET_LOGIN_FLAG_FALSE = "SET_LOGIN_FLAG_FALSE";

export const setLoginFlagTrue = () => ({
    type : SET_LOGIN_FLAG_TRUE,
    payload: true,
})

export const setLoginFlagFalse = () => ({
    type : SET_LOGIN_FLAG_FALSE,
    payload: false,
})

export const setUser = (user) => ({
    type : SET_USER ,
    payload : user
});

export const logout = () => ({
    type : LOG_OUT
});

export const setSpeseList = (speseList) => ({
    type: SET_SPESE_LIST,
    payload : speseList
})

export const setProdottiList = (prodottiList) => ({
    type: SET_PRODOTTI_LIST,
    payload : prodottiList
})

export const setPostitList = (postitList) => ({
    type: SET_POSTIT_LIST,
    payload: postitList
})

export const setBolletteList = (bolletteList) => ({
    type: SET_BOLLETTE_LIST,
    payload : bolletteList
})

export const logIn = (obj) => {
    const baseEndpoint = "http://localhost:8080/auth/login";

    const header = {
        "Content-type" : "application/json" ,
    };

    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "POST" ,
                headers : header ,
                body : JSON.stringify ( obj ) ,
            } );

            if ( response.ok ) {
                const data = await response.json ();

                dispatch ( setUser ( data ) );

                dispatch(setLoginFlagFalse())
            } else {
                dispatch(setLoginFlagTrue())
                console.log ( "username o password errata" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};

export const getSpeseList = (key, userId) => {
    const baseEndpoint = `http://localhost:8080/api/lista/userId/${userId}`;

    const header = {
        "Content-type" : "application/json" ,
        "Authorization" : `Bearer ${key}`
    };

    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header
            } );

            if ( response.ok ) {
                const data = await response.json ();

                dispatch ( setSpeseList ( data ) );

                console.log ( data );
            } else {
                console.log ( "Error" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};

export const getProdottiList = (key, userId) => {
    const baseEndpoint = `http://localhost:8080/api/prodotto/user/${userId}`;

    const header = {
        "Content-type" : "application/json" ,
        "Authorization" : `Bearer ${key}`
    };

    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header
            } );

            if ( response.ok ) {
                const data = await response.json ();

                dispatch ( setProdottiList ( data ) );

                console.log ( data );
            } else {
                console.log ( "Error" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};

export const getPostitList = (key, userId) => {
    const baseEndpoint = `http://localhost:8080/api/postit/userId/${userId}`;

    const header = {
        "Content-type" : "application/json" ,
        "Authorization" : `Bearer ${key}`
    };

    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header
            } );

            if ( response.ok ) {
                const data = await response.json ();

                dispatch ( setPostitList( data ) );

                console.log ( data );
            } else {
                console.log ( "Error" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};

export const getBolletteList = (key, userId) => {
    const baseEndpoint = `http://localhost:8080/api/bolletta/userId/${userId}`;

    const header = {
        "Authorization" : `Bearer ${key}`
    };

    return async (dispatch , getState) => {
        try {
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header
            } );

            if ( response.ok ) {
                const data = await response.json ();

                dispatch ( setBolletteList ( data ) );

                console.log ( data );
            } else {
                console.log ( "Error" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};


