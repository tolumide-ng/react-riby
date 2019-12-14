import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SingleGif from './index';
import store from '../../../store';

// imgSrc, title, id, history = {}
const imgSrc = '';
const title = 'title';
const id = 'longId';
const history = { push: jest.fn() };

describe('Single Component', () => {
  test('Shoul return a single component', () => {
    const defaultProps = { imgSrc, title, id, history };

    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SingleGif {...defaultProps} />
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment).toMatchSnapshot();
  });
});
