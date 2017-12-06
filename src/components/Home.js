/**
 * Created by milad on 12/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getAllPosts, SORT_BY_DATE, SORT_BY_VOTE} from "../actions/post";
import {getAllCategories} from "../actions/category";
import {fetchComments} from "../actions/comment";
import {Button, Col, Input, Row} from "react-materialize";
import {Link} from "react-router-dom";
import Post from "./post";
import Header from './header'

class Home extends Component {
    componentWillMount(){
        this.props.getAllCategories()
        this.props.getAllPosts()
        this.props.getAllComments()
    }


    sortChange = (event, value) => {
        switch(value){
            case 'sort-by-time':
                this.props.sortByDatePosts()
                break;
            case 'sort-by-vote':
                this.props.sortByVotePosts()
                break;
        }
    }
    render() {
        return (
            <div className="App">
                <Header/>
                <Row>
                    <Col m={4} className="card-panel center">
                        <Row>
                            <Col m={12}>
                                <Input type="select" label="Sort Posts By"
                                       onChange={this.sortChange} defaultValue="def">
                                    <option value='def' disabled>Sort Option</option>
                                    <option value='sort-by-time'>time</option>
                                    <option value='sort-by-vote'>vote</option>
                                </Input>
                            </Col>
                            <Col m={12}>
                                <Link to='/createNewPost'>
                                    <Button waves="light">Create New Post</Button>
                                </Link>
                            </Col>
                        </Row>
                    </Col>
                    <Col m={8}>
                        <h5 className="card-panel">List Posts</h5>
                        {this.props.posts.map(post => post.deleted ?  null : (
                            <Post title={post.title}
                                  id={post.id}
                                  timestamp={post.timestamp}
                                  body={post.body} author={post.author} category={post.category}
                                  voteScore={post.voteScore}/>
                        ))}
                    </Col>
                </Row>
            </div>
        );
    }
}

Home.propTypes = {

};

function mapStateToProps(state) {
    return {
        posts: state.Post
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getAllPosts : () => dispatch(getAllPosts()),
        getAllCategories: () => dispatch(getAllCategories()),
        getAllComments: () => dispatch(fetchComments()),
        sortByDatePosts : () => dispatch({type: SORT_BY_DATE}),
        sortByVotePosts : () => dispatch({type: SORT_BY_VOTE})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
