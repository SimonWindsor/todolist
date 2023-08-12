import React from "react";

import './TaskMaker.css'

class TaskMaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: ''
    };

    this.createTask = this.createTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  createTask(e) {
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.props.onClose()
    this.setState({name: ''});
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }
  
  render() {
    return(
      <div id="task-maker" hidden>
        <div id="top-bar">
          <button id="close-button" onClick={this.props.onClose}>x</button>
          <h3>Create Task</h3>
        </div>
        <form onSubmit={this.createTask}>
          <input
            type="text"
            placeholder="Enter task name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <button type="submit">Create Task</button>
        </form>
      </div>
    )
  }
}

export default TaskMaker;