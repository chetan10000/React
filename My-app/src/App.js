import React , {Component} from 'react';

import Counters from './components/Counters';
import Navbar from  './components/NavBar';

class App extends Component {
    state = {counters:[
        {id :1 , value:4},
        {id :2, value:0},
        {id :3 , value:0},
        {id :4 , value:0},

    ]};

    handleReset= () =>{
        console.log("this will show handle Reset" , );
        const counters = this.state.counters.map(
            c => {
                c.value = 0;
                return c;
            })
            this.setState({counters}); 
    };
    
    
    handleDelete = (counterId) => {
        console.log("Counter value" , counterId);
        const counters1 = this.state.counters.filter(count => count.id !== counterId);
        this.setState({ counters:counters1 });
    
        }
    
    handleIncreament = counter => {
          console.log(counter);
          const counters = [...this.state.counters];
          const index = counters.indexOf(counter);
          counters[index] = {...counter };
          counters[index].value++;
          this.setState({ counters});
         
                                    }
    handleDecreament = counter =>{
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters [index] = {...counter };
        if (counters[index].value===0){
          
            return this.setState({counters})
        }else{
        counters[index].value--;
        return this.setState({counters})
        }
        
    }    
   // handleAllProduct = ()=>{
       // this.props.counters.reduce(total,this.props.counter){
           // console.log(total+ this.props.counters);
      //  };
   // };                    
// <Navbar totalCountNumber={this.props.counters.reduce((total , counter)=>{return total + counter.value},0)} counters={this.state.counters}/>
    

    render(){
        let i =0;
        return(
        
            <React.Fragment>
            <Navbar totalCountNumber={this.state.counters.reduce((total , counter)=>{return total + counter.value},0)} />
            <main role="main" className="container">
            <Counters counters={this.state.counters} onDecreament={this.handleDecreament} onReset={this.handleReset} onIncreament={this.handleIncreament} onDelete={this.handleDelete}/>
            </main>
            </React.Fragment>
           
        );
    }
}

export default App;
