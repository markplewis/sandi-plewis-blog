import CardList from "components/CardList";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export default function WritingPage({ data }) {
  const { novels = [], shortStories = [] } = data;
  return (
    <Layout title="Writing" description="A listing of Sandi Plewis' novels and short stories">
      <PageTitle>Writing</PageTitle>
      <h2>Novels</h2>
      <CardList items={novels} path="novels" showDate={false} />
      <h2>Short stories</h2>
      <CardList items={shortStories} path="short-stories" showDate={false} />
    </Layout>
  );
}
