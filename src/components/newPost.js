/**
 * Created by milad on 12/7/17.
 */
import React, {Component} from 'react'
import { addPost } from '../actions/post'
import {Button, Input, Row} from "react-materialize"
import { connect } from 'react-redux'

class NewPost extends Component {
    state = {
        error : false
    }

    title = ""
    author= ""
    category=""
    body=""


    save = () => {
        if(this.category.length === 0
            || this.author.length === 0
            || this.title.length === 0
            || this.body.length === 0){
            this.setState({
                error: true
            })
            return
        }else {
            this.setState({
                error: false
            })
            this.props.createNewPost({
                title: this.title,
                body: this.body,
                author: this.author,
                category: this.category
            })
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <Row className="container">
                <div className="card-panel">
                    <Input m={12} label="title"
                           onChange={(event, value) => this.title = value}/>
                    <Input m={6} label="author"
                           onChange={(event, value) => this.author = value}/>
                    <Input m={6} type="select" onChange={(event, value) => this.category = value} label="category" defaultValue="category">
                        <option value="category" disabled>Select Category</option>
                        {this.props.categories.map(category => (
                            <option value={category.name}>{category.name}</option>
                        ))}

                    </Input>
                    <Input m={12} label="body" type="textarea"
                           onChange={(event, value) => this.body = value}/>
                    <p>{this.state.error ? "please fill all fields" : ""}</p>
                    <Button waves="light" onClick={this.save}>Save</Button>
                </div>
            </Row>
        );
    }
}

NewPost.propTypes = {};
NewPost.defaultProps = {};

function mapStateToProps(state){
    return{
        categories: state.Category
    }
}
function mapDispatchToProps(dispatch) {
    return{
        createNewPost: ({title, body, author, category}) => dispatch(addPost({title, body, author, category}))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
