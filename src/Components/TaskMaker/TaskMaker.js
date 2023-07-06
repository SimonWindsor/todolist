import React from "react";

import Task from '../Task/Task';
import Subtask from '../Subtask/Subtask';

class TaskMaker extends React.Component {
  constructor(props) {
    super(props)

    this.createTask = this.createTask.bind(this);
  }

  createTask() {
    return
  }
  
  render() {
    return(
      <div className="task-maker">
        <input type="text" />
      </div>
    )
  }
}

export default TaskMaker;