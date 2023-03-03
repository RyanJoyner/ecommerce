import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Slot } from "@builder.io/qwik";

import styles from "./_buttons.scss?inline";

type LinkProps = {
  href?: string;
  target?: string;
};

export default component$(({ href = "", target = "" }: LinkProps) => {
  useStylesScoped$(styles);

  return (
    <div class="btn btn-link">
      <Link href={href} target={target}>
        <Slot />
      </Link>
    </div>
  );
});
