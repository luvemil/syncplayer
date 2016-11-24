import React from 'react';
import {Link} from 'react-router';
import {first, without, findWhere} from 'underscore';
import Remarkable from 'remarkable';

class MarkdownRender extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var md = new Remarkable();

    return (
      <div dangerouslySetInnerHTML={{__html: md.render(this.props.markdown)}} />
    );
  }
}

export default MarkdownRender;
