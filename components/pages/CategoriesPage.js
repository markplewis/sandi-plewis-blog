import Link from "next/link";
import Layout from "components/global/Layout";
import PageTitle from "components/global/PageTitle";

// import styles from "styles/pages/contentListing.module.css";

export function CategoriesPage({ data }) {
  const categories = data;
  return (
    <Layout title="Categories" description="Blog post categories">
      <PageTitle>Categories</PageTitle>
      <ul>
        {categories.map(category => (
          <li key={`categories-${category?._id}-${category?.slug}`}>
            <Link as={`/categories/${category?.slug}`} href={`/categories/[slug]`}>
              <h3>{category?.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
