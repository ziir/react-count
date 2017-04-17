import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

const defaultState = {values:[],newValue:""};
const fn = (state = defaultState, action) => {
	switch (action.type){
		case 'add':
			return state.push();
		default:
			return state;		
	}
};

const store = createStore(fn);

const View = ({value, newValue, add}) => (
	<div>

		<h1>Todo List</h1>
		<input type="text" value={newValue}/>
		<button onClick = {add}>Add To List</button>
	</div>

);

const listen = () => {
	ReactDOM.render(<View
		value = {store.getState().values}
		newValue = {store.getState().newValue}
		add = {() => store.dispatch({type: "add"})}

		/>,document.getElementById("root"));
};

store.subscribe(listen);
listen();