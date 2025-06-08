import '../styles/Home-page.css';

const Layout = ({ children }) => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Server Sided</title>
            </head>
            <body>{children}</body>
        </html>
    );
};

export default Layout;
