import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import axios from 'axios';
import baseURL from '../../../../Url/NodeBaseURL';
import './RatingOrder.css';

const OrderRating = ({ order, onRatingSubmitted }) => {
  const [ratingModal, setRatingModal] = useState(false);
  const [currentRating, setCurrentRating] = useState(order.customer_rating || 0);
  const [reviewText, setReviewText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Rating suggestions based on star selection
  const ratingSuggestions = {
    1: [
      "Very disappointed with my order",
      "Product quality was poor",
      "Not what I expected at all"
    ],
    2: [
      "Could be better",
      "Had some issues",
      "Needs improvement"
    ],
    3: [
      "Average experience",
      "Met basic expectations",
      "It was okay"
    ],
    4: [
      "Good product quality",
      "Happy with my purchase",
      "Would recommend"
    ],
    5: [
      "Absolutely perfect!",
      "Exceeded my expectations",
      "Best purchase ever!"
    ]
  };

  const handleRatingChange = (rate) => {
    setCurrentRating(rate);
    setShowSuggestions(true);
    // Auto-focus the textarea when rating is selected
    setTimeout(() => {
      const textarea = document.querySelector('.review-textarea');
      if (textarea) textarea.focus();
    }, 100);
  };

  const handleSuggestionClick = (suggestion) => {
    setReviewText(suggestion);
    setShowSuggestions(false);
  };

  const handleRating = async () => {
    if (currentRating === 0) {
      alert('Please select a star rating before submitting');
      return;
    }

    try {
      const response = await axios.put(`${baseURL}/api/rate/${order.id}`, {
        rating: currentRating,
        reviewText: reviewText,
      });

      if (response.status === 200) {
        onRatingSubmitted(order.id, currentRating, reviewText);
        setRatingModal(false);
        setReviewText('');
        alert('Thank you for your rating and feedback!');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert(error.response?.data?.error || 'Failed to submit rating. Please try again.');
    }
  };

  const getStarColor = (rating) => {
    if (rating >= 4) return 'green';
    if (rating >= 2) return 'orange';
    return 'red';
  };

  return (
    <>
      <div className="order-rating-section">
        {order.customer_rating ? (
          <div className="rating-display">
            <span>Your Rating: </span>
            <Rating
              initialValue={order.customer_rating}
              readonly
              size={20}
              allowHalfIcon
              fillColor={getStarColor(order.customer_rating)}
              emptyColor="#ccc"
            />
            <button
              onClick={() => setRatingModal(true)}
              className="edit-rating-button"
            >
              Edit Rating
            </button>
          </div>
        ) : (
          <button
            onClick={() => setRatingModal(true)}
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
            <h3>{order.customer_rating ? `Edit Your Rating for Order #${order.order_number}` : `Rate Your Order #${order.order_number}`}</h3>
            
            <Rating
              onClick={handleRatingChange}
              initialValue={currentRating}
              size={30}
              allowHalfIcon
              fillColor={getStarColor(currentRating)}
              emptyColor="#ccc"
            />

            {showSuggestions && currentRating > 0 && (
              <div className="rating-suggestions">
                <p>Try these suggestions or write your own:</p>
                <div className="suggestion-buttons">
                  {ratingSuggestions[currentRating].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="suggestion-button"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={currentRating > 0 ? "Tell us more about your experience..." : "Please select a rating first..."}
              className="review-textarea"
              rows={4}
            />

            <div className="rating-modal-buttons">
              <button onClick={() => setRatingModal(false)}>Cancel</button>
              <button 
                onClick={handleRating}
                disabled={currentRating === 0}
                className={currentRating === 0 ? 'disabled-button' : ''}
              >
                {order.customer_rating ? 'Update Rating' : 'Submit Rating'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderRating;