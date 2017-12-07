/**
 * Created by milad on 12/7/17.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Icon, Row} from "react-materialize";
import { voteComment, deleteComment, editComment} from '../actions/comment'
import Moment from 'react-moment'
import {connect} from "react-redux";

class Comment extends Component {

    voteUpComment = () => {
        this.props.voteUpComment(this.props.id)
    }

    voteDownComment = () => {
        this.props.voteDownComment(this.props.id)
    }

    deleteComment = () => {
        this.props.deleteComment(this.props.id)
    }

    editComment = () => {

        this.props.history.push(`/comment/${this.props.id}/edit`)
    }

    render() {
        return (
            <Row>
                <Col m={12}>
                    <div>
                        <Icon>people</Icon>
                        <h5>{this.props.author}</h5>
                    </div>
                </Col>
                <Col m={12}>
                    <p>
                        {this.props.body}
                    </p>
                </Col>
                <Col m={12}>
                    <Row>
                        <Col m={6}>
                            date: <Moment format="MMM Do YYYY">{this.props.timestamp}</Moment>
                        </Col>
                        <Col m={6}>
                            vote : {this.props.voteScore}
                        </Col>
                        <Col m={6}>
                            <Button className="red" icon='thumb_down' onClick={this.voteDownComment}/>
                        </Col>
                        <Col m={6}>
                            <Button className="blue" icon='thumb_up' onClick={this.voteUpComment}/>
                        </Col>
                        <Col m={6}>
                            <Button icon='settings' onClick={this.editComment}/>
                        </Col>
                        <Col m={6}>
                            <Button icon='delete' onClick={this.deleteComment}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

Comment.propTypes = {
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    voteScore : PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return{}
}

function mapDispatchToProps(dispatch) {
    return{
        deleteComment : (id) => dispatch(deleteComment(id)),
        voteUpComment : (id) => dispatch(voteComment({id, vote: 1})),
        voteDownComment : (id) => dispatch(voteComment({id, vote: 0}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
