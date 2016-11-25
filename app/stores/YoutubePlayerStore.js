import alt from '../alt';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class YoutubePlayerStore {
  constructor() {
    this.bindActions(YoutubePlayerActions);
    this.videoid='';
    this.searchQuery='';
  }

  onNewVideoId(payload) {
    this.videoid = payload.newVideoId;
  }

  onUpdateSearchQuery(event) {
    this.searchQuery = event.target.value;
  }

  onGetCurrentVideoSuccess(data) {
    this.videoid = data.videoid;
  }

  onRegisterSocket(data) {
    this.socket = data.socket;
  }

  onSendNewVideoId(data) {
    this.socket.emit('setNewVideoId',{newVideoId: data.videoid});
  }
}

export default alt.createStore(YoutubePlayerStore);
