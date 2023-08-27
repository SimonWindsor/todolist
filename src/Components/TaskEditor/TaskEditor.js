import React from "react";
import { v4 as uuidv4 } from 'uuid';

import './TaskEditor.css'

class TaskEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.task.id,
      name: this.props.task.taskName,
      subtasks: this.props.task.subtasks, 
      newSubtask: ''
    };

    this.updateTask = this.updateTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.removeSubtask = this.removeSubtask.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.id !== this.props.id) {
      this.setState({
        id: this.props.task.id,
        name: this.props.task.taskName,
        subtasks: this.props.task.subtasks, 
        newSubtask: ''
      });
    }
  }

  updateTask(e) {
    e.preventDefault();
  
    this.props.onUpdate(this.state.id, this.state.name, this.state.subtasks);
    this.setState({
      id: '',
      name: '',
      subtasks: [],
      newSubtask: ''
    });
  }

  addSubtask() {
    if(this.state.newSubtask === '')
      return;

    let allSubtasks = this.state.subtasks;
    allSubtasks.push({
      name: this.state.newSubtask,
      id: uuidv4(),
      marked: false
    });
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
          {subtask.name}
          <button
            type="button"
            id="remove-subtask-btn"
            className="delete-btn"
            value={index}
            onClick={this.removeSubtask}
          >
            {/* Add bin icon as background image */}
          </button>
        </li>
      )
    });

    return(
      <div id="task-editor">
        <div id="top-bar">
          <button
            id="close-button"
            className="x-btn"
            onClick={this.handleClose}
          >
            {/* Add x icon as backgroun image */}
          </button>
          <h3>Edit Task</h3>
        </div>
        <form id="task-editor-form" onSubmit={this.updateTask}>
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
            id="update-task-btn"
            type="submit"
            className="blue-btn"
            disabled={this.state.name===''}
          >
            Update Task
          </button>
        </form>
      </div>
    )
  }
}

export default TaskEditor;