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

  handleSubmit(event) {
    event.preventDefault();

    SearchPaneActions.getSearchResults(this.state.searchquery.trim());
  }

  handleLoadMore(event) {
    SearchPaneActions.getNextSearchPage(this.state.currentsearch,this.state.nextpagetoken);
  }

  render() {
    var videos = this.state.searchresults.map((item, index) => {
      return (
        <VideoThumbnail item={item} />
      )
    });

    // var morebutton = (<div></div>) ;
    //
    // if(this.state.nextpagetoken != ''){
    //   morebutton = (
    //     <div className='row'>
    //       <div className='col-sm-12'>
    //         <button className='btn btn-default' onClick={SearchPaneActions.getNextSearchPage(this.state.currentsearch,this.state.nextpagetoken)}>Load More</button>
    //       </div>
    //     </div>
    //   );
    // }

    var morebutton = (<div></div>) ;


    if(this.state.nextpagetoken != '') {
      morebutton = (
        <div className='row'>
          <div className='col-sm-12'>
            <button className='btn btn-default' onClick={this.handleLoadMore.bind(this)}>Load More</button>
          </div>
        </div>
      );
    }


    return (
      <div>
        <div className="panel panel-info">
          <div className="panel-heading">
            Search
          </div>
          <div className="panel-body fixed-panel">
            <div className='row'>
              <div className='col-sm-12'>
                <form ref='searchVideoForm' className='form-inline' onSubmit={this.handleSubmit.bind(this)}>
                  <div className='form-group'>
                    <label>Search: </label>
                    <div className='input-group'>
                      <input type='text' className='form-control' id='searchinput' value={this.state.searchquery} onChange={SearchPaneActions.updateSearchQuery}/>
                      <span className='input-group-btn'>
                        <button className='btn btn-default' onClick={this.handleSubmit.bind(this)} type='submit'>Go</button>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            {videos}
            {morebutton}
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPane;
