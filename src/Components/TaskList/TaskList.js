import React from "react";

import Task from '../Task/Task';

class TaskList extends React.Component {
  render() {
    return(
      <div className="task-list">
        {
          this.props.taskList.map(task => {
            return <Task name={task.taskName} subtasks={task.subtasks} />
          })
        }
      </div>
    )
  }
}

export default TaskList;