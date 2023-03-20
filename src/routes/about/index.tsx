import {
  component$,
  useStylesScoped$,
} from "@builder.io/qwik";
import styles from "./_about.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="grid">
    </div>
  );
});
