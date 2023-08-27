import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TaskList from '../TaskList/TaskList';
import RememberToggle from '../RememberToggle/RememberToggle';
import TaskMaker from '../TaskMaker/TaskMaker';
import TaskEditor from '../TaskEditor/TaskEditor';

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
    this.viewOrCloseTaskMaker = this.viewOrCloseTaskMaker.bind(this);
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.closeEditing = this.closeEditing.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.updateAndSaveTasks = this.updateAndSaveTasks.bind(this);
    this.toggleRemember = this.toggleRemember.bind(this);
  }
  
  recallToDos() {
    const getStorage = localStorage.getItem('toDoListState');

    if(getStorage === null) {
      return {
        taskList: [],
        remember: false,
        quickTask: '',
        edting: false,
        taskToEdit: null
      }
    } else {
      return {
        taskList: JSON.parse(getStorage),
        remember: true,
        quickTask: '',
        edting: false,
        taskToEdit: null
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

  expandOrCollapseTask(taskId) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === taskId)
        allTasks[i].expanded = !allTasks[i].expanded;
    }
    
    this.updateAndSaveTasks(allTasks)
  }

  markUnmark(taskId) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === taskId)
        allTasks[i].marked = !allTasks[i].marked;
    }
    
    this.updateAndSaveTasks(allTasks)
  }

  markUnmarkSub(taskId, subtaskId) {
    let allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === taskId) {
        for(let j = 0; j < allTasks[i].subtasks.length; j++) {
          if(allTasks[i].subtasks[j].id === subtaskId)
            allTasks[i].subtasks[j].marked = !allTasks[i].subtasks[j].marked;
        }
      }
    }
    
    this.updateAndSaveTasks(allTasks)
  }

  allSubsMarked(taskId) {
    const allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === taskId) {
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

  unmarkAllSubs(taskId) {
    const allTasks = this.state.taskList;
    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === taskId) {
        for(let j = 0; j < allTasks[i].subtasks.length; j++)
          allTasks[i].subtasks[j].marked = false;
      }
    }
    
    this.updateAndSaveTasks(allTasks)
  }

  viewOrCloseTaskMaker() {
    document.getElementById('task-maker').hidden = !document.getElementById('task-maker').hidden;
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

  editTask(task) {
    this.setState({edting: true, taskToEdit: task});
  }

  updateTask(id, name, subtasks) {
    let allTasks = this.state.taskList;

    for(let i = 0; i < allTasks.length; i++) {
      if(allTasks[i].id === id) {
        allTasks[i].taskName = name;
        allTasks[i].subtasks = subtasks;
      }
    }
    this.setState({taskList: allTasks, edting: false, taskToEdit: null});

    this.updateAndSaveTasks(allTasks);
  }

  closeEditing() {
    this.setState({edting: false, taskIdToEdit: null});
  }

  deleteTask(deletedTaskId) {
    const allTasks = this.state.taskList.filter(task => {
      return task.id !== deletedTaskId
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
      localStorage.removeItem('toDoListState');
  }

  render() {
    const taskEditor = !this.state.edting ? null :
      <TaskEditor onClose={this.closeEditing} onUpdate={this.updateTask} task={this.state.taskToEdit} />

    return (
      <div id="app-container">
        <h1>TO DO:</h1>
        <div id='task-list-container'>
          <div id="top-controls">
            <button id="task-maker-btn" className="blue-btn" onClick={this.viewOrCloseTaskMaker}>Add detailed task</button>
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
            <RememberToggle onToggle={this.toggleRemember} isChecked={this.state.remember} />
            <span>Remember my tasks</span>
          </div>
          <TaskList
            taskList={this.state.taskList}
            onExpandOrCollapse={this.expandOrCollapseTask}
            onMark={this.markUnmark}
            onMarkSub={this.markUnmarkSub}
            allSubsMarked={this.allSubsMarked}
            unmarkAllSubs={this.unmarkAllSubs}
            onEdit={this.editTask}
            onDelete={this.deleteTask}
          />
        </div>
        <TaskMaker onClose={this.viewOrCloseTaskMaker} onAdd={this.addTask} />
        {taskEditor}
      </div>
    )
  }
}

export default App;
