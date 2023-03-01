import {
  component$,
  useStylesScoped$,
  useSignal,
  useContext,
  useTask$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { GlobalContext } from "../../../root";
import type { DocumentHead } from "@builder.io/qwik-city";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import styles from "./_posts.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const postRef = useSignal<HTMLDivElement>();
  const location = useLocation();
  const { pathname } = location;

  const state = useContext(GlobalContext);

  const post =
    //@ts-ignore
    state.posts.find(({ sys }) => {
      return sys.id === pathname.split("/")[2];
    }) || {};

  useTask$(
    ({ cleanup }) => {
      if (postRef.value) {
        postRef.value.innerHTML = documentToHtmlString(post.fields.html);
      }

      () => {
        if (postRef.value) {
          postRef.value.innerHTML = "";
        }
      };

      const controller = new AbortController();

      cleanup(() => controller.abort());
    },
    { eagerness: "load" }
  );

  return (
    <div class="post">
      <h1>{post.fields.title}</h1>
      <div
        ref={postRef}
        style={{
          fontSize: "1.3em",
          letterSpacing: "-0.003em",
          lineHeight: "32px",
        }}
      ></div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
