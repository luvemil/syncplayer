import React from 'react';

class Controls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="btn-group">
        <button className="btn btn-default" onClick={this.props.callbacks.pressPlay}>Play</button>
        <button className="btn btn-default" onClick={this.props.callbacks.pressPause}>Pause</button>
        <button className="btn btn-default" onClick={this.props.callbacks.pressSync}>Sync</button>
        <button className="btn btn-default" onClick={this.props.callbacks.pressReset}>Reset</button>
      </div>
    )
  };
}

export default Controls;
