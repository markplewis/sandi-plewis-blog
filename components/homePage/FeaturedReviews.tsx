import ReviewList from "~/components/ReviewList";

import styles from "~/components/homePage/FeaturedReviews.module.css";

export default function FeaturedReviews({ reviews, as = "h2" }) {
  return (
    <div className={styles.featuredReviews}>
      <ReviewList reviews={reviews} as={as} />
    </div>
  );
}
