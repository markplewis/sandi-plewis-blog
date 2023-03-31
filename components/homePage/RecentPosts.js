import MoreLink from "components/MoreLink";
import PostList from "components/PostList";

import styles from "components/homePage/RecentPosts.module.css";

export default function RecentPosts({ posts }) {
  return (
    <section className={styles.recentPosts}>
      <h2 className={styles.recentPostsHeading}>Recent posts</h2>
      <PostList posts={posts} />
      <MoreLink as={"/posts"} href="/posts" text="More posts" align="end" />
    </section>
  );
}
