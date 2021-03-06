
import * as API from '../utils/api'

export const FETCH_ALL_POSTS = "FETCH_ALL_POSTS"
export const FETCH_ALL_POSTS_WITH_CATEGORY = "FETCH_ALL_POSTS_WITH_CATEGORY"
export const FETCH_ONE_POST = "FETCH_ONE_POST"
export const VOTE_POST = "VOTE_POST"
export const EDIT_POST = "EDIT_POST"
export const DELETE_POST = "DELETE_POST"
export const ADD_POST = "ADD_POST"
export const SORT_BY_VOTE = "SORT_BY_VOTE"
export const SORT_BY_DATE = "SORT_BY_DATE"


export const getAllPosts = () => dispatch => {
  API.fetchPosts()
    .then(posts => {
      return dispatch({
        type: FETCH_ALL_POSTS,
        posts
      })
    })
}

export const addPost = ({title, body, author, category}) => (dispatch) => (
    API.addPost({title, body, author, category})
        .then((post) => {
            return dispatch({
                type: ADD_POST,
                post
            });
        }
    ));

export const getAllPostsWithCategory = category => dispatch => {
  API.fetchPosts(category)
    .then(posts => {
      return dispatch({
        type: FETCH_ALL_POSTS_WITH_CATEGORY,
        posts
      })
    })
}

export const getPost = id => dispatch =>  {
  API.fetchPost(id)
    .then(post => {
      return dispatch({
        type: FETCH_ONE_POST,
        post
      })
    })
}

export const voteUpPost = id => dispatch => {
  API.votePost({id, vote: 1})
    .then( () => {
      return dispatch({
        type: VOTE_POST,
        id,
        vote: 1
      })
    })
}

export const voteDownPost = id => dispatch => {
  API.votePost({id, vote: 0})
    .then( () => {
      return dispatch({
        type: VOTE_POST,
        id,
        vote: 0
      })
    })
}

export const editPost = (id, title, body) => dispatch => {
  API.editPost({id, title, body})
    .then(post => {
      return dispatch({
        type: EDIT_POST,
        post,
        id
      })
    })
}


export const deletePost = id => dispatch => {
  API.deletePost(id)
    .then( () => {
      return dispatch({
        type: DELETE_POST,
        id
      })
    })
}
