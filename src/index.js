import React from 'react';
import ReactDOM, { render } from 'react-dom';
import Main from './main/routes/index.jsx';
import './styles/index.scss';

const app = document.getElementById('app');

ReactDOM.render(<Main />, app);
