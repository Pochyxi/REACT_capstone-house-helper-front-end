export const SET_USER = "SET_USER";
export const LOG_OUT = "LOG_OUT";

export const SET_SPESE_LIST= "SET_SPESE_LIST";



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

                console.log ( data );
            } else {
                console.log ( "username o password errata" );
            }
        } catch ( error ) {
            console.log ( error );
        }
    };
};


