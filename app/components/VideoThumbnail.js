import React from 'react';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class VideoThumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSubmit() {
    if(this.props.item.id.kind=='youtube#video') {
      YoutubePlayerActions.sendNewVideoId({videoid: this.props.item.id.videoId});
    }
  }

  render() {
    if(this.props.item.id.kind=='youtube#video') {
      return (
        <div className='row'>
          <div className='col-sm-4'>
            <img src={this.props.item.snippet.thumbnails.default.url} alt={"thumbnail"} />
          </div>
          <div className='col-sm-6'>
            <p>
              <strong>{this.props.item.snippet.title}</strong><br />
              <small>{this.props.item.snippet.channelTitle}</small><br />
            </p>
          </div>
          <div className='col-sm-2'>
            <button className='btn btn-default' onClick={this.handleSubmit.bind(this)}>Go</button>
          </div>
        </div>
      );
    }
    else {
      return (
        <div></div>
      );
    }
  }
}

export default VideoThumbnail;
