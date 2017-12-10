/**
 * Created by milad on 12/6/17.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Row, Col, Divider, Button, Icon} from 'react-materialize'
import {voteUpPost, voteDownPost, deletePost} from '../actions/post'
import propTypes from 'prop-types'
import Moment from 'react-moment'
import {Link} from "react-router-dom";


class Post extends Component {

    deletePost = () => {
      this.props.deletePost(this.props.id)
    }

    editPost = () => {
      this.props.history.push(`/edit/${this.props.id}`)
    }

    voteUp = () => {
      this.props.voteUpPost(this.props.id)
    }

    voteDown = () => {
      this.props.voteDownPost(this.props.id)
    }

    render() {
        const {title, timestamp, body, author, category, id, voteScore, commentCount} = this.props
        return (

                <Row className="card-panel hoverable">
                    <Col m={12}>
                        <Link to={`/${category}/${id}`}>
                          <h4>
                              {title}
                          </h4>
                        </Link>
                        <Divider/>
                        <p>
                            {body}
                        </p>
                        <Divider/>
                        <Row>
                            <Col m={2}>
                                author: {author}
                            </Col>
                            <Col m={2}>
                                category: {category}
                            </Col>
                            <Col m={2}>
                                <Moment format="MMM Do YYYY">{timestamp}</Moment>
                            </Col>
                            <Col m={2}>
                                score : {voteScore}
                            </Col>
                            <Col m={2}>
                                comments : {commentCount}
                            </Col>
                            <Divider/>
                            <Row>
                              <Col m={6}>
                                  <Button className="red" onClick={this.deletePost}><Icon>delete</Icon></Button>
                                  <Button className="blue" onClick={this.editPost}><Icon>settings</Icon></Button>
                              </Col>
                              <Col m={6}>
                                  <Button className="green" onClick={this.voteUp}><Icon>thumb_up</Icon></Button>
                                  <Button className="orange" onClick={this.voteDown}><Icon>thumb_down</Icon></Button>
                              </Col>
                            </Row>
                        </Row>
                    </Col>
                </Row>
        )
    }
}

Post.propTypes = {
    id: propTypes.string.isRequired,
    title: propTypes.string.isRequired,
    timestamp: propTypes.number.isRequired,
    body: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    voteScore: propTypes.number.isRequired,
    commentCount: propTypes.number.isRequired
}

function mapStateToProps(state){
  return{}
}

function mapDispatchToProps(dispatch){
  return{
    voteUpPost : (id) => dispatch(voteUpPost(id)),
    voteDownPost: (id) => dispatch(voteDownPost(id)),
    deletePost : (id) => dispatch(deletePost(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)
