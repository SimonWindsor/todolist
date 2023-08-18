import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from '../TaskList/TaskList';
import RememberToggle from '../RememberToggle/RememberToggle';
import TaskMaker from '../TaskMaker/TaskMaker';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = this.recallToDos();
      // taskList: [
      //   {
      //     taskName: 'Feed Cat', 
      //     expanded: false,
      //     marked: false, 
      //     subtasks: [
      //       {
      //         name: 'Clean cat bowl', 
      //         marked: false
      //       },
      //       {
      //         name: 'Buy cat food', 
      //         marked: false
      //       },
      //       {
      //         name: 'Actually give it to the cat',
      //         marked: false
      //       }
      //     ]
      //   },
      //   {
      //     taskName: 'Fix tap', 
      //     expanded: false, 
      //     marked: false,
      //     subtasks: [
      //       {
      //         name: 'Get washers', 
      //         marked: false
      //       },
      //       {
      //         name: 'Replace washers', 
      //         marked: false
      //       }
      //     ]
      //   },
      //   {
      //     taskName: 'Eat', 
      //     expanded: false, 
      //     marked: false,
      //     subtasks: []
      //   },
      //   {
      //     taskName: 'Play Guitar', 
      //     expanded: false, 
      //     marked: false,
      //     subtasks: []
      //   }
      // ]

    this.recallToDos = this.recallToDos.bind(this);
    this.handleQuickTaskChange = this.handleQuickTaskChange.bind(this);
    this.addQuickTask = this.addQuickTask.bind(this);
    this.expandOrCollapseTask = this.expandOrCollapseTask.bind(this);
    this.markUnmark = this.markUnmark.bind(this);
    this.markUnmarkSub = this.markUnmarkSub.bind(this);
    this.allSubsMarked = this.allSubsMarked.bind(this);
    this.unmarkAllSubs = this.unmarkAllSubs.bind(this);
    this.viewTaskMaker = this.viewTaskMaker.bind(this);
    this.closeTaskMaker = this.closeTaskMaker.bind(this);
    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateAndSaveTasks = this.updateAndSaveTasks.bind(this);
    this.toggleRemember = this.toggleRemember.bind(this);
    this.rememberToggleChecked = this.rememberToggleChecked.bind(this);
  }
  
  recallToDos() {
    const getStorage = localStorage.getItem('toDoListState');

    if(getStorage === null) {
      return {
        taskList: [],
        remember: false,
        quickTask: ''
      }
    } else {
      return {
        taskList: JSON.parse(getStorage),
        remember: true,
        quickTask: ''
      }
    }
  }

  handleQuickTaskChange(e) {
    e.preventDefault();
    this.setState({quickTask: e.target.value});
  }

  addQuickTask(e) {
    e.preventDefault();
    this.addTask(this.state.quickTask);
    this.setState({quickTask: ''});
  }

  expandOrCollapseTask(task) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === task)
        allTasks[i].expanded = !allTasks[i].expanded;
    }
    
    this.updateAndSaveTasks(allTasks)
  }

  markUnmark(task) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === task)
        allTasks[i].marked = !allTasks[i].marked;
    }
    
    this.updateAndSaveTasks(allTasks)
  }

  markUnmarkSub(task, subtask) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === task) {
        for(let j = 0; j < allTasks[i].subtasks.length; j++) {
          if(allTasks[i].subtasks[j].id === subtask)
            allTasks[i].subtasks[j].marked = !allTasks[i].subtasks[j].marked;
        }
      }
    }
    
    this.updateAndSaveTasks(allTasks)
  }

  allSubsMarked(task) {
    const allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === task) {
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
      if(allTasks[i].id === task) {
        for(let j = 0; j < allTasks[i].subtasks.length; j++)
          allTasks[i].subtasks[j].marked = false;
      }
    }
    
    this.updateAndSaveTasks(allTasks)
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
      id: uuidv4(),
      expanded: false,
      marked: false,
      subtasks: []
    });
    
    this.updateAndSaveTasks(allTasks)
  }

  deleteTask(deletedTask) {
    const allTasks = this.state.taskList.filter(task => {
      return task.id !== deletedTask
    });

    this.updateAndSaveTasks(allTasks)
  }

  updateAndSaveTasks(allTasks) {
    /* deleteTask() would not remove last deleted task from local storage
      when calling this method allTasks variable is being used instead to
      update local storage instead of this.state.taskList */
    this.setState({taskList: allTasks});
    if(this.state.remember)
      localStorage.setItem('toDoListState', JSON.stringify(allTasks));
  }

  toggleRemember() {
    const checked = !this.state.remember;
    this.setState({remember: checked});
    if(checked)
      localStorage.setItem('toDoListState', JSON.stringify(this.state.taskList));
    else
      localStorage.clear();
  }

  rememberToggleChecked() {
    return this.state.remember;
  }

  render() {
    return (
      <div id='task-list-container'>
        <h1>TO DO:</h1>
        <form onSubmit={this.addQuickTask}>
          <input
            type="text"
            placeholder="Add a quick task here"
            onChange={this.handleQuickTaskChange}
            value={this.state.quickTask}
          />
          <button type="submit">Add</button>
        </form>
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
        <RememberToggle onToggle={this.toggleRemember} isChecked={this.rememberToggleChecked} />
        <TaskMaker onClose={this.closeTaskMaker} onAdd={this.addTask} />
      </div>
    )
  }
}

export default App;
