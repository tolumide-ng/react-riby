import { render, fireEvent, cleanup } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from './index';
import store from '../../../store';

const history = { push: jest.fn() };
const searchGifStatus = '';
const setSearchText = () => jest.fn();
const searchText = '';
const searchGifs = () => jest.fn();

describe('SearchBar', () => {
  test('Should return the Search Bar', () => {
    const defaultProps = {
      history,
      searchGifStatus,
      setSearchText,
      searchText,
      searchGifs,
    };
    const placeholderName = 'search here';
    const { asFragment, getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchBar {...defaultProps} />
        </MemoryRouter>
      </Provider>,
    );

    expect(asFragment).toMatchSnapshot();
    const input = getByPlaceholderText(placeholderName);
    const inputBox = getByTestId('inputBox');
    fireEvent.change(inputBox, { target: { value: '' } });
    fireEvent.blur(inputBox);

    expect(searchGifs()).not.toHaveBeenCalled();
  });
});
