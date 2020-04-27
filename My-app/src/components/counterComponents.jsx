import React, { Component } from 'react';

class Counter extends Component {
    //state = {count:this.props.value,
    //tags:['one','two','three']}; //data you want to put inside render will be here
    styles = {
        fontSize:10,
        fontWeight:'bold'
    };
  
    //constructor(){
       // super();
       // this.getHandleEvent.bind(this);
      //  console.log(this)
   // }
   //for eveyevent handler you have to write code like this for solution we convert into arrow function , arrow function inherit this. keyword
    //getHandleEvent = product => {
        //console.log(this.product);
        //this.setState({count :this.state.count + 1});
        //here we can do state.count++ because react has not method like this 
        // so we will inherit method from component setState()
    //};
    render() {
        // render classes like yellow bage or priimary bage dynamically on base of counter
        // it's like for  each method and to identify each element we have to put key to rander list dynamically
        //let classes = "badge m-2 badge-"
        //classes += (this.state.count === 0) ? "warning" : "primary" ;
        //after that put this variable as className={classes}
        // remember function is object in javascript
        //you can bind method using constructor
        
        return (
            <React.Fragment>
                
                {this.props.children}
               
                <span style={this.styles}className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick ={()=>this.props.onIncreament(this.props.counter)} className="btn btn-secondary btn-sm">+</button>
                <button onClick ={()=>this.props.onDecreament(this.props.counter)} className="btn btn-secondary btn-sm m-2">-</button>
                <button onClick ={() => {this.props.onDelete(this.props.id)}} className="btn btn-danger btn-sm m-2">Delete</button>
               
            </React.Fragment>

            );
    }
 
    getBadgeClasses(){
        let classes = "badge m-2 badge-"
        classes += (this.props.counter.value === 0) ? "warning" : "primary" ;
        console.log(this.props.counter.value);
        return classes;
    };

    formatCount(){
        const {value} = this.props.counter;
        return value === 0 ? "Zero" : value;
    };
   // getTagsList(){
      // if( this.state.tags.length === 0 )  return "No tags" ;
       //return <ul>{this.state.tags.map(tag => <li key={tag}>{tag}</li>)} </ul>

    //};
    // inside render function {this.getTagsList()}
}

export default Counter;// you export this class so in other file you can import it 
