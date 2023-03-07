import {
  component$,
  useStylesScoped$,
  useStore,
  useContext,
} from "@builder.io/qwik";

import { GlobalContext } from "../../root";

import treeMapData from "./data";

import styles from "./_blog.scss?inline";

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
        <h7 class="h8">
          <i>
            A treemap of corporation's by market cap in billions. Click to see loose
            relation to blog posts. Enjoy!
          </i>
        </h7>
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
              <a href={id}>{title}</a>
            </div>
          );
        })}
      </div>
      <div class="company-text">{store.message}</div>
    </div>
  );
});
