import 'src/assets/base/css/sectionTitle.scss';
import React from 'react';
import PropTypes from 'prop-types';

const SectionTitle = ({ title }) => {
  return <h2 className="section-title">{title}</h2>;
};

SectionTitle.propTypes = {
  title: PropTypes.string
};

export default SectionTitle;
