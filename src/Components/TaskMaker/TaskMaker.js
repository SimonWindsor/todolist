import React from "react";

import './TaskMaker.css'

class TaskMaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      subtasks: [],
      newSubtask: ''
    };

    this.createTask = this.createTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  createTask(e) {
    e.preventDefault();

    if(this.state.name === '')
      return;
  
    this.props.onAdd(this.state.name, this.state.subtasks);
    this.props.onClose()
    this.setState({
      name: '',
      subtasks: [],
      newSubtask: ''
    });
  }

  addSubtask() {
    let allSubtasks = this.state.subtasks;
    if(this.state.newSubtask === '')
      return;

    allSubtasks.push(this.state.newSubtask);
    this.setState({newSubtask: ''});
  }

  handleChange(e) {
    if(e.target.id === 'task-name')
      this.setState({name: e.target.value});
    else if(e.target.id === 'subtask-adder')
      this.setState({newSubtask: e.target.value});
  }

  handleClose() {
    this.setState({
      name: '',
      subtasks: [],
      newSubtask: ''
    });
    this.props.onClose()
  }
  
  render() {
    let subtaskList = this.state.subtasks.map(subtask => {
      return <li>{subtask}</li>
    });

    return(
      <div id="task-maker" hidden>
        <div id="top-bar">
          <button
            id="close-button"
            className="x-btn"
            onClick={this.handleClose}
          >
            {/* Add x icon as backgroun image */}
          </button>
          <h3>Create Task</h3>
        </div>
        <form id="task-maker-form" onSubmit={this.createTask}>
          <input
            id="task-name"
            type="text"
            placeholder="Enter task name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <div id="subtask-controls">
            <input 
              id="subtask-adder"
              type="text"
              placeholder="Add subtasks here..."
              onChange={this.handleChange}
              value={this.state.newSubtask}
            />
            <button
              type="button"
              className="plus-btn"
              onClick={this.addSubtask}
            >
              {/* Add plus icon as background image */}  
            </button>
          </div>
          <ul id="subtask-list">{subtaskList}</ul>
          <button
            id="create-task-btn"
            type="submit"
            className="blue-btn"
            disabled={this.state.name===''}
          >
            Create Task
          </button>
        </form>
      </div>
    )
  }
}

export default TaskMaker;