/**
 * Created by milad on 12/6/17.
 */
import  { combineReducers } from 'redux'

import Category from './category'
import Comment from './comment'
import Post from './post'


export default combineReducers({
    Category,
    Comment,
    Post
})