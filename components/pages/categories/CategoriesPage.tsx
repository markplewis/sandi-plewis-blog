import CategoryList from "~/components/CategoryList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";
import type { Categories } from "~/utils/queries/categories";

export default function CategoriesPage({ data }: { data: Categories }) {
  return (
    <Layout title="Categories" description="Blog post categories">
      <PageTitle centered={true}>Post categories</PageTitle>
      <CategoryList categories={data} themed={false} centered={true} />
    </Layout>
  );
}
