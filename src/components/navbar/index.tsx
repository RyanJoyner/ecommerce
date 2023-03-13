import { component$, useStylesScoped$ } from "@builder.io/qwik";
import Breadcrumbs from "../breadcrumbs";
import styles from "./_navbar.scss?inline";
// import Link from "../buttons/Link";

export default component$(() => {
  useStylesScoped$(styles);

  return (
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
        <Breadcrumbs
          items={[
            { name: "Games" },
            { name: "Accessories" },
            { name: "" },
            { name: "" },
            { name: "About" },
            { name: "Contact" },
          ]}
        />
        <img
          class="logo"
          src="https://wyrmwoodgames.wpenginepowered.com/wp-content/uploads/2022/05/Wyrmwood_Craft_Grullo_Logo-02.png"
          width="66"
          height="85"
          alt=""
        />
        {/* TODO: Make this tabs */}
      </section>
      <section class="navbar-section">
        <div>Shop Icon</div>
      </section>
    </navbar>
  );
});
