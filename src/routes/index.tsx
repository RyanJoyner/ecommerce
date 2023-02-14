import {
  component$,
  useStylesScoped$,
  useSignal,
} from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import Link from "~/components/buttons/Link";

import { RightArrow } from "~/components/icons";

import styles from "./_landing.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const textRef = useSignal<HTMLDivElement>();
  return (
    <>
      <div class="text" ref={textRef}>
        Code Content Design & Product Consulting
      </div>
      <div class="landing-grid">
        <div class="landing-copy">
          <a
            class="transparent-btn"
            href="/contact"
          >
            <div class="arrow-btn">
              <i>Let's Get Real !</i>
              <RightArrow />
            </div>
          </a>
          <span class="tag">
            Former Journalist, Current Software Engineer, Your Future Consultant
          </span>
          <h1 class="name">RYAN JOYNER</h1>
        </div>
        <img class="landing-img" src="/PatrickStiple.jpg" />
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
