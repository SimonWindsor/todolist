import React from "react";

import './DeletionConfirmer.css';

class DeletionConfirmer extends React.Component {
  render() {
    return (
      <div id="deletion-confirmer" hidden>
        <h3>Confirm Delete?</h3>
        <button className="blue-btn yes-no" onClick={this.props.onDelete}>Yes</button>
        <button className="blue-btn yes-no" onClick={this.props.onCancel}>No</button>
      </div>
    )
  }
}

export default DeletionConfirmer;