import {
  component$,
  useSignal,
  useContextProvider,
  createContextId,
} from "@builder.io/qwik";

export type ContentfulContext = any;

// Create a new context descriptor
export const GlobalContext = createContextId<ContentfulContext>("global");

export const Parent = component$(() => {
  // Creating reactive storage
  const globalStore = useSignal<ContentfulContext>();

  // Assigning value (state) to the context (ThemeContext)
  useContextProvider(GlobalContext, globalStore);

  // Not well defined ??
  return <></>;
});
