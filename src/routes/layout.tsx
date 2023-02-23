import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { component$, useContextProvider, Slot } from "@builder.io/qwik";
import { loader$ } from "@builder.io/qwik-city";
import Navbar from "../components/navbar/navbar";
import ContentfulContext from "../context/contentful/context";

// const handler: Handler = async (
//   event: HandlerEvent,
//   context: HandlerContext
// ) => {
//   const { VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN } = process.env;

//   return {
//     statusCode: 200,
//     body: { VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN },
//   };
// };

export const useGetContentfulEntries = loader$(async () => {
  const { VITE_SPACE, VITE_CONTENTFUL_ACCESS_TOKEN } = process.env;
  const url = `https://cdn.contentful.com/spaces/${VITE_SPACE}/environments/${"master"}/entries?access_token=${VITE_CONTENTFUL_ACCESS_TOKEN}`;
  const res = await fetch(url);
  const json = await res.json();
  return { data: json.items };
});

export default component$(() => {
  const signal = useGetContentfulEntries();

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
