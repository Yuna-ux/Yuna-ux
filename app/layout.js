import React from 'react';
import '../styles/Home-page.css';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Script Copier</title>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
};

export default Layout;
