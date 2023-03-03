import {
  component$,
  useStylesScoped$,
  useStore,
  useContext,
} from "@builder.io/qwik";
// import type { DocumentHead, Link } from "@builder.io/qwik-city";

import { GlobalContext } from "../../root";

import treeMapData from "./data";

import styles from "./_blog.scss?inline";

import { Link } from "~/components/buttons";

import ChartWrapper from "./ChartWrapper";

interface GlobalContextShape {
  contentfulEntries?: any[];
}

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore({
    name: "",
    message: "",
  });

  const globalContext: GlobalContextShape = useContext(GlobalContext);

  const Posts = globalContext.contentfulEntries
    ? globalContext.contentfulEntries.map(({ sys, fields }) => {
        return { ...fields, id: sys.id };
      }) || []
    : [];

  const activeKeyMap = {
    "7pJV1v5zUdphd7EFPbijHt": ["Disney"],
    "7m8ZEvd4ZVa5JdsdGitqtO": ["Google"],
    "412W9sk8dg7Yi6SPaEmWLx": ["Apple", "Twitter"],
  };

  return (
    <div class="blog-list-container">
      <div class="chart">
        <h7 class="h7">Market Cap in billions</h7>
        <ChartWrapper data={treeMapData} store={store} />
      </div>
      <div class="list">
        {Posts.map(({ id, title }: { id: string; title: string }) => {
          // @ts-ignore
          const isActive = activeKeyMap[id].find((name) => name === store.name)
            ? "active"
            : "";
          return (
            <div class={`h1 post-tag ${isActive}`}>
              <Link href={id}>{title}</Link>
            </div>
          );
        })}
      </div>
      <div class="company-text">{store.message}</div>
    </div>
  );
});
