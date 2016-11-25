import React from 'react';
import YouTube from 'react-youtube';
import YoutubePlayerStore from '../stores/YoutubePlayerStore';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';
import Controls from './Controls';

class YoutubePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = YoutubePlayerStore.getState();
    this.onChange = this.onChange.bind(this);
    YoutubePlayerActions.registerSocket({socket: this.props.socket});
  }

  componentDidMount() {
    YoutubePlayerStore.listen(this.onChange);
    YoutubePlayerActions.getCurrentVideo();
  }

  componentWillUnmount() {
    YoutubePlayerStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  pressPlay() {
    this.props.socket.emit('pressPlay');
  }

  pressPause() {
    this.props.socket.emit('pressPause');
  }

  pressSync() {
    this.props.socket.emit('pressSync', {time: this.player.getCurrentTime()});
  }

  pressReset() {
    this.props.socket.emit('pressReset');
  }

  onReadyHandler(event) {
    let socket = this.props.socket;

    this.player = event.target;

    socket.on('playVideo', (data) => {
      event.target.playVideo();
    });

    socket.on('pauseVideo', (data) => {
      event.target.pauseVideo();
    });

    socket.on('syncVideo', (data) => {
      event.target.seekTo(data.time);
    });

    socket.on('resetVideo', (data) => {
      event.target.seekTo(0);
    });

    socket.on('pushNewVideoId', (data) => {
      YoutubePlayerActions.newVideoId(data);
    });
  }

  render() {
    var buttonPresses = {
      pressPlay: this.pressPlay.bind(this),
      pressPause: this.pressPause.bind(this),
      pressSync: this.pressSync.bind(this),
      pressReset: this.pressReset.bind(this)
    };

    const opts={
      height: '390',
      width: '640'
    }

    return (
      <div>
        <YouTube
          videoId={this.state.videoid}
          opts={opts}
          onReady={this.onReadyHandler.bind(this)}
        />
        <br />
        <Controls callbacks={buttonPresses} />
      </div>
    );
  }
}

export default YoutubePlayer;
