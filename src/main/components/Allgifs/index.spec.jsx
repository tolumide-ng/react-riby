/* eslint-disable react/jsx-props-no-spreading */
import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Allgifs from './index';
import store from '../../../store';

const history = { push: jest.fn() };
const fetchAllGifs = jest.fn(() => {
  return [
    {
      id: '329y3249',
      title: 'title',
      source: 'source',
      rating: 'rating',
      username: 'username',
      images: {
        original: {
          url: 'checkout',
        },
      },
    },
    {
      id: '45',
      title: 'title',
      source: 'source',
      rating: 'rating',
      username: 'username',
      images: {
        original: {
          url: 'anotherone',
        },
      },
    },
  ];
});

const allGifStatus = '';

describe('AllGifs component', () => {
  test('Should render the allGifs component', () => {
    const defaultProps = {
      history,
      allGifStatus,
      fetchAllGifs,
    };
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Allgifs {...defaultProps} />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('Should render loader when allGifStatus is pending', () => {
    const defaultProps = {
      history,
      allGifStatus: 'pending',
      fetchAllGifs,
    };
    const { asFragment, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Allgifs {...defaultProps} />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
    expect(getByTestId('pageloading')).toBeTruthy();
  });
});
