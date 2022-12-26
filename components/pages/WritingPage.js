import Link from "next/link";
import Layout from "components/global/Layout";

export function WritingPage({ data }) {
  const { novels = [], shortStories = [] } = data;
  console.log("WritingPage", { novels, shortStories });
  return (
    <Layout title="Writing" description="A listing of Sandi Plewis' novels and short stories">
      <h1>Writing</h1>
      <h2>Novels</h2>
      <ul>
        {novels.map(novel => (
          <li key={`novel-${novel?._id}-${novel?.slug}`}>
            <Link as={`/novels/${novel?.slug}`} href={`/novels/[slug]`}>
              <h3>{novel?.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <h2>Short stories</h2>
      <ul>
        {shortStories.map(shortStory => (
          <li key={`shortStory-${shortStory?._id}-${shortStory?.slug}`}>
            <Link as={`/short-stories/${shortStory?.slug}`} href={`/short-stories/[slug]`}>
              <h3>{shortStory?.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}
