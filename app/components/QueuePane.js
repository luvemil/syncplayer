import React from 'react';
import SearchPaneStore from '../stores/SearchPaneStore';
import SearchPaneActions from '../actions/SearchPaneActions';

class QueuePane extends React.Component {
  constructor(props) {
    super(props);
    this.state = SearchPaneStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SearchPaneStore.listen(this.onChange);
  }

  componentWillUnmount() {
    SearchPaneStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div>
        <p>Haha</p>
      </div>
    )
  }
}

export default QueuePane;
