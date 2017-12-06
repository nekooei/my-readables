import * as API from '../utils/api'

export const FETCH_CATEGORIES = "FETCH_CATEGORIES"

export const getAllCategories = () => dispatch => {
  API.fetchCategories()
    .then(categories => {
      return dispatch({
        type: FETCH_CATEGORIES,
        categories
      })
    })
}
