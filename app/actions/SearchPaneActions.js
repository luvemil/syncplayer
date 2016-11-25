import alt from '../alt';

class SearchPaneActions {
  constructor() {
    this.generateActions(
      'addToQueue',
      'getSearchResultsSuccess',
      'getSearchResultsFail'
    );
  }

  getSearchResults() {
    $.ajax({ url: '/api/searchvid/test' })
      .done(data => {
        this.actions.getSearchResultsSuccess(data);
      });
  }
}

export default alt.createActions(SearchPaneActions);
