import { $, component$, useStylesScoped$, useSignal } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";

import { ArrowBtn } from "~/components/buttons";

import styles from "./_landing.scss?inline";

export default component$(() => {
  const navigate = useNavigate();
  useStylesScoped$(styles);
  const textRef = useSignal<HTMLDivElement>();
  return (
    <>
      <div class="text" ref={textRef}>
        Code Content Design & Product Development
      </div>
      <div class="landing-grid">
        <div class="landing-copy">
          <ArrowBtn
            text="Let's Get Real !"
            callBack={$(() => {
              navigate("/contact");
            })}
          />
          <span class="tag">
            Former Journalist, Current Software Engineer, Your Future Developer
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
