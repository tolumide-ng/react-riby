import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllGifAction } from '../../../store/modules/allGifs/actions';
import SingleGif from '../SingleGif/index.jsx';
import Loader from '../Loader';

const AllGifs = ({
  fetchAllGifs,
  history,
  allGifs,
  allGifStatus,
  allGifError,
}) => {
  useEffect(() => {
    fetchAllGifs({ history });
  }, []);
  return (
    <div className="w-full flex flex-row flex-wrap mx-auto justify-center">
      {allGifStatus === 'pending' && (
       <div className='mt-20'> <Loader /> </div>
      )}
      {allGifStatus === 'success' &&
        allGifs.map(gif => (
          <SingleGif
            imgSrc={gif.images.original.url}
            title={gif.title}
            key={gif.slug}
            id={gif.id}
          />
        ))}
    </div>
  );
};

const mapStateToProps = state => ({
  allGifs: state.allGifReducer.allGif,
  allGifStatus: state.allGifReducer.allGifStatus,
  allGifError: state.allGifReducer.allGifError,
});

const mapDispatchToProps = dispatch => ({
  fetchAllGifs: ({ history }) =>
    dispatch(fetchAllGifAction({ history })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(AllGifs));
