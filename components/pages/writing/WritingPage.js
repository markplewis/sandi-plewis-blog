import CardList from "components/CardList";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";
import SubTitle from "components/global/SubTitle";

export default function WritingPage({ data }) {
  const { novels = [], shortStories = [] } = data;
  return (
    <Layout title="Writing" description="A listing of Sandi Plewis' novels and short stories">
      <PageTitle>Writing</PageTitle>
      <SubTitle as="h2">Novels</SubTitle>
      <CardList items={novels} path="novels" showDate={false} />
      <SubTitle as="h2">Short stories</SubTitle>
      <CardList items={shortStories} path="short-stories" showDate={false} />
    </Layout>
  );
}