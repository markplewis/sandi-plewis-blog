import { SanityDocument } from "@sanity/client";
import CategoryList from "~/components/CategoryList";
import Layout from "~/components/Layout";
import PageTitle from "~/components/PageTitle";

export default function CategoriesPage({ data }: { data: SanityDocument }) {
  const categories = data;
  return (
    <Layout title="Categories" description="Blog post categories">
      <PageTitle centered={true}>Post categories</PageTitle>
      <CategoryList categories={categories} themed={false} centered={true} />
    </Layout>
  );
}
