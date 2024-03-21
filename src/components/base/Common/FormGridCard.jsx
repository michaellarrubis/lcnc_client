import PropTypes from 'prop-types';

const FormGridCard = ({ className = '', cols, row, gap, children }) => {
  return (
    <div
      className={`grid ${cols ? `grid-cols-${cols}` : ''} ${
        row ? `grid-rows-${row}` : ''
      } ${gap ? `gap-${gap}` : 'gap-4'} ${className}`}
    >
      {children}
    </div>
  );
};

FormGridCard.propTypes = {
  children: PropTypes.node,
  cols: PropTypes.string,
  row: PropTypes.string,
  gap: PropTypes.string,
  className: PropTypes.string
};
export default FormGridCard;
