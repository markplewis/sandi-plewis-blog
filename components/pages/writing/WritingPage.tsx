import CardList from "~/components/CardList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import SubTitle from "~/components/SubTitle";
import type { NovelsAndShortStories } from "~/utils/queries/shared";

export default function WritingPage({ data }: { data: NovelsAndShortStories }) {
  const { novels = [], shortStories = [] } = data;
  return (
    <Layout title="Writing" description="A listing of Sandi Plewis' novels and short stories">
      <PageTitle centered={true}>Writing</PageTitle>
      <SubTitle as="h2">Novels</SubTitle>
      <CardList items={novels} path="novels" showDate={false} />
      <SubTitle as="h2">Short stories</SubTitle>
      <CardList items={shortStories} path="short-stories" showDate={false} />
    </Layout>
  );
}
