import CategoryList from "components/CategoryList";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

export default function CategoriesPage({ data }) {
  const categories = data;
  return (
    <Layout title="Categories" description="Blog post categories">
      <PageTitle centered={true}>Post categories</PageTitle>
      <CategoryList categories={categories} themed={false} centered={true} />
    </Layout>
  );
}
