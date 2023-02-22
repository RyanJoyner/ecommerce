import { component$, useStylesScoped$ } from "@builder.io/qwik";
import styles from "./_navbar.scss?inline";
import Link from "../buttons/Link";
// import Resume from "../../../public/Resume.pdf";

interface NavbarProps {
  href: string;
}

export default component$(({ href }: NavbarProps) => {
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
        <Link href={`${href}/about`}>About</Link>
        <Link href={`${href}/blog`}>Blog</Link>
        <Link href={`${href}/contact`}>Contact</Link>
        <Link href={`${href}/technologies`}>Technologies</Link>
      </section>
    </navbar>
  );
});
