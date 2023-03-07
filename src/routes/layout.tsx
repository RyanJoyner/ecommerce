import {
  component$,
  Slot,
  useContext,
  useSignal,
  useTask$,
  useBrowserVisibleTask$,
} from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";

import { GlobalContext } from "../root";

import Navbar from "../components/navbar";

export const getContentfulEntries = loader$(async ({ env }) => {
  const url = `https://cdn.contentful.com/spaces/${env.get(
    "VITE_SPACE"
  )}/environments/${"master"}/entries?access_token=${env.get(
    "VITE_CONTENTFUL_ACCESS_TOKEN"
  )}`;
  const response = await fetch(url);
  const data = await response.json();
  return { items: data.items };
});

export default component$(() => {
  const entries = getContentfulEntries();
  const global = useContext(GlobalContext);
  const isMobile = useSignal(false);

  useTask$(() => {
    global.contentfulEntries = entries.value.items;
  });

  useBrowserVisibleTask$(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        window.navigator.userAgent
      )
    ) {
      isMobile.value = true;
    } else {
      isMobile.value = false;
    }
  });

  // TODO: I placed a WTF bang to make this work?
  return (
    <>
      {!isMobile ? (
        <div>
          This site is not yet optimized for mobile please view from a browser.
          Cheers!
        </div>
      ) : (
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
      )}
    </>
  );
});
