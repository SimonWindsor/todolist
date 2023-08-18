import React from 'react';

import './Subtask.css';

class Subtask extends React.Component {
  constructor(props) {
    super(props);

    this.toggleMark = this.toggleMark.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  toggleMark() {
    if(!this.props.mainMarked)
      this.props.onMark(this.props.mainName, this.props.name);
  }

  isChecked() {
    if(this.props.mainMarked)
      return true;
    else if(this.props.marked)
      return true;
    else
      return false;
  }

  render() {
    return(
      <div className="subtask">
        <input
          type="checkbox"
          className='subtask'
          id={this.props.name}
          checked={this.isChecked()}
          onClick={this.toggleMark}
        />
        <label htmlFor={this.props.name}>{this.props.name}</label>
      </div>
    )
  }
}

export default Subtask;