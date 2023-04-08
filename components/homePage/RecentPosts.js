import MoreLink from "components/MoreLink";
import RecentPostList from "components/homePage/RecentPostList";

import styles from "components/homePage/RecentPosts.module.css";

export default function RecentPosts({ posts }) {
  return (
    <section className={styles.recentPosts}>
      <h2 className={styles.recentPostsHeading}>Recent posts</h2>
      <RecentPostList posts={posts} />
      <MoreLink as={"/posts"} href="/posts" text="More posts" align="end" />
    </section>
  );
}
