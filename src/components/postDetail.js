/**
 * Created by milad on 12/7/17.
 */
import React, {Component} from 'react';
import Header from './header'
import {connect} from 'react-redux'
import {Button, Col, Divider, Input, Row} from "react-materialize";
import {voteUpPost, voteDownPost, deletePost, editPost, getPost} from '../actions/post'
import {addComment, fetchComments} from '../actions/comment'
import Moment from "react-moment";
import Comment from "./comment";
import NotFound from './notFound'

class PostDetail extends Component {

    state = {
        error: false
    }

    componentWillMount(){
        this.props.getPost(this.props.match.params.postId)
        this.props.fetchComments(this.props.match.params.postId)
    }

    voteUpPost = () => {
        this.props.voteUpPost(this.props.match.params.postId)

    }

    voteDownPost = () =>{
        this.props.voteDownPost(this.props.match.params.postId)
    }

    deletePost = () => {
        this.props.deletePost(this.props.match.params.postId)
        this.props.history.push('/')
    }

    editPost = () => {
        this.props.history.push(`/edit/${this.props.match.params.postId}`)
    }

    saveComment = () => {
        if(this.bodyComment && this.authorComment){
            this.setState({
                error: false
            })
            this.props.addComment(this.props.match.params.postId, this.authorComment, this.bodyComment)
        }else {
            this.setState({
                error: true
            })
        }
    }

    back = () => {
        this.props.history.push('/')
    }

    render() {
        const {title, body, author, category, timestamp, voteScore, commentCount} = this.props.post
        console.log(this.props.post);
        if(!this.props.post.hasOwnProperty('id')) {
          return <NotFound/>
        }
        return (
          <div>
            <Header/>
              <Row >
                  <Col m={4}>

                      <br/>
                      <Col m={6}>
                          <Button className="red" icon='thumb_down' onClick={this.voteDownPost}/>
                      </Col>
                      <Col m={6}>
                          <Button className="blue" icon='thumb_up' onClick={this.voteUpPost}/>
                      </Col>
                      <Col m={6}>
                          <Button className="orange" icon='close' onClick={this.deletePost}/>
                      </Col>
                      <Col m={6}>
                          <Button className="green" icon='settings' onClick={this.editPost}/>
                      </Col>

                      <Col m={12}>
                          <Button className="green" icon='arrow_left' onClick={this.back}/>
                      </Col>


                  </Col>
                  <Col m={8} >
                      <h5>{title}</h5>
                      <Divider/>
                      <p>
                          {body}
                      </p>
                      <Row>
                          <Col m={3}>
                              author: {author}
                          </Col>
                          <Col m={3}>
                              category: {category}
                          </Col>
                          <Col m={3}>
                              Date: <Moment format="MMM Do YYYY">{timestamp}</Moment>
                          </Col>
                          <Col m={3}>
                              vote: {voteScore}

                          </Col>
                      </Row>
                      <Divider/>

                      <h5>Comments : {commentCount}</h5>
                      <Row>
                          {this.props.comments.map(comment => comment.deleted || comment.parentDeleted ?  null : (
                              <Comment key={comment.id} id={comment.id} body={comment.body} author={comment.author}
                                       timestamp={comment.timestamp} voteScore={comment.voteScore} history={this.props.history}/>
                          ))}
                          <Divider/>
                          <Row>
                              <h5>Insert Comment</h5>
                              <Input m={12} label="author" onChange={(event, value) => this.authorComment = value}/>
                              <Input m={12} label="body" onChange={(event, value) => this.bodyComment = value}/>
                              <Button onClick={this.saveComment}>Save</Button>
                              <p>{this.state.error ? "please fill all fields" : ""}</p>
                          </Row>
                      </Row>
                  </Col>


              </Row>
            </div>
        );
    }
}


function mapStateToProps(state, ownProps) {
    return{
        post: state.Post.filter(post => post.id === ownProps.match.params.postId).reduce((result, current) => {
            return {
                ...current
            }
        }, {}),
        comments: state.Comment.filter(comment => comment.parentId === ownProps.match.params.postId)
    }
}

function mapDispatchToProps(dispatch) {
    return{
        voteUpPost : (id) => dispatch(voteUpPost(id)),
        getPost : (id) => dispatch(getPost(id)),
        voteDownPost: (id) => dispatch(voteDownPost(id)),
        deletePost : (id) => dispatch(deletePost(id)),
        fetchComments : (id) => dispatch(fetchComments(id)),
        editPost : (id, title, body) => dispatch(editPost(id, title, body)),
        addComment : (id, author, body) => dispatch(addComment(id, author, body))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
