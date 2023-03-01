import {
  component$,
  useStore,
  useContextProvider,
  createContextId,
  useStyles$,
} from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import global from "./global.scss?inline";

export type ContentfulContext = any;

// Create a new context descriptor
export const GlobalContext = createContextId<ContentfulContext>("global");

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  // Creating reactive storage
  const globalStore = useStore<ContentfulContext>({ contentfulEntries: [] });

  // Assigning value (state) to the context (ThemeContext)
  useContextProvider(GlobalContext, globalStore);
  useStyles$(global);

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
