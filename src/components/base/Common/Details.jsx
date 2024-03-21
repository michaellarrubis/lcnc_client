import React from 'react';
import 'src/assets/base/css/detail.scss';

const Details = props => {
  const { heading } = props;

  return (
    <div className="detail__container">
      <div className="detail__heading">
        <h2 className="detail__text">{heading}</h2>
      </div>

      {props?.obj && Object.keys(props?.obj).length > 0 ? (
        <div className="detail__inner">
          {Object.keys(props?.obj).map(key => (
            <p className="detail__label" key={key}>
              {key}
              <span className="detail__info">{props?.obj[key]}</span>
            </p>
          ))}
        </div>
      ) : null}

      {props?.arr
        ? props?.arr?.map(obj => (
            <div className="detail__inner" key={obj}>
              {Object.entries(obj)?.map(([key, value]) => (
                <p className="detail__label" key={key}>
                  {key}
                  <span className="detail__info">{value}</span>
                </p>
              ))}
            </div>
          ))
        : null}
    </div>
  );
};

export default Details;
