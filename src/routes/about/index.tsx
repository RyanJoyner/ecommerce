import { component$, useStylesScoped$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { RightArrow } from "~/components/icons";

import styles from "./_about.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="grid">
      <div class="about-container">
        <img src="/ElonStiple.jpg" />
        <div class="about">
          <h1>Hello! I'm Ryan</h1>
          <p>
            A software engineer with a background in journalism public relations
            and political science. Data driven journalism turned me on to the
            world of web development in college, and I've been building
            component and data architecture for web applications ever since.
          </p>
          <p class="last">Let's tell your data driven story together!</p>
          <button
            class="transparent-btn"
            onClick$={() => {
              window.open("/Resume.png", "_blank", "fullscreen=yes");
              return false;
            }}
          >
            <div class="arrow-btn">
              <i class="action">Resume</i> <RightArrow />
            </div>
          </button>
        </div>
      </div>
    </div>
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
