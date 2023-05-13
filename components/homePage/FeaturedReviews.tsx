import type { ElementType, HTMLAttributes, FC } from "react";
import ReviewList from "~/components/ReviewList";
import type { Review } from "~/utils/queries/reviews";

import styles from "~/components/homePage/FeaturedReviews.module.css";

// See: https://www.aleksandrhovhannisyan.com/blog/dynamic-tag-name-props-in-react/
interface FeaturedReviewsProps extends HTMLAttributes<HTMLOrSVGElement> {
  reviews: Review[];
  as?: ElementType;
}

const FeaturedReviews: FC<FeaturedReviewsProps> = ({ reviews = [], as: Tag = "h2" }) => {
  return (
    <div className={styles.featuredReviews}>
      <ReviewList reviews={reviews} as={Tag} />
    </div>
  );
};

export default FeaturedReviews;
