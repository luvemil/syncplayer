import alt from '../alt';
import {assign} from 'underscore';

class YoutubePlayerActions {
  constructor() {
    this.generateActions(
      'newVideoId',
      'updateSearchQuery'
    );
  }
}

export default alt.createActions(YoutubePlayerActions);
