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
    this.removeSubtask = this.removeSubtask.bind (this);
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
    if(this.state.newSubtask === '')
      return;

    let allSubtasks = this.state.subtasks;
    allSubtasks.push(this.state.newSubtask);
    this.setState({subtasks: allSubtasks, newSubtask: ''});
  }

  removeSubtask(e) {
    const allSubs = this.state.subtasks;
    allSubs.splice(e.target.value, 1);
    this.setState({subtasks: allSubs});
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
    // Forms the list of subtask
    let subtaskList = this.state.subtasks.map((subtask, index) => {
      return (
        <li key={index}>
          <div id="subtask-content">
            {subtask}
          </div>
          <button
            type="button"
            id="remove-subtask-btn"
            className="delete-btn"
            value={index}
            onClick={this.removeSubtask}
            aria-label="Delete this subtask"
          >
            {/* Add bin icon as background image */}
          </button>
        </li>
      )
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
            aria-label="Name this task"
          />
          <div id="subtask-controls">
            <input 
              id="subtask-adder"
              type="text"
              placeholder="Add subtasks here..."
              onChange={this.handleChange}
              value={this.state.newSubtask}
              aria-label="Enter task name"
            />
            <button
              type="button"
              className="plus-btn"
              onClick={this.addSubtask}
              aria-label="Add subtask"
            >
              {/* Add plus icon as background image */}  
            </button>
          </div>
          <ul id="subtask-list">{subtaskList}</ul>
          <button
            id="update-task-btn"
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