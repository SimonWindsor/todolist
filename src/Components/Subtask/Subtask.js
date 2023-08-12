import React from 'react';

import './Subtask.css';

class Subtask extends React.Component {
  render() {
    return(
      <div className="subtask">
        <input type="checkbox" className='subtask' id={this.props.subtask.name} />
        <label for={this.props.subtask.name}>{this.props.subtask.name}</label>
      </div>
    )
  }
}

export default Subtask;