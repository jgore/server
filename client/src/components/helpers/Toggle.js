import React from "react";
import PropTypes from "prop-types";

const Toggle = ({ title, titleOnDrop, isDrop, onClick, ...props }) => (
  <div>
    {isDrop ? (
      <p onClick={() => onClick()} style={{ textAlign: "center" }}>
        {titleOnDrop}
      </p>
    ) : (
      <p onClick={() => onClick()} style={{ textAlign: "center" }}>
        {title}
      </p>
    )}
    {isDrop ? <div className="toggle">{props.children}</div> : ""}
  </div>
);
Toggle.propTypes = {
  title: PropTypes.string.isRequired,
  titleOnDrop: PropTypes.string,
  isDrop: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export { Toggle };
