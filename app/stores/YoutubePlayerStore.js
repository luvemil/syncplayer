import alt from '../alt';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class YoutubePlayerStore {
  constructor() {
    this.bindActions(YoutubePlayerActions);
    this.videoid="jZxzz-N3oxM";
  }

  onPlayerSyncVideo(payload) {
    ;
  }
}

export default alt.createStore(YoutubePlayerStore);
