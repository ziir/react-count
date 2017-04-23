import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

const defaultState = 0;
const fn = (state = defaultState, action) => {
	switch (action.type){
		case 'add':
			return state + 1;
		case 'delete1':
			return state - 1;
		default:
			return state;		
	}
};

const store = createStore(fn);

const View = ({value, add, delete1}) => (
	<div>
		<h1>{value}</h1>
		<button onClick = {add}>+</button>
		<button onClick = {delete1}>-</button>
	</div>
);

const listen = () => {
	ReactDOM.render(<View
		value = {store.getState()}
		add = {() => store.dispatch({type: "add"})}
		delete1 = {() => store.dispatch({type: "delete1"})}
		/>,document.getElementById("root"));
};

store.subscribe(listen);
listen();