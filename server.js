const express = require('express');
const bodyParser = require('body-parser');
var proxy = require('http-proxy-middleware');
const path = require('path');
const http = require('http');
const app = express();

// Routes
//const api = require('./server/routes/api');

// Parsers
//app.use(bodyParser.json());
//app.use(bodyParser.text());
//app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/users', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));
app.use('/api/user', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));

app.use('/api/teams', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));
app.use('/api/team', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));

app.use('/api/projects', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));
app.use('/api/project', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));

app.use('/api/environments', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));
app.use('/api/environment', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));

app.use('/api/environment/instances', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));
app.use('/api/environment/instance', proxy({target: 'http://kong-proxy:8000', changeOrigin: true}));

// API locatoin
//app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'dist/index.html'));
})

// Set Server Port
const port = process.env.PORT || '9090';
app.set('port', port);

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)});
