import alt from '../alt';

class SearchPaneActions {
  constructor() {
    this.generateActions(
      'addToQueue',
      'getSearchResultsSuccess',
      'getSearchResultsFail',
      'updateSearchQuery'
    );
  }

  getSearchResults(searchquery) {
    $.ajax({ url: '/api/searchvid/' + searchquery })
      .done(data => {
        this.actions.getSearchResultsSuccess(data);
      });
  }
}

export default alt.createActions(SearchPaneActions);
