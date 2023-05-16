import type { PortableTextBlock } from "@portabletext/types";
import ColorSwatches from "~/components/ColorSwatches";
import { PortableText } from "~/lib/sanity";
import useDebug from "~/utils/useDebug";
import type { PageColors } from "~/utils/queries/shared";

import styles from "~/components/PageBody.module.css";

export default function PageBody({
  content,
  pageColors
}: {
  content: PortableTextBlock[];
  pageColors: PageColors;
}) {
  const debug = useDebug();

  return (
    <div className={styles.pageBody}>
      <PortableText value={content} />
      {debug ? <ColorSwatches pageColors={pageColors} /> : null}
    </div>
  );
}
