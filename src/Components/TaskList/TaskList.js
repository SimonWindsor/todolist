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
                id={task.id}
                name={task.taskName}
                expanded={task.expanded}
                marked={task.marked}
                subtasks={task.subtasks}
                onExpandOrCollapse={this.props.onExpandOrCollapse}
                onMark={this.props.onMark}
                onMarkSub={this.props.onMarkSub}
                allSubsMarked={this.props.allSubsMarked}
                unmarkAllSubs={this.props.unmarkAllSubs}
                onDelete={this.props.onDelete}
              />
            )
          })
        }
      </div>
    )
  }
}

export default TaskList;