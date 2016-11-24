import React from 'react';
import {Link} from 'react-router';
import {first, without, findWhere} from 'underscore';
import MarkdownRender from './MarkdownRender';
import YoutubePlayer from './YoutubePlayer';
import Controls from './Controls';
import io from 'socket.io-client';

const socket = io('');

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  pressPlay() {
    socket.emit('pressPlay');
  }

  pressPause() {
    socket.emit('pressPause');
  }

  pressSync() {
    socket.emit('pressSync');
  }

  pressReset() {
    socket.emit('pressReset');
  }

  render() {
    var buttonPresses = {
      pressPlay: this.pressPlay.bind(this),
      pressPause: this.pressPause.bind(this),
      pressSync: this.pressSync.bind(this),
      pressReset: this.pressReset.bind(this)
    };

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <YoutubePlayer socket={socket} />
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-6'>
            <Controls callbacks={buttonPresses} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
