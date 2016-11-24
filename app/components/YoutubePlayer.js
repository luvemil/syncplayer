import React from 'react';
import YouTube from 'react-youtube';
import YoutubePlayerStore from '../stores/YoutubePlayerStore';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class YoutubePlayer extends React.Component {
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

  onReadyHandler(event) {
    let socket = this.props.socket;

    socket.on('playVideo', (data) => {
      event.target.playVideo();
    });

    socket.on('pauseVideo', (data) => {
      event.target.pauseVideo();
    });

    socket.on('syncVideo', (data) => {
      console.log("Received Sync Video");
    });

    socket.on('resetVideo', (data) => {
      event.target.seekTo(0);
    });
  }

  render() {
    const opts={
      height: '390',
      width: '640'
    }
    return (
      <YouTube
        videoId={this.state.videoid}
        opts={opts}
        onReady={this.onReadyHandler.bind(this)}
      />
    );
  }
}

export default YoutubePlayer;
