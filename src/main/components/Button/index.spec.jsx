import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Button from './index';
import store from '../../../store';

describe('Button Component', () => {
  test('Should return the Loader', () => {
    const { asFragment, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Button />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
    expect(getByTestId('buttonComponent')).toBeTruthy();
  });
});

// classes, role, title, ...rest
