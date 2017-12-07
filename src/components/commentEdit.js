/**
 * Created by milad on 12/7/17.
 */
import React, {Component} from 'react';
import {connect} from "react-redux";
import {editComment, fetchComment} from '../actions/comment'
import {Button, Input, Row} from "react-materialize";

class CommentEdit extends Component {
    componentWillMount(){
        this.props.getComment(this.props.match.params.commentId)
    }

    saveComment = () =>{
        if(this.newBody){
            this.props.editComment(this.props.match.params.commentId, this.newBody)
        }
        this.props.history.push(`/`)
    }

    dismiss = () => {
        this.props.history.push(`/`)
    }

    render() {
        console.log(this.props)
        return (
            <Row>
                <Input m={12} label="body" defaultValue={this.props.comment.body} type="textarea"
                       onChange={(event, value) => this.newBody = value}/>
                <Button onClick={this.saveComment}>Save</Button>
                <Button className="red" onClick={this.dismiss}>Cancel</Button>
            </Row>
        )
    }
}

function mapStateToProps(state, ownProps) {
    console.log(ownProps)
    return{
        comment : state.Comment.filter(comment => comment.id === ownProps.match.params.commentId)
            .reduce((result, current) => {
        return {
            ...current
        }
    }, {}),
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getComment : (id) => dispatch(fetchComment(id)),
        editComment: (id, body) => dispatch(editComment({id, body}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentEdit);
