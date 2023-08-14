import React from 'react';
import TaskList from '../TaskList/TaskList';
import TaskMaker from '../TaskMaker/TaskMaker';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      taskList: [
        {
          taskName: 'Feed Cat', 
          expanded: false,
          marked: false, 
          subtasks: [
            {
              name: 'Clean cat bowl', 
              marked: false
            },
            {
              name: 'Buy cat food', 
              marked: false
            },
            {
              name: 'Actually give it to the cat',
              marked: false
            }
          ]
        },
        {
          taskName: 'Fix tap', 
          expanded: false, 
          marked: false,
          subtasks: [
            {
              name: 'Get washers', 
              marked: false
            },
            {
              name: 'Replace washers', 
              marked: false
            }
          ]
        },
        {
          taskName: 'Eat', 
          expanded: false, 
          marked: false,
          subtasks: []
        },
        {
          taskName: 'Play Guitar', 
          expanded: false, 
          marked: false,
          subtasks: []
        }
      ]
    }

    this.expandOrCollapseTask = this.expandOrCollapseTask.bind(this);
    this.markUnmark = this.markUnmark.bind(this);
    this.markUnmarkSub = this.markUnmarkSub.bind(this);
    this.allSubsMarked = this.allSubsMarked.bind(this);
    this.unmarkAllSubs = this.unmarkAllSubs.bind(this);
    this.viewTaskMaker = this.viewTaskMaker.bind(this);
    this.closeTaskMaker = this.closeTaskMaker.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  expandOrCollapseTask(task) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].taskName === task)
        allTasks[i].expanded = !allTasks[i].expanded;
    }
    this.setState({taskList: allTasks});
  }

  markUnmark(task) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].taskName === task)
        allTasks[i].marked = !allTasks[i].marked;
    }
    this.setState({taskList: allTasks});
  }

  markUnmarkSub(task, subtask) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].taskName === task) {
        for(let j = 0; j < allTasks[i].subtasks.length; j++) {
          if(allTasks[i].subtasks[j].name === subtask)
            allTasks[i].subtasks[j].marked = !allTasks[i].subtasks[j].marked;
        }
      }
    }
    this.setState({taskList: allTasks});
  }

  allSubsMarked(task) {
    const allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].taskName === task) {
        if(allTasks[i].subtasks.length === 0)
          return false;

        for(let j = 0; j < allTasks[i].subtasks.length; j++) {
          if(allTasks[i].subtasks[j].marked === false)
            return false;
        }
      }
    }
    return true;
  }

  unmarkAllSubs(task) {
    const allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].taskName === task) {
        for(let j = 0; j < allTasks[i].subtasks.length; j++)
          allTasks[i].subtasks[j].marked = false;
      }
    }
    this.setState({taskList: allTasks});
  }

  viewTaskMaker() {
    document.getElementById('task-maker').hidden = false;
  }

  closeTaskMaker() {
    document.getElementById('task-maker').hidden = true;
  }

  addTask(name) {
    let allTasks = this.state.taskList;
    allTasks.push({
      taskName: name,
      expanded: false,
      marked: false,
      subtasks: []
    });
    this.setState({taskList: allTasks});
  }

  deleteTask(deletedTask) {
    const allTasks = this.state.taskList.filter(task => {
      return task.taskName !== deletedTask
    });

    this.setState({taskList: allTasks});
  }

  render() {
    return (
      <div id='task-list-container'>
        <h1>TO DO:</h1>
        <button onClick={this.viewTaskMaker}>+</button>
        <TaskList
          taskList={this.state.taskList}
          onExpandOrCollapse={this.expandOrCollapseTask}
          onMark={this.markUnmark}
          onMarkSub={this.markUnmarkSub}
          allSubsMarked={this.allSubsMarked}
          unmarkAllSubs={this.unmarkAllSubs}
          onDelete={this.deleteTask}
        />
        <TaskMaker onClose={this.closeTaskMaker} onAdd={this.addTask} />
      </div>
    )
  }
}

export default App;
