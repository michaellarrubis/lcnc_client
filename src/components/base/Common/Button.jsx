import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Button = ({
  children,
  modifier,
  name,
  link,
  onClick = () => {},
  disabled = false,
  type,
  openNewTab,
  projectId,
  tabIndex,
  spanModifier
}) => {
  const navigate = useNavigate();
  const to = link || '/';
  const handleClick = useCallback(() => {
    if (openNewTab) window.open(`${link}/${projectId}`, '_blank');
    else navigate(to);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, openNewTab, projectId, navigate, to]);
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      disabled={disabled}
      className={`button ${modifier}${disabled ? ' is-disabled' : ''}`}
      tabIndex={tabIndex}
      onClick={onClick || handleClick}
    >
      {children !== undefined && children !== null ? children : null}
      <span className={`button__text relative ${spanModifier}`}>{name}</span>
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.any,
  modifier: PropTypes.string,
  spanModifier: PropTypes.string,
  name: PropTypes.string,
  link: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  openNewTab: PropTypes.bool,
  projectId: PropTypes.number,
  tabIndex: PropTypes.number
};

export default Button;
