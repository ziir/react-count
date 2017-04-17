import React from 'react';
import ReactDOM from 'react-dom';

var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

var Product = (props) => (
	<div>
		{props.product.name}
	</div>
);

var Products = (props) => (
	<div>
		{props.products.map((product) => {
			if (product.name.indexOf(props.filterText) != -1 ) {
		        return <Product product = {product}/>
		    }
		})}
	</div>
);

class SearchBar extends React.Component{
	constructor(props){
		super(props);
		this.filterTextChange = this.filterTextChange.bind(this);
	}

	filterTextChange(e){
		console.log("in the search bar");
		this.props.filterTextInput(e.target.value);//callback function
		console.log("after the search bar");
	}

	render(){
		return(
			<div>
				<input type="text" placeholder="search" value={this.props.filterText} onChange={this.filterTextChange}/>
			</div>
		);
	}
}


class View extends React.Component{

	constructor(props){
		super(props);
		this.state = {filterText: ''};
		this.handleTextInput = this.handleTextInput.bind(this);
	}

	handleTextInput(filterText){
		console.log("before set state");
		this.setState({//really change
			filterText: filterText
		});
		console.log("after set state");
	}

	render() {
	    return (
	      <div>
	      	<SearchBar filterText={this.state.filterText} filterTextInput = {this.handleTextInput}/>	
	      	<Products filterText={this.state.filterText} products={this.props.products}/>
	      </div>
	    );
  	}
}


ReactDOM.render(<View
		products = {PRODUCTS}
		/>,document.getElementById("root"));

