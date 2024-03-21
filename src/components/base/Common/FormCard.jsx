import PropTypes from 'prop-types';

const FormCard = ({ className = '', children }) => {
  return <div className={`mb-[20px] w-full ${className}`}>{children}</div>;
};

FormCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string
};
export default FormCard;
