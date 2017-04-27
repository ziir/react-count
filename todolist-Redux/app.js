import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

require("./main.scss");

var initialState = { todoLists: [], doneLists: [], showLists: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      var lists = state.todoLists;

      return {
        doneLists: state.doneLists,
        showLists: state.showLists,
        todoLists: state.lists.concat(action.text)
      };
    case "delete":
      state.todoLists = state.todoLists.filter(list => {
        return list != action.text;
      });
      state.showLists = state.todoLists;
      var lists = state.doneLists;
      lists.push(action.text);
      state.doneLists = lists;
      return state;
    case "showTodo":
      state.showLists = state.todoLists;
      return state;
    case "reset":
      state = initialState;
      return state;
    case "showDone":
      state.showLists = state.doneLists;
      return state;
    default:
      return state;
  }
};

const store = createStore(reducer);

const Add = () => {
  var text = "";

  return (
    <div>
      <input
        type="text"
        id="text"
        ref={input => {
          text = input;
        }}
      />
      <input
        type="button"
        id="button"
        value="Add"
        onClick={() => {
          store.dispatch({ type: "add", text: text.value });
          text.value = "";
        }}
      />
    </div>
  );
};

const Lists = () => (
  <div>
    {store.getState().showLists.map(list => (
      <ul
        onClick={() => {
          store.dispatch({ type: "delete", text: list });
        }}
      >
        <li>{list}</li>
      </ul>
    ))}
  </div>
);

const Show = () => (
  <div id="show-div">
    <a
      onClick={() => {
        store.dispatch({ type: "showTodo" });
      }}
    >
      Todo{" "}
    </a>
    <a
      onClick={() => {
        store.dispatch({ type: "showDone" });
      }}
    >
      Done
    </a>
  </div>
);

const View = () => (
  <div>
    <Add />
    <Show />
    <Lists />
  </div>
);

const listen = () => {
  ReactDOM.render(<View />, document.getElementById("root"));
};

store.subscribe(listen);
listen();
