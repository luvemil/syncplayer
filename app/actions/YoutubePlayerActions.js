import alt from '../alt';
import {assign} from 'underscore';

class YoutubePlayerActions {
  constructor() {
    this.generateActions(
      'newVideoId',
      'newPlaylistId',
      'updateSearchQuery',
      'getCurrentVideoSuccess',
      'getCurrentVideoFail',
      'registerSocket',
      'registerPlayer',
      'sendNewVideoId',
      'sendNewPlaylistId'
    );
  }

  getCurrentVideo() {
    $.ajax({ url: '/api/current' })
      .done((data) => {
        this.actions.getCurrentVideoSuccess(data)
      })
      .fail((jqXhr) => {
        this.actions.getCurrentVideoFail(jqXhr)
      });
  }
}

export default alt.createActions(YoutubePlayerActions);
