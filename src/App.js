import React, {Component} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Home from "./components/Home";
import NewPost from './components/newPost'
class App extends Component {


    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/createNewPost" render={ ({history}) => (
                    <NewPost history={history}/>
                    )}/>
            </Switch>
        );
    }
}



export default App;
