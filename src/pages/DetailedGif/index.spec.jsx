/* eslint-disable react/jsx-props-no-spreading */
import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import DetailedGif from './index';
import store from '../../store';

const history = { push: jest.fn() };
const location = { pathname: '/pathname' };
const fetchDetailedGif = jest.fn(() => {
  return [
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

const detailedGifStatus = '';

describe('DetailedGif Page', () => {
  test('Should render the Detailed Gif Page', () => {
    const defaultProps = {
      history,
      location,
      fetchDetailedGif,
      detailedGifStatus,
    };
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailedGif {...defaultProps} />
        </MemoryRouter>
      </Provider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('DetailedGif Page should render loading if detailed status is pending', () => {
    const defaultProps = {
      history,
      location,
      fetchDetailedGif,
      detailedGifStatus: 'pending',
    };
    const { asFragment, getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <DetailedGif {...defaultProps} />
        </MemoryRouter>
      </Provider>,
    );
    expect(getByTestId('pageloading')).toBeTruthy();
    expect(asFragment).toMatchSnapshot();
  });
});
