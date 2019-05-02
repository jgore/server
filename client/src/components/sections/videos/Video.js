import React from "react";
import PropTypes from "prop-types";

const Video = ({ video: { link, title, shortDescription } }) => (
  <div className="card video-card">
    <iframe
      title={shortDescription}
      width="100%"
      height="400"
      src={link}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
    <div className="card-body card-body-custom">
      <h5 className="card-title">{title}</h5>
      <p className="card-text">{shortDescription}</p>
    </div>
  </div>
);

Video.propTypes = {
  video: PropTypes.shape({
    link: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shortDescription: PropTypes.string
  })
};

export default Video
