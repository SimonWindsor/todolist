import React from "react";

import Subtask from '../Subtask/Subtask'
import './Task.css'

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMark = this.toggleMark.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.getButtonClassName = this.getButtonClassName.bind(this);
    this.expandOrCollapseTask = this.expandOrCollapseTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  toggleMark() {
    if(this.props.allSubsMarked(this.props.id)) {
      this.props.unmarkAllSubs(this.props.id);
      return;
    }

    this.props.onMark(this.props.id);
  }

  isChecked() {
    if(this.props.allSubsMarked(this.props.id))
      return true;
    else if(this.props.marked)
      return true;
    else
      return false;
  }

  getButtonClassName() {
    return this.props.expanded ? 'expanded' : 'collapsed';
  }

  expandOrCollapseTask() {
    this.props.onExpandOrCollapse(this.props.id);
  }

  editTask() {
    this.props.onEdit({
      id: this.props.id,
      taskName: this.props.name,
      expanded: this.props.expanded,
      marked: this.props.marked,
      subtasks: this.props.subtasks
    });

  }

  deleteTask() {
    this.props.onDelete(this.props.id);
  }

  render() {
    let subTaskList = '';

    //Subtasks will be rendered upon clicking of button
    if(this.props.expanded) {
      subTaskList = this.props.subtasks.map(subtask => {
        return (
          <Subtask
            name={subtask.name}
            id={subtask.id}
            marked={subtask.marked}
            mainId={this.props.id}
            mainMarked={this.props.marked}
            onMark={this.props.onMarkSub} 
          />
        )
      });
    }

    return (
      <div className="task-container">
        <div id="task-name-and-controls">
          <input
            type="checkbox"
            className='task'
            id={this.props.id}
            checked={this.isChecked()}
            onChange={this.toggleMark}
          />
          <label htmlFor={this.props.id}><h2>{this.props.name}</h2></label>
          {/* Button appears here with correct label */}
          <button
            onClick={this.expandOrCollapseTask}
            className={this.getButtonClassName()}
            disabled={this.props.subtasks.length === 0}
            aria-label="Expand or collapse task"
            alt="Expand of collapse icon"
          >
            {/* Add chevron icon as background image */}
          </button>
          <button className="edit-btn" onClick={this.editTask} aria-label="Edit task" alt="Edit task" >{/* Add edit icon as background image */}</button>
          <button className="delete-btn" onClick={this.deleteTask} aria-label="Delete task" alt="Delete task">{/* Add bin icon as background image */}</button>
        </div>
        {/* subtasks appear if expand button is clicked */}
        {subTaskList}
      </div>
    )
  }
}

export default Task;