import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'src/assets/base/css/tab.scss';
import PropTypes from 'prop-types';

const Tab = ({ tabs, shaded = true, padded = true }) => {
  const getUrl = window.location.href;
  const getActiveTab = getUrl.split('#')[1];
  const [toggleState, setToggleState] = useState(1);
  const location = useLocation();

  const handleTabName = tab => {
    return tab.toString().toLowerCase().replace(/ /g, '-');
  };

  const handleDefaultTab = (className, activeClass, action) => {
    return action === 'add'
      ? Array.from(document.getElementsByClassName(className))[0].classList.add(
          activeClass
        )
      : Array.from(
          document.getElementsByClassName(className)
        )[0].classList.remove(activeClass);
  };

  const toggleTab = tab => {
    const tabName = handleTabName(tab);
    setToggleState(tabName);
  };

  const getActiveClass = (tab, className) => {
    const tabName = handleTabName(tab);
    return toggleState === tabName ? className : '';
  };

  const paddingClass = padded ? ' is-padded' : '';
  const shadedClass = shaded ? ' is-shaded' : '';

  useEffect(() => {
    if (
      getActiveTab === undefined ||
      getActiveTab === tabs[0].title.toString().toLowerCase().replace(/ /g, '-')
    ) {
      handleDefaultTab('tab', 'active-tabs', 'add');
      handleDefaultTab('tab__content', 'active-content', 'add');
    } else {
      toggleTab(getActiveTab);
      handleDefaultTab('tab', 'active-tabs', 'remove');
      handleDefaultTab('tab__content', 'active-content', 'remove');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getActiveTab]);

  return (
    <div className="tab__container">
      <ul className="tab__list">
        {tabs?.map(tab => (
          <li
            key={tab.title}
            className={`tab${getActiveClass(tab.title, ' active-tabs')}`}
            onClick={() => toggleTab(tab.title)}
            aria-hidden="true"
          >
            <a href={`${location?.pathname}#${handleTabName(tab.title)}`}>
              {tab.title}
            </a>
          </li>
        ))}
      </ul>

      <div className="tab__content-container">
        {tabs?.map(tab => (
          <div
            className={`tab__content${getActiveClass(
              tab.title,
              ' active-content'
            )}${paddingClass}${shadedClass}`}
            key={tab.title}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};

Tab.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  shaded: PropTypes.bool,
  padded: PropTypes.bool
};

export default Tab;
