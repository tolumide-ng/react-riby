import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDetailedGifAction } from '../../store/modules/detailedGif/actions';
import Loader from '../../main/components/Loader';

const DetailedGif = ({
  location,
  fetchDetailedGif,
  detailedGif = {},
  detailedGifStatus,
  history,
}) => {
  useEffect(() => {
    fetchDetailedGif({ history, id: location.pathname });
  }, []);
  return (
    <div className="w-full flex-col justify-center items-center mt-10">
      <div className="flex items-center justify-center flex-col">
        <Link to="/" className="mb-4">
          Go Home
        </Link>
        {detailedGifStatus === 'pending' && (
          <div data-testid="pageloading" className="mt-20">
            <Loader />
          </div>
        )}
      </div>

      {detailedGifStatus === 'success' && (
        <div className="w-full flex items-center justify-center flex-col">
          <img
            src={
              detailedGif &&
              detailedGif.images &&
              detailedGif.images.original &&
              detailedGif.images.original.url
            }
            alt={detailedGif && detailedGif.title}
            className="object-cover"
            style={{ height: '600px' }}
          />
          <div className="w-9/12 mt-2">
            <div className="flex">
              <strong className="mr-2">Title: </strong>
              <p>{detailedGif && detailedGif.title}</p>
            </div>
            <div className="flex">
              <strong className="mr-2">Rating: </strong>
              <p>{detailedGif && detailedGif.rating}</p>
            </div>
            <div className="flex">
              <strong className="mr-2">Source: </strong>
              <p>{detailedGif && detailedGif.source}</p>
            </div>
            <div className="flex">
              <strong className="mr-2">Username: </strong>
              <p>{detailedGif && detailedGif.username}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  detailedGif: state.detailedGifReducer.detailedGif,
  detailedGifError: state.detailedGifReducer.detailedGifError,
  detailedGifStatus: state.detailedGifReducer.detailedGifStatus,
});

const mapDispatchToProps = dispatch => ({
  fetchDetailedGif: ({ history, id }) =>
    dispatch(fetchDetailedGifAction({ history, id })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DetailedGif);
