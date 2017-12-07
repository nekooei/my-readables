/**
 * Created by milad on 12/6/17.
 */
import {ADD_COMMENT, DELETE_COMMENT, FETCH_COMMENTS, UPDATE_COMMENT} from "../actions/comment";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return action.comments
        case ADD_COMMENT:
            return [
                ...state,
                action.comment
            ]

        case DELETE_COMMENT:
            return state.filter(comment => comment.id !== action.comment.id)

        case UPDATE_COMMENT:
            const newComment = action.comment;
            return state.map(comment => comment.id === newComment.id ? newComment : comment)
        default:
            return state;
    }
}