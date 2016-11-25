import React from 'react';
import {Link} from 'react-router';
import {first, without, findWhere} from 'underscore';
import YoutubePlayer from './YoutubePlayer';
import io from 'socket.io-client';
import SearchBar from './SearchBar';
import SearchPane from './SearchPane';

const socket = io('');

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 col-lg-6'>
            <YoutubePlayer socket={socket} />
          </div>
          <div className='col-lg-6 col-sm-3'>
            <div className='row'>
              <div className='col-sm-12'>
                <SearchBar socket={socket} />
              </div>
            </div>
            <div className='row'>
              <div className='col-sm-12'>
                <SearchPane />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
