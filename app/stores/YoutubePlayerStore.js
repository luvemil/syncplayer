import alt from '../alt';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class YoutubePlayerStore {
  constructor() {
    this.bindActions(YoutubePlayerActions);
    this.videoid="jZxzz-N3oxM";
    this.searchQuery=''
  }

  onNewVideoId(payload) {
    this.videoid = payload.newVideoId;
  }

  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }
}

export default alt.createStore(YoutubePlayerStore);
