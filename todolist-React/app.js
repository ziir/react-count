import React from "react";
import ReactDOM from "react-dom";

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  addItem(text) {
    this.props.addTodo(text);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const form = evt.target;
    const input = form.querySelector('[name="text"]');
    const text = input.value;

    this.addItem(text);

    input.value = "";
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="add item" name="text" />
          <button type="submit">
            add
          </button>
        </form>
      </div>
    );
  }
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.removeItem = this.removeItem.bind(this);
  }

  removeItem() {
    this.props.remove(this.props.value);
  }

  render() {
    return (
      <li key={this.props.key} onClick={this.removeItem}>
        {this.props.value}
      </li>
    );
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);

    this.renderItem = this.renderItem.bind(this);
  }

  renderItem(value) {
    return <Item key={value} value={value} remove={this.props.remove} />;
  }

  render() {
    return (
      <ul>
        {this.props.values.map(this.renderItem)}
      </ul>
    );
  }
}

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: []
    };

    this.addTodo = this.addTodo.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addTodo(value) {
    this.setState(previousState => ({
      values: [...new Set(previousState.values.concat([value]))]
    }));
  }

  removeItem(value) {
    this.setState(previousState => ({
      values: previousState.values.filter(val => val !== value)
    }));
  }

  render() {
    return (
      <div>
        <Add addTodo={this.addTodo} />
        <List values={this.state.values} remove={this.removeItem} />
      </div>
    );
  }
}

ReactDOM.render(<View />, document.getElementById("root"));
