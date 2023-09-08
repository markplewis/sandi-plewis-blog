import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import SubTitle from "~/components/SubTitle";
import type { Teaser } from "~/utils/queries/shared";

export default function NewsItemsPage({ data }: { data: Teaser[] }) {
  const now = new Date().getTime();
  const pastNews: Teaser[] = [];
  const upcomingNews: Teaser[] = [];

  data?.forEach(item => {
    if (!item?.date) return;
    const date = new Date(item.date).getTime();

    if (date >= now) {
      upcomingNews.push(item);
    } else {
      pastNews.push(item);
    }
  });

  upcomingNews.reverse();

  return (
    <Layout title="News" description="A listing of Sandi's recent news">
      <PageTitle centered={true}>News</PageTitle>
      {upcomingNews.length ? (
        <>
          <SubTitle as="h2">Upcoming</SubTitle>
          <CardList items={upcomingNews} path="news" showDate={true} />
        </>
      ) : (
        <></>
      )}
      {pastNews.length ? (
        <>
          <SubTitle as="h2">Recent</SubTitle>
          <CardList items={pastNews} path="news" showDate={true} />
        </>
      ) : (
        <></>
      )}
    </Layout>
  );
}
