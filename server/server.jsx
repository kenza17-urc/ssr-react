const express = require('express');
const path = require('path');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const App = require('../src/App').default;
const axios = require('axios');

const app = express();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    console.log('Fetched todos from API:', response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).send(error.toString());
  }
});

app.get('*', async (req, res) => {
  const context = {};

  let todos = [];
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
    todos = response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
  }

  const app = ReactDOMServer.renderToString(
    React.createElement(StaticRouter, { location: req.url, context: context },
      React.createElement(App, { initialTodos: todos })
    )
  );

  const indexFile = path.resolve(__dirname, '..', 'build', 'index.html');
  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('ya un probleme:', err);
      return res.status(500).send('pas de chance!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
