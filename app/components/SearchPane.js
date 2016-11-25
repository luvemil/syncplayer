import React from 'react';
import SearchPaneStore from '../stores/SearchPaneStore';
import SearchPaneActions from '../actions/SearchPaneActions';
import VideoThumbnail from './VideoThumbnail';
import {first, without, findWhere} from 'underscore';

class SearchPane extends React.Component {
  constructor(props) {
    super(props);
    this.state = SearchPaneStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SearchPaneStore.listen(this.onChange);
    SearchPaneActions.getSearchResults();
  }

  componentWillUnmount() {
    SearchPaneStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var videos = this.state.searchresults.map((item, index) => {
      return (
        <VideoThumbnail thumb={item.snippet.thumbnails.default.url} />
      )
    });
    return (
      <div>
        {videos}
      </div>
    )
  }
}

export default SearchPane;
