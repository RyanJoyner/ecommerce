import { $, component$, useStylesScoped$, useSignal } from "@builder.io/qwik";
// import { DocumentHead, useNavigate } from "@builder.io/qwik-city";

// import { ArrowBtn } from "~/components/buttons";
import Carousel from "~/components/carousel";

import styles from "./_landing.scss?inline";

export default component$(() => {
  // const navigate = useNavigate();
  useStylesScoped$(styles);
  // const textRef = useSignal<HTMLDivElement>();

  return (
    <div class="landing-grid">
      <div />
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
      <div />
    </div>
  );
});

// export const head: DocumentHead = {
//   title: "Welcome to Qwik",
//   meta: [
//     {
//       name: "description",
//       content: "Qwik site description",
//     },
//   ],
// };
