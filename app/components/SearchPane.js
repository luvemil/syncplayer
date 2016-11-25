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
  }

  componentWillUnmount() {
    SearchPaneStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleClick() {
    SearchPaneActions.getSearchResults();
  }

  render() {
    var videos = this.state.searchresults.map((item, index) => {
      return (
        <li className="list-group-item">
          <VideoThumbnail thumb={item.snippet.thumbnails.default.url} />
        </li>
      )
    });
    return (
      <div>
        <button className='btn btn-default' onClick={this.handleClick.bind(this)}>Search</button>
        <ul className='list-group'>
          {videos}
        </ul>
      </div>
    )
  }
}

export default SearchPane;
