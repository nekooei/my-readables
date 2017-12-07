import sortBy from 'sort-by'
import {
    ADD_POST,
    FETCH_ALL_POSTS,
    FETCH_ONE_POST,
    FETCH_ALL_POSTS_WITH_CATEGORY,
    EDIT_POST,
    DELETE_POST,
    SORT_BY_DATE,
    SORT_BY_VOTE,
    VOTE_POST
} from '../actions/post'


const  initialPostState = []

export default (posts = initialPostState, action) => {
    switch (action.type){
        case ADD_POST:
            return [
                ...posts,
                action.post
            ]
        case FETCH_ALL_POSTS:
            return action.posts
        case FETCH_ONE_POST:
            return [
                ...posts,
                action.post
            ]
        case FETCH_ALL_POSTS_WITH_CATEGORY:
            return action.posts
        case DELETE_POST:
            return posts.filter(post => post.id !== action.id)
        case EDIT_POST:
            return posts.map(post => post.id === action.post.id ? {
                ...post,
                ...action.post
            } : post)
        case VOTE_POST:
            return posts.map(post => {
                if(post.id === action.id){
                    if (action.vote === 1){
                        post.voteScore++
                    }else {
                        post.voteScore--
                    }
                }
                return post
            })
        case SORT_BY_DATE:
            const sortedPostsByDate = [...posts]
            return sortedPostsByDate.sort(sortBy('-timestamp'))

        case SORT_BY_VOTE:
            const sortedPostsByVote = [...posts]
            return sortedPostsByVote.sort(sortBy('-voteScore'))
        default:
            return posts

    }
}