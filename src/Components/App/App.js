import React from 'react';
import TaskList from '../TaskList/TaskList';
import TaskMaker from '../TaskMaker/TaskMaker';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskList: [
        {taskName: 'Feed Cat', subtasks: ['Clean cat bowl', 'Buy cat food', 'Actually give it to the cat']},
        {taskName: 'Fix tap', subtasks: ['Get washers', 'Replace washers']},
        {taskName: 'Eat', subtasks: []},
        {taskName: 'Play Guitar', subtasks: []}
      ],
      taskMaker: null
    }

    this.viewTask = this.viewTask.bind(this);
    this.viewTaskMaker = this.viewTaskMaker.bind(this);
    this.closeTaskMaker = this.closeTaskMaker.bind(this);
    this.addTask = this.addTask.bind(this);
  }

  viewTask() {
    return;
  }

  viewTaskMaker() {
    this.setState({taskMaker: <TaskMaker />});
  }

  closeTaskMaker() {
    this.setState({taskMaker: null});
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
        <TaskList taskList={this.state.taskList} onSelection={this.viewTask} />
        {this.state.taskMaker}
      </div>
    )
  }
}

export default App;
