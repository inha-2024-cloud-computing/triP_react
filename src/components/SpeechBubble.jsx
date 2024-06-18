import React from "react";
import PropTypes from "prop-types";

const SpeechBubble = ({ text, place }) => {
  return (
    <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 w-4/5 bg-orange-100 p-4 rounded-lg shadow-md mt-4">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-100 rotate-45"></div>
      <p className="text-center text-gray-900">{text}</p>
    </div>
  );
};

SpeechBubble.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SpeechBubble;
