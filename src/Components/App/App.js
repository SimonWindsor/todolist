import React from 'react';
import TaskList from '../TaskList/TaskList';
import TaskMaker from '../TaskMaker/TaskMaker';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskList: [
        {taskName: 'Feed Cat', expanded: false, subtasks: ['Clean cat bowl', 'Buy cat food', 'Actually give it to the cat']},
        {taskName: 'Fix tap', expanded: false, subtasks: ['Get washers', 'Replace washers']},
        {taskName: 'Eat', expanded: false, subtasks: []},
        {taskName: 'Play Guitar', expanded: false, subtasks: []}
      ]
    }

    this.expandOrCollapseTask = this.expandOrCollapseTask.bind(this);
    this.viewTaskMaker = this.viewTaskMaker.bind(this);
    this.closeTaskMaker = this.closeTaskMaker.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  expandOrCollapseTask(task) {
    let allTasks = this.state.taskList
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].taskName === task)
        allTasks[i].expanded = !allTasks[i].expanded;
    }
    this.setState({taskList: allTasks});
  }

  viewTaskMaker() {
    document.getElementById('task-maker').hidden = false;
  }

  closeTaskMaker() {
    document.getElementById('task-maker').hidden = true;
  }

  addTask(name, subtasks) {
    let allTasks = this.state.taskList;
    allTasks.push({taskName: name, subtasks: subtasks});
    this.setState({taskList: allTasks});
  }

  render() {
    return (
      <div className='task-list-container'>
        <h1>TO DO:</h1>
        <button onClick={this.viewTaskMaker}>+</button>
        <TaskList taskList={this.state.taskList} onSelection={this.expandOrCollapseTask} />
        <TaskMaker close={this.closeTaskMaker} addTask={this.addTask} />
      </div>
    )
  }
}

export default App;
