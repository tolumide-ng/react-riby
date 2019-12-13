import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { Provider } from 'react-redux';
import Main from './main/routes';

// const app = document.querySelector('#app');
const app = document.getElementById('app');

ReactDOM.render(<Main />, app);

// render(
// 	<Provider>
// 		<Main />
// 	</Provider>,
// 	app
// );
