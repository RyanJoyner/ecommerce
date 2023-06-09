import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";
// import { loader$ } from "@builder.io/qwik-city";

import { GlobalContext } from "../root";

import Navbar from "../components/navbar";

import data from "./data.json";

// export const getContentfulEntries = loader$(async ({ env }) => {
//   const url = `https://cdn.contentful.com/spaces/${env.get(
//     "VITE_SPACE"
//   )}/environments/${"master"}/entries?access_token=${env.get(
//     "VITE_CONTENTFUL_ACCESS_TOKEN"
//   )}`;
//   const response = await fetch(url);
//   const data = await response.json();
//   return { items: data.items };
// });

export default component$(() => {
  // const entries = getContentfulEntries();
  const global = useContext(GlobalContext);

  useTask$(() => {
    // global.contentfulEntries = entries.value.items;
    global.data = data;
  });

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
