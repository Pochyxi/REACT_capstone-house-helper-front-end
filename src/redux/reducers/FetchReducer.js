import { SET_BOLLETTE_LIST , SET_POSTIT_LIST , SET_PRODOTTI_LIST , SET_SPESE_LIST } from "../actions/actions";


const initialState = {
    spesaList: [],
    productList: [],
    postitList: [],
    bollettaList: []
};

const fetchReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SPESE_LIST:
            return {
                ...state,
                spesaList: action.payload
            }

        case SET_PRODOTTI_LIST:
            return {
                ...state,
                productList : action.payload
            }
        case SET_POSTIT_LIST:
            return {
                ...state,
                postitList : action.payload
            }

        case SET_BOLLETTE_LIST:
            return {
                ...state,
                bollettaList : action.payload
            }

        default:
            return state;
    }
};

export default fetchReducer;

