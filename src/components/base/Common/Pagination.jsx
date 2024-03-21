/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ data, pages, pagination, setCurrentPage }) => {
  const [currentButton, setCurrentButton] = useState(1);
  const [belowTenPages, setBelowTenPages] = useState(false);
  const [arrOfCurrentButtons, setArrCurrentButtons] = useState([]);
  const numberOfPages = [];

  for (let i = 1; i <= pages.length; i += 1) {
    numberOfPages.push(i);
  }

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrentButtons];
    const dotsInitial = '...';
    const dotsLeft = '... ';
    const dotsRight = ' ...';

    if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [
        1,
        dotsLeft,
        ...sliced1,
        ...sliced2,
        dotsRight,
        numberOfPages.length
      ];
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrentButtons[arrOfCurrentButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrentButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrentButtons[3] - 2);
    }

    setCurrentPage(currentButton);
    pagination(currentButton, data);
    setArrCurrentButtons(tempNumberOfPages);

    if (pages.length <= 9) {
      setBelowTenPages(true);
      pagination(currentButton, data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentButton]);

  const paginateButton = buttons => {
    return buttons.map(page => (
      <li
        key={page}
        className={`pagination__item${
          page === currentButton ? ' pagination__item--active' : ''
        }`}
      >
        <button
          type="button"
          className="pagination__button"
          onClick={() => {
            pagination(page, data);
            setCurrentButton(page);
          }}
        >
          {page}
        </button>
      </li>
    ));
  };

  useEffect(() => {
    pagination(currentButton, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        <li
          className={`pagination__item${
            currentButton === 1 ? ' pagination__item--disabled' : ''
          }`}
        >
          <button
            type="button"
            className="pagination__button pagination__button--prev"
            onClick={() => {
              setCurrentButton(prev => (prev === 1 ? prev : prev - 1));
              pagination(currentButton - 1, data);
            }}
          />
        </li>
        {belowTenPages
          ? paginateButton(pages)
          : paginateButton(arrOfCurrentButtons)}
        <li
          className={`pagination__item${
            currentButton === numberOfPages.length
              ? ' pagination__item--disabled'
              : ''
          }`}
        >
          <button
            type="button"
            className="pagination__button pagination__button--next"
            onClick={() => {
              setCurrentButton(prev =>
                prev === numberOfPages.length ? prev : prev + 1
              );
              pagination(currentButton + 1, data);
            }}
          />
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
  pages: PropTypes.arrayOf(Number),
  pagination: PropTypes.func,
  setCurrentPage: PropTypes.func
};
export default Pagination;
