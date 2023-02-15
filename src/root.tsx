import {
  component$,
  useContextProvider,
  useStore,
  useStyles$,
  useTask$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import ContentfulContext from "./context/contentful/context";
import global from "./global.scss?inline";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(global);

  const state = useStore({
    posts: [],
    url: `https://cdn.contentful.com/spaces/${"wgi0b9s92wh1"}/environments/${"master"}/entries?access_token=${"jAg20O0nc1R__suBcbSSBr7e0MVX21vY-5uzh6wJJrU"}`,
  });

  useContextProvider(ContentfulContext, state);

  useTask$(async () => {
    const res = await fetch(state.url);
    const json = await res.json();
    state.posts = json.items;
  });

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
