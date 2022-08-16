import './ReviewCard.css';

const ReviewCard = ({ review }) => {
  const { url, brand, variety, stars } = review;

  return (
    <div>
      <a className="review-link" href={url} target="_blank"rel="noreferrer" >
        <div className="review-card">
          <div className="review-prop variety"><strong>{variety}</strong></div>
          <div className="review-prop brand"><i>{brand}</i></div>
          <div className="review-prop stars">⭐ {'\u00A0'} {stars}</div>
        </div>
      </a>
    </div>
  );
};

export default ReviewCard;