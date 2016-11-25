import alt from '../alt';
import {assign} from 'underscore';

class YoutubePlayerActions {
  constructor() {
    this.generateActions(
      'newVideoId',
      'updateSearchQuery',
      'getCurrentVideoSuccess',
      'getCurrentVideoFail'
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
