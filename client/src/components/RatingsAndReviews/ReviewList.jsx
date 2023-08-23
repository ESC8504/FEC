import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review.jsx';
import {
  StyledButton, ModalWrapper, Modal, ModalContent,
} from '../../styled-components/common-elements.jsx';

function ReviewList({ reviews, filters }) {
  const [reviewsToRender, setReviewsToRender] = React.useState([]);
  const [displayModal, setDisplayModal] = React.useState(false);
  const [hiddenReviews, setHiddenReviews] = React.useState(0);
  const [displayedReviews, setDisplayedReviews] = React.useState(2);
  React.useEffect(() => setReviewsToRender(reviews), [reviews]);
  // eslint-disable-next-line func-names
  const handleClick = function (e) {
    if (displayedReviews === 4) {
      setDisplayModal(true);
    } else {
      setDisplayedReviews((prev) => prev + 2);
    }
  };
  React.useEffect(() => {
    if (displayModal) {
      document.body.classList.add('overflow-y-hidden');
    } else {
      document.body.classList.remove('overflow-y-hidden');
    }
  }, [displayModal]);

  React.useEffect(() => {
    if (filters.length === 0) {
      setReviewsToRender(reviews);
    } else {
      setReviewsToRender(reviews.filter((review) => filters.includes(review.rating.toString())));
    }
  }, [filters, reviews]);

  React.useEffect(() => {
    setHiddenReviews(reviewsToRender.length - displayedReviews);
  }, [reviewsToRender]);

  return (
    <div
      style={{ 'paddingTop': '20px' }}
      data-testid="reviewList-component"
    >
      <div style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-between' }}>
        <label htmlFor="dropdown">
          {'Sort By: '}
          <select id="dropdown">
            <option value="relevant">Relevant</option>
            <option value="helpful">Helpful</option>
            <option value="newest">Newest</option>
          </select>
        </label>
        {filters && <h3>{`Filters: ${filters}`}</h3>}
      </div>
      <div style={{ 'paddingTop': '20px' }}>
        {
        // eslint-disable-next-line no-nested-ternary
        reviewsToRender.length ?
          reviewsToRender.slice(0, displayedReviews)
            .map((review) => <Review key={review.review_id} review={review} />)
          :
          <h1>Be the first to write a review!</h1>
        }
      </div>

      <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
        { hiddenReviews > 0 && (
        <StyledButton
          data-testid="reviewList-button"
          type="button"
          onClick={(e) => handleClick(e)}
        >
          Show More Reviews
        </StyledButton>
        )}
      </div>
      <ModalWrapper $displaymodal={displayModal}>
        <Modal $displaymodal={displayModal}>
          <h1 data-testid="reviewList-modal">Reviews</h1>
          <ModalContent $displaymodal={displayModal}>
            {
            reviewsToRender.length ?
              reviewsToRender.map((review) => <Review key={review.review_id} review={review} />)
              :
              <h1>Be the first to write a review!</h1>
            }
          </ModalContent>
          <StyledButton
            style={{ 'width': '150px' }}
            type="button"
            onClick={() => setDisplayModal(false)}
          >
            Close
          </StyledButton>
        </Modal>
      </ModalWrapper>
    </div>
  );
}

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    review_id: PropTypes.number.isRequired,
  })).isRequired,
};

export default ReviewList;
