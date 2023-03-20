import { component$, useStylesScoped$ } from "@builder.io/qwik";

import Carousel from "~/components/carousel";

import styles from "./_landing.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="landing-grid">
      <div>Dedicated to helping gamers get the most out of classic games.</div>
      <Carousel
        items={[
          {
            img: "/olympicpeninsula.jpg",
          },
          {
            img: "/olympicpeninsula.jpg",
          },
          {
            img: "/olympicpeninsula.jpg",
          },
        ]}
      />
      <div># Left</div>
    </div>
  );
});
