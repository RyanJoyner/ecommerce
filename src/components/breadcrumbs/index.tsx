import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Link from "../buttons/Link";

import styles from "./_breadcrumbs.scss?inline";

interface item {
  name: string;
  href?: string;
  target?: string;
}

interface BreadCrumbsProps {
  items: item[];
}

export default component$(({ items }: BreadCrumbsProps) => {
  useStylesScoped$(styles);

  return (
    <ul class="breadcrumb">
      {items.map(({ name, href, target }) => {
        return (
          <li class="breadcrumb-item">
            <Link href={href} target={target}>
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
});
