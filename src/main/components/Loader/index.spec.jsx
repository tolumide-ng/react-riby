/* eslint-disable react/jsx-props-no-spreading */
import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Loader from './index';
import store from '../../../store';

describe('Loader', () => {
  test('Should return the Loader', () => {
    const { asFragment, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Loader />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
    expect(getByTestId('loader')).toBeTruthy();
  });

  test('Shouldreturn the small Loader', () => {
    const { asFragment, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Loader className="loader-small" />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
    expect(getByTestId('loader')).toBeTruthy();
  });
});
