import {
  component$,
  noSerialize,
  Signal,
  useClientEffect$,
  useSignal,
  $,
} from "@builder.io/qwik";

const useIntersectionObserver = (
  elementRef: Signal<HTMLDivElement | undefined>,
  { threshold = 0, root, rootMargin = "0%", freezeOnceVisible = false }: any
) => {
  // initialize entry state
  const entryState = useSignal();

  // const frozen = entryState?.value.isIntersecting && freezeOnceVisible;

  // I wrapped this with the $ to allow it to be transferred across the lazy-loaded
  // boundary of the useTask$. This wouldn't be necessary if the function was defined
  // inline with the IntersectionObserver.
  const updateEntry = $(([entry]: any): void => {
    // setEntry(entry);

    // I added noSerialize around this entry because it's a class instance which can't be stored in stores/signals by default.
    entryState.value = noSerialize(entry);
  });

  useClientEffect$(({ track }) => {
    const node = track(() => elementRef.value);
    const hasIOSupport = !!window.IntersectionObserver;

    // || frozen
    if (!hasIOSupport || !node) return;

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    });

    observer.observe(node);

    return () => observer.disconnect();
  });

  return entryState;
};

export default useIntersectionObserver;
