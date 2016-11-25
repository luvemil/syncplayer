import alt from '../alt';
import YoutubePlayerActions from '../actions/YoutubePlayerActions';

class YoutubePlayerStore {
  constructor() {
    this.bindActions(YoutubePlayerActions);
    this.videoid='';
    this.searchQuery='';
    this.playlistid='';
  }

  onNewVideoId(payload) {
    this.videoid = payload.videoid;
  }

  onNewPlaylistId(payload) {
    this.player.cuePlaylist(payload.playlistid);
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

  onRegisterPlayer(data) {
    this.player = data.player;
  }

  onSendNewVideoId(data) {
    this.socket.emit('setNewVideoId',data);
  }

  onSendNewPlaylistId(data) {
    this.socket.emit('setNewPlaylistId',data);
  }
}

export default alt.createStore(YoutubePlayerStore);
