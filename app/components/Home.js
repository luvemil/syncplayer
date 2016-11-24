import React from 'react';
import {Link} from 'react-router';
import {first, without, findWhere} from 'underscore';
import YoutubePlayer from './YoutubePlayer';
import io from 'socket.io-client';
import SearchBar from './SearchBar';

const socket = io('');

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <YoutubePlayer socket={socket} />
          </div>
          <div className='col-sm-6'>
            <SearchBar socket={socket} />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
