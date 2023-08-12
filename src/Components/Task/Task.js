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
    this.props.onMark(this.props.name);
  }

  isChecked() {
    if(this.props.allSubsMarked(this.props.name))
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
    this.props.onExpandOrCollapse(this.props.name);
  }

  deleteTask() {
    this.props.onDelete(this.props.name);
  }

  render() {
    let subTaskList = '';

    //Subtasks will be rendered upon clicking of button
    if(this.props.expanded) {
      subTaskList = this.props.subtasks.map(subtask => {
        if(this.props.expanded)
          return (
            <Subtask
              name={subtask.name}
              marked={subtask.marked}
              mainName={this.props.name}
              mainMarked={this.props.marked}
              onMark={this.props.onMarkSub}   
            />
          )
      });
    }

    return(
      <div className="task">
        <input
          type="checkbox"
          className='task'
          id={this.props.name}
          checked={this.isChecked()}
          onClick={this.toggleMark}
        />
        <label for={this.props.name}><h2>{this.props.name}</h2></label>
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