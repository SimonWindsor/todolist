import React from "react";

import './TaskMaker.css'

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
      <div id="task-maker" hidden>
        <h3>Create Task</h3>
        <input type="text" />
      </div>
    )
  }
}

export default TaskMaker;