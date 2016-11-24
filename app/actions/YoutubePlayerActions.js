import alt from '../alt';
import {assign} from 'underscore';

class YoutubePlayerActions {
  constructor() {
    this.generateActions(
      'playerSyncVideo'
    );
  }
}

export default alt.createActions(YoutubePlayerActions);
