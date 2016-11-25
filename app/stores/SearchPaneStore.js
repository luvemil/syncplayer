import alt from '../alt';
import SearchPaneActions from '../actions/SearchPaneActions';

class SearchPaneStore {
  constructor() {
    this.bindActions(SearchPaneActions);
    this.queue = [];
    this.searchresults = [];
  }
}

export default alt.createStore(SearchPaneStore);
