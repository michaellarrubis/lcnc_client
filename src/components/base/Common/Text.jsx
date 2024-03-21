import PropTypes from 'prop-types';

const Text = ({ tag, markup, className = '' }) => {
  const createMarkup = html => ({ __html: html });
  const renderText = type => {
    switch (type) {
      case 'h1':
        return (
          <h1
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'h2':
        return (
          <h2
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'h3':
        return (
          <h3
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'h4':
        return (
          <h4
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'h5':
        return (
          <h6
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'h6':
        return (
          <h6
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'p':
        return (
          <p
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'div':
        return (
          <div
            className={className}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      case 'error':
        return (
          <div
            className={`${className} text-[10px] font-stolzlBook text-error mt-[2px] mb-2`}
            dangerouslySetInnerHTML={createMarkup(markup)}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderText(tag)}</>;
};

Text.propTypes = {
  tag: PropTypes.string,
  markup: PropTypes.string,
  className: PropTypes.string
};

export default Text;
