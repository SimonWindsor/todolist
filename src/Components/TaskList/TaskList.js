import React from "react";

import Task from '../Task/Task';

class TaskList extends React.Component {
  render() {
    return(
      <div className="task-list">
        {
          this.props.taskList.map(task => {
            return (
              <Task 
                name={task.taskName}
                expanded={task.expanded}
                subtasks={task.subtasks}
                onSelection={this.props.onSelection}
              />
            )
          })
        }
      </div>
    )
  }
}

export default TaskList;