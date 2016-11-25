import alt from '../alt';
import SearchPaneActions from '../actions/SearchPaneActions';

class SearchPaneStore {
  constructor() {
    this.bindActions(SearchPaneActions);
    this.queue = [];
    this.searchresults = [];
    this.searchquery = '';
  }

  onGetSearchResultsSuccess(data) {
    this.searchresults = data.items;
  }

  onUpdateSearchQuery(event) {
    this.searchquery = event.target.value;
  }
}

export default alt.createStore(SearchPaneStore);
