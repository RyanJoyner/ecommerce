import {
  component$,
  useStylesScoped$,
  useSignal,
  $,
  useContext,
  useOnWindow,
} from "@builder.io/qwik";

import { GlobalContext } from "../../root";

import Link from "../buttons/Link";
import { ShoppingCart } from "../icons";

import Menu from "~/components/menu";

import styles from "./_navbar.scss?inline";

export default component$(() => {
  const global = useContext(GlobalContext);
  const { menuHeader, items } = global.data;
  const isOpen = useSignal("");
  useStylesScoped$(styles);

  const menuRef = useSignal<HTMLDivElement>();

  useOnWindow(
    "mousemove",
    $((event) => {
      // @ts-ignore TS no likey refs
      if (event?.clientY > menuRef?.value?.offsetHeight) {
        isOpen.value = "";
      }
    })
  );

  return (
    <div>
      <navbar class="navbar">
        <section class="navbar-section">
          <a href="/">
            <h3 class="brand" style={{ underline: "none", marginBottom: "0" }}>
              Wyrmwood Games
            </h3>
          </a>
        </section>
        <section
          class="navbar-section"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img
            class="logo"
            src="https://wyrmwoodgames.wpenginepowered.com/wp-content/uploads/2022/05/Wyrmwood_Craft_Grullo_Logo-02.png"
            width="66"
            height="85"
            alt=""
          />
        </section>
        <section class="navbar-section">
          <div
            class="btn btn-link"
            onClick$={() => {
              isOpen.value = "active";
            }}
          >
            Products
          </div>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <ShoppingCart />
        </section>
      </navbar>
      <div class={`menus-container ${isOpen.value}`} ref={menuRef}>
        <Menu menuHeader={menuHeader} items={items} />
      </div>
    </div>
  );
});
