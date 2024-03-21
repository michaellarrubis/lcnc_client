import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'src/assets/base/css/breadcrumbs.scss';

const crumbsModel = [{ link: '/', name: '' }];

const Breadcrumbs = ({ crumbs = crumbsModel }) => {
  let keyCounter = 0;
  const defaultCrumbs = [{ link: '/', name: 'Dashboard' }];

  const generateUniqueKey = () => {
    keyCounter += 1;
    return `key-${keyCounter}`;
  };

  const renderBreadcrumbItem = item => {
    if (typeof item === 'string') {
      return item;
    }
    if (item.link) {
      return (
        <Link className="hover:text-gray-0" to={item.link}>
          {item.name}
        </Link>
      );
    }
    return item.name;
  };

  return (
    <div className="text-[20px]">
      <ul className="flex list-none">
        {defaultCrumbs.concat(crumbs).map((item, i, arr) => (
          <li
            key={generateUniqueKey()}
            className="text-gray-0 last:text-gray-400 last:font-semibold"
          >
            {renderBreadcrumbItem(item)}
            {i + 1 !== arr.length && (
              <img
                className="inline-block px-[8.46px] py-0 h-[7px]"
                src="/icons/right-arrow.svg"
                alt=""
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

Breadcrumbs.propTypes = {
  crumbs: PropTypes.arrayOf(Object)
};

export default Breadcrumbs;
