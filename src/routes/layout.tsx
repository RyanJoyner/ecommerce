import { component$, useContextProvider, Slot } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
// import { useGetContentfulEntries } from "../../netlify/functions/contentful";

import ContentfulContext from "../context/contentful/context";

import Navbar from "../components/navbar/navbar";

export const loadContentfulEntries = loader$(async () => {
  const response = await fetch("../../netlify/functions/contentful").then(
    (response) => response.json()
  );
  return { data: response.body };
});

export default component$(() => {
  const signal = loadContentfulEntries();
  useContextProvider(ContentfulContext, { posts: signal.value.data });

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
