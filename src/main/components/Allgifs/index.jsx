import React, { useState, useEffect, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchAllGifAction } from '../../../store/modules/allGifs/actions';
const SingleGif = lazy(() => import('../SingleGif/index.jsx'));
import Loader from '../Loader';
import fallbackImage from '../../../../assets/default.png';

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
    <div className="w-full flex flex-row flex-wrap mx-auto justify-center pt-20">
      {allGifStatus === 'pending' && (
        <div className="mt-20" data-testid="pageloading">
          <Loader />
        </div>
      )}
      {allGifStatus === 'success' &&
        allGifs.map(gif => (
          <Suspense fallback={fallbackImage} key={gif.id}>
            <SingleGif
              imgSrc={gif.images.original.url}
              title={gif.title}
              key={gif.slug}
              id={gif.id}
            />
          </Suspense>
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
