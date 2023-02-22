import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./_navbar.scss?inline";
import Link from "../buttons/Link";
// import Resume from "../../../public/Resume.pdf";

interface NavbarProps {
  origin: string;
}

export default component$(({ origin }: NavbarProps) => {
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
        <Link href={`${origin}/about`}>About</Link>
        <Link href={`${origin}/blog`}>Blog</Link>
        <Link href={`${origin}/contact`}>Contact</Link>
        <Link href={`${origin}/technologies`}>Technologies</Link>
      </section>
    </navbar>
  );
});
