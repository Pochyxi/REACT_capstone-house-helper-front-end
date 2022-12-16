import {
    SET_BOLLETTE_LOAD_FLAG_FALSE ,
    SET_BOLLETTE_LOAD_FLAG_TRUE ,
    SET_LOGIN_LOAD_FLAG_FALSE ,
    SET_LOGIN_LOAD_FLAG_TRUE ,
    SET_POSTIT_LOAD_FLAG_FALSE ,
    SET_POSTIT_LOAD_FLAG_TRUE ,
    SET_SPESE_LOAD_FLAG_FALSE ,
    SET_SPESE_LOAD_FLAG_TRUE
} from "../actions/utilsActions";

const initialState = {
    login_LOAD_Flag : false ,
    bollette_Load_Flag : false ,
    spese_Load_Flag : false ,
    postit_Load_Flag : false
};

const utilReducer = (state = initialState , action) => {
    switch (action.type) {

        // SETTARE LA FLAG DEL LOGIN //
        case SET_LOGIN_LOAD_FLAG_TRUE:
            return {
                ...state ,
                login_LOAD_Flag : action.payload
            }

        case SET_LOGIN_LOAD_FLAG_FALSE:
            return {
                ...state ,
                login_LOAD_Flag : action.payload
            }
        //
        // SETTARE LA FLAG DELLE BOLLETTE /
        case SET_BOLLETTE_LOAD_FLAG_TRUE:
            return {
                ...state ,
                bollette_Load_Flag : action.payload
            }

        case SET_BOLLETTE_LOAD_FLAG_FALSE:
            return {
                ...state ,
                bollette_Load_Flag : action.payload
            }
        //

        // SETTARE LA FLAG DEI POSTIT //
        case SET_POSTIT_LOAD_FLAG_TRUE:
            return {
                ...state ,
                postit_Load_Flag : action.payload
            }
        case SET_POSTIT_LOAD_FLAG_FALSE:
            return {
                ...state ,
                postit_Load_Flag : action.payload
            }
        //

        // SETTARE LA FLAG DELLE SPESE //
        case SET_SPESE_LOAD_FLAG_TRUE:
            return {
                ...state ,
                spese_Load_Flag : action.payload
            }
        case SET_SPESE_LOAD_FLAG_FALSE:
            return {
                ...state ,
                spese_Load_Flag : action.payload
            }
        //

        default:
            return state;
    }
};

export default utilReducer;