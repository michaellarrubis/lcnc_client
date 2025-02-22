import PropTypes from 'prop-types';

const SortingArrows = ({ order }) => {
  let upArrow = '';
  let downArrow = '';
  switch (order) {
    case 'ASC':
      upArrow = '#00000029';
      break;
    case 'DSC':
      downArrow = '#00000029';
      break;
    default:
      break;
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8.02"
      height="13.509"
      viewBox="0 0 8.02 13.509"
    >
      <g
        id="Group_1882"
        data-name="Group 1882"
        transform="translate(-431.99 -244.746)"
      >
        <g
          id="Group_1282"
          data-name="Group 1282"
          transform="translate(171.171 55.254)"
        >
          <path
            id="Path_886"
            data-name="Path 886"
            d="M0,0,5.671,1.109,1.109,5.671Z"
            transform="translate(264.829 189.491) rotate(45)"
            fill={upArrow ?? '#222'}
          />
          <path
            id="Path_887"
            data-name="Path 887"
            d="M-.012,5.669,5.659,4.56,1.1,0Z"
            transform="translate(260.829 198.983) rotate(-45)"
            fill={downArrow ?? '#222'}
          />
        </g>
      </g>
    </svg>
  );
};

SortingArrows.propTypes = {
  order: PropTypes.string
};

export default SortingArrows;
