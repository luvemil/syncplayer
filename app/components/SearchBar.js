import React from 'react';
import YoutubePlayerStore from '../stores/YoutubePlayerStore';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = YoutubePlayerStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    YoutubePlayerStore.listen(this.onChange);
  }

  componentWillUnmount() {
    YoutubePlayerStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.socket.emit('setNewVideoId',{videoid: this.state.searchQuery});
  }


  render() {
    return (
      <form ref='videoIdForm' className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
        <div className='form-group'>
          <label>Video ID: </label>
          <div className='input-group'>
            <input type='text' className='form-control' id='newVideoId' value={this.state.searchQuery} onChange={YoutubePlayerActions.updateSearchQuery} />
            <span className='input-group-btn'>
              <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}>Set</button>
            </span>
          </div>
        </div>
      </form>
    );
  }
}

export default SearchBar;
