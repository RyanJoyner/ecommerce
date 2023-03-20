import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Slot } from "@builder.io/qwik";

import styles from "./_buttons.scss?inline";

type LinkProps = {
  classExt?: string;
  href?: string;
  target?: string;
};

export default component$(
  ({ classExt = "", href = "", target = "" }: LinkProps) => {
    useStylesScoped$(styles);

    return (
      <div class={`btn btn-link ${classExt}`}>
        <Link href={href} target={target}>
          <Slot />
        </Link>
      </div>
    );
  }
);
