import React , {Component} from 'react';


class Navbar extends Component {
    state ={};
    render(){
        return (
            <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#"> TotalItems#
           <span className="badge badge-pill badge-secondary">{this.props.totalCountNumber}</span></a>
            </nav>
        );
    }

}

export default Navbar;

