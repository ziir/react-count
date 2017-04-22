import React from 'react';
import ReactDOM from 'react-dom'



class Add extends React.Component{

	constructor(props){
		super(props);
		this.state={value:""};
		this.addItem = this.addItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
	}

	addItem(e){
		this.props.addtodo(this.state.value);
		this.setState({
			value:""
		});
	}

	updateItem(e){
		this.setState({
			value: e.target.value
		});
	}

	render() {
	    return (
	      <div>
	      	<form>
	      		<input type="text" placeholder="add item" value={this.state.value} onChange={this.updateItem}/>
		    	<input type="button" value="add" onClick={this.addItem}/>
	      	</form>
	      </div>
	    );
  	}
}

class List extends React.Component{

	constructor(props){
		super(props);
		this.removeItem = this.removeItem.bind(this);
	}

	removeItem(){
		this.props.remove(this.props.value);
	}

	render() {
	    return (
	      	<div onClick = {this.removeItem}>
				{this.props.value}
			</div>
	    );
  	}
}

class Lists extends React.Component{

	constructor(props){
		super(props);
	}

	render() {
	    return (
	      <div>
	      	{this.props.values.map((value) => {
	      		return <List value={value} remove={this.props.remove}/>
	      	})}
	      </div>
	    );
  	}
}

class View extends React.Component{

	constructor(props){
		super(props);
		this.state = {values:[], add:""};
		this.addtodo= this.addtodo.bind(this);
		this.removeItem= this.removeItem.bind(this);
	}

	addtodo(value){
		this.setState({
			values : this.state.values.concat(value)
		});
	}

	removeItem(value){
		 // Filter all todos except the one to be removed
	    const remainder = this.state.values.filter((v) => {
	      if(v !== value) return v;
	    });
	    // Update state with filter
	    this.setState({values: remainder});
	}	

	render() {
	    return (
	      <div>
	      	<Add addtodo={this.addtodo}/>
	      	<Lists values={this.state.values} remove = {this.removeItem}/>
	      </div>
	    );
  	}
}

ReactDOM.render(<View/>,document.getElementById("root"));