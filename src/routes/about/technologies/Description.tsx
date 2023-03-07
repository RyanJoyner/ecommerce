import { useStylesScoped$, component$ } from "@builder.io/qwik";

import styles from "./_technologies.scss?inline";

interface DecriptionProps {
  id: string;
  description: string;
  aside: string;
  value: number;
}

export default component$(
  ({ id, aside, description, value }: DecriptionProps) => {
    useStylesScoped$(styles);

    return (
      <div class="description">
        <h3 class="technology">{id}</h3>
        <div class="experience">
          <i>Years of experience {value}</i>
        </div>
        <article class="icon-wrap-container">
          <h1>{description}</h1>
        </article>
        <p class="aside">{aside}</p>
      </div>
    );
  }
);
