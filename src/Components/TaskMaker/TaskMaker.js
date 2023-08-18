import React from "react";

import './TaskMaker.css'

class TaskMaker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      subtasks: [],
      newSubtask: '',
      subtaskToolsHidden: true
    };

    this.createTask = this.createTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubChange = this.handleSubChange.bind(this);
    this.addSubtask = this.addSubtask.bind(this);
    this.showAndHideSubtaskTools = this.showAndHideSubtaskTools.bind(this);
    this.addOrClose = this.addOrClose.bind(this);
  }

  createTask(e) {
    e.preventDefault();

    if(this.state.name === '')
      return;
  
    this.props.onAdd(this.state.name, this.state.subtasks);
    this.props.onClose()
    this.setState({name: ''});
  }

  addSubtask() {
    let allSubtasks = this.state.subtasks;
    if(this.state.newSubtask === '')
      return;

    allSubtasks.push(this.state.newSubtask);
    this.setState({newSubtask: ''});
  }

  handleChange(e) {
    this.setState({name: e.target.value})
  }

  handleSubChange(e) {
    this.setState({newSubtask: e.target.value})
  }

  showAndHideSubtaskTools() {
    const showing = !this.state.subtaskToolsHidden;
    this.setState({subtaskToolsHidden: showing});
  }

  addOrClose() {
    return this.state.subtaskToolsHidden ? 'Add' : 'Close'
  }
  
  render() {
    let subtaskList = this.state.subtasks.map(subtask => {
      return <li>{subtask}</li>
    });

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
          SubTasks: <button type="button" onClick={this.showAndHideSubtaskTools}>{this.addOrClose()}</button>
          <input 
            hidden={this.state.subtaskToolsHidden}
            type="text"
            onChange={this.handleSubChange}
            value={this.state.newSubtask}
          />
          <button type="button" hidden={this.state.subtaskToolsHidden} onClick={this.addSubtask} >+</button>
          <ul>{subtaskList}</ul>
          <button type="submit">Create Task</button>
        </form>
      </div>
    )
  }
}

export default TaskMaker;