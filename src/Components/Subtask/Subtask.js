import React from 'react';

import './Subtask.css';

class Subtask extends React.Component {
  render() {
    return(
      <div className="subtask">
        <input type="checkbox" className='subtask' id={this.props.subtask} />
        <label for={this.props.subtask}>{this.props.subtask}</label>
      </div>
    )
  }
}

export default Subtask;