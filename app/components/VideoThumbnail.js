import React from 'react';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class VideoThumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    YoutubePlayerActions.sendNewVideoId({videoid: this.props.item.id.videoId});
  }

  render() {
    return (
      <li className='list-group-item'>
        <img src={this.props.item.snippet.thumbnails.default.url} alt={"thumbnail"} />
        <h3>{this.props.item.snippet.title}<small>{this.props.item.snippet.channelTitle}</small></h3>
        <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}>Go</button>
      </li>
    );
  }
}

export default VideoThumbnail;
