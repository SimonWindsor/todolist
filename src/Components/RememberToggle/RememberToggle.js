import React from 'react';
import './RememberToggle.css';

class RememberToggle extends React.Component {
  constructor(props) {
    super(props);


  }

  render() {
    return (
      <div>
        <input type="checkbox" id="switch" onChange="" />
        <label for="switch"><div id="slider"></div></label>
      </div>
    )
  }
}

export default RememberToggle;