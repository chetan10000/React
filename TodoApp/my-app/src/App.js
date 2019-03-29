import React, { Component } from 'react';

import Todos from './component/Todos';
import AddTodo from './component/AddTodo';
import Header from './component/layout/Header';
import uuid from 'uuid';

import './App.css';

class App extends Component {
state={
	todos:[
	{
		id:uuid.v4(),
		title:'Take out the trash',
		completed:true
	},
	{
		id:uuid.v4(),
		title:'Dinner with family',
		completed:false
	},
	{
		id:uuid.v4(),
		title:'Buy things',
		completed:false
	},
	{
		id:uuid.v4(),
		title:'Meeting with boss',
		completed:false
	}
	]
}
	markComplete= (id) => {
		this.setState({todos:this.state.todos.map(todo=>{
			if(todo.id==id){
				todo.complete=!todo.complete
			}
			return todo;
		}
		)});
	}
	
	delTodo = (id)=>{
		this.setState({todos:[...this.state.todos.filter(todo =>todo.id!==id)] });
	}
	
	
	addTodo = (title) =>{
		const newTodo={id:uuid.v4(),title,completed:false
		}
		this.setState({ todos:[...this.state.todos, newTodo]});
	}
	
	
  render() {
	  console.log(this.state.todos)
    return (
	
      <div className="App">
	  <div className="container">
	   <Header />
	  <AddTodo addTodo={this.addTodo}/>
		<Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} />
	  
	  </div>
	
      </div>
	
    );
  }
}

export default App;
