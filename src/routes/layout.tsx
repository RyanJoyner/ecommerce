import { component$, Slot, useContext, useTask$ } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";

import { GlobalContext } from "../root";

import Navbar from "../components/navbar/navbar";

export const getContentfulEntries = loader$(async ({ env, platform }) => {
  console.log(env);
  console.log(platform);
  // const { VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN } = process.env;
  // const url = `https://cdn.contentful.com/spaces/${VITE_SPACE}/environments/${"master"}/entries?access_token=${VITE_CONTENTFUL_ACCESS_TOKEN}`;
  // const response = await fetch(url);
  // const data = await response.json();

  return { items: [] };
});

export default component$(() => {
  const signal = getContentfulEntries();
  const global = useContext(GlobalContext);

  useTask$(() => {
    global.items = signal.value.items;
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
