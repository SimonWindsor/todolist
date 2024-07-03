import React from 'react';
import './RememberToggle.css';

class RememberToggle extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onToggle();
  }

  render() {
    return (
      <div>
        <input type="checkbox" id="switch" checked={this.props.isChecked} onChange={this.handleChange} aria-label="Remember tasks toggle" />
        <label htmlFor="switch"><div id="slider"></div></label>
      </div>
    )
  }
}

export default RememberToggle;