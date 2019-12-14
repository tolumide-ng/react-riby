import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './index';
import store from '../../store';

describe('Home Page', () => {
  test('Should render the Home Page', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
  });
});
