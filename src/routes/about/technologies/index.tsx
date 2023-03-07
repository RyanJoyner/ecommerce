import { component$, useStore, useStylesScoped$ } from "@builder.io/qwik";
import ChartWrapper from "./ChartWrapper";

import data from "./data";
import Description from "./Description";

import styles from "./_technologies.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const store = useStore({
    index: 0,
  });

  return (
    <div class="technologies-grid">
      <ChartWrapper store={store} />
      <Description {...data[store.index]} />
    </div>
  );
});


