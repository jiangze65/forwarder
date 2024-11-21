const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined')); // or use 'dev' for concise colored output
// Proxy configuration for redirecting /callback to the backend service
app.use('/callback', createProxyMiddleware({
    target: 'https://ndappl-dev.outsystemscloud.com/OIDC/rest/Callback/Redirect',
    changeOrigin: true,
    secure: true,
    cookieDomainRewrite: 'ndappl-dev.outsystemscloud.com',  // Rewrite the domain of cookies if necessary
    onProxyReq: (proxyReq, req, res) => {
//      console.log(`processing request`);
//      console.log(`${req.method} ${req.url}`);
//      console.log('Headers:', req.headers);
//      console.log('Query:', req.query);
//      console.log('Body:', req.body); // Make sure to use body-parser for parsing request bodies
        // Copy cookies from the request to the proxy request
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    }
  }));

// Start the server
const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});