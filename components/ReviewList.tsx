import type { ElementType, HTMLAttributes, FC } from "react";
import type { Review } from "~/utils/queries/reviews";

import styles from "~/components/ReviewList.module.css";

// See: https://www.aleksandrhovhannisyan.com/blog/dynamic-tag-name-props-in-react/
interface ReviewListProps extends HTMLAttributes<HTMLOrSVGElement> {
  reviews: Review[];
  as?: ElementType;
}

const ReviewList: FC<ReviewListProps> = ({ reviews = [], as: Tag = "h2" }) => {
  return (
    <ul className={styles.reviewList}>
      {reviews.map(review => (
        <li className={styles.reviewItem} key={review?._id}>
          <figure className={styles.reviewFigure}>
            <blockquote className={styles.reviewQuote}>
              <div className={styles.reviewTitleWrapper}>
                <Tag className={styles.reviewTitle}>{review?.title}</Tag>
              </div>
              <p>{review?.text}</p>
            </blockquote>
            <figcaption className={styles.reviewCaption}>— {review?.author}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
};

export default ReviewList;
