// OrderRating.js
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import baseURL from '../../../../Url/NodeBaseURL';

const OrderRating = ({ order, onRatingSubmitted }) => {
  const [ratingModal, setRatingModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(order.rating || 0);
  const [reviewText, setReviewText] = useState('');

  const handleRating = async () => {
    try {
      const response = await axios.put(`${baseURL}/api/rate/${order.id}`, {
        rating: currentRating,
        reviewText: reviewText, // Send the review text as well
      });

      if (response.status === 200) {
        onRatingSubmitted(order.id, currentRating, reviewText);
        setRatingModal(false);
        setReviewText(''); // Reset
        alert('Thank you for your rating and feedback!');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert(error.response?.data?.error || 'Failed to submit rating. Please try again.');
    }
  };

  const openRatingModal = () => {
    setCurrentRating(order.rating || 0);
    setRatingModal(true);
  };

  return (
    <>
      <div className="order-rating-section">
        {order.rating ? (
          <div className="rating-display">
            <span>Your Rating: </span>
            <Rating 
              initialValue={order.rating} 
              readonly 
              size={20} 
              allowHalfIcon 
            />
            <span>({order.rating})</span>
          </div>
        ) : (
          <button 
            onClick={openRatingModal}
            className="rate-button"
            disabled={order.order_status !== 'Delivered'}
          >
            Rate This Order
          </button>
        )}
      </div>

      {ratingModal && (
        <div className="rating-modal-overlay">
          <div className="rating-modal">
            <h3>Rate Your Order #{order.order_number}</h3>
            <Rating
              onClick={(rate) => setCurrentRating(rate)}
              initialValue={currentRating}
              size={30}
              allowHalfIcon
            />

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Leave your review here..."
              className="review-textarea"
              rows={4}
              style={{ width: '100%', marginTop: '1rem', padding: '0.5rem' }}
            />

            <div className="rating-modal-buttons">
              <button onClick={() => setRatingModal(false)}>Cancel</button>
              <button onClick={handleRating}>Submit Rating</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderRating;