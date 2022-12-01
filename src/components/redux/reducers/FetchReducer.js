import { SET_POSTIT_LIST , SET_PRODOTTI_LIST , SET_SPESE_LIST } from "../actions/actions";


const initialState = {
    spesaList: [],
    productList: [],
    postitList: [],
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

        default:
            return state;
    }
};

export default fetchReducer;

