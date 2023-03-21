import { component$, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./_menu.scss?inline";

export interface Item {
  href: string;
  name: string;
}

export interface MenuProps {
  menuHeader: string;
  items: Item[];
}

export default component$(({ menuHeader, items }: MenuProps) => {
  useStylesScoped$(styles);

  return (
    <ul class="menu">
      <li class="divider" data-content={menuHeader}></li>
      {items.map(({ href, name }) => {
        return (
          <li class="menu-item">
            <a href={`/products/${href}`} class="child">
              {name}
            </a>
          </li>
        );
      })}
    </ul>
  );
});
