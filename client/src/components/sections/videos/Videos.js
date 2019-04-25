import React from "react";
import PropTypes from "prop-types";
import Video from "./Video";

const Videos = ({ videos }) => (
  <div className="flexible flexible-column flexible-horizontal-center">
    {videos.map((value, index) => (
      <Video key={index} video={value} />
    ))}
  </div>
);

Videos.propTypes = {
  videos: PropTypes.array.isRequired
};

export default Videos;
