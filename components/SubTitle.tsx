import type { ElementType, HTMLAttributes, FC } from "react";

import styles from "~/components/SubTitle.module.css";

// See: https://www.aleksandrhovhannisyan.com/blog/dynamic-tag-name-props-in-react/
interface SubTitleProps extends HTMLAttributes<HTMLOrSVGElement> {
  children: string;
  as?: ElementType;
}

const SubTitle: FC<SubTitleProps> = ({ children, as: Tag = "h2" }) => {
  return <Tag className={styles.subTitle}>{children}</Tag>;
};

export default SubTitle;
