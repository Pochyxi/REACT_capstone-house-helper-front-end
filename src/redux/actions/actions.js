import {
    setBollette_LOADFlagFalse ,
    setBollette_LOADFlagTrue ,
    setLogin_LOADFlagFalse ,
    setLogin_LOADFlagTrue , setPostit_LOADFlagFalse , setPostit_LOADFlagTrue ,
    setSpese_LOADFlagFalse ,
    setSpese_LOADFlagTrue
} from "./utilsActions";

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
            dispatch(setLogin_LOADFlagTrue())
            const response = await fetch ( baseEndpoint , {
                method : "POST" ,
                headers : header ,
                body : JSON.stringify ( obj ) ,
            } );

            if ( response.ok ) {
                const data = await response.json ();
                setTimeout(() => {
                    dispatch ( setUser ( data ) );
                    dispatch(setLoginFlagFalse())
                    dispatch(setLogin_LOADFlagFalse())
                }, 1000)

            } else {
                setTimeout(() => {
                    dispatch(setLoginFlagTrue())
                    dispatch(setLogin_LOADFlagFalse())
                })

            }
        } catch ( error ) {
            setTimeout(() => {
                dispatch(setLogin_LOADFlagFalse())
                console.log ( error );
            })
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
            dispatch(setSpese_LOADFlagTrue())
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header
            } );

            if ( response.ok ) {
                const data = await response.json ();

                setTimeout(() => {
                    dispatch ( setSpeseList ( data ) );

                    dispatch(setSpese_LOADFlagFalse())
                },1000)

            } else {
                console.log ( "Error" );
                setTimeout(() => {
                    dispatch(setSpese_LOADFlagFalse())
                },1000)
            }
        } catch ( error ) {
            console.log ( error );
            setTimeout(() => {
                dispatch(setSpese_LOADFlagFalse())
            },1000)
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
            dispatch(setPostit_LOADFlagTrue())
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header
            } );

            if ( response.ok ) {
                const data = await response.json ();

                setTimeout(() => {
                    dispatch ( setPostitList( data ) );
                    dispatch( setPostit_LOADFlagFalse())
                },1000)

            } else {
                console.log ( "Error" );
                setTimeout(() => {
                    dispatch( setPostit_LOADFlagFalse())
                },1000)
            }
        } catch ( error ) {
            console.log ( error );
            setTimeout(() => {
                dispatch( setPostit_LOADFlagFalse())
            },1000)
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
            dispatch(setBollette_LOADFlagTrue())
            const response = await fetch ( baseEndpoint , {
                method : "GET" ,
                headers : header
            } );

            if ( response.ok ) {
                const data = await response.json ();

                setTimeout(() => {
                    dispatch ( setBolletteList ( data ) );
                    dispatch(setBollette_LOADFlagFalse())
                },1000)

            } else {
                console.log ( "Error" );
                setTimeout(() => {
                    dispatch(setBollette_LOADFlagFalse())
                },1000)
            }
        } catch ( error ) {
            console.log ( error );
            setTimeout(() => {
                dispatch(setBollette_LOADFlagFalse())
            },1000)
        }
    };
};


