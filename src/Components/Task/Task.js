import React from "react";

import Subtask from '../Subtask/Subtask'
import './Task.css'

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMark = this.toggleMark.bind(this);
    this.isChecked = this.isChecked.bind(this);
    this.getButtonLabel = this.getButtonLabel.bind(this);
    this.expandOrCollapseTask = this.expandOrCollapseTask.bind(this);
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

  getButtonLabel() {
    return this.props.expanded ? 'Collapse' : 'Expand';
  }

  expandOrCollapseTask() {
    this.props.onExpandOrCollapse(this.props.id);
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
      <div className="task-list">
        <input
          type="checkbox"
          className='task'
          id={this.props.id}
          checked={this.isChecked()}
          onChange={this.toggleMark}
        />
        <label htmlFor={this.props.id}><h2>{this.props.name}</h2></label>
        {/* Button appears here with correct label */}
        <button onClick={this.expandOrCollapseTask}>{this.getButtonLabel()}</button>
        <button onClick={this.deleteTask}>x</button>
        {/* subtasks appear if expand button is clicked */}
        {subTaskList}
      </div>
    )
  }
}

export default Task;