import { $, component$, useContext, useStylesScoped$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import { Button } from "~/components/buttons";

import { GlobalContext } from "../../../root";

import styles from "../_products.scss?inline";

interface ProductProps {}

// eslint-disable-next-line no-empty-pattern
export default component$(({}: ProductProps) => {
  const global = useContext(GlobalContext);
  const { product } = useLocation().params;
  const { img, totalPledged, goal, backers, endDate } = global.data.items.find(
    ({ href }: { href: string }) => {
      return href === product;
    }
  );

  useStylesScoped$(styles);

  return (
    <>
      <img src={img} class="product" width="650px" height="400px" />
      <div class="description">
        <div>
          <div class="nums">{totalPledged}</div>
          <p>pledged of ${goal} goal</p>
        </div>
        <div>
          <div class="nums">{backers}</div>
          <p>backers</p>
        </div>
        <div>
          {/* Calculate from here */}
          <div class="nums">{endDate}#</div>
          <p>days to go</p>
        </div>
        <div>
          {/* Add to cart */}
          <Button text="Pledge" callBack={$(() => {})} />
          <p></p>
        </div>
        <div>
          {/* <Button text="" callBack={$(() => {})} /> */}
          <p>Back this product</p>
        </div>
      </div>
    </>
  );
});
