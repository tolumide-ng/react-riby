/* eslint-disable react/jsx-props-no-spreading */
import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './index';
import store from '../../../store';

describe('Loader', () => {
  test('Should return the Navigation Bar', () => {
    const { asFragment, getByTestId, getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <NavBar />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
    expect(getByTestId('navbar')).toBeTruthy();
    expect(getByText('React-Riby')).toBeTruthy();
  });
});
