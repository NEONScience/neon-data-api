/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

import getGraphiQL from './GraphiQL';

import './App.css';
import 'graphiql/graphiql.css';

ReactDOM.render(
  getGraphiQL(),
  document.getElementById('root'),
);
