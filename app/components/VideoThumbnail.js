import React from 'react';

class VideoThumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <img src={this.props.thumb} alt={"thumbnail"} />
    );
  }
}

export default VideoThumbnail;
