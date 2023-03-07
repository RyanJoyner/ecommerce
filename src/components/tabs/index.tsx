import { component$, useStylesScoped$, QRL, $ } from "@builder.io/qwik";
import styles from "./_tabs.scss?inline";

interface item {
  active: boolean;
  callBack?: QRL<() => void>;
  href: string;
  name: string;
}

interface TabsProps {
  list: item[];
  parent: string;
}

export default component$(({ list, parent }: TabsProps) => {
  useStylesScoped$(styles);

  return (
    <ul class="tab tab-block">
      {list.map(({ active, callBack, href, name }) => {
        const checkForCallBack = callBack ? callBack : $(() => {});
        return (
          <li
            class={`tab-item ${active ? "active" : ""}`}
            onClick$={checkForCallBack}
          >
            {callBack ? <>{name}</> : <a href={`/${parent}/${href}`}>{name}</a>}
          </li>
        );
      })}
    </ul>
  );
});
