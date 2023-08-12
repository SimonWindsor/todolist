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
                marked={task.marked}
                subtasks={task.subtasks}
                onExpandOrCollapse={this.props.onExpandOrCollapse}
                onMark={this.props.onMark}
              />
            )
          })
        }
      </div>
    )
  }
}

export default TaskList;