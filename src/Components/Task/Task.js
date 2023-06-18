import React from "react";

import Subtask from '../Subtask/Subtask'

class Task extends React.Component {
  render() {
    return(
      <div className="task">
        <h2>{this.props.name}</h2>
        {
          this.props.subtasks.map(subtask => {
            return <Subtask subtask={subtask} />
          })
        }
      </div>
    )
  }
}

export default Task;