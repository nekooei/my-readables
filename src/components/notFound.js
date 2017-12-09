import React , {Component} from 'react'
import Header  from './header'


class NotFound extends Component{


  render(){
    return(
      <div>
        <Header/>
        <div className="container">
          <h1 className="red">
          Not Found
          </h1>
        </div>
      </div>
    )
  }
}

export default NotFound
