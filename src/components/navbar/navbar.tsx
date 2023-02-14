import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./_navbar.scss?inline";
import Link from "../buttons/Link";
// import Resume from "../../../public/Resume.pdf";

export default component$(() => {
  useStylesScoped$(styles);

  return (
    <navbar class="navbar">
      <section class="navbar-section home-text">
        <a href="/">
          <h3 class="brand" style={{ underline: "none", marginBottom: "0" }}>
            Ryan J. Consulting
          </h3>
        </a>
      </section>
      <section class="navbar-section">
        <Link href="/about">About</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/technologies">Technologies</Link>
      </section>
    </navbar>
  );
});
