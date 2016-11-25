import alt from '../alt';
import SearchPaneActions from '../actions/SearchPaneActions';

class SearchPaneStore {
  constructor() {
    this.bindActions(SearchPaneActions);
    this.queue = [];
    this.searchresults = [];
    this.searchquery = '';
    this.nextpagetoken = '';
  }

  onGetSearchResultsSuccess(data) {
    this.searchresults = data.items;
    console.log(this.searchresults);
  }

  onSetCurrentSearch(searchquery) {
    this.currentsearch = searchquery;
  }

  onSetNextPageToken(pagetoken) {
    this.nextpagetoken = pagetoken;
  }

  onGetNextSearchPageSuccess(data) {
    this.searchresults = this.searchresults.concat(data.items);
    console.log(this.searchresults);
  }

  onUpdateSearchQuery(event) {
    this.searchquery = event.target.value;
  }
}

export default alt.createStore(SearchPaneStore);
