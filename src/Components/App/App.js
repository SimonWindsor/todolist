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
    this.setState({quickTask: e.target.value});
  }

  addQuickTask(e) {
    e.preventDefault();
    
    if(this.state.quickTask === '')
      return;

    this.addTask(this.state.quickTask, []);
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

  addTask(name, subtasks) {
    let subtaskArray = [];
    subtasks.forEach(subtask => {
      subtaskArray.push({
        name: subtask,
        id: uuidv4(),
        marked: false
      })
    });

    let allTasks = this.state.taskList;
    allTasks.push({
      taskName: name,
      id: uuidv4(),
      expanded: false,
      marked: false,
      subtasks: subtaskArray
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
      <div id="app-container">
        <h1>TO DO:</h1>
        <div id='task-list-container'>
          <div id="top-controls">
            <button id="task-maker-btn" onClick={this.viewTaskMaker}>Add detailed task</button>
            <form id="quick-add-form" onSubmit={this.addQuickTask}>
              <input
                type="text"
                placeholder="...or add a quick task here"
                onChange={this.handleQuickTaskChange}
                value={this.state.quickTask}
              />
              <button
                type="submit"
                className='plus-btn'
              >
                {/* Use plus icon as background image */}
              </button> 
            </form>
          </div>
          <div id='remember-container'>
            <span>Forget my tasks</span>
            <RememberToggle onToggle={this.toggleRemember} isChecked={this.rememberToggleChecked} />
            <span>Remember my tasks</span>
          </div>
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
      </div>
    )
  }
}

export default App;
