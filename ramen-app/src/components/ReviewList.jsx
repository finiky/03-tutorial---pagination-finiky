import ReviewCard from './ReviewCard';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      {reviews.map((review, index) => {
        return <ReviewCard key={index} review={review} />
      })}
    </div>
  );
};

export default ReviewList;
