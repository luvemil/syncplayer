import alt from '../alt';

class SearchPaneActions {
  constructor() {
    this.generateActions(
      'addToQueue',
      'getSearchResultsSuccess',
      'getSearchResultsFail',
      'getNextSearchPageSuccess',
      'updateSearchQuery',
      'setCurrentSearch',
      'setNextPageToken'
    );
  }

  getSearchResults(searchquery) {
    $.ajax({ url: '/api/searchvid/' + searchquery })
      .done(data => {
        this.actions.getSearchResultsSuccess(data);
        this.actions.setCurrentSearch(searchquery);
        this.actions.setNextPageToken(data.nextPageToken);
      });
  }

  getNextSearchPage(currentsearch, nextpagetoken) {
    $.ajax({ url: '/api/searchvid/' + currentsearch +"/page/" + nextpagetoken })
      .done(data => {
        this.actions.getNextSearchPageSuccess(data);
        this.actions.setNextPageToken(data.nextPageToken);
      });
  }
}

export default alt.createActions(SearchPaneActions);
