import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SearchBar from '../../main/components/SearchBar';
import SingleGif from '../../main/components/SingleGif';
import { searchGifAction } from '../../store/modules/searchGif/actions';
import Loader from '../../main/components/Loader';

const SearchPage = ({ searchResult, searchStatus, searchError, searchGifs }) => {
  const [offset, setOffset] = useState(0);
  const [searchText, setSearchText] = useState('');
  useEffect(() => {
    searchGifs({ offset, searchText });
  }, [offset]);

  const handlePagination = e => {
    const { name } = e.target;
    if (name === 'next') {
      return setOffset(offset => (offset +=1));
    }
    if (name === 'previous' && offset !== 1) {
      setOffset(offset => (offset -=1));
    }
  };
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {searchStatus === 'rest' && (
        <p className="mt-10">Welcome to the Search Page</p>
      )}
      {searchStatus === 'success' && searchResult.data.length < 1 && (
        <p className="mt-10">
          There are no results for this search, try something new?
        </p>
      )}
      {searchStatus === 'pending' && <div className='mt-20'> <Loader /> </div>}
      {searchStatus === 'success' && searchResult.data.length > 1 && (
        <div className="w-full flex flex-wrap justify-center items-center mt-10">
          {searchResult.data.map(result => (
            <SingleGif
              key={result.id}
              imgSrc={result.images.original.url}
              title={result.title}
              id={result.id}
            />
          ))}
          {searchStatus === 'success' &&
            searchResult.data.length > 1 && (
              <div className="w-full flex px-2 justify-between mb-4 items-end">
                <button
                  className={`bg-blue-400 px-2 py-1 text-white ${offset ===
                    0 && 'invisible'}`}
                  type="button"
                  name="previous"
                  onClick={handlePagination}
                >
                  Prev Page
                </button>

                <button
                  type="button"
                  className="bg-blue-400 px-2 py-1 text-white"
                  name="next"
                  onClick={() => setOffset(offset + 1)}
                >
                  Next Page
                </button>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  searchResult: state.searchGifReducer.searchGifResult,
  searchStatus: state.searchGifReducer.searchGifStatus,
  searchError: state.searchGifReducer.searchError,
});

const mapDispatchToProps = dispatch => ({
  searchGifs: ({ history, searchText, offset }) =>
    dispatch(searchGifAction({ history, searchText, offset })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchPage);
