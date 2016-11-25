import alt from '../alt';
import SearchPaneActions from '../actions/SearchPaneActions';

class SearchPaneStore {
  constructor() {
    this.bindActions(SearchPaneActions);
    this.queue = [];
    this.searchresults = [];
  }

  onGetSearchResultsSuccess(data) {
    this.searchresults = data.items;
  }
}

export default alt.createStore(SearchPaneStore);
