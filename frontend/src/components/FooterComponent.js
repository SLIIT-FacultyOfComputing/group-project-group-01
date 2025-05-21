import React from 'react';

const FooterComponent = () => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      'footer',
      null,
      React.createElement(
        'nav',
        {
          className: 'navbar fixed-bottom navbar-expand-lg navbar-dark',
          style: { backgroundColor: '#1a3e2a' }
        },
        React.createElement('span', null)
      )
    )
  );
};

export default FooterComponent;