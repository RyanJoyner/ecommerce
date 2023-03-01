import { $, component$, useStylesScoped$, QRL } from "@builder.io/qwik";
import { RightArrow } from "~/components/icons";

import styles from "./_buttons.scss?inline";

type ArrowBtnProps = {
  text: string;
  customClass?: string;
  callBack: QRL<() => void>;
};

export default component$(
  ({ text = "", customClass = "", callBack = $(() => {}) }: ArrowBtnProps) => {
    useStylesScoped$(styles);
    return (
      <div
        class={`transparent-btn arrow-btn ${customClass}`}
        onClick$={callBack}
      >
        <i> {text}</i>
        <RightArrow />
      </div>
    );
  }
);

