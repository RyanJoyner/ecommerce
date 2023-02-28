import {
  component$,
  Slot,
  Resource,
  useResource$,
  // useContextProvider,
} from "@builder.io/qwik";

// import ContentfulContext from "../context/contentful/context";

import Navbar from "../components/navbar/navbar";

export async function getContentfulEntries(
  controller?: AbortController
): Promise<any> {
  // const response = await fetch("/.netlify/functions/contentful", {
  //   method: "GET",
  //   signal: controller?.signal,
  // }).then((response) => response.json());
  // console.log("response", response);
  // return { data: response?.body?.items };

  const { VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN } = process.env;
  const url = `https://cdn.contentful.com/spaces/${VITE_SPACE}/environments/${"master"}/entries?access_token=${VITE_CONTENTFUL_ACCESS_TOKEN}`;
  const response = await fetch(url);
  const data = await response.json();

  return { data: data.items };
}

export default component$(() => {
  const contentfulEntries = useResource$<any>(({ track, cleanup }) => {
    // We need a way to re-run fetching data whenever the `github.org` changes.
    // Use `track` to trigger re-running of this data fetching function.
    track(() => {});

    // A good practice is to use `AbortController` to abort the fetching of data if
    // new request comes in. We create a new `AbortController` and register a `cleanup`
    // function which is called when this function re-runs.
    const controller = new AbortController();
    cleanup(() => controller.abort());

    // Fetch the data and return the promises.
    return getContentfulEntries(controller);
  });

  // console.log("contentfulEntries", contentfulEntries);

  // useContextProvider(ContentfulContext, { posts: contentfulEntries.data });

  return (
    <>
      <main>
        <Navbar />
        <Slot />
        <Resource
          value={contentfulEntries}
          onPending={() => <>Loading...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(items) => <div>{items}</div>}
        />
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
