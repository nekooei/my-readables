/**
 * Created by milad on 12/6/17.
 */
import { FETCH_CATEGORIES } from "../actions/category";


const initialState = [];

export default (state = initialState, action) => {

    switch (action.type) {
        case FETCH_CATEGORIES: {
            return [...action.categories]
        }
        default: {
            return state;
        }
    }
}