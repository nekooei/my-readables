/**
 * Created by milad on 12/7/17.
 */
import React, {Component} from 'react';
import { getPost, editPost} from '../actions/post'
import {Button, Input, Row} from "react-materialize";
import {connect} from "react-redux";
class EditPost extends Component {
    constructor(props){
      super(props)
      this.props.getPost(this.props.match.params.postId)
    }

    savePost = () => {
        if(this.newBody || this.newTitle){
            this.props.editPost(this.props.match.params.postId, this.newTitle, this.newBody)
        }
        this.props.history.push(`/`)
    }

    dismiss = () => {
        this.props.history.push(`/`)
    }
    render() {
        return (
            <div className="container">
                <Row>
                   <Input m={12} label="title" defaultValue={this.props.post.title}
                        onChange={(event, value) => this.newTitle = value}/>
                    <Input m={12} label="body" defaultValue={this.props.post.body}
                           onChange={(event, value) => this.newBody = value}/>
                    <Button onClick={this.savePost}>Save</Button>
                    <Button className="red" onClick={this.dismiss}>Cancel</Button>
                </Row>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        post : state.Post.filter(post => post.id === ownProps.match.params.postId)
            .reduce((result, current) => {
                return {
                    ...current
                }
            }, {})
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPost : (id) => dispatch(getPost(id)),
        editPost : (id, title, body) => dispatch(editPost(id, title, body))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
