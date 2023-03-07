import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./_profile.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <div class="profile-container">
      <div class="profile">
        <h1>
          <i>Hello! I'm Ryan</i>
        </h1>
        <p>
          A software engineer with a background in journalism public relations
          and political science. Data driven journalism turned me on to the
          world of web development in college, and I've been building component
          and data architecture for web applications ever since.
        </p>
        <p class="last">
          {" "}
          <i>Let's tell your story together! </i>
        </p>
      </div>
    </div>
  );
});
