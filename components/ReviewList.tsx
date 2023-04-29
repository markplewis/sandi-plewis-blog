import styles from "~/components/ReviewList.module.css";

export default function ReviewList({ reviews, as = "h2" }) {
  const HeadingTagName = as;
  return (
    <ul className={styles.reviewList}>
      {reviews.map(review => (
        <li className={styles.reviewItem} key={review?._id}>
          <figure className={styles.reviewFigure}>
            <blockquote className={styles.reviewQuote}>
              <div className={styles.reviewTitleWrapper}>
                <HeadingTagName className={styles.reviewTitle}>{review?.title}</HeadingTagName>
              </div>
              <p>{review?.review}</p>
            </blockquote>
            <figcaption className={styles.reviewCaption}>— {review?.author}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
