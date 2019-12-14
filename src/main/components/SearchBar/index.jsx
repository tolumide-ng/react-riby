import React, { useState } from 'react';
import { connect } from 'react-redux';
import { searchGifAction } from '../../../store/modules/searchGif/actions';
import Button from '../Button';

const SearchBar = ({
  history,
  searchGifStatus,
  searchGifs,
  searchText,
  setSearchText,
}) => {
  const handleChange = e => {
    e.preventDefault();
    const { value } = e.target;
    setSearchText(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchText.length > 1) {
      searchGifs({ history, searchText });
    }
  };

  return (
    <div className="w-full mt-20 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex w-10/12 items-center justify-center items-center"
      >
        <input
          value={searchText}
          onChange={handleChange}
          className="border w-7/12 px-2 py-1"
          placeholder="search here"
          data-testid="inputBox"
        />
        <Button
          type="submit"
          title="Search"
          disabled={searchGifStatus === 'pending'}
          classes={`text-white px-2 py-1 ${
            searchGifStatus === 'pending'
              ? 'bg-yellow-600'
              : 'bg-blue-500 '
          }`}
        />
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  searchResult: state.searchGifReducer.searchGifResult,
  searchGifStatus: state.searchGifReducer.searchGifStatus,
  searchError: state.searchGifReducer.searchError,
});

const mapDispatchToProps = dispatch => ({
  searchGifs: ({ history, searchText }) =>
    dispatch(searchGifAction({ history, searchText })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchBar);
