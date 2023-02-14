import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { Slot } from "@builder.io/qwik";

// TODO extend Link to include proper styles
// import { Link } from "@builder.io/qwik-city";

import styles from "./_buttons.scss?inline";

type LinkProps = {
  href?: string;
  target?: string;
};

export default component$(({ href = "", target = "" }: LinkProps) => {
  useStylesScoped$(styles);
  const location = useLocation();
  const { pathname } = location;
  const isActive =
    pathname === `${href}/`
      ? {
          borderBottom: "2px solid",
        }
      : {};

  return (
    <a
      class="btn btn-link"
      href={href}
      target={target}
      style={isActive}
    >
      <Slot />
    </a>
  );
});
