export default function FeaturedNovelReviews({ reviews }) {
  return (
    <>
      <ul>
        {reviews.map(review => (
          <li key={review?._id}>
            <figure>
              <blockquote>
                <h3>{review?.title}</h3>
                <p>{review?.review}</p>
              </blockquote>
              <figcaption>— {review?.author}</figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}