import React,{Component} from 'react';
import Counter from './counterComponents'

class Counters extends Component {
    
    

    render(){
  
        return(
            <div>
            <button onClick={this.props.onReset} className="btn btn-primary btn-sm">Reset</button>
            {this.props.counters.map(counter =><Counter onIncreament={this.props.onIncreament} onDecreament={this.props.onDecreament} counter={counter} key={counter.id} value={counter.value} id={counter.id}  onDelete={this.props.onDelete}><h1>Product No {counter.id}</h1></Counter>)}
            </div>
              );
            }


}
export default Counters;