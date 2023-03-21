import { component$, Slot, useStylesScoped$ } from "@builder.io/qwik";

import styles from "./_products.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="products-grid">
      <Slot />
    </div>
  );
});
