import React from 'react';
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

var initialState = {"lists":[]};
const reducer = (state = initialState, action) => {
	switch (action.type){
		case 'add':
			var lists = state.lists;
			lists.push(action.text);
			state.lists = lists;
			console.log(state.lists);
			return state;
		case 'delete':
			console.log("delete");
			state.lists = state.lists.filter((list)=>{
				return list != action.text;
			});
			console.log(state.lists);
			return state;
		default:
			return state;		
	}
};

const store = createStore(reducer);

const Add = ()=>{
	var text = "";

	return (
		<div>
			<input type="text" ref={(input)=>{text=input;}}/>
			<input type="button" value="Add" onClick={()=>{
				store.dispatch({type:"add", text: text.value});
				text.value = "";
			}}/>
		</div>
	);
};

const Lists = ()=>(
	<div>
		{	
			store.getState().lists.map((list) => (
				<div onClick={()=>{
				store.dispatch({type:"delete", text: list});
				}}>{list}</div>
		))}
	</div>
);

const View = ()=>(
	<div>
		<Add/>
		<Lists/>
	</div>
);

const listen = () => {
	ReactDOM.render(<View
		
		/>,document.getElementById("root"));
};

store.subscribe(listen);
listen();
