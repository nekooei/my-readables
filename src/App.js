import React, {Component} from 'react'
import './App.css'
import {Route, Switch} from "react-router-dom"
import Home from "./components/Home"
import NewPost from './components/newPost'
import PostDetail from './components/postDetail'
import CommentEdit from './components/commentEdit'
import EditPost from './components/editPost'
class App extends Component {


    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/createNewPost" render={ ({history}) => (
                    <NewPost history={history}/>
                    )}/>
                <Route exact path='/category/:category' component={Home}/>
                <Route exact path='/:category/:postId'component={PostDetail}/>
                <Route excat path='/edit/:postId' component={EditPost}/>
                <Route path='/comment/:commentId' component={CommentEdit}/>
            </Switch>
        );
    }
}



export default App;
