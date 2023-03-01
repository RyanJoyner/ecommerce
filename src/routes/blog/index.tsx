import {
  component$,
  useStylesScoped$,
  useStore,
  // useContext,
} from "@builder.io/qwik";
// import ContentfulContext from "../../context";
import type { DocumentHead } from "@builder.io/qwik-city";
import treeMapData from "./data";

import styles from "./_blog.scss?inline";

import ChartWrapper from "./ChartWrapper";

// interface postContextShape {
//   posts?: any[];
// }

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore({
    name: "",
    message: "",
  });

  // const postContext: postContextShape = useContext(ContentfulContext);

  // const Posts = postContext.posts
  //   ? postContext.posts.map(({ sys, fields }) => {
  //       return { ...fields, id: sys.id };
  //     }) || []
  //   : [];

  // const activeKeyMap = {
  //   "7pJV1v5zUdphd7EFPbijHt": ["Disney"],
  //   "7m8ZEvd4ZVa5JdsdGitqtO": ["Google"],
  //   "412W9sk8dg7Yi6SPaEmWLx": ["Apple", "Twitter"],
  // };

  return (
    <div class="blog-list-container">
      <div class="chart">
        <h7 class="h7">Market Cap in billions</h7>
        <ChartWrapper data={treeMapData} store={store} />
      </div>
      <div class="list">
        {/* {Posts.map(({ id, title }: { id: string; title: string }) => {
          // @ts-ignore
          const isActive = activeKeyMap[id].find((name) => name === store.name)
            ? "active"
            : "";
          return (
            <div class={`h1 post-tag ${isActive}`}>
              <a href={id}>{title}</a>
            </div>
          );
        })} */}
      </div>
      <div class="company-text">{store.message}</div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
