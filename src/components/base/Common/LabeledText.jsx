import 'src/assets/base/css/labeledText.scss';
import React from 'react';
import PropTypes from 'prop-types';

const LabeledText = ({ label, text, templateDescription }) => {
  const modifiedText = typeof text === 'string' ? [text] : text;
  let keyCounter = 0;

  const generateUniqueKey = () => {
    keyCounter += 1;
    return `key-${keyCounter}`;
  };
  return (
    <div>
      {templateDescription ? (
        <p className="evaluation__template-information-value description">
          {modifiedText?.map(t => t)}
        </p>
      ) : (
        <div className="labeled-text">
          <span className="label">{label}</span>
          <ul className="label-text-list">
            {modifiedText?.map(t => (
              <li className="label-text-item text" key={generateUniqueKey}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
LabeledText.propTypes = {
  label: PropTypes.string,
  text: PropTypes.string,
  templateDescription: PropTypes.bool
};

export default LabeledText;
