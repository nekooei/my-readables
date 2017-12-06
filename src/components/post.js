/**
 * Created by milad on 12/6/17.
 */
import React, {Component} from 'react'
import {Row, Col, Divider} from 'react-materialize'
import propTypes from 'prop-types'
import Moment from 'react-moment'
import {Link} from "react-router-dom";


class Post extends Component {
    render() {
        const {title, timestamp, body, author, category, id} = this.props
        return (
            <Link to={`/post/${id}`}>
                <Row className="card-panel hoverable">
                    <Col m={12}>
                        <h4>
                            {title}
                        </h4>
                        <Divider/>
                        <p>
                            {body}
                        </p>
                        <Divider/>
                        <Row>
                            <Col m={4}>
                                author: {author}
                            </Col>
                            <Col m={4}>
                                category: {category}
                            </Col>
                            <Col m={4}>
                                <Moment format="MMM Do YYYY">{timestamp}</Moment>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Link>
        );
    }
}

Post.propTypes = {
    title: propTypes.string.isRequired,
    timestamp: propTypes.number.isRequired,
    body: propTypes.string.isRequired,
    author: propTypes.string.isRequired,
    category: propTypes.string.isRequired,
    voteScore: propTypes.number.isRequired
};
Post.defaultProps = {};

export default Post
