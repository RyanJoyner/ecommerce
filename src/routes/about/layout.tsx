import {
  $,
  component$,
  Slot,
  useSignal,
  useStylesScoped$,
} from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

import Tabs from "../../components/tabs";

import styles from "./_about.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);
  const { url } = useLocation();
  const activeTab = useSignal(url.pathname.split("/")[2]);

  return (
    <div class="grid">
      <div class="tabs-container">
        <Tabs
          parent="about"
          list={[
            {
              name: "Profile",
              href: "profile",
              active: activeTab.value === "profile",
            },
            {
              name: "Technologies",
              href: "technologies",
              active: activeTab.value === "technologies",
            },
            {
              name: "Resume",
              href: "resume",
              active: activeTab.value === "resume",
              callBack: $(() => {
                window.open("/Resume.png", "_blank", "fullscreen=yes");
              }),
            },
          ]}
        />
      </div>
      {/* {currentComp.value} */}
      <Slot />
    </div>
  );
});
