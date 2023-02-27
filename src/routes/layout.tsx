import {
  component$,
  useContextProvider,
  Slot,
  useResource$,
} from "@builder.io/qwik";
// import { loader$ } from "@builder.io/qwik-city";
// import { useGetContentfulEntries } from "../../netlify/functions/contentful";

import ContentfulContext from "../context/contentful/context";

import Navbar from "../components/navbar/navbar";

// export const loadContentfulEntries = loader$(async () => {
//   const response = await fetch("/.netlify/functions/contentful").then(
//     (response) => response.json()
//   );
//   return { data: response.body };
// });

export async function getContentfulEntries(
  controller?: AbortController
): Promise<any> {
  const response = await fetch("/.netlify/functions/contentful", {
    signal: controller?.signal,
  });
  // const json = await response.json();
  // console.log("response", response);
  // return { data: json.data.items };
}

export default component$(() => {
  // const signal = loadContentfulEntries();

  const contentfulEntries = useResource$<any>(({ track, cleanup }) => {
    // We need a way to re-run fetching data whenever the `github.org` changes.
    // Use `track` to trigger re-running of this data fetching function.
    // track(() => github.org);

    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return getContentfulEntries(controller);
  });

  // console.log("contentfulEntries", contentfulEntries);

  // useContextProvider(ContentfulContext, { posts: contentfulEntries });

  return (
    <>
      <main>
        <Navbar />
        <Slot />
      </main>
      <footer>
        {/* TODO: Make the footer sticky and create some content here! */}
        {/* <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a> */}
      </footer>
    </>
  );
});
