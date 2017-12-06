/**
 * Created by milad on 12/6/17.
 */
import React, {Component} from 'react'
import { connect} from 'react-redux'
import { Navbar, NavItem } from 'react-materialize'

class Header extends Component {
    render() {
        const {categories} = this.props
        return (
            <Navbar brand={"My-Readable"}>
                {categories.map(category => (
                    <NavItem key={category.path} href={`/category/${category.path}`}>{category.name}</NavItem>
                ))}
            </Navbar>
        );
    }
}

function mapStateToProps(state) {
    return{
        categories: state.Category
    }
}

export default connect(mapStateToProps)(Header);
